import { useAuth } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedLayout = () => {
    const { accessToken } = useAuth();
    
    if(!accessToken) {
        return <Navigate to="/login" replace/>; // 인증되지 않은 경우 로그인 페이지로 리다이렉트
    }

    return <Outlet />;
};

export default ProtectedLayout;