import { call, put, takeEvery } from 'redux-saga'

const UserService = {
  login() {
    return
  }
}

// worker saga
function* login(action) {
  try {
    yield put({
      type: 'requestLogin'
    })
    const result = yield call(UserService.login, action.uname)
    yield put({ type: 'loginSucess', result })
  } catch (error) {
    yield put({ type: 'loginFailure', payload: error })
  }
}

// watcher saga
function* mySagas() {
  yield takeEvery('login', login)
}

export default mySagas
