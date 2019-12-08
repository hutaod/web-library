import React from 'react'
import classnames from 'classnames'
import styles from './index.module.less'

export default function(props) {
  return (
    <button
      className={classnames(styles.large, styles.bold)}
      style={{ color: props.color }}
    >
      {props.children}
    </button>
  )
}
