import React from 'react'
import ReactDom from 'react-dom'
import Tabs from './index'

describe('Tab', () => {
  it('render the tab content', () => {
    // 根据 data渲染出Tab内容
    const div = document.createElement('div')
    const App = () => {
      return (
        <Tabs defaultActiveIndex={0}>
          <Tabs.TabPane tab="123" order="0">
            111
          </Tabs.TabPane>
          <Tabs.TabPane tab="234" order="1">
            222
          </Tabs.TabPane>
        </Tabs>
      )
    }
    ReactDom.render(App, div)
  })
})
