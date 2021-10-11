import axios from "axios";
import fetchAxios from "store/utils/fetchAxios";
import { SERVICE_CONFIG } from "../../utils/service-config"

export const createConversationService = async (payload: object) => {
  try {
    const res = await fetchAxios.onPost('/conversation', SERVICE_CONFIG.MESSAGE_SERVICE, payload);
    return res;
  } catch (error) {
    console.log(error)
    return error;
  }
};

export const getConversationsByTypeService = async (payload: any) => {
  const { userId, status } = payload
  try {
    const res = await axios.get(`/conversation/user/${userId}/status/${status}`)
    return res;
  } catch (error) {
    console.log(error)
    return error;
  }
};


export const getConversationByIdService = async (payload: any) => {
  try {
    const res = await axios.get(`/conversation/${payload}`)
    return res;
  } catch (error) {
    console.log(error)
    return error;
  }
}
