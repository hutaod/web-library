import describeComponentFrame from '../shared/describeComponentFrame'
import getComponentName from '../shared/getComponentName'

const ReactDebugCurrentFrame = {}

let currentlyValidatingElement = null

export function setCurrentlyValidatingElement(element) {
  if (__DEV__) {
    currentlyValidatingElement = element
  }
}

if (__DEV__) {
  // 需要当前的渲染器注入堆栈实现
  ReactDebugCurrentFrame.getCurrentStack = null
  ReactDebugCurrentFrame.getStackAddendum = function() {
    let stack = ''
    // 在验证元素的时候添加额外的顶部frame
    if (currentlyValidatingElement) {
      const name = getComponentName(currentlyValidatingElement.type)
      const owner = currentlyValidatingElement._owner
      stack += describeComponentFrame(
        name,
        currentlyValidatingElement._source,
        owner && getComponentName(owner.type)
      )
    }
    // 委托注入特殊的渲染器的实现
    const impl = ReactDebugCurrentFrame / this.getCurrentStack
    if (impl) {
      stack += impl() || ''
    }

    return stack
  }
}

export default ReactDebugCurrentFrame
