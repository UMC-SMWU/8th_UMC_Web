import { createContext, PropsWithChildren, useContext } from "react";
import { RequestLoginDto } from "../types/auth";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import { postLogin, postLogout } from "../api/AuthService";

interface AuthContextType {
  accessToken: string | null;
  refreshToken: string | null;
  login: (requestLoginDto: RequestLoginDto) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  accessToken: null,
  refreshToken: null,
  login: async () => {},
  logout: async () => {},
});

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const {
    setItem: setAccessToken,
    getItem: getAccessToken,
    removeItem: removeAccessToken,
  } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
  const {
    setItem: setRefreshToken,
    getItem: getRefreshToken,
    removeItem: removeRefreshToken,
  } = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);

  const login = async (requestLoginDto: RequestLoginDto) => {
    try {
      const { data } = await postLogin(requestLoginDto);
      if (data) {
        setAccessToken(data.accessToken);
        setRefreshToken(data.refreshToken);
        alert("로그인 성공");
        window.location.href = "/mypage";
      }
    } catch (error) {
      console.error("Login failed", error);
      alert("로그인 실패");
    }
  };

  const logout = async () => {
    try {
      await postLogout();
      removeAccessToken();
      removeRefreshToken();
      alert("로그아웃 성공");
      window.location.href = "/login";
    } catch (error) {
      console.error("Logout failed", error);
      alert("로그아웃 실패");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        accessToken: getAccessToken(),
        refreshToken: getRefreshToken(),
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};
