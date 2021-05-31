import fetchAxios from "../utils/fetchAxios";
import { SERVICE_CONFIG } from "../../utils/service-config";

export const registerService = async (payload) => {
  const res = await fetchAxios.onPost(`/auth-service/api/auth/register`, payload);
  return res;
};

export const loginService = async (payload) => {
  const res = await fetchAxios.onPost(`/auth-service/api/auth/login`, payload);
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
