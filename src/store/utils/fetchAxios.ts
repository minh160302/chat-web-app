import axios from "axios";
import { SERVICE_CONFIG } from "utils/service-config";

const fetchAxios = {
  onPost: (api, payload) => {
    const response = axios
      .post(api, payload, {
        headers: {
          "Access-Control-Allow-Origin": "http://localhost:8762",
          "Access-Control-Allow-Methods":
            "OPTIONS, HEAD, GET, POST, PUT, DELETE",
          "Access-Control-Allow-Headers":
            "Origin, X-Requested-With, Content-Type, Accept, Authorization",
          "Content-Type": "application/json",
        },
        baseURL: SERVICE_CONFIG.SERVICE_API_URL,
        // baseURL: "http://localhost:8200",
      })
      .then((res) => {
        return res;
      })
      .catch((error) => {
        return error;
      });
    return response;
  },

  onGet: (api) => {
    const response = axios
      .get(api, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Methods":
            "OPTIONS, HEAD, GET, POST, PUT, DELETE",
          "Access-Control-Allow-Headers":
            "Origin, X-Requested-With, Content-Type, Accept, Authorization",
        },
        baseURL: SERVICE_CONFIG.SERVICE_API_URL,
        // baseURL: "http://localhost:8200",
      })
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        console.log(error);
      });

    return response;
  },
};

export default fetchAxios;
