import React from 'react'
import { Route, HashRouter as Router, Switch } from 'react-router-dom'
import Home from '../pages/home'
import Detail from '../pages/detail'

export default () => (
  <Router>
    <Switch>
      <Route path="/detail">
        <Detail />
      </Route>
      <Route path="/">
        <Home name="123" />
      </Route>
    </Switch>
  </Router>
)
