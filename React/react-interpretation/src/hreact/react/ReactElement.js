import ReactCurrentOwner from './ReactCurrentOwner'
import { REACT_ELEMENT_TYPE } from '../shared/ReactSymbols'
const hasOwnProperty = Object.prototype.hasOwnProperty

const RESERVED_PROPS = {
  key: true,
  ref: true,
}

let specialPropKeyWarningShown, specialPropRefWarningShown

function hasValidRef(config) {
  if (__DEV__) {
    if (hasOwnProperty.call(config, 'ref')) {
      const getter = Object.getOwnPropertyDescriptor(config, 'ref').get
      if (getter && getter.isReactWarning) {
        return false
      }
    }
  }
  return config.ref !== undefined
}

function hasValidKey() {
  if (__DEV__) {
    if (hasOwnProperty.call(config, 'key')) {
      const getter = Object.getOwnPropertyDescriptor(config, 'key').get
      if (getter && getter.isReactWarning) {
        return false
      }
    }
  }
  return config.key !== undefined
}

function defineKeyPropWarningGetter(props, displayName) {
  const warnAboutAccessingKey = function() {
    if (__DEV__ && !specialPropKeyWarningShown) {
      specialPropKeyWarningShown = true
      console.error(
        '%s: `key`不是一个`prop`属性. 尝试访问它会导致在`未定义`中被返回。' +
          '如果需要在子组件中访问相同的值，则应该将其作为其他属性传递'
      )
    }
  }
  warnAboutAccessingKey.isReactWarning = true
  Object.defineProperty(props, 'key', {
    get: warnAboutAccessingKey,
    configurable: true,
  })
}

function defineRefPropWarningGetter(props, displayName) {
  const warnAboutAccessingRef = function() {
    if (__DEV__ && !specialPropRefWarningShown) {
      specialPropRefWarningShown = true
      console.error(
        '%s: `ref`不是一个`prop`属性. 尝试访问它会导致在`未定义`中被返回。' +
          '如果需要在子组件中访问相同的值，则应该将其作为其他属性传递'
      )
    }
  }
  warnAboutAccessingRef.isReactWarning = true
  Object.defineProperty(props, 'ref', {
    get: warnAboutAccessingRef,
    configurable: true,
  })
}

const ReactElement = function(type, key, ref, self, source, owner, props) {
  const element = {
    // 用于标识
    $$typeof: REACT_ELEMENT_TYPE,

    // 属于元素的内置属性
    type,
    key,
    ref,
    props,

    // 记录负责创建此元素的组件
    _owner: owner,
  }

  if (__DEV__) {
    // 验证标志当前是可变的。 我们将其放在外部后备存储上，
    // 以便冻结整个对象，一旦在常用的开发环境中实现了WeakMap，
    // 就可以将其替换为WeakMap。
    element._store = {}

    // 为了使ReactElement的比较更容易用于测试目的，
    // 我们使验证标志不可枚举（在可能的情况下，它应包括我们在其中运行测试的每个环境），
    // 因此测试框架将忽略它
    Object.defineProperty(element._store, 'validated', {
      configurable: false,
      enumerable: false,
      writable: true,
      value: false,
    })
    // self 和 source 仅是 DEV 的属性.
    Object.defineProperty(element, '_self', {
      configurable: false,
      enumerable: false,
      writable: false,
      value: self,
    })
    // 为了测试目的，在两个不同位置创建的两个元素应被视为相等，
    // 因此我们将其隐藏起来，以免枚举。
    Object.defineProperty(element, '_source', {
      configurable: false,
      enumerable: false,
      writable: false,
      value: source,
    })

    if (Object.freeze) {
      Object.freeze(element.props)
      Object.freeze(element)
    }
  }

  return element
}

// @babel/preset-react会读取React.createElement 方法
// 并把jsx转义后的值传递给createElement作为参数
// 创建并返回给定type的一个新的ReactElement
export function createElement(type, config, children) {
  const props = {}

  let key = null
  let ref = null
  let self = null
  let source = null

  if (config != null) {
    if (hasValidRef(config)) {
      ref = config.ref
    }
    if (hasValidKey(config)) {
      key = config.key
    }
    self = config.__self === undefined ? null : config.__self
    self = config.__source === undefined ? null : config.__source

    // 获取props 不会去拿原型链上的属性
    for (const propName in config) {
      if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS[propName]) {
        props[propName] = config[propName]
      }
    }

    // 获取子元素
    const childrenLength = arguments.length - 2
    if (childrenLength === 1) {
      props.children = children
    } else if (childrenLength > 1) {
      // 先声明数组长度性能会好一点，在js中一般不用注意，数据量百万千万次级以上需要注意
      const children = Array(childrenLength)
      for (let i = 0; i < childrenLength; i++) {
        children[i] = arguments[i + childrenLength]
      }
      if (__DEV__ && Object.freeze) {
        Object.freeze(children)
      }
      props.children = children
    }
  }

  // 处理defaultProps，当prop没有值时，把defaultProp赋值给prop
  if (type && type.defaultProps) {
    const defaultProps = type.defaultProps
    for (const propName in defaultProps) {
      if (props[propName] === undefined) {
        props[propName] = defaultProps[propName]
      }
    }
  }

  // 开发环境校验子组件中从props属性中拿取ref或者key属性时进行错误提示
  if (__DEV__) {
    if (key || ref) {
      const displayName =
        typeof type === 'function'
          ? type.displayName || type.name || 'Unknown'
          : type
      if (key) {
        defineKeyPropWarningGetter(props, displayName)
      }
      if (ref) {
        defineRefPropWarningGetter(props, displayName)
      }
    }
  }

  return ReactElement(
    type,
    key,
    ref,
    self,
    source,
    ReactCurrentOwner.current,
    props
  )
}

export function cloneElement(element, config, children) {
  let propName

  // 拷贝props
  const props = Object.assign({}, element.props)

  // 提取需要保留下来的属性名称
  let key = element.key
  let ref = element.ref
  // 由于保留了owner，因此保留了self
  const self = element._self
  // 保留了source，因为cloneElement不太可能成为编译器的目标，
  // 并且原始source可能是真实所有者的更好指示
  const source = element._source

  // 除非ref被覆盖，否则owner会被保留
  let owner = element._owner

  if (config != null) {
    if (hasValidRef(config)) {
      ref = config.ref
      owner = ReactCurrentOwner.current
    }
    if (hasValidKey(config)) {
      key = '' + config.key
    }
    let defaultProps
    if (element.type && element.type.defaultProps) {
      defaultProps = element.type.defaultProps
    }
    for (const propName in config) {
      if (
        hasOwnProperty.call(config, propName) &&
        !RESERVED_PROPS.hasOwnProperty(propName)
      ) {
        if (config[propName] === undefined && defaultProps != undefined) {
          props[propName] = defaultProps[propName]
        } else {
          props[propName] = config[propName]
        }
      }
    }
  }

  const childrenLength = arguments.length - 2
  if (childrenLength === 1) {
    props.children = children
  } else if (childrenLength > 1) {
    const children = Array(childrenLength)
    for (let i = 0; i < childrenLength; i++) {
      children[i] = arguments[i + childrenLength]
    }
    props.children = children
  }
  return ReactElement(element.type, key, ref, self, source, owner, props)
}

/**
 * 验证 object 是否是一个 ReactElement
 * @param {?object} object
 * @returns {boolean} 如果是一个 ReactElement 就返回true
 */
export function isValidElement(object) {
  return (
    typeof object === 'object' &&
    object !== null &&
    object.$$typeof === REACT_ELEMENT_TYPE
  )
}
