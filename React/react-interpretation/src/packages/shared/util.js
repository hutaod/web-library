export function setProps(dom, oldProps, newProps) {
  for (const key in oldProps) {
    // if (object.hasOwnProperty(key)) {
    //   const element = object[key]
    // }
  }
  for (const key in newProps) {
    if (key !== 'children') {
      setProp(dom, key, newProps)
    } else {
    }
  }
}

function setProp(dom, key, value) {
  if (/^on/.test(key)) {
    // 事件 onclick
    dom[key.toLowerCase()] = value // 没有用合成事件
  } else if (key === 'style') {
    if (value) {
      for (const styleName in value[key]) {
        dom.style[styleName] = value[key][styleName]
      }
    }
  } else {
    dom.setAttribute(key, value)
  }
}
