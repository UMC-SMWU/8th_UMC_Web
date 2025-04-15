import axios, { InternalAxiosRequestConfig } from "axios";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import { useLocalStorage } from "../hooks/useLocalStorage";

interface CustomInternalAxiosRequestConfig extends InternalAxiosRequestConfig {
    _retry?: boolean; // 요청 재시도 여부를 나타내는 플래그
}

// 전역 변수로 refresh 요청의 Promise를 저장해서 중복 요청을 방지한다.
let refreshPromise: Promise<string | null> | null = null;

export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_SERVER_API_URL,
    // headers: {
    //     Authorization: `Bearer ${localStorage.getItem(LOCAL_STORAGE_KEY.accessToken)}`,
    // },
});

// 토큰 관련
// 요청 인터셉터: 모든 요청 전에 accessToken을 Authorization 헤더에 추가한다. 
axiosInstance.interceptors.request.use((config) => {
    const { getItem } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
    const accessToken = getItem(); // localStorage에서 accessToken을 가져온다.

    if (accessToken) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${accessToken}`;
    };

    // 수정된 요청 설정 반환
    return config;
},
    // 요청 인터셉터 실패 시 에러
    (error) => Promise.reject(error),
);

// 응답 인터셉터: 401 에러 발생 -> refreshToken을 사용하여 accessToken을 갱신한다.
axiosInstance.interceptors.response.use(
    (response) => response, // 정상 응답 그대로 반환
    async(error) => {
        const originalRequest: CustomInternalAxiosRequestConfig = error.config;

        const { removeItem : removeAccessToken, setItem: setAccessToken } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
        const { 
            removeItem : removeRefreshToken, 
            setItem: setRefreshToken, 
            getItem : getRefreshToken 
        } = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);

        // 401 에러면서, 아직 재시도 하지 않은 요청 경우 처리
        if(
            error.response && 
            error.response.status === 401 &&
            !originalRequest._retry
        ) {
            // refresh 엔드포인트 401 에러가 발생한 경우 (Unauthorized), 중복 재시도 방지를 위해 로그아웃 처리
            if (originalRequest.url === "/v1/auth/refresh") {
                removeAccessToken();
                removeRefreshToken();
                window.location.href = "/login";
                return Promise.reject(error);
            }

            // 재시도 플래그 설정
            originalRequest._retry = true;

            // 이미 refresh 요청이 진행중이면 그 Promise 재사용
            if (!refreshPromise) {
                const refreshToken = getRefreshToken();
                // refresh 요청 실패 후 Promise 전역 변수에 할당
                refreshPromise = axiosInstance.post('/v1/auth/refresh', {
                    refresh: refreshToken,
                })
                .then(({ data }) => {
                    const {accessToken, refreshToken} = data.data;
                    setAccessToken(accessToken);
                    setRefreshToken(refreshToken);
    
                    // 새 accessToken 반환하여 다른 요청들이 이것을 사용할 수 있게 함.
                    return accessToken;
                })
                .catch(() => {
                    removeAccessToken();
                    removeRefreshToken();
                    return null;
                })
                . finally(() => {
                    refreshPromise = null;
                });
            }
            
            // 진행중인 refreshPromise가 해결될 때까지 기다림림
            return refreshPromise?.then((newAccessToken) => {
                // 원본 요청의Authorization 헤더를 갱신된 토큰으로 업데이트트
                originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                // 업데이트 된 원본 요청을 재시도
                return axiosInstance.request(originalRequest);
            });
        }
        // 401 에러가 아닌 경우 그대로 오류 반환
        return Promise.reject(error);
    }
)
