import { LocalStorageKeys } from './../enums/appEnum';
import axios from "axios";

const BASE_URL =  process.env.REACT_APP_API_URL || "no_REACT_APP_API_URL_env";

const HEADERS = {
  "Content-Type": "application/json",
};

export const Axios = axios.create({
  baseURL: `${BASE_URL}`,
  headers: {
    ...HEADERS,
  },
});

Axios.interceptors.request.use((config: any) => {
  const jwtJson = localStorage.getItem(LocalStorageKeys.JWT);
  const token = jwtJson ? JSON.parse(jwtJson) : "";
  config.headers!.Authorization = token;
  return config;
});

Axios.interceptors.response.use(
  (res) => {
    return Promise.resolve(res);
  },
  (error) => {
    return Promise.reject(error);
  }
);
