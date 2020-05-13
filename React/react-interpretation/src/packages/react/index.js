import { ELEMENT_TEXT } from './constants'

/**
 * 创建元素(虚拟dom)的方法
 * @param {} type 元素的类型div span p等等
 * @param {*} config 配置对象，属性、key、ref
 * @param {...any} children 放置所有的儿子，这里会做成一个数组
 */
function createElement(type, config, ...children) {
  delete config.__self
  delete config.__source // 表示这个元素是在哪行哪列生成的

  return {
    type,
    props: {
      ...config,
      // 做了一个兼容处理
      children: children.map((child) => {
        return typeof child === 'object'
          ? child
          : {
              type: ELEMENT_TEXT,
              props: { text: child, children: [] },
            }
      }),
    },
  }
}

// 最终的React
const React = {
  createElement,
}

export default React
