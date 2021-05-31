import { OVERVIEW } from "../root/constants";
import { REQUEST, FAILURE, SUCCESS } from "../utils/async_types";

const initialState = {
  overview: 0,
  loading: false,
  errorMessage: null,
};

export type OverviewState = Readonly<typeof initialState>;

export default (state: OverviewState = initialState, action): OverviewState => {
  switch (action.type) {
    case REQUEST(OVERVIEW.getOverview):
      return {
        ...state,
        loading: true,
      };
    case FAILURE(OVERVIEW.getOverview):
      return {
        ...state,
        loading: true,
        errorMessage: action.payload,
      };
    case SUCCESS(OVERVIEW.getOverview):
      console.log(action.payload);
      return {
        ...state,
        overview: action.payload,
      };

    default:
      return state;
  }
};
