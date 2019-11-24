import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Tabs extends Component {
  static propTypes = {
    classPrefix: PropTypes.string,
    classNmae: PropTypes.string,
    defaultActiveIndex: PropTypes.number,
    activeIndex: PropTypes.number,
    onChange: PropTypes.func,
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
    ])
  }

  static defaultProps = {
    classPrefix: 'tabs',
    onChange: () => {}
  }

  constructor(props) {
    super(props)
    let activeIndex = 0
    if ('activeIndex' in props) {
      activeIndex = props.activeIndex
    } else if ('defaultActiveIndex' in props) {
      activeIndex = props.defaultActiveIndex
    }
    this.state = {
      activeIndex,
      prevIndex: activeIndex
    }
  }

  getTabPanes() {
    const { classPrefix, activeIndex, children } = this.props
  }
  render() {
    return <div className="ui-tabs">123</div>
  }
}

export default Tabs
