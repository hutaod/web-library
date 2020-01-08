import invariant from 'invariant'
import {
  getIteratorFn,
  REACT_ELEMENT_TYPE,
  REACT_PORTAL_TYPE,
} from '../shared/ReactSymbols'

import { isValidElement, cloneAndReplaceKey } from './ReactElement'
import ReactDebugCurrentFrame from './ReactDebugCurrentFrame'

const SEPARATOR = '.'
const SUBSEPARATOR = ':'

/**
 * 转义并包装key，因此它可以安全的用作reactid
 * @param {string} key
 * @returns {string} 转义后的key
 */
function escape(key) {
  const escapeRegex = /[=:]/g
  const escapeLookup = {
    '=': '=0',
    ':': '=2',
  }
  const escapedString = ('' + key).replace(escapeRegex, function(match) {
    return escapeLookup[match]
  })
  return '$' + escapedString
}

/**
 * TODO: 测试一个child和只有一项的数组具有相同的key pattern
 */

let didWarnAboutMaps = false

const userProvidedKeyEscapeRegex = /\/+/g
// 转义用户提供的key
function escapeUserProvidedKey(text) {
  return ('' + text).replace(userProvidedKeyEscapeRegex, '$&/')
}

const POOL_SIZE = 10
// 遍历上下文池
const traverseContextPool = []
function getPooledTraverseContext(
  mapResult,
  keyPrefix,
  mapFunction,
  mapContext
) {
  if (traverseContextPool.length) {
    const traverseContext = traverseContextPool.pop()
    traverseContext.result = mapResult
    traverseContext.keyPrefix = keyPrefix
    traverseContext.func = mapFunction
    traverseContext.context = mapContext
    traverseContext.count = 0
    return traverseContext
  } else {
    return {
      result: mapResult,
      keyPrefix: keyPrefix,
      func: mapFunction,
      context: mapContext,
      count: 0,
    }
  }
}

// 释放上下文
function releaseTraverseContext(traverseContext) {
  traverseContext.result = null
  traverseContext.keyPrefix = null
  traverseContext.func = null
  traverseContext.context = null
  traverseContext.count = null
  if (traverseContextPool.length < POOL_SIZE) {
    traverseContextPool.push(traverseContext)
  }
}

function traverseAllChildrenImpl(
  children,
  nameSoFar,
  callback,
  traverseContext
) {
  const type = typeof children
  if (type === 'undefined' || type === 'boolean') {
    children = null
  }

  let invokeCallback = false
  if (children === null) {
    invokeCallback = true
  } else {
    switch (type) {
      case 'string':
      case 'number':
        invokeCallback = true
      case 'object':
        switch (children.$$typeof) {
          case REACT_ELEMENT_TYPE:
          case REACT_PORTAL_TYPE:
            invokeCallback = true
        }
      default:
        break
    }
  }

  if (invokeCallback) {
    callback(
      traverseContextPool,
      children,
      // 如果是唯一的子元素，则将名称包含在数组中
      // 以使子元素增加时保持一致
      nameSoFar === '' ? SEPARATOR + getComponentKey(children, 0) : nameSoFar
    )
    return 1
  }

  let child
  let nextName
  let subtreeCount = 0 // 当前子树中找到的子元素数量
  const nextNamePrefix = nameSoFar === '' ? SEPARATOR : nameSoFar + SUBSEPARATOR

  if (Array.isArray(children)) {
    for (let i = 0; i < children.length; i++) {
      child = children[i]
      nextName = nextNamePrefix + getComponentKey(child, i)
      subtreeCount += traverseAllChildrenImpl(
        child,
        nextName,
        callback,
        traverseContext
      )
    }
  } else {
    const iteratorFn = getIteratorFn(children)
    if (typeof iteratorFn === 'function') {
      if (__DEV__) {
        // 当Maps用于children时，发出警告
        if (iteratorFn === children.entries) {
          if (!didWarnAboutMaps) {
            // 不支持将Maps用作children，并且可能会产生意外的结果。
            // 而是将其转换为键式ReactElements的序列/可迭代
            console.error(
              'Using Maps as children is unsupported and will likely yield ' +
                'unexpected results. Convert it to a sequence/iterable of keyed ' +
                'ReactElements instead.'
            )
          }
          didWarnAboutMaps = true
        }
      }

      const iterator = iteratorFn.call(children)
      let step
      let ii = 0
      while (!(step = iterator.next()).done) {
        child = step.value
        nextName = nextNamePrefix + getComponentKey(child, ii++)
        subtreeCount += traverseAllChildrenImpl(
          child,
          nextName,
          callback,
          traverseContext
        )
      }
    } else if (type === 'object') {
      let addendum = ''
      if (__DEV__) {
        // 如果摇渲染子级集合，请使用数组代替
        addendum =
          ' If you meant to render a collection of children, use an array ' +
          'instead.' +
          ReactDebugCurrentFrame.getStackAddendum()
      }
      const childrenString = '' + children
      invariant(
        false,
        'Objects are not valid as a React child (found: %s).%s',
        childrenString === '[object Object]'
          ? 'object with keys {' + Object.keys(children).join(', ') + '}'
          : childrenString,
        addendum
      )
    }
  }

  return subtreeCount
}

