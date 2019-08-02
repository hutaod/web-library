import React, { Component } from 'react'
import { createBrowserHistory } from 'history'

// 创建一个上下文
const RouterContext = React.createContext()

// Router: 管理历史记录的变更，location的变更等等，并传递给后代
class BrowserRouter extends Component {
  constructor(props) {
    super(props)

    // 创建浏览器的history对象
    this.history = createBrowserHistory(this.props)

    // 创建管理状态location
    this.state = {
      location: this.history.location
    }

    // 开启监听
    this.unlisten = this.history.listen(location => {
      this.setState({ location })
    })
  }

  componentDidMount() {
    if (this.unlisten) {
      this.unlisten()
    }
  }

  render() {
    return (
      <RouterContext.Provider
        value={{
          history: this.history,
          location: this.state.location
        }}
      >
        {this.props.children}
      </RouterContext.Provider>
    )
  }
}

function matchPath(path, props) {
  return {
    path: props.pathname
  }
}

class Route extends Component {
  render() {
    return (
      <RouterContext>
        {context => {
          const location = context.location
          // 根据pathname获得match对象
          const match = matchPath(location.pathname, this.props)

          // 要传递一些参数
          const props = {
            ...context,
            match
          }

          // component render children
          // children => component => render
          let { component, render, children } = this.props

          // if(Array.isArray(children) && children.length === 0) {

          // }

          if (typeof children === 'function') {
            children = children(props)
          }

          return (
            <RouterContext.Provider value={props}>
              {children // children优先级最高，不论匹配与否存在就执行
                ? children
                : props.match // 后面的component和render必须匹配
                ? component // 若匹配首先查找component
                  ? React.cloneElement(component) // 渲染component
                  : render // 若匹配render
                  ? render(props) // 执行render
                  : null
                : null}
            </RouterContext.Provider>
          )
        }}
      </RouterContext>
    )
  }
}

export default class MyRouterTest extends Component {
  render() {
    return (
      <BrowserRouter>
        <Route path="/foo" component={() => <div>foo</div>} />
        <Route path="/bar" component={() => <div>bar</div>} />
      </BrowserRouter>
    )
  }
}
