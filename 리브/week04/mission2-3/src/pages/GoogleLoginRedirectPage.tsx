import { useEffect } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage.ts";
import { LOCAL_STORAGE_KEY } from "../constants/key.ts";

const GoogleLoginRedirectPage = () => {
  const { setItem: setAccessToken } = useLocalStorage(
    LOCAL_STORAGE_KEY.accessToken,
  );
  const { setItem: setRefreshToken } = useLocalStorage(
    LOCAL_STORAGE_KEY.refreshToken,
  );

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get(LOCAL_STORAGE_KEY.accessToken);
    const refreshToken = urlParams.get(LOCAL_STORAGE_KEY.refreshToken);

    if (accessToken && refreshToken) {
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
      window.location.href = "/my";
    }
  }, [setAccessToken, setRefreshToken]);

  return <div>구글 로그인 리다이렉트 후</div>;
};

export default GoogleLoginRedirectPage;





