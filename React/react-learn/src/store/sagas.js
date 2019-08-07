import { call, put, takeEvery } from 'redux-saga/effects'

const UserService = {
  login(uname) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (uname === 'ht') {
          resolve({ id: 1, name: 'ht', age: 18 })
        } else {
          resolve('用户名密码错误')
        }
      }, 1000)
    })
  }
}

// worker saga
function* login(action) {
  try {
    yield put({
      type: 'requestLogin'
    })
    const result = yield call(UserService.login, action.uname)
    yield put({ type: 'loginSuccess', result })
  } catch (error) {
    yield put({ type: 'loginFailure', payload: error })
  }
}

// watcher saga
function* mySagas() {
  yield takeEvery('login', login)
}

export default mySagas
