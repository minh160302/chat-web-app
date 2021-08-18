import { call, put, takeLatest, takeEvery, all } from "redux-saga/effects";
import { USER } from "../root/constants";
import { SUCCESS, FAILURE } from "store/utils/async_types";
import { findUserService } from "store/service/user";

function* findUser(action) {
  try {
    const conversation = yield call(findUserService, action.payload);
    yield put({
      type: SUCCESS(USER.findUser),
      payload: conversation,
    });
  } catch (error) {
    yield put({
      type: FAILURE(USER.findUser),
      payload: error,
    });
  }
}

export function* watchUserSaga() {
  yield takeEvery(USER.findUser, findUser);
}

function* UserWatcher() {
  yield all([watchUserSaga()]);
}

export default UserWatcher;
