import React, { Component } from 'react'
import PropTypes from 'prop-types'

class TabPane extends Component {
  static propTypes = {
    tab: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
    order: PropTypes.string.isRequired,
    disabled: PropTypes.bool
  }

  render() {
    return <div></div>
  }
}

export default TabPane
