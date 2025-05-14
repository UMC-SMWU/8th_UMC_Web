import { useAuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import RootLayout from "./RootLayout";

export default function ProtectedLayout() {
  const { accessToken } = useAuthContext();
  if (!accessToken) {
    alert("로그인이 필요한 서비스입니다. 로그인을 해주세요!");
    return <Navigate to={"/login"} replace />;
  }
  return <RootLayout />;
}
