import React from 'react'
import PropTypes from 'prop-types'
import WebpImage from '../WebpImage'
import styles from './styles.scss'
import isEqual from 'lodash/isEqual'
import { getImgParam } from '~/common/utils'

const computWebpSize = size => {
  size = size + ''
  if (/(rem)$/.test(size)) {
    size = Number(size.replace(/(rem)$/, '')) * 100
  } else if (/(px)$/.test(size)) {
    size = Number(size.replace(/(px)$/, ''))
  }
  return Number(size)
}

const ImageFail =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGIAAABECAMAAABNjhAXAAAAOVBMVEVHcEz///////////////////////////////////////////////////////////////////////99PJZNAAAAEnRSTlMAhyR6uAhD7hf43wPSnzNjzFPpeqORAAAB5ElEQVRYw9WZ247DIAxES4CYS67+/4/d3WrVBgIxBFOp89Yo6UkNM8bq4/E98qNQDhCcEqPvATAC8C0QhhugpcVQVmpWwjDhWdPASBgBU4KRj2AxLcvFGABzAp5a6QnzmljWXAbfqYxRx8+Sww/hQvzawQTLweAPEVbm71JwQbSnBhAIaM6SEQkEjsx1SiCaK6VIhGpFOBLhWhFAIqAVgSQCv+BXfGAt4h0VBwjDjop9Eccggy9GpES6e1/rMurclaiMMmCXqkqdCiUKVtOZnv3Cr88X8xVdL0ZQXe+/8cuK3h0ViurdfivaFC0nEFl45/1z1PJ+ctNdToNBjeceZ1ofbvi1w8k8SgbKgfXzhddxSjv6mcopaT6VVjEPV3ti+SQrwUDPaSHZy1inhafWjFszDjRzdQ3zoTPnvF3J8Crfw84O1HOJNS8bwLUD/eLK7J9Lv4RCB2rxutnu5WWartv90YHL8d5yhqAOLa+V9VH0FfrGX5fp2AMHdc+bp/TLOnBN7GxYbqVf2oEm4//lVvqlHLjnzEkyDGCjLJVjCtvlhjvpV8kwt45cVZpM1zJdMySyKd1X/GCxM0NvyCmlb6RfM2Ox2JmhJ2TX7OvTr5pRNzy3Mgz0QRwG4hmxN6PL/xkf1g/wE8A08DW7fgAAAABJRU5ErkJggg=='

const LoadStatus = {
  notLoad: 0, // 未加载
  loadSuccess: 1, // 加载成功
  loadFail: 2 // 加载失败
}

export default class LazyImage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      src: '', // 图片链接
      loadStatus: LoadStatus.notLoad // 图片加载状态 0-未加载 1-加载成功 2-加载失败
    }
    this.io = null
    this.imgBox = React.createRef()
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.closeLazy) {
      return {
        src: nextProps.src
      }
    }
    return null
  }

  componentDidMount() {
    if (!this.props.closeLazy && typeof IntersectionObserver === 'function') {
      this.registerOb()
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      !isEqual(nextState, this.state) ||
      this.props.width !== nextProps.width ||
      this.props.height !== nextProps.height ||
      this.props.closeLazy !== nextProps.closeLazy
    )
  }

  /**
   * 注册滚动停止曝光监听
   */
  registerOb = () => {
    const options = {
      rootMargin: '100% 0px 100%'
    }
    this.io = new IntersectionObserver(this.isIntersectingFn, options)
    this.io.observe(this.imgBox.current)
  }

  /**
   * 判断在3屏内组件，获取组件详情
   */
  isIntersectingFn = entries => {
    if (entries[0].isIntersecting) {
      this.setState({
        src: this.props.src
      })
      this.io.unobserve(this.imgBox.current)
    }
  }

  /**
   * 图片宽高推导
   * 1. 有宽高直接返回宽高
   * 2. 只有有宽则推导出高（图片返回了宽高信息），没有宽则使用3.6rem
   * 3. 只有高则推导出宽（图片返回了宽高信息）
   * 4. 宽高都没有就设置为width=3.6rem，height=100
   */
  getWidthAndHeight = () => {
    const { width, height } = this.props
    let src_width, src_height
    // 1 有宽高直接返回宽高
    if (width && height) {
      return { width, height }
    }
    let real_width = '3.6rem'
    let real_height = 100
    src_width = getImgParam('width', this.props.src)
    src_height = getImgParam('height', this.props.src)
    if (src_width && src_height) {
      // 2 只有有宽则推导出高（图片返回了宽高信息），没有宽则使用3.6rem
      if (width || !height) {
        real_width = width || real_width
        const real_width_number = parseFloat(real_width + '')
        const real_height_number =
          (real_width_number * Number(src_height)) / Number(src_width)
        const length = real_width_number.toString().length
        const unit = (real_width + '').substring(length)
        return {
          width: real_width,
          height: unit ? `${real_height_number}${unit}` : real_height_number
        }
      } else if (height) {
        // 3. 只有高则推导出宽（图片返回了宽高信息）
        const real_height_number = parseFloat(height + '')
        const real_width_number =
          (real_height_number * Number(src_width)) / Number(src_height)
        const length = real_height_number.toString().length
        const unit = (height + '').substring(length)
        return {
          width: unit ? `${real_width_number}${unit}` : real_width_number,
          height
        }
      }
    }
    // 4. 宽高都没有就设置为width=3.6rem，height=100
    return {
      width: real_width,
      height: real_height
    }
  }

  handleLoad = e => {
    this.setState({
      loadStatus: LoadStatus.loadSuccess
    })
    const { onLoad } = this.props
    onLoad && onLoad(e, LoadStatus.loadSuccess)
  }

  handleError = e => {
    if (this.state.src) {
      this.setState({
        loadStatus: LoadStatus.loadFail
      })
      const { onLoad } = this.props
      onLoad && onLoad(e, LoadStatus.loadFail)
    }
  }

  render() {
    const { loadStatus, src } = this.state
    const { onClick } = this.props
    const { width, height } = this.getWidthAndHeight()
    const webpWidth = computWebpSize(width)
    const webpHeight = computWebpSize(height)
    // 根据loadStatus来判断图片显示内容
    return (
      <div ref={this.imgBox}>
        {loadStatus === LoadStatus.notLoad ? (
          <div
            className={styles.notLoad}
            style={{
              width: width,
              height: height
            }}
          />
        ) : null}
        <WebpImage
          source={src}
          onClick={onClick}
          onError={this.handleError}
          onLoad={this.handleLoad}
          alt=""
          width={webpWidth}
          height={webpHeight}
          style={{
            height: loadStatus === LoadStatus.loadSuccess ? height : '0px',
            width: width,
            transition: 'opacity ease 500ms',
            opacity: loadStatus === LoadStatus.loadSuccess ? 1 : 0
          }}
        />
        {loadStatus === LoadStatus.loadFail ? (
          <div className={styles.loadFail}>
            <img src={ImageFail} onClick={onClick} alt="" />
          </div>
        ) : null}
      </div>
    )
  }
}

LazyImage.propTypes = {
  src: PropTypes.string.isRequired, // img地址
  width: PropTypes.number, // 图片宽度 单位需带上rem
  height: PropTypes.number, // 图片高度 单位需带上rem
  onClick: PropTypes.func, // 点击事件
  onLoad: PropTypes.func, // 图片加载完成
  // previewType?: "product" | "image"; // 图片或者商品类型的预览图也许会不一样
  closeLazy: PropTypes.bool // 关闭懒加载
}
