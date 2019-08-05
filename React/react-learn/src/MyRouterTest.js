import React, { Component } from 'react'
import { createBrowserHistory } from 'history'
import matchPath from './utils/matchPath'

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

  componentWillUnmount() {
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

class Route extends Component {
  render() {
    return (
      <RouterContext.Consumer>
        {context => {
          const location = context.location
          // 根据pathname和用户传递的props获得match对象
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
                  ? React.createElement(component) // 若它存在渲染之
                  : render // 若render选项存在
                  ? render(props) // 按render渲染结果
                  : null
                : null}
            </RouterContext.Provider>
          )
        }}
      </RouterContext.Consumer>
    )
  }
}

// 跳转链接
class Link extends Component {
  handleClick = (e, history) => {
    e.preventDefault()
    history.push(this.props.to)
  }

  render() {
    const { to, children, ...rest } = this.props
    return (
      <RouterContext.Consumer>
        {context => {
          return (
            <a
              {...rest}
              href={to}
              onClick={e => {
                this.handleClick(e, context.history)
              }}
            >
              {children}
            </a>
          )
        }}
      </RouterContext.Consumer>
    )
  }
}

export default class MyRouterTest extends Component {
  render() {
    return (
      <BrowserRouter>
        <Link to="/foo">foo</Link>
        <Link to="/bar">bar</Link>
        <Link to="/mua/abc">mua</Link>
        <Route path="/foo" component={() => <div>foo</div>} />
        <Route path="/bar" component={() => <div>bar</div>} />
        <Route
          path="/mua/:ns"
          render={({ match }) => <div>{match.params.ns}</div>}
        />
        <Route children={({ location }) => <div>'xxx'</div>} />
      </BrowserRouter>
    )
  }
}
