import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'

const Api = {
  fetchUser() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          name: '哈哈',
          age: 22
        })
      }, 1000)
    })
  }
}

function* fetchUser(action) {
  try {
    console.log('fetchUser')
    const user = yield call(Api.fetchUser, action.payload.userId)
    yield put({ type: 'global/increment', user: user })
  } catch (e) {
    yield put({ type: 'USER_FETCH_FAILED', message: e.message })
  }
}

function* mySaga() {
  console.log('mySaga')

  yield takeEvery('USER_FETCH_REQUESTED', fetchUser)
  console.log('mySagaEnd')
}

export default mySaga
