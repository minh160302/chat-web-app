import { AUTH } from "store/root/constants";

export const sendRegisterInfo = (request: object) => {
  return {
    type: AUTH.sendRegisterInfo,
    payload: request,
  };
};
