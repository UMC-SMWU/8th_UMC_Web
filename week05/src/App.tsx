import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import HomeLayout from "./layouts/HomeLayout";
import MyPage from "./pages/MyPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import Navbar from "./components/Navbar";
import GoogleLoginRedirectPage from "./pages/GoogleLoginRedirectPage";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/*" element={<HomeLayout />} />
          <Route path="v1/auth/google/callback" element = {<GoogleLoginRedirectPage/>}/>
          <Route
            path="/mypage"
            element={
              <ProtectedRoute>
                <MyPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;