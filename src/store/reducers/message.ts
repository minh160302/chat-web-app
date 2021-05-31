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
    case REQUEST(MESSAGE.sendMessage):
      return {
        ...state,
        loading: true,
      };
    case FAILURE(MESSAGE.sendMessage):
      return {
        ...state,
        loading: true,
        errorMessage: action.payload,
      };
    case SUCCESS(MESSAGE.sendMessage):
      console.log(action.payload);
      
      return {
        ...state,
        message: action.payload,
        all: [...state.all, action.payload],
      };

    default:
      return state;
  }
};
