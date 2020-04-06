(window.webpackJsonp=window.webpackJsonp||[]).push([[48],{309:function(t,e,a){"use strict";a.r(e);var r=a(28),v=Object(r.a)({},(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"react-常见面试题"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#react-常见面试题","aria-hidden":"true"}},[t._v("#")]),t._v(" React 常见面试题")]),t._v(" "),a("h2",{attrs:{id:"为什么选择使用框架而不是原生"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#为什么选择使用框架而不是原生","aria-hidden":"true"}},[t._v("#")]),t._v(" 为什么选择使用框架而不是原生?")]),t._v(" "),a("h2",{attrs:{id:"虚拟-dom-的优劣如何"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#虚拟-dom-的优劣如何","aria-hidden":"true"}},[t._v("#")]),t._v(" 虚拟 DOM 的优劣如何?")]),t._v(" "),a("p",[t._v("优点：")]),t._v(" "),a("ul",[a("li",[t._v("保证性能下限：虚拟 DOM 可以经过 diff 算法找出最小差异，然后批量进行 patch，这种操作虽然比不上手动优化，但比起粗暴的 dom 操作性能要好很多，因此虚拟 DOM 可以保证性能下限")]),t._v(" "),a("li",[t._v("提高开发效率，无需手动操作 DOM：虚拟 DOM 的 diff 和 patch 都是在一次更新中自动进行的，我们无需手动操作 DOM，极大提高开发效率")]),t._v(" "),a("li",[t._v("跨平台：虚拟 DOM 本质上是 JS 对象，而 DOM 与平台强相关,相比之下虚拟 DOM 可以进行更方便地跨平台操作,例如服务器渲染、移动端开发等等")])]),t._v(" "),a("p",[t._v("缺点：")]),t._v(" "),a("ul",[a("li",[t._v("无法进行极致优化：在一些性能要求极高的应用中虚拟 DOM 无法进行针对性的极致优化，比如 VScode 采用手动操作 DOM 的方式进行极端的性能优化")])]),t._v(" "),a("h2",{attrs:{id:"虚拟-dom-实现原理"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#虚拟-dom-实现原理","aria-hidden":"true"}},[t._v("#")]),t._v(" 虚拟 DOM 实现原理?")]),t._v(" "),a("ul",[a("li",[t._v("虚拟 DOM 本质上就是 JS 对象，是对真实 DOM 的抽象")]),t._v(" "),a("li",[t._v("状态变更时，记录新树和旧树的差异")]),t._v(" "),a("li",[t._v("最后把差异更新到真实 dom 中")])]),t._v(" "),a("h2",{attrs:{id:"生命周期"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#生命周期","aria-hidden":"true"}},[t._v("#")]),t._v(" 生命周期")]),t._v(" "),a("p",[t._v("初始化：\n"),a("code",[t._v("constructor")]),t._v("\n=>\n"),a("code",[t._v("getDerivedStateFromProps(nextProps, nextState)")]),t._v("\n=>\n"),a("code",[t._v("render")]),t._v("\n=>\n"),a("code",[t._v("componentDidMount")])]),t._v(" "),a("p",[t._v("更新：")]),t._v(" "),a("p",[a("code",[t._v("getDerivedStateFromProps(nextProps, nextState)")])]),t._v(" "),a("p",[t._v("=>")]),t._v(" "),a("p",[a("code",[t._v("shouldCompoentUpdate(prevProps, prevState)")])]),t._v(" "),a("p",[t._v("=>")]),t._v(" "),a("p",[a("code",[t._v("render")])]),t._v(" "),a("p",[t._v("=>")]),t._v(" "),a("p",[a("code",[t._v("getShapshotBeforeUpdate(prevProps, prevState)")])]),t._v(" "),a("p",[t._v("=>")]),t._v(" "),a("p",[a("code",[t._v("componentDidUpdate(prevProps, prevState, shapshot)")])]),t._v(" "),a("p",[t._v("卸载：")]),t._v(" "),a("p",[a("code",[t._v("componentWillUnmount()")])]),t._v(" "),a("h2",{attrs:{id:"react-的请求应该放在哪一个生命周期"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#react-的请求应该放在哪一个生命周期","aria-hidden":"true"}},[t._v("#")]),t._v(" React 的请求应该放在哪一个生命周期")]),t._v(" "),a("ol",[a("li",[t._v("一般情况下在 "),a("code",[t._v("componentDidMount")]),t._v(" 中")]),t._v(" "),a("li",[t._v("特殊性况下可以在 "),a("code",[t._v("constructor")]),t._v(" 中，比如需要服务端渲染时")])]),t._v(" "),a("h2",{attrs:{id:"setstate-是异步还是同步？"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#setstate-是异步还是同步？","aria-hidden":"true"}},[t._v("#")]),t._v(" setState 是异步还是同步？")]),t._v(" "),a("ol",[a("li",[a("code",[t._v("setState")]),t._v(' 只在合成事件和钩子函数中是"异步"的，在原生事件和定时器中都是同步的')]),t._v(" "),a("li",[a("code",[t._v("setState")]),t._v(" 其实本身执行的过程和代码都是同步的，只是合成事件和钩子函数的调用顺序在更新之前，导致在合成事件和钩子函数中没法立马拿到更新后的值，形成了所谓的“异步”，当然可以通过第二个参数 setState(partialState, callback) 中的 callback 拿到更新后的结果")]),t._v(" "),a("li",[a("code",[t._v("setState")]),t._v(" 的批量更新优化也是建立在“异步”（合成事件、钩子函数）之上的，在原生事件和 setTimeout 中不会批量更新，在“异步”中如果对同一个值进行多次 setState，setState 的批量更新策略会对其进行覆盖，取最后一次的执行，如果是同时 setState 多个不同的值，在更新时会对其进行合并批量更新")])]),t._v(" "),a("p",[t._v("参考：")]),t._v(" "),a("p",[a("a",{attrs:{href:"https://github.com/sisterAn/blog/issues/26",target:"_blank",rel:"noopener noreferrer"}},[t._v("深入 setState 机制"),a("OutboundLink")],1)]),t._v(" "),a("p",[a("a",{attrs:{href:"https://reactjs.org/docs/faq-state.html#when-is-setstate-asynchronous",target:"_blank",rel:"noopener noreferrer"}},[t._v("React 官方描述"),a("OutboundLink")],1)]),t._v(" "),a("h2",{attrs:{id:"setstate-之后发生了什么？"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#setstate-之后发生了什么？","aria-hidden":"true"}},[t._v("#")]),t._v(" setState 之后发生了什么？")]),t._v(" "),a("h2",{attrs:{id:"react-组件如何实现通信？"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#react-组件如何实现通信？","aria-hidden":"true"}},[t._v("#")]),t._v(" React 组件如何实现通信？")]),t._v(" "),a("ol",[a("li",[t._v("props")]),t._v(" "),a("li",[t._v("Context")]),t._v(" "),a("li",[t._v("Redux")]),t._v(" "),a("li",[t._v("Mobx")]),t._v(" "),a("li",[t._v("自己添加发布订阅模式（需要自己去监听数据改变）")])])])}),[],!1,null,null,null);e.default=v.exports}}]);