import React, { Component } from 'react'
import { observable, configure, action, runInAction, flow } from 'mobx'
import { observer } from 'mobx-react'
import { Button } from 'antd'

// function actionFN(target: any, name?: any, descriptor?: any, arg4?: any) {
//   // target
//   // console.log(target, name, descriptor)
//   // // if() {

//   // // }
//   // // extendObservable(target, {
//   // //   [name]: 2
//   // // })
//   // const newDescriptor = {
//   //   ...descriptor,
//   //   value: 2
//   // }
//   // Object.defineProperty(target, name, newDescriptor)
//   // descriptor.value.count = 12
//   console.log('target', target)
//   console.log('name', name)
//   const { initializer } = descriptor
//   descriptor.initializer = function() {
//     console.log(223)
//     return () => {
//       console.log(123)

//       return initializer.call(this)
//     }
//   }
//   return descriptor
// }

// configure({
//   enforceActions: 'observed',
// })
class AppState {
  @observable timer = 0
  @action changeTimer = (num?: number) => {
    this.timer += num || 1
  }
  // @action asyncChangeTimer = (num?: number) => {
  //   setTimeout(() => {
  //     // 直接改变也会报错，必须再次调用一个action方法来改变
  //     // this.timer += num || 2 // 会报错
  //     // 需要调用同步的action方法进行改变state，这里有两种方式
  //     // 1. 调用已有action
  //     // this.changeTimer(num)
  //     // 2. 可以直接用action包裹，action 第一个字符串是可选参数参数
  //     // action('actionAsyncChangeTimer', () => {
  //     //   this.timer += num || 2
  //     // })
  //     // 或
  //     // action(() => {
  //     //   this.timer += num || 2
  //     // })
  //     // 3. 可以直接用runInAction包裹
  //     runInAction(() => {
  //       this.timer += num || 2
  //     })
  //   }, 1000)
  // }
  @action asyncChangeTimer = async (num?: number) => {
    const addNum = await new Promise<number>(resolve => {
      setTimeout(() => {
        resolve(num)
      }, 1000)
    })
    this.changeTimer(addNum)
  }
  // asyncChangeTimer = flow(function*(num?: number) {
  //   const addNum = yield new Promise<number>(resolve => {
  //     setTimeout(() => {
  //       resolve(num)
  //     }, 1000)
  //   })
  //   this.changeTimer(addNum)
  // })

  // @actionFN hello = () => {}
  // @actionFN hello = () => {
  //   this.timer += 1
  // }
}

const appState = new AppState()
// console.log('appState.hello', appState.hello)

type IProps = {
  appState: {
    timer: number
    changeTimer: Function
    asyncChangeTimer: Function
  }
}

@observer
class Demo2 extends Component<IProps> {
  render() {
    console.log('render')
    const { appState } = this.props
    return (
      <div>
        <h2>Demo2</h2>
        <div>{appState.timer}</div>
        <Button
          onClick={() => {
            this.props.appState.changeTimer()
          }}
        >
          add
        </Button>
        <Button
          onClick={() => {
            this.props.appState.asyncChangeTimer(2)
          }}
        >
          async add
        </Button>
      </div>
    )
  }
}

export default <Demo2 appState={appState} />
