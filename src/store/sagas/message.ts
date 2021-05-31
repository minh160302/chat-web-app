import { call, put, takeLatest, takeEvery, all } from "redux-saga/effects";
import { MESSAGE } from "../root/constants";
import { SUCCESS, FAILURE } from "store/utils/async_types";
import { sendMessageService } from "../service/message";


function* sendMessage(action) {
  try {
    const newData = yield call(sendMessageService, action.payload);
    console.log(newData);
    yield put({
      type: SUCCESS(MESSAGE.sendMessage),
      payload: newData,
    });
  } catch (error) {
    yield put({
      type: FAILURE(MESSAGE.sendMessage),
      payload: error,
    });
  }
}

export function* watchSendMessage() {
  yield takeEvery(MESSAGE.sendMessage, sendMessage);
}

function* MessageWatcher() {
  yield all([watchSendMessage()]);
}

export default MessageWatcher;
