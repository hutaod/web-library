import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter, Route, Redirect, Link, Switch } from 'react-router-dom'
import { login } from './store/user'

const Login = connect(
  state => ({
    isLogin: state.user.isLogin
  }),
  { login }
)(({ location, isLogin, login, loading, error }) => {
  const redirect = (location.state && location.state.redirect) || '/'
  // 若已登陆重定向至redirect
  if (isLogin) return <Redirect to={redirect} />
  return (
    <div>
      <p>用户登录</p>
      <hr />
      {/* 显示错误信息 */}
      {error && <p>{error}</p>}
      {/* 登录传参 */}
      <button onClick={() => login('ht')} disabled={loading}>
        {loading ? '登录中...' : '登录'}{' '}
      </button>
    </div>
  )
})

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

const PrivateRoute = connect(state => ({
  isLogin: state.user.isLogin
}))(({ component: Comp, isLogin, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        if (isLogin) {
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
})

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
          <Route path="/login" component={Login} />
          <Route path="/detail/:name" component={Detail} />
          <Route component={() => <div>404</div>} />
        </Switch>
      </BrowserRouter>
    )
  }
}
