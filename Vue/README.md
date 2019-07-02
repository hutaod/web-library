## compile

- parse 使用正则解析 template 中的 vue 的指令(v-xxx) 变量等等 形成抽象语法树 AST(js 对象)
- optimize 标记一些静态节点，用作后面的性能优化，在 diff 的时候(虚拟 dom 比对时)直接略过
- 把第一部生成的 AST 转化为渲染函数 render function

  new Function(renderStr) 可以把 render 函数字符串转为真正的函数
