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

export const getConversationsByTypeService = async (payload: string) => {
  try {
    const res = await axios.get(`/conversation/type/${payload}`)
    return res;
  } catch (error) {
    console.log(error)
    return error;
  }
};
