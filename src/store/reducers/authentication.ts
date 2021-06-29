import { AUTH } from "../root/constants";
import { REQUEST, FAILURE, SUCCESS } from "../utils/async_types";

const initialState = {
  register: {},
  loading: false,
  errorMessage: null,
  isAuthenticated: false,
  currentUser: {}
};

export type AuthenticationState = Readonly<typeof initialState>;

export default (state: AuthenticationState = initialState, action): AuthenticationState => {
  switch (action.type) {
    case REQUEST(AUTH.sendRegisterInfo):
    case REQUEST(AUTH.verifyAuthToken):
    case REQUEST(AUTH.reloadWithToken):
    case REQUEST(AUTH.getCurrentUserInfo):
      return {
        ...state,
        loading: true,
      };
    case FAILURE(AUTH.sendRegisterInfo):
    case FAILURE(AUTH.verifyAuthToken):
    case FAILURE(AUTH.reloadWithToken):
    case FAILURE(AUTH.getCurrentUserInfo):
      return {
        ...state,
        loading: true,
        errorMessage: action.payload,
      };
    case SUCCESS(AUTH.sendRegisterInfo):
      return {
        ...state,
        register: action.payload,
      };
    case SUCCESS(AUTH.verifyAuthToken):
      return {
        ...state,
        isAuthenticated: action.payload,
      };
    case SUCCESS(AUTH.reloadWithToken):
      return {
        ...state,
        isAuthenticated: action.payload,
      };
    case SUCCESS(AUTH.getCurrentUserInfo):
      return {
        ...state,
        currentUser: action.payload,
      };

    default:
      return state;
  }
};
