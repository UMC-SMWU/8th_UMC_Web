import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";

export default function RootLayout() {
  return (
    <div className="h-dvh flex flex-col bg-black">
      <NavBar />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}
