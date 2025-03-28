import { Outlet } from "react-router-dom";
import NavBar from "../components/navbar";

const RootLayout = () => {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};

export default RootLayout;
