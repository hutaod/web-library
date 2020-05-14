let nextUnitOfWork = null // 下一个filber单元
let workInProcessRoot = null // filber的根
/**
 * 从根节点开始渲染和调度
 * 两个阶段：
 * 1. diff阶段 对比新旧的虚拟dom，进行增量 更新或创建。render阶段
 * 这个阶段可能比较花时间，可以我们对任务进行拆分，拆分的纬度虚拟DOM。此阶段可以暂停
 * 2. commit阶段，进行DOM更新创建阶段，此阶段不能暂停，要一气呵成。
 * @param {*} rootFiber {tag: TAG_ROOT, stateNode: container,  props: { children: [element] }}
 */
function scheduleRoot(rootFiber) {
  workInProcessRoot = rootFiber
  nextUnitOfWork = rootFiber
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
