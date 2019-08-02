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
      <Link to="/manage/add">新增</Link>
      <Link to="/manage/search">搜索</Link>
      <Route path="/manage/add" component={() => <div>新增</div>} />
      <Route path="/manage/search" component={() => <div>搜索</div>} />
      <Redirect to="/manage/add" />
    </div>
  )
}

function PrivateRoute({ component: Comp, needLogin, ...rest }) {
  return (
    <Route
      {...rest}
      render={props => {
        if (needLogin) {
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
        </nav>
        {/* 路由配置 */}
        <Route exact path="/" component={ProductList} />
        <PrivateRoute path="/manage" component={ProductManage} needLogin />
        <PrivateRoute
          path="/login"
          component={() => <div>login</div>}
          needLogin
        />
        <Route path="/detail/:name" component={Detail} />
      </BrowserRouter>
    )
  }
}
