import { PropsWithChildren, useContext, useState } from "react";
import { RequestSigninDto } from "../types/auth";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { postSignin, postLogout } from "../apis/auth";
import { createContext } from "react";


interface AuthContextType {
    accessToken: string | null;
    refreshToken: string | null;
    login:(signInData: RequestSigninDto) => Promise<void>;
    logout:() => Promise<void>;
    isLoggedIn: boolean;
}

export const AuthContext = createContext<AuthContextType>({
    accessToken: null,
    refreshToken: null,
    login: async () => {},
    logout: async () => {},
    isLoggedIn: false,
});

export const AuthProvider = ({ children }: PropsWithChildren) => {
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
    const [accessToken, setAccessToken] = useState<string | null>(
        getAccessTokenFromStorage()
    );
    const [refreshToken, setRefreshToken] = useState<string | null>(
        getRefreshTokenFromStorage(),
    );

    const isLoggedIn = !!getAccessTokenFromStorage(); // localStorage 기준으로 판단
    
    const login = async (signInData: RequestSigninDto) => {
        try {
            const {data} = await postSignin(signInData);

            if (data){
                const newAccessToken = data.accessToken;
                const newRefreshToken = data.refreshToken;

                setAccessTokenInStorage(newAccessToken);
                setRefreshTokenInStorage(newRefreshToken);
                setAccessToken(newAccessToken);
                setRefreshToken(newRefreshToken);
                alert("로그인 성공");
                window.location.href = "/mypage";
            }
        } catch (error){
            console.error("로그인 오류", error);
            alert("로그인 실패")
        }
    }
    const logout = async () => {
        try {
            await postLogout();
            removeAccessTokenFromStorage();
            removeRefreshTokenFromStorage();

            setAccessToken(null);
            setRefreshToken(null);

            alert("로그아웃 성공");
            window.location.href = "/login";
        } catch (error){
            console.error("로그아웃 오류", error);
            alert("로그아웃 실패");
        }
};
    return (
        <AuthContext.Provider
            value={{
                accessToken,
                refreshToken,
                login,
                logout,
                isLoggedIn,
            }}
        >
            {children}
        </AuthContext.Provider>
    );

};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("AuthContext를 찾을 수 없습니다");
    }
    
    return context;
}