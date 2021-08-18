import { USER } from "../root/constants";
import { REQUEST, FAILURE, SUCCESS } from "../utils/async_types";

const initialState = {
  message: "",
  all: [],
  loading: false,
  user: {}
};

export type UserState = Readonly<typeof initialState>;

export default (state: UserState = initialState, action): UserState => {
  switch (action.type) {
    case REQUEST(USER.findUser):
      return {
        ...state,
        loading: true,
      };
    case FAILURE(USER.findUser):
      return {
        ...state,
        loading: true,
        message: action.payload
      };
    case SUCCESS(USER.findUser):
      if (action.payload.data !== null)
        return {
          ...state,
          loading: false,
          message: "",
          user: action.payload.data,
        };
      else
        return {
          ...state,
          loading: false,
          user: {},
          message: "Cannot found this user!",
        }
    default:
      return state;
  }
};
