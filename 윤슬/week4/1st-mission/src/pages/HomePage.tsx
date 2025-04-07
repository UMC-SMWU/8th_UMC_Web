import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar";

const HomaPage = () : React.ReactElement => {
    return (
        <div>
            <Navbar/>
            <Outlet/>
        </div>
    );
};

export default HomaPage;