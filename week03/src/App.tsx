import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from './pages/home'
import NotFound from './pages/not-found'
import MoviePage from './pages/movies'
import RootLayout from './layout/root-layout'
const router = createBrowserRouter([
	{
		path: '/',
		element: <RootLayout />,
		errorElement: <NotFound />,
		// 1. Navbar 하단에 path 보여주기
		children : [
			{
				// 2. index:true 는 홈 경로를 의미한다.
				index: true, 
				element: <HomePage />,
			},
			{
				// 3. 부모의 path가 '/' 이므로 여기서는 / 붙이지 않아도 동일.
				path: 'movies/:movieId',
				element: <MoviePage />
			}, 
		]
	}
])

function App() {
  return (
    <>
      	<RouterProvider router={router} />
    </>
  )
}

export default App
