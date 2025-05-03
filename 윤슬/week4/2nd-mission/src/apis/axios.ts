import axios from "axios";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import { useLocalStorage } from "../hooks/useLocalStorage";

interface CustomAxiosRequestConfig {
  url?: string;
  method?: string;
  headers?: Record<string, string>;
  data?: unknown;
  params?: unknown;
  _retry?: boolean;
  baseURL?: string;
}

let refreshPromise: Promise<string> | null = null;

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const { getItem } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
    const accessToken = getItem();

    if (accessToken) {
      config.headers = config.headers || {};
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config as CustomAxiosRequestConfig;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      originalRequest.url !== "/v1/auth/refresh"
    ) {
      originalRequest._retry = true;

      if (!refreshPromise) {
        refreshPromise = (async () => {
          const { getItem } = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);
          const refreshToken = getItem();

          try {
            const res = await axiosInstance.post("/v1/auth/refresh", { refresh: refreshToken });

            const { setItem: setAccessToken } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
            const { setItem: setRefreshToken } = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);

            const data = res.data as { data: { accessToken: string; refreshToken: string } };

            setAccessToken(data.data.accessToken);
            setRefreshToken(data.data.refreshToken);

            return data.data.accessToken;
          } catch (refreshError) {
            const { removeItem: removeAccessToken } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
            const { removeItem: removeRefreshToken } = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);
            removeAccessToken();
            removeRefreshToken();
            window.location.href = "/login";
            throw refreshError;
          } finally {
            refreshPromise = null;
          }
        })();
      }

      const newAccessToken = await refreshPromise;

      originalRequest.headers = originalRequest.headers || {};
      originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

      return axiosInstance.request(originalRequest);
    }

    if (originalRequest.url === "/v1/auth/refresh" && error.response?.status === 401) {
      const { removeItem: removeAccessToken } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
      const { removeItem: removeRefreshToken } = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);
      removeAccessToken();
      removeRefreshToken();
      window.location.href = "/login";
    }

    return Promise.reject(error);
  },
);