/**
 * 遍历的children通常是指`props.children`，但是也可以通过属性指定
 *
 * - `traverseAllChildren(this.props.children, ...)` `props.children`
 * - `traverseAllChildren(this.props.leftPanelChildren, ...)` 属性指定
 *
 * `traverseContext`是一个可选的参数，它通过整个遍历传递，
 * 它可以用来存储累积或者其他可能与callback相关的内容
 *
 * @param {?*} children
 * @param {!function} callback
 * @param {?*} traverseContext
 * @returns {!number}
 */
function traverseAllChildren(children, callback, traverseContext) {
  if (children === null) {
    return 0
  }
  return traverseAllChildrenImpl(children, '', callback, traverseContext)
}

/**
 * 生成用于标识集合中组件的key字符串
 * @param {*} component 可能包含手动key的组件
 * @param {number} index 如果没有提供手动key，就使用索引
 */
function getComponentKey(component, index) {
  // 因为我们盲目的称呼它，所以在这里做一些类型检查。
  // 我们响应确保未来不会阻止潜在的未来ES APIs
  if (
    typeof component === 'object' &&
    component !== null &&
    component.key != null
  ) {
    // 显示key
    return escape(component.key)
  }
  // 隐式key由集合中的index确定
  return index.toString(36)
}

function forEachSingleChild(bookKeeping, child, name) {
  const { func, context } = bookKeeping
  func.call(context, child, bookKeeping.count++)
}

/**
 * 用于遍历`props.children` 类似js 中forEach方法
 *
 * @param {?*} children
 * @param {function(*, int)} forEachFunc
 * @param {*} forEachContext
 */
function forEachChildren(children, forEachFunc, forEachContext) {
  if (children === null) {
    return null
  }
  const traverseContext = getPooledTraverseContext(
    null,
    null,
    forEachFunc,
    forEachContext
  )
  traverseAllChildren(children, forEachSingleChild, traverseContext)
  releaseTraverseContext(traverseContext)
}

function mapSingleChildIntoContext(bookKeeping, child, childKey) {
  const { result, keyPrefix, func, context } = bookKeeping

  let mappedChild = func.call(context, child, bookKeeping.count++)
  if (Array.isArray(mappedChild)) {
    mapIntoWithKeyPrefixInternal(mappedChild, result, childKey, c => c)
  } else if (mappedChild != null) {
    if (isValidElement(mappedChild)) {
      mappedChild = cloneAndReplaceKey(
        mappedChild,
        // 保留mapped和旧的key（如果它们不同），就像traverseAllChildren像子对象一样用于对象
        keyPrefix +
          (mappedChild.key && (!child || child.key !== mappedChild.key)
            ? escapeUserProvidedKey(mappedChild.key) + '/'
            : '') +
          childKey
      )
    }
  }
}

function mapIntoWithKeyPrefixInternal(children, array, prefix, func, context) {
  let escapedPrefix = ''
  if (prefix != null) {
    escapedPrefix = escapeUserProvidedKey(prefix) + '/'
  }
  const traverseContext = getPooledTraverseContext(
    array,
    escapedPrefix,
    func,
    context
  )
  traverseAllChildren(children, mapSingleChildIntoContext, traverseContext)
  releaseTraverseContext(traverseContext)
}
