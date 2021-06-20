import { AUTH } from "../root/constants";
import { REQUEST, FAILURE, SUCCESS } from "../utils/async_types";

const initialState = {
  register: {},
  loading: false,
  errorMessage: null,
  isAuthenticated: false,
};

export type AuthenticationState = Readonly<typeof initialState>;

export default (state: AuthenticationState = initialState, action): AuthenticationState => {
  switch (action.type) {
    case REQUEST(AUTH.sendRegisterInfo):
    case REQUEST(AUTH.verifyAuthToken):
    case REQUEST(AUTH.reloadWithToken):
      return {
        ...state,
        loading: true,
      };
    case FAILURE(AUTH.sendRegisterInfo):
    case FAILURE(AUTH.verifyAuthToken):
    case FAILURE(AUTH.reloadWithToken):
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
    case SUCCESS(AUTH.verifyAuthToken):
      console.log(action.payload);
      return {
        ...state,
        isAuthenticated: action.payload,
      };
    case SUCCESS(AUTH.reloadWithToken):
      console.log(action.payload);
      return {
        ...state,
        isAuthenticated: action.payload,
      };

    default:
      return state;
  }
};
