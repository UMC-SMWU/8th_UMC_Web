import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import MoviePage from './pages/MoviePage'
import HomePage from './pages/home'
import NotFound from './pages/not-found'
import MovieDetailPage from './pages/MovieDetailPage'

const router = createBrowserRouter([
    {
        path: '/',
        element: <HomePage />,
        errorElement: <NotFound />,
        children: [
            {
                path: 'movies/:category',
                element: <MoviePage />,
            },
            {
                path: 'movies/:category/:movieId',
                element: <MovieDetailPage />,
            }
        ],
    },
])

function App() {
  return (
    <>
      	<RouterProvider router={router} />
    </>
  )
}

export default App
