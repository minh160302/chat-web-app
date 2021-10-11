import { MESSAGE } from "store/root/constants";

export const fetchMessages = (request: any) => {
  return {
    type: MESSAGE.fetchMessages,
    payload: request,
  };
}

export const fetchMessagesByConversationId = (request: string) => {
  return {
    type: MESSAGE.fetchMessagesByConversationId,
    payload: request
  }
}