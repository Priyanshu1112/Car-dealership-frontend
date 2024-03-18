import axios from "axios";
import { getAccessToken, getRefreshToken, getUserType } from "./Token";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3001/",
});

axiosInstance.interceptors.request.use(
  (config) => {
    config.headers["Authorization"] = `Bearer ${getAccessToken()}`;
    config.headers["Refresh-Token"] = getRefreshToken();
    config.headers["User-Type"] = getUserType();
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
