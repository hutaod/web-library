import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

class TabPane extends Component {
  static propTypes = {
    tab: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
    classPrefix: PropTypes.string,
    className: PropTypes.string,
    order: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    isActive: PropTypes.bool,
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
    ])
  }

  render() {
    const { classPrefix, className, isActive, children } = this.props
    const classes = classnames(className, `${classPrefix}-panel`, {
      [`${classPrefix}-active`]: isActive
    })
    return (
      <div role="tabpanel" className={classes} aria-hidden={!isActive}>
        {children}
      </div>
    )
  }
}

export default TabPane
