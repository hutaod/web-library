import React from 'react'
// import JsxTest from './components/JsxTest'
// import SetState from './components/SetState'
// import MemoTest from './components/MemoTest'

// import ForwardRef from './components/ForwardRef'
// React.lazy必须和 React.Suspense结合
// const ForwardRef = React.lazy(() => import('./components/ForwardRef'))

import { ContextHook, ReducerHook } from './components/hooks'

const App = () => {
  return (
    <div>
      {/* <JsxTest /> */}
      {/* <SetState /> */}
      {/* <MemoTest>
        <div>
          <h3>123</h3>
          <h4>hello</h4>
        </div>
        <JsxTest />
        <div>world</div>
      </MemoTest> */}
      {/* 
        注意：
        1. lazy 组件依赖该组件渲染树上层的 <React.Suspense> 组件
        2. 使用 React.lazy 的动态引入特性需要 JS 环境支持 Promise
        3. React.Suspense 可以指定加载指示器（loading indicator），以防其组件树中的某些子组件尚未具备渲染条件
        4. lazy 组件可以位于 Suspense 组件树的深处——它不必包装树中的每一个延迟加载组件。
       */}
      {/* <React.Suspense fallback="loading">
        <div>
          <ForwardRef />
        </div>
      </React.Suspense> */}
      <ContextHook />
      <ReducerHook />
    </div>
  )
}

export default App
