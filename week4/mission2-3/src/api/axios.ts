import axios from "axios";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import { useLocalStorage } from "../hooks/useLocalStorage";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API_URL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  const { getItem } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
  const accessToken = getItem();
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});
