import fetchAxios from "store/utils/fetchAxios";
import { SERVICE_CONFIG } from "../../utils/service-config"

export const findUserService = async (payload: object) => {
  try {
    const res = await fetchAxios.onGet(`/user/${payload}`, SERVICE_CONFIG.MESSAGE_SERVICE)
    return res;
  } catch (error) {
    console.log(error)
    return error;
  }
};
