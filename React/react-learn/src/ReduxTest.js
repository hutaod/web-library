import React, { Component } from 'react'
import { connect } from 'react-redux'
import { add, addAsync, minus } from './store/counter'
// import store from './store'

// 参数1 mapStateToProps = state => ({ num: state })
// 参数2 mapDispatchToProps = dispatch => ({add: () => {dispatch({ type: 'add' })}})
// connect两个任务
// 1. 自动渲染
// 2. 映射到组件属性
@connect(
  state => ({ num: state.counter }),
  {
    add,
    minus,
    addAsync
  }
)
class ReduxTest extends Component {
  // componentDidMount() {
  //   this.unsubscribe = store.subscribe(() => {
  //     console.log(234)
  //     this.unsubscribe()
  //   })
  // }
  render() {
    return (
      <div>
        {/* {store.getState()} */}
        {this.props.num}
        <div>
          <button
            onClick={() => {
              // store.dispatch({
              //   type: 'add'
              // })
              this.props.add(2)
            }}
          >
            +
          </button>
          <button
            onClick={() => {
              // store.dispatch({
              //   type: 'minus'
              // })
              // this.props.dispatch({
              //   type: 'minus'
              // })
              this.props.minus()
            }}
          >
            -
          </button>
          <button
            onClick={() => {
              // store.dispatch({
              //   type: 'minus'
              // })
              // this.props.dispatch({
              //   type: 'minus'
              // })
              this.props.addAsync(3)
            }}
          >
            addAsync
          </button>
        </div>
      </div>
    )
  }
}

export default ReduxTest
