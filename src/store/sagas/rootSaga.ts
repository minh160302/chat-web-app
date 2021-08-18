import {
  all,
  fork,
} from "redux-saga/effects";

import OverviewWatcher from "./overview";
import MessageWatcher from "./message";
import AuthenticationWatcher from './authentication';
import ConversationWatcher from "./conversation";
import UserWatcher from "./user";

export default function* rootSaga() {
  yield all([
    fork(OverviewWatcher), 
    fork(MessageWatcher),
    fork(AuthenticationWatcher),
    fork(ConversationWatcher),
    fork(UserWatcher)
  ]);
}
