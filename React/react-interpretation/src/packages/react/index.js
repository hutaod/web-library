import { ELEMENT_TEXT } from '../shared/constants'

/**
 * 创建元素(虚拟dom)的方法
 * @param {} type 元素的类型div span p等等
 * @param {*} config 配置对象，属性、key、ref
 * @param {...any} children 放置所有的儿子，这里会做成一个数组
 */
function createElement(type, config, ...children) {
  delete config.__self
  delete config.__source // 表示这个元素是在哪行哪列生成的
  children = children.map((child) => {
    // return child
    return typeof child === 'object'
      ? child
      : {
          type: ELEMENT_TEXT,
          props: { text: child, children: [] },
        }
  })
  // children =
  //   children.length === 1 && typeof children[0] === 'string'
  //     ? children[0]
  //     : children
  return {
    type,
    props: {
      ...config,
      // 做了一个兼容处理，如果是React元素的话返回自己，如果是文本类型，是字符串的情况，返回元素对象
      children,
    },
  }
}

// 最终的React
const React = {
  createElement,
}

export default React
