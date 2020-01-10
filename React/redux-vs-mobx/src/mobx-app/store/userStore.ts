import { observable, autorun } from 'mobx'

export type TUseInfo = {
  name: string
}

class UserStore {
  // 装饰器写法
  @observable userInfo: TUseInfo = { name: 'heihei' }
}

const userStore = new UserStore()

autorun(function listen() {
  console.log(userStore.userInfo)
})

setTimeout(() => {
  userStore.userInfo = { name: 'haha' }
}, 2000)

export default userStore
