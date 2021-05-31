import {
  all,
  fork,
} from "redux-saga/effects";

import OverviewWatcher from "./overview";
import MessageWatcher from "./message";
import AuthenticationWatcher from './authentication';

export default function* rootSaga() {
  yield all([
    fork(OverviewWatcher), 
    fork(MessageWatcher),
    fork(AuthenticationWatcher),
  ]);
}
