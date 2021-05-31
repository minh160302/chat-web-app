import { OVERVIEW } from "store/root/constants";

export const getOverview = (request: number) => {
  return {
    type: OVERVIEW.getOverview,
    payload: request,
  };
};

