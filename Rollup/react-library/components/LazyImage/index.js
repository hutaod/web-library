import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import ImageFail from './image/img-fail.png'

export default class LazyImage extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    src: PropTypes.string,
    onClick: PropTypes.func,
    error: PropTypes.string
  }

  static defaultProps = {
    className: '',
    // width: "auto",
    // height: "auto",
    error: '',
    onClick: function() {}
  }

  constructor(props) {
    super(props)

    this.state = {
      src: this.props.src,
      isFail: false
    }
  }

  onError = () => {
    const { error } = this.props
    if (!error) {
      this.setState({
        src: ImageFail,
        isFail: true
      })
    } else {
      this.setState({
        src: error
      })
    }
  }

  render() {
    const { width, height, onClick, className } = this.props
    const { src, isFail } = this.state

    const ImageHtml = isFail ? (
      <div
        className={classNames('al-load-fail', className)}
        style={{ width, height }}
      >
        <img src={ImageFail} onClick={onClick} onError={this.onError} />
      </div>
    ) : (
      <img
        className={className}
        src={src}
        onClick={onClick}
        style={{ width, height }}
        onError={this.onError}
      />
    )

    return ImageHtml
  }
}
