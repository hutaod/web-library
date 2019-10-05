import React from 'react'
import LazyImage from '../components/LazyImage'

export default { title: '图片懒加载' }

export const lazyImage = () => (
  <div>
    <h3>测试</h3>
    <LazyImage width={200} height={300} src="123" />
  </div>
)
