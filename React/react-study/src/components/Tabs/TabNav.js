import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

export default class TabNav extends Component {
  static propTypes = {
    // class前缀
    classPrefix: PropTypes.string,
    panels: PropTypes.node,
    activeIndex: PropTypes.number,
    onTabClick: PropTypes.func
  }

  getTabs() {
    const { panels, classPrefix, activeIndex } = this.props
    return React.Children.map(panels, (child) => {
      if (!child) {
        return
      }
      const order = parseInt(child.props.order, 10)
      // 利用class进行控制隐藏
      let classes = classnames({
        [`${classPrefix}-tab`]: true,
        [`${classPrefix}-active`]: activeIndex === order,
        [`${classPrefix}-disbaled`]: child.props.disabled
      })

      let events = {}
      if (!child.props.disabled) {
        events = {
          onClick: this.props.onTabClick.bind(this, order)
        }
      }

      const ref = {}
      if (activeIndex === order) {
        ref.ref = 'activeTab'
      }

      return (
        <li
          role="tab"
          aria-disabled={child.props.disabled ? 'true' : 'false'}
          aria-selected={activeIndex === order ? 'true' : 'false'}
          {...events}
          className={classes}
          key={order}
          {...ref}
        >
          {child.props.tab}
        </li>
      )
    })
  }

  render() {
    const { classPrefix } = this.props
    return (
      <div className={`${classPrefix}-bar`}>
        <ul className={`${classPrefix}-nav`}>{this.getTabs()}</ul>
      </div>
    )
  }
}
