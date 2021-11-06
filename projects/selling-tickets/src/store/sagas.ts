import { call, put, takeLatest } from 'redux-saga/effects';
import { ArrCardsActionType, ARR_CARDS_ACTION, getArrCardsSuccess } from './actions';
import { api, TestResponse } from '../api/api';

function* fetchTest(action: ArrCardsActionType) {
  try {
    const data: TestResponse = yield call(api.test);
    console.log(data);
    
    yield put(getArrCardsSuccess());
  } catch (e) {
    console.error(e);
    // yield put({type: "USER_FETCH_FAILED", message: e.message});
  }
}

function* testSaga() {
  yield takeLatest(ARR_CARDS_ACTION, fetchTest);
}

export default testSaga;
