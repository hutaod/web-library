import styles from './index.css'
import { connect } from 'dva'

export default connect(state => ({
  goods: state.goods.list
}))(function({ goods }) {
  console.log(goods)
  return (
    <div className={styles.normal}>
      <h1>Page index</h1>
    </div>
  )
})
