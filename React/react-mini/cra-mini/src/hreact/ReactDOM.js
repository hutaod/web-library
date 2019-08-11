import initVNode from './virtual-dom'
function render(vnode, container) {
  console.log(vnode)
  // container.innerHTML = `<pre>${JSON.stringify(vnode, null, 2)}</pre>`
  if (vnode && container) {
    container.appendChild(initVNode(vnode))
  }
}

export default {
  render
}
