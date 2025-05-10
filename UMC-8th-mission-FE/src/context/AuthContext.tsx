import { createContext, PropsWithChildren, useContext, useState } from "react";
import { RequestSigninDto } from "../types/auth";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import { postLogout, postSignin } from "../apis/auth";
import { useLogin, useLogout } from "../hooks/mutations/useAuth";

interface AuthContextType {
    accessToken: string | null;
    refreshToken: string | null;
    login: (signinData: RequestSigninDto) => Promise<void>;
    logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
    accessToken: null,
    refreshToken: null,
    login: async () => {},
    logout: async () => {},
});

export const AuthProvider = ({children}: PropsWithChildren) => {
    const {
        getItem: getAccessTokenFromStorage, 
        setItem: setAccessTokenInStorage,
        removeItem: removeAccessTokenFromStorage,
    } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);

    const {
        getItem: getRefreshTokenFromStorage, 
        setItem: setRefreshTokenInStorage,
        removeItem: removeRefreshTokenFromStorage,
    } = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);

    // 상태를 만들어줌
    const [accessToken, setAccessToken] = useState<string | null> (
        getAccessTokenFromStorage(), // lazy initialization
    );

    const [refreshToken, setRefreshToken] = useState<string | null> (
        getRefreshTokenFromStorage(),
    );

    const {mutate: loginMutate} = useLogin();
    const {mutate: logoutMutate} = useLogout();

    const login = async (signinData: RequestSigninDto) => {
        loginMutate(signinData, {
            onSuccess: (data) => {
                if (data) {
                    const newAccessToken = data.data.accessToken
                    const newRefreshToken = data.data.refreshToken;
                    
                    setAccessTokenInStorage(newAccessToken);
                    setRefreshTokenInStorage(newRefreshToken);

                    setAccessToken(newAccessToken); // 상태 업데이트
                    setRefreshToken(newRefreshToken);

                    alert("로그인 성공");
                    window.location.href = "/my";
                }
            },
            onError: (error) => {
                console.error("로그인 실패", error); // 추후 toast ui 로 변경
                alert("로그인 실패");
            }
        })
    };

    const logout = async () => {
        logoutMutate(undefined, {
            onSuccess: () => {
                removeAccessTokenFromStorage();
                removeRefreshTokenFromStorage();

                setAccessToken(null); // 상태 업데이트
                setRefreshToken(null);

                alert("로그아웃 되었습니다.");
            },
            onError: (error) => {
                console.error("로그아웃 오류", error);
                alert("로그아웃 실패");
            }
        })
    };

    return (
        <AuthContext.Provider value={{ accessToken, refreshToken, login, logout}}>
            { children }
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context: AuthContextType = useContext(AuthContext);
    if(!context) {
        throw new Error("AuthContext 를 찾을 수 없습니다");
    }

    return context;
}