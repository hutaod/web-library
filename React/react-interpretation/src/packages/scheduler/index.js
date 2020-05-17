import { TAG_ROOT, ELEMENT_TEXT, TAG_TEXT, TAG_HOST } from '../shared/constants'
import { setProps } from '../shared/util'

let nextUnitOfWork = null // 下一个filber单元
let workInProcessRoot = null // filber的根
/**
 * 从根节点开始渲染和调度
 * 两个阶段：
 * 1. diff阶段 对比新旧的虚拟dom，进行增量 更新或创建。diff阶段就是指render阶段
 * 这个阶段可能比较花时间，可以我们对任务进行拆分，拆分的纬度虚拟DOM。此阶段可以暂停
 * render阶段成果是effect list知道哪些节点更新哪些节点删除、增加了
 * render阶段有两个任务：1。根据虚拟DOM生成fiber树 2，收集effect list
 * 2. commit阶段，进行DOM更新创建阶段，此阶段不能暂停，要一气呵成。
 * @param {*} rootFiber {tag: TAG_ROOT, stateNode: container,  props: { children: [element] }}
 */
export function scheduleRoot(rootFiber) {
  workInProcessRoot = rootFiber
  nextUnitOfWork = rootFiber
}

function performUnitWork(currentFiber) {
  beginWork(currentFiber) // 开始diff阶段
  if (currentFiber.child) {
    return currentFiber.child
  }
  while (currentFiber) {
    complateUnitOfWork(currentFiber) // 没有儿子让自己完成
    if (currentFiber.sibling) {
      // 看有没有弟弟
      return currentFiber.sibling // 有弟弟返回弟弟
    }
    currentFiber = currentFiber.return // 找父亲然后让父亲完成
  }
}

/**
 * diff阶段结束 - 在完成的时候要收集有副作用的fiber， 组成effet list
 * @param {*} params
 */
function complateUnitOfWork(currentFiber) {
  // TODO
}

/**
 * 开始diff阶段
 * 1. 创建真实DOM元素
 * 2. 创建子fiber
 * @param {*} currentFiber
 */
function beginWork(currentFiber) {
  if (currentFiber.tag === TAG_ROOT) {
    updateHostRoot(currentFiber)
  } else if (currentFiber.tag === TAG_TEXT) {
    updateHostText(currentFiber)
  } else if (currentFiber.tag === TAG_HOST) {
    updateHost(currentFiber)
  }
}

function updateHost(currentFiber) {
  if (!currentFiber.stateNode) {
    // 如果此fiber没有创建dom节点
    currentFiber.stateNode = createDom(currentFiber)
  }
  const newChildren = currentFiber.props.children
  reconcileChildren(currentFiber, newChildren)
}

function createDom(currentFiber) {
  if (currentFiber.tag === TAG_TEXT) {
    return document.createTextNode(currentFiber.props.text)
  } else if (currentFiber.tag === TAG_HOST) {
    // span div
    let stateNode = document.createElement(currentFiber.type)
    updateDom(stateNode, {}, currentFiber.props)
    return stateNode
  }
}

function updateDom(stateNode, oldProps, newProps) {
  setProps(stateNode, oldProps, newProps)
}

function updateHostText(currentFiber) {
  if (!currentFiber.stateNode) {
    // 如果此fiber没有创建dom节点
    currentFiber.stateNode = createDom(currentFiber)
  }
}

/**
 * 更新根节点
 * @param {*} currentFiber
 */
function updateHostRoot(currentFiber) {
  // 先处理自己，如果是一个原生节点，创建真实DOM 2.创建子fiber
  let newChildren = currentFiber.props.children
  reconcileChildren(currentFiber, newChildren)
}

function reconcileChildren(currentFiber, newChildren) {
  let newChildIndex = 0 // 新子节点的索引
  let prevSibling // 上一个新的子fiber
  while (newChildIndex < newChildren.length) {
    let newChild = newChildren[newChildIndex]
    let tag
    if (newChild.type === ELEMENT_TEXT) {
      tag = TAG_TEXT // 如果这是一个文本节点
    } else if (typeof newChild.type === 'string') {
      tag = TAG_HOST // 如果type是字符串，那么这是一个原生dom节点
    }
    let newFiber = {
      tag, // TAG_HOST
      type: newChild.type, // div
      props: newChild.props,
      stateNode: null, // div还没创建dom元素
      return: currentFiber, // 父fiber
      effectTag: PLACEMENT, // 副作用标识 render阶段要收集副作用 增加、删除、更新
      nextEffect: null, // effect list也是一个单链表和fiber完成顺序是一样的，但节点只放有副作用的的节点
    }
    // 最小的儿子是没有sibling的
    if (newFiber) {
      if (newChildIndex === 0) {
        // 如果当前索引为0，说明这是太子
        currentFiber.child = newFiber
      } else {
        prevSibling.sibling = newFiber // 让太子的sibling指向二皇子
      }
      prevSibling = newFiber
    }
    newChildIndex++
  }
}

// 循环执行工作 nextUnitWork
function workLoop(deadline) {
  let shouldYield = false // 是否要让出时间片或者说控制权
  while (nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork) // 执行完一个任务后
    shouldYield = shouldYield.timeRemaining() < 1 // 没有时间的话就让出控制权
  }
  if (!nextUnitOfWork) {
    console.log('render阶段结束')
  }
  // 不管有没有任务，都请求浏览器再次调度 每一帧都要执行一次workLoop
  requestIdleCallback(workLoop, { timeout: 500 })
}

// react高速浏览器，我现在有任务请你在闲的时候执行
// 有一个优先级的概念。 expirationTime
requestIdleCallback(workLoop, { timeout: 500 })
