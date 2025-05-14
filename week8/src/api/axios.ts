import axios, { InternalAxiosRequestConfig } from "axios";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import { useLocalStorage } from "../hooks/useLocalStorage";

interface CustomInternalAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

let refreshTokenPromise: Promise<string | null> | null = null;

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API_URL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  const { getItem } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
  const accessToken = getItem();
  if (accessToken) {
    config.headers["Authorization"] = `Bearer ${accessToken}`;
  }
  return config;
});

// 📌 응답 인터셉터: 401 처리
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest: CustomInternalAxiosRequestConfig = error.config;
    const { setItem: setAccessToken, removeItem: removeAccessToken } =
      useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
    const {
      setItem: setRefreshToken,
      getItem: getRefreshToken,
      removeItem: removeRefreshToken,
    } = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);

    if (
      error.response &&
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      if (originalRequest.url === "/v1/auth/refresh") {
        removeAccessToken();
        removeRefreshToken();
        window.location.href = "/login";
        return Promise.reject(error);
      }

      originalRequest._retry = true;

      // ✅ refreshTokenPromise가 없을 때만 새 요청
      if (!refreshTokenPromise) {
        const refreshToken = getRefreshToken();
        refreshTokenPromise = axiosInstance
          .post("/v1/auth/refresh", {
            refresh: refreshToken,
          })
          .then((res) => {
            const { accessToken, refreshToken } = res.data.data;
            setAccessToken(accessToken);
            setRefreshToken(refreshToken);
            return accessToken;
          })
          .catch(() => {
            removeAccessToken();
            removeRefreshToken();
            return null;
          })
          .finally(() => {
            refreshTokenPromise = null;
          });
      }
      return refreshTokenPromise.then((newAccessToken) => {
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return axiosInstance.request(originalRequest);
      });
    }
    return Promise.reject(error);
  }
);
