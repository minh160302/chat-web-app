import { AUTH } from "../root/constants";
import { REQUEST, FAILURE, SUCCESS } from "../utils/async_types";

const initialState = {
  register: {},
  loading: false,
  errorMessage: null,
};

export type AuthenticationState = Readonly<typeof initialState>;

export default (state: AuthenticationState = initialState, action): AuthenticationState => {
  switch (action.type) {
    case REQUEST(AUTH.sendRegisterInfo):
      return {
        ...state,
        loading: true,
      };
    case FAILURE(AUTH.sendRegisterInfo):
      return {
        ...state,
        loading: true,
        errorMessage: action.payload,
      };
    case SUCCESS(AUTH.sendRegisterInfo):
      console.log(action.payload);
      return {
        ...state,
        register: action.payload,
      };

    default:
      return state;
  }
};
