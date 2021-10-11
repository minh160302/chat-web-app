export const AUTH = {
  sendRegisterInfo: "auth/SEND_REGISTER_INFO",
  verifyAuthToken: "auth/VERIFY_AUTH_TOKEN",
  reloadWithToken: "auth/RELOAD_WITH_TOKEN",
  getCurrentUserInfo: "auth/GET_CURRENT_USER_INFO",
  logOut: "auth/LOG_OUT",
}


export const OVERVIEW = {
  getOverview: "overview/GET_OVERVIEW"
}

export const MESSAGE = {
  sendMessage: "message/SEND_MESSAGE",
  fetchMessages: "message/FETCH_MESSAGES",
  fetchMessagesByConversationId: "message/FETCH_MESSAGES_BY_CONVERSATION_ID"
}

export const CONVERSATION = {
  createConversation: "conversation/CREATE_CONVERSATION",
  clearMessage: "conversation/CLEAR_MESSAGE",
  getConversationsByType: "conversation/GET_CONVERSATIONS_BY_TYPE",
  getConversationById: "conversation/GET_CONVERSATION_BY_ID"
}

export const USER = {
  findUser: "user/FIND_USER",
}
