import {
  delay,
  put,
  // takeEvery,
  takeLatest,
  all
} from "redux-saga/effects";

// 延时
// export const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

function* incrementAsync(action) {
  yield delay(1000);
  yield put({ type: "INCREMENT", payload: action.payload });
}

function* watchIncrementAsync() {
  yield takeLatest("INCREMENT_ASYNC", incrementAsync);
}

function* rootSaga() {
  yield all([watchIncrementAsync()]);
}

export default rootSaga;
