import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

export default class Portal extends Component {
  static propTypes = {
    onOpen: PropTypes.func,
    onClose: PropTypes.func,
    beforeClose: PropTypes.func,
    children: PropTypes.node,
    onUpdate: PropTypes.func,
    openByClickOn: PropTypes.func
  }

  static defaultProps = {
    onOpen() {},
    onClose() {},
    onUpdate() {}
  }

  constructor(props) {
    super(props)
    this.state = {
      active: false
    }
  }

  openPortal(props = this.props) {
    this.setState({ active: true })
    this.renderPortal(props)
    this.props.onOpen(this.node)
  }

  closePortal(isUnmounted = false) {
    const resetPortalState = () => {
      if (this.node) {
        ReactDOM.unmountComponentAtNode(this.node)
        document.body.removeChild(this.node)
      }
      this.portal = null
      this.node = null
      if (isUnmounted !== true) {
        this.setState({ active: false })
      }
    }

    if (this.state.active) {
      if (this.props.beforeClose) {
        this.props.beforeClose(this.node, resetPortalState)
      } else {
        resetPortalState()
      }
      this.props.onClose()
    }
  }

  renderPortal(props) {
    console.log(123, props)

    if (!this.node) {
      this.node = document.createElement('div')
      this.applyClassNameAndStyle(props)
      document.body.appendChild(this.node)
    } else {
      this.applyClassNameAndStyle(props)
    }

    let children = props.children
    if (typeof props.children.type === 'function') {
      children = React.cloneElement(props.children, {
        closePortal: this.closePortal
      })
    }

    this.portal = ReactDOM.unstable_renderSubtreeIntoContainer(
      this,
      children,
      this.node,
      this.props.onUpdate
    )
  }

  render() {
    if (this.props.openByClickOn) {
      return React.cloneElement(this.props.openByClickOn, {
        onClick: this.handleWrapperClick
      })
    }
    return null
  }
}
