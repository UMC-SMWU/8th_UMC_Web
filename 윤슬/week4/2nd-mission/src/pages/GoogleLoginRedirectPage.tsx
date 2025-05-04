import { LOCAL_STORAGE_KEY } from "../constants/key";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useEffect } from "react";

const GoogleLoginRedirectPage = () => {
    const { setItem: setAccessToken } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
    const { setItem: setRefreshToken } = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const accessToken : string | null = urlParams.get(LOCAL_STORAGE_KEY.accessToken);
        const refreshToken : string | null = urlParams.get(LOCAL_STORAGE_KEY.refreshToken);

        if (accessToken) {
            setAccessToken(accessToken);
            setRefreshToken(refreshToken);
            window.location.href = "/my";
        }
    }, [setAccessToken, setRefreshToken]);
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-2xl font-bold mb-4">Google Login Redirect</h1>
            <p className="text-lg">Redirecting...</p>
        </div>
    );
}

export default GoogleLoginRedirectPage;