import {Outlet, Route, Routes} from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HomePage from "../pages/HomePage";

const HomeLayout = () => {
    return (
        <div className = "h-dvh flex flex-col bg-black">
            <Navbar/>
            <main className = "flex-1 mt-20">
              <Routes>
                  <Route path="/" element={<HomePage />} />
              </Routes>
                <Outlet/>
            </main>
            <Footer/>
        </div>
    )
}

export default HomeLayout;