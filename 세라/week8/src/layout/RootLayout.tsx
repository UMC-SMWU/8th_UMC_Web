import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import useGetMyInfo from "../hooks/queries/useGetMyInfo.ts";
import { useAuthContext } from "../context/AuthContext.tsx";

export default function RootLayout() {
  const { accessToken } = useAuthContext();
  const { data: myInfo } = useGetMyInfo(accessToken);

  return (
    <div className="h-dvh flex flex-col bg-black">
      <NavBar name={myInfo?.data?.name} />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
