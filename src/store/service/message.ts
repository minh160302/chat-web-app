import axios from "axios";

export const sendMessageService = (payload) => {
  try {
    // ws.send(JSON.stringify(payload))
    // console.log("service message", payload)
    return payload
  } catch (error) {
    console.log(error)
  }
  // return payload;
};

export const fetchMessagesByConversationIdService = async (payload) => {
  try {
    const res = await axios.get(`/conversation/${payload}`)
    return res;
  } catch (error) {
    console.log(error)
    return error;
  }
}