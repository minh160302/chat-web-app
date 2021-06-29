import fetchAxios from "../utils/fetchAxios";
import { SERVICE_CONFIG } from "../../utils/service-config";


export const verifyJwtToken = async () => {
  const token = localStorage.getItem("AUTH_TOKEN_KEY")
  if (token) {
    const res = await fetchAxios.onGet(`${SERVICE_CONFIG.AUTH_SERVICE}/api/auth/verify/${token}`)
    return res
  }
}

export const registerService = async (payload) => {
  const res = await fetchAxios.onPost(`${SERVICE_CONFIG.AUTH_SERVICE}/api/auth/register`, payload);
  return res;
};

export const loginService = async (payload) => {
  const res = await fetchAxios.onPost(`${SERVICE_CONFIG.AUTH_SERVICE}/api/auth/login`, payload);
  return res;
};

export const storeAuthToken = async (token) => {
  if (token) {
    const jwt = token;
    localStorage.setItem("AUTH_TOKEN_KEY", jwt);
    return {
      success: true,
      accessToken: jwt
    }
  }
};

export const getCurrentUserInfoService = async (token) => {
  if (token) {
    const res = await fetchAxios.onGet(`${SERVICE_CONFIG.AUTH_SERVICE}/api/auth/user/${token}`)
    return res
  }
}