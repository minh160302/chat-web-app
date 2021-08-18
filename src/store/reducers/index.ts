import { combineReducers } from "redux";
import overview, { OverviewState } from "./overview";
import message, { MessageState } from "./message";
import authentication, { AuthenticationState } from "./authentication";
import user, { UserState } from "./user";
import conversation, { ConversationState } from "./conversation";

export interface IRootState {
  readonly overview: OverviewState;
  readonly message: MessageState;
  readonly authentication: AuthenticationState;
  readonly user: UserState;
  readonly conversation: ConversationState;
}

const rootReducers = combineReducers<IRootState>({
  overview,
  message,
  authentication,
  user,
  conversation,
});

export default rootReducers;
