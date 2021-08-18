import { CONVERSATION } from "../root/constants";
import { REQUEST, FAILURE, SUCCESS } from "../utils/async_types";

const initialState = {
  errorMessage: "",
  all: [],
  loading: false,
  conversation: {},
  success: false,
};

export type ConversationState = Readonly<typeof initialState>;

export default (state: ConversationState = initialState, action): ConversationState => {
  switch (action.type) {
    case CONVERSATION.clearMessage:
      return {
        ...state,
        loading: false,
        errorMessage: "",
        success: false,
      }
    case REQUEST(CONVERSATION.createConversation):
    case REQUEST(CONVERSATION.getConversationsByType):
      return {
        ...state,
        loading: true,
      };
    case FAILURE(CONVERSATION.createConversation):
      return {
        ...state,
        loading: true,
        errorMessage: action.payload.data.error,
        success: false
      };
    case FAILURE(CONVERSATION.getConversationsByType):
      return {
        ...state,
        loading: true,
        errorMessage: "error",
        success: false
      };
    case SUCCESS(CONVERSATION.createConversation):
      return {
        ...state,
        loading: false,
        errorMessage: "",
        conversation: action.payload.data,
        success: true
      };
    case SUCCESS(CONVERSATION.getConversationsByType):
      return {
        ...state,
        loading: false,
        errorMessage: "",
        conversation: action.payload.data,
        success: true
      };
    default:
      return state;
  }
};
