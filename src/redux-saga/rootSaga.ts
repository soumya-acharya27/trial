import {all, fork} from 'redux-saga/effects';
// import authSaga from './demo/authSaga';

// Redux Saga: Root Saga
export default function* rootSaga() {
  yield all([
    // fork(demoSaga),
  ]);
}
