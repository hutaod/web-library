import { TAG_ROOT, TAG_HOST, TAG_TEXT } from '../shared/constants'
/**
 * render 是把一个元素渲染到一个容器内部
 * @param {*} element
 * @param {*} container = root 真实DOM节点
 */
function render(element, container) {
  let rootFiber = {
    tag: TAG_ROOT, // 每个fiber会有一个tag标志
    stateNode: container, // 一般情况下如果这个元素是原生节点的话， stateNode指向真实的DOM元素
    props: {
      // 数组，里面放的react元素 虚拟DOM
      children: [element],
    },
  }
  scheduleRoot(rootFiber)
}

const ReactDOM = {
  render,
}

export default ReactDOM
