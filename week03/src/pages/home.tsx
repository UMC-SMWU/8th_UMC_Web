import { Outlet } from "react-router-dom";
import Navbar from "../components/NavigationBar";

const HomePage = () => {
    return (
        <>
            <Navbar />
            <Outlet />
        </>
    );
};

export default HomePage;