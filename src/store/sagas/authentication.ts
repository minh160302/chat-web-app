import { call, put, takeLatest, takeEvery, all } from "redux-saga/effects";
import { AUTH } from "../root/constants";
import { SUCCESS, FAILURE } from "store/utils/async_types";
import { registerService, verifyJwtToken, getCurrentUserInfoService } from "store/service/authentication";

function* sendAuthenticationInfo(action: any) {
  try {
    let newData = {};
    if (action.payload.type == "register") {
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

function* verifyAuthToken() {
  try {
    let newData = false;
    newData = yield call(verifyJwtToken);

    yield put({
      type: SUCCESS(AUTH.verifyAuthToken),
      payload: newData,
    });
  } catch (error) {
    yield put({
      type: FAILURE(AUTH.verifyAuthToken),
      payload: error,
    });
  }
}

function* reloadWithToken() {
  if (window.localStorage.getItem("AUTH_TOKEN_KEY")) {
    yield put({
      type: SUCCESS(AUTH.reloadWithToken),
      payload: true,
    });
  } else {
    yield put({
      type: SUCCESS(AUTH.reloadWithToken),
      payload: false,
    });
  }
}

function* getCurrentUserInfo() {
  if (window.localStorage.getItem("AUTH_TOKEN_KEY")) {
    const token = window.localStorage.getItem("AUTH_TOKEN_KEY")
    const currentUserInfo = yield call(getCurrentUserInfoService, token)

    yield put({
      type: SUCCESS(AUTH.getCurrentUserInfo),
      payload: currentUserInfo,
    });
  } else {
    yield put({
      type: FAILURE(AUTH.getCurrentUserInfo),
      payload: "Error JWT Signature",
    });
  }
}

export function* watchAuthentication() {
  yield takeEvery(AUTH.sendRegisterInfo, sendAuthenticationInfo);
  yield takeEvery(AUTH.verifyAuthToken, verifyAuthToken);
  yield takeEvery(AUTH.reloadWithToken, reloadWithToken);
  yield takeEvery(AUTH.getCurrentUserInfo, getCurrentUserInfo);
}

function* AuthenticationWatcher() {
  yield all([watchAuthentication()]);
}

export default AuthenticationWatcher;
