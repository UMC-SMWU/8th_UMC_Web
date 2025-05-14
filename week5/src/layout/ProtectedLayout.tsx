import { useAuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import RootLayout from "./RootLayout";

export default function ProtectedLayout() {
  const { accessToken } = useAuthContext();
  if (!accessToken) {
    return <Navigate to={"/login"} replace />; // replace는 history를 남기지 않음
  }
  return <RootLayout />;
}
