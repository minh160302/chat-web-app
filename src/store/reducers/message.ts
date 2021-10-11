import { MESSAGE } from "../root/constants";
import { REQUEST, FAILURE, SUCCESS } from "../utils/async_types";

const initialState = {
  message: {},
  all: [],
  loading: false,
  errorMessage: null,
};

export type MessageState = Readonly<typeof initialState>;

export default (state: MessageState = initialState, action): MessageState => {
  switch (action.type) {
    case REQUEST(MESSAGE.fetchMessages):
    case REQUEST(MESSAGE.fetchMessagesByConversationId):
      return {
        ...state,
        loading: true,
      };
    case FAILURE(MESSAGE.fetchMessages):
    case FAILURE(MESSAGE.fetchMessagesByConversationId):
      return {
        ...state,
        loading: true,
        errorMessage: action.payload,
      };
    case SUCCESS(MESSAGE.fetchMessages):
      return {
        ...state,
        all: action.payload.messages,
      };
    case SUCCESS(MESSAGE.fetchMessagesByConversationId):
      return {
        ...state,
        all: action.payload.data.data.messages,
      };

    default:
      return state;
  }
};
