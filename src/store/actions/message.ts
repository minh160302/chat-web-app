import { MESSAGE } from "store/root/constants";

export const sendMessage = (request: object) => {
  return {
    type: MESSAGE.sendMessage,
    payload: request,
  };
};

