// import {AxiosResponse} from 'axios';
// import {put, call, throttle} from 'redux-saga/effects';
// import { DemoActions, getDemoApiFailure, getDemoApiSuccess } from './authAction';
// import { DEMO_API_REQUEST } from './demoConstants';
// import { getDemoApi } from './demoApi';


// function* getDemoApiSaga(action: DemoActions) {
//   try {
//     const response: AxiosResponse = yield call(getDemoApi)
//     if(response.status === 200){
//         yield put(getDemoApiSuccess(response.data))
//     }
//     yield put(getDemoApiFailure())
//   } catch (err) {
//     yield put(getDemoApiFailure())
//   }
// }


// export default function* demoSaga() {
//   yield throttle(3000, DEMO_API_REQUEST, getDemoApiSaga);
// }
