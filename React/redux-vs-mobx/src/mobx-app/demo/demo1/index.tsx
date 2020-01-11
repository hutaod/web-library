import React, { Component } from 'react'
import { observable, decorate } from 'mobx'
import { observer } from 'mobx-react'

// class AppState {
//   @observable timer = 0
// }

// 以上代码也可以写为，

class AppState {
  timer = 0
}

decorate(AppState, {
  timer: observable,
})

const appState = new AppState()

type IProps = {
  appState: {
    timer: number
  }
}

@observer
class Demo1 extends Component<IProps> {
  componentDidMount() {
    setInterval(() => {
      // 注意了，这里直接改变了props的值，
      this.props.appState.timer = this.props.appState.timer + 1
    }, 2000)
  }
  render() {
    const { appState } = this.props
    return (
      <div>
        <h2>Demo1</h2>
        <div>{appState.timer}</div>
      </div>
    )
  }
}

export default <Demo1 appState={appState} />
