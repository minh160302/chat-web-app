import { call, put, takeLatest, takeEvery, all } from "redux-saga/effects";
import { CONVERSATION } from "../root/constants";
import { SUCCESS, FAILURE } from "store/utils/async_types";
import { createConversationService, getConversationsByTypeService } from "store/service/conversation";


function* createConversation(action) {
  try {
    const conversation = yield call(createConversationService, action.payload);
    if (conversation.data.error) {
      yield put({
        type: FAILURE(CONVERSATION.createConversation),
        payload: conversation,
      });
    } else {
      yield put({
        type: SUCCESS(CONVERSATION.createConversation),
        payload: conversation,
      });
    }
  } catch (error) {
    yield put({
      type: FAILURE(CONVERSATION.createConversation),
      payload: error,
    });
  }
}

function* getConversationsByType(action) {
  try {
    const conversations = yield call(getConversationsByTypeService, action.payload);
    yield put({
      type: SUCCESS(CONVERSATION.getConversationsByType),
      payload: conversations,
    });
  } catch (error) {
    yield put({
      type: FAILURE(CONVERSATION.getConversationsByType),
      payload: error,
    });
  }
}

export function* watchConversationSaga() {
  yield takeEvery(CONVERSATION.createConversation, createConversation);
  yield takeEvery(CONVERSATION.getConversationsByType, getConversationsByType);
}

function* ConversationWatcher() {
  yield all([watchConversationSaga()]);
}

export default ConversationWatcher;
