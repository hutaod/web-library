import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import TabNav from './TabNav'
import TabContent from './TabContent'
import TabPane from './TabPane'
import './styles.scss'

class Tabs extends Component {
  static TabPane = TabPane
  static propTypes = {
    className: PropTypes.string,
    // class前缀
    classPrefix: PropTypes.string,
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
    ]),
    // 默认激活索引，组件内更新
    defaultActiveIndex: PropTypes.number,
    // 默认激活索引，组件外更新
    activeIndex: PropTypes.number,
    // 切换时回调函数
    onChange: PropTypes.func
  }

  static defaultProps = {
    classPrefix: 'sword',
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

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      'activeIndex' in nextProps &&
      nextProps.activeIndex !== prevState.activeIndex
    ) {
      return {
        activeIndex: nextProps.activeIndex
      }
    }
    return {}
  }

  handleTabClick = (activeIndex) => {
    const prevIndex = this.state.activeIndex
    // 如果当前activeIndex与传入的activeIndex不一致，
    // 并且props中存在defaultActiveIndex 时则更新
    if (prevIndex !== activeIndex && 'defaultActiveIndex' in this.props) {
      this.setState({
        activeIndex,
        prevIndex
      })
      // 更新后执行回调函数，抛出当前索引和上一次索引
      this.props.onChange(activeIndex, prevIndex)
    }
  }

  renderTabNav() {
    const { classPrefix, children } = this.props

    return (
      <TabNav
        key="tabBar"
        classPrefix={classPrefix}
        onTabClick={this.handleTabClick}
        panels={children}
        activeIndex={this.state.activeIndex}
      />
    )
  }

  renderTabContent() {
    const { classPrefix, children } = this.props
    return (
      <TabContent
        key="tabContent"
        classPrefix={classPrefix}
        panels={children}
        activeIndex={this.state.activeIndex}
      />
    )
  }

  render() {
    const { className } = this.props
    const classes = classnames(className, 'ui-tabs')
    return (
      <div className={classes}>
        {this.renderTabNav()}
        {this.renderTabContent()}
      </div>
    )
  }
}

export default Tabs
