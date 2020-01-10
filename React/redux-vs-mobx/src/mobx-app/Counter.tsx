import React from 'react'
import { Button } from 'antd'
import { observer, inject } from 'mobx-react'
import { observable, autorun } from 'mobx'
import { TUseInfo } from './store/userStore'

function observableFn(target: any, name?: any, descriptor?: any) {
  // target
  // console.log(target, name, descriptor)
  // // if() {

  // // }
  // // extendObservable(target, {
  // //   [name]: 2
  // // })
  // const newDescriptor = {
  //   ...descriptor,
  //   value: 2
  // }
  // Object.defineProperty(target, name, newDescriptor)
  // descriptor.value.count = 12
  console.log(descriptor.value)

  return descriptor
}

class Counter {
  @observable count = 0
  @observableFn test() {}
  @observableFn a = []
}
/**
 * 以上代码类似于：
 * class Counter {
 *   count = 0
 * }
 * decorate(Counter, {
 *  count: observable
 * })
 */

export const store = new Counter()
console.log('store', store, store.test)

autorun(function() {
  console.log(2)
  console.log('Counter now is %d ', store.count)
})

// setInterval(() => {
//   store.count += 1
// }, 1000)

type IProps = {
  count: number
  userInfo?: any
  userStore?: {
    userInfo: TUseInfo
  }
}

type IExtrasProps = {
  count?: number
  userInfo?: any
  userStore?: {
    userInfo: TUseInfo
  }
}

const CounterView = (props: IProps) => {
  const { count, userStore } = props
  const { userInfo } = userStore!
  console.log(123, userInfo)
  return (
    <div>
      <Button
        onClick={() => {
          store.count += 1
        }}
      >
        Add
      </Button>
      <div>count: {count}</div>
      <UserInfo userInfo={userInfo} />
      {/* <div>{userInfo.name}</div> */}
    </div>
  )
}

const UserInfo = observer(({ userInfo }) => <div>{userInfo.name}</div>)

// type IUserProps = {
//   userStore?: {
//     userInfo: object
//   }
// }

// @observer
// class UserInfo extends React.Component<IUserProps> {
//   render() {
//     const { userStore } = this.props
//     const { userInfo } = userStore!
//     console.log(123, userInfo)
//     return <div>123</div>
//   }
// }

@inject('userStore')
@observer
class CountComp extends React.Component<IExtrasProps> {
  render() {
    return <CounterView count={store.count} {...this.props} />
  }
}

export default CountComp
