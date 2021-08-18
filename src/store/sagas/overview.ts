import { call, put, takeLatest, takeEvery, all } from "redux-saga/effects";
import { OVERVIEW } from "../root/constants";
import { SUCCESS, FAILURE } from "store/utils/async_types";

const fetchUserApi = (payload) => {
  return payload + 1000;
};

// saga function
function* getOverview(action) {
  try {
    const newData = yield call(fetchUserApi, action.payload);
    console.log(newData);
    yield put({
      type: SUCCESS(OVERVIEW.getOverview),
      payload: newData,
    });
  } catch (error) {
    yield put({
      type: FAILURE(OVERVIEW.getOverview),
      payload: error,
    });
  }
}

export function* watchGetOverview() {
  yield takeLatest(OVERVIEW.getOverview, getOverview);
}

function* OverviewWatcher() {
  yield all([watchGetOverview()]);
}

export default OverviewWatcher;
