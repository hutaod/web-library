import React, { Component } from 'react'
import PropTypes from 'prop-types'
// import classnames from 'classnames'

export default class TabContent extends Component {
  static propTypes = {
    // class前缀
    classPrefix: PropTypes.string,
    panels: PropTypes.node,
    activeIndex: PropTypes.number,
    onTabClick: PropTypes.func
  }

  getTabsPanes() {
    const { panels, classPrefix, activeIndex } = this.props
    return React.Children.map(panels, (child) => {
      if (!child) {
        return
      }
      const order = parseInt(child.props.order, 10)
      // 利用class进行控制隐藏
      const isActive = activeIndex === order

      return React.cloneElement(child, {
        classPrefix,
        isActive,
        children: child.props.children,
        key: `tabpane-${order}`
      })
    })
  }

  render() {
    const { classPrefix } = this.props
    return <div className={`${classPrefix}-content`}>{this.getTabsPanes()}</div>
  }
}
