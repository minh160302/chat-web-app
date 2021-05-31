import { call, put, takeLatest, takeEvery, all } from "redux-saga/effects";
import { AUTH } from "../root/constants";
import { SUCCESS, FAILURE } from "store/utils/async_types";
import { registerService } from 'store/service/authentication';

function* sendAuthenticationInfo(action) {
  try {
    let newData = {}
    if (action.payload.type == "register"){
      newData = yield call(registerService, action.payload);
    }
    yield put({
      type: SUCCESS(AUTH.sendRegisterInfo),
      payload: newData,
    });
  } catch (error) {
    yield put({
      type: FAILURE(AUTH.sendRegisterInfo),
      payload: error,
    });
  }
}

export function* watchAuthentication() {
  yield takeEvery(AUTH.sendRegisterInfo, sendAuthenticationInfo);
}

function* AuthenticationWatcher() {
  yield all([watchAuthentication()]);
}

export default AuthenticationWatcher;
