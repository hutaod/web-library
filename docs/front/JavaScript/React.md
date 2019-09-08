# React 理解和常见问题

## React 中 setState 是同步的还是异步的？

[深入 setState 机制](https://github.com/sisterAn/blog/issues/26)
[React 官方描述](https://reactjs.org/docs/faq-state.html#when-is-setstate-asynchronous)

## React 中注意事项

- react 必须在 react-dom 之前引入
- 不能以 body 作为容器
- 引入babel并给script设置type可以支持jsx语法
- react 根元素只能有一个
- 插值表达式
  - 正常显示的类型: String Number
  - 不显示也不会报错的类型：Boolean null undefined
  - 插值表达式中不能直接输入的类型：对象（除去数组）数组会转换为字符串，并用空字符串拼接
- JSX属性
  - jsx标签也是支持属性设置的
  - jsx标签也是支持属性设置的
  - 基本上和html/xml类似
  - 属性也支持插值表达式
    注意：1. class： 使用className属性代替；2. style： 值必须使用对象
- React没有模板语法， 插值表达式中只支持表达式，不支持语句：for/if，通过数组生成的结构，每个元素都必须包含一个key属性，且每个key属性值是唯一的
- 函数使用：组件-拥有独立功能的一个模块，函数标签化-通过标签属性传入
- 一个函数或者类作为一个组件去使用的话， 那么名称必须首字母大写
- 如果使用类实现组件，需要继承一个父类：React.Component，props：传入的参数必须是对象的下一个属性props来接收
