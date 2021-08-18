import { CONVERSATION } from "store/root/constants";

export const createConversation = (request: object) => {
  return {
    type: CONVERSATION.createConversation,
    payload: request,
  };
};

export const clearMessage = () => {
  return {
    type: CONVERSATION.clearMessage,
  };
};

export const getConversationsByType = (request: string) => {
  return {
    type: CONVERSATION.getConversationsByType,
    payload: request
  };
};

