import React, { Component } from 'react'
import { BrowserRouter, Route, Redirect, Link, Switch } from 'react-router-dom'

const ProductList = () => {
  return <div>商品列表</div>
}

const Detail = ({ match }) => {
  return <div>{match.params.name}</div>
}

const ProductManage = () => {
  return (
    <div>
      <h3>商品管理</h3>
      {/* 子路由访问可以不需要加上/manage/ */}
      <Link to="add">新增</Link>
      <Link to="search">搜索</Link>
      {/* 点击它不会跳转到管理首页 */}
      <Link to="/manage">管理首页</Link>

      <Route path="/manage/add" component={() => <div>新增</div>} />
      <Route path="/manage/search" component={() => <div>搜索</div>} />
      {/* 
        写在这里需要注意的事项
        1. 如果进入管理页后再次点击访问/manage是不会重定向到/manage/add
        2. Redirect的to的值必须是路由全路径
      */}
      {/* <Redirect from="/manage" to="/manage/add" /> */}
    </div>
  )
}

function PrivateRoute({ component: Comp, needLogin, ...rest }) {
  return (
    <Route
      {...rest}
      render={props => {
        if (!needLogin) {
          return <Comp />
        } else {
          return (
            <Redirect
              to={{
                pathname: '/login'
              }}
            />
          )
        }
      }}
    />
  )
}

export default class RouterTest extends Component {
  render() {
    return (
      <BrowserRouter>
        <nav>
          <Link to="/">商品列表</Link>
          <Link to="/manage">商品管理</Link>
          <Link to="/detail/web">web全栈</Link>
        </nav>
        {/* 路由配置 */}
        <Switch>
          <Route exact path="/" component={ProductList} />
          {/* 写在这里可以防止点击/manage时一定会重定向到/manage/add，外层的Switch必须存在 */}
          <Redirect exact from="/manage" to="/manage/add" />
          <PrivateRoute path="/manage" component={ProductManage} />
          <PrivateRoute path="/login" component={() => <div>login</div>} />
          <Route path="/detail/:name" component={Detail} />
          <Route component={() => <div>404</div>} />
        </Switch>
      </BrowserRouter>
    )
  }
}
