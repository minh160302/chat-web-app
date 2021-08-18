import { USER } from "store/root/constants";

export const findUser = (request: object) => {
  return {
    type: USER.findUser,
    payload: request,
  };
};

