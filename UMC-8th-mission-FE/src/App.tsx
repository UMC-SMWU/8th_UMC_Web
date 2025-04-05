import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import NotFoundPage from './pages/NotFoundPage'
import LoginPage from './pages/LoginPage'
import HomeLayout from './layouts/HomeLayout'
import SignupPage from './pages/SignupPage'

// 1. 홈페이지
// 2. 로그인 페이지
// 3. 회원가입 페이지

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />, // 공유되는 요소
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <HomePage /> }, // / 경로에 해당하는 페이지
      { path: 'login', element: <LoginPage /> },
      { path: 'signup', element: <SignupPage />}
    ]
  }
])

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App
