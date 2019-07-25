import React, { Component } from 'react'

const FancyButton = React.forwardRef((props, ref) => (
  <button ref={ref}>{props.children}</button>
))

export default class ForwardRef extends Component {
  constructor() {
    super()
    this.ref = React.createRef()
  }
  componentDidMount() {
    console.log(this.ref)
  }
  render() {
    return <FancyButton ref={this.ref}>Click me!</FancyButton>
  }
}
