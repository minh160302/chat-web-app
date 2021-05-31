import { combineReducers } from "redux";
import overview, { OverviewState } from "./overview";
import message, { MessageState } from "./message";
import authentication, { AuthenticationState } from "./authentication";

export interface IRootState {
  readonly overview: OverviewState;
  readonly message: MessageState;
  readonly authentication: AuthenticationState
}

const rootReducers = combineReducers<IRootState>({
  overview,
  message,
  authentication
});

export default rootReducers;
