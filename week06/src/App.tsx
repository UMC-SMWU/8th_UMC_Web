import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import HomeLayout from "./layouts/HomeLayout";
import MyPage from "./pages/MyPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import Navbar from "./components/Navbar";
import GoogleLoginRedirectPage from "./pages/GoogleLoginRedirectPage";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import NewLpForm from "./pages/NewLpForm";
import DeleteTestLp from "./pages/DeleteTestLp";
import LpDetailPage from "./pages/LpDetailPage";



export const queryClient = new QueryClient({
  defaultOptions: {
    queries:{
      retry:3,
    },
  },
});
function App() {
  return (
    <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/*" element={<HomeLayout />} />
          <Route path="/lp/new" element = {<NewLpForm/>}/>
          <Route path="/lp/delete" element={<DeleteTestLp />} />
          <Route path="v1/auth/google/callback" element = {<GoogleLoginRedirectPage/>}/>
          <Route
            path="/mypage"
            element={
              <ProtectedRoute>
                <MyPage />
              </ProtectedRoute>
            }
          />
          <Route path="/lp/:lpId" element={
          <ProtectedRoute>
            <LpDetailPage />
            </ProtectedRoute>} />
        </Routes>
      </Router>
    </AuthProvider>
   {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
       </QueryClientProvider>
  );
}

export default App;