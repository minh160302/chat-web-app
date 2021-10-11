import { call, put, takeLatest, takeEvery, all } from "redux-saga/effects";
import { MESSAGE } from "../root/constants";
import { SUCCESS, FAILURE } from "store/utils/async_types";
import { fetchMessagesByConversationIdService } from "store/service/message";

function* fetchMessages(action) {
  try {
    yield put({
      type: SUCCESS(MESSAGE.fetchMessages),
      payload: action.payload
    })
  } catch (error) {
    yield put({
      type: FAILURE(MESSAGE.fetchMessages),
      payload: error,
    });
  }
}


function* getConversationById(action) {
  try {
    const conversation = yield call(fetchMessagesByConversationIdService, action.payload);
    yield put({
      type: SUCCESS(MESSAGE.fetchMessagesByConversationId),
      payload: conversation
    });
  } catch (error) {
    yield put({
      type: FAILURE(MESSAGE.fetchMessagesByConversationId),
      payload: error,
    });
  }
}


export function* watchSendMessage() {
  yield takeEvery(MESSAGE.fetchMessages, fetchMessages);
  yield takeEvery(MESSAGE.fetchMessagesByConversationId, getConversationById);
}

function* MessageWatcher() {
  yield all([watchSendMessage()]);
}

export default MessageWatcher;
