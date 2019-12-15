import React from 'react'
import { HashRouter, Route } from 'react-router-dom'
import Index from '../pages/Index'

export default function() {
  return (
    <HashRouter>
      <Route path="/" exact component={Index} />
    </HashRouter>
  )
}
