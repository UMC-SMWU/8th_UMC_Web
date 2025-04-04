import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css'
import MoviePage from './pages/MoviePage'
import HomaPage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import MovieDetailPage from './pages/MovieDetailPage';

// BrowserRouter v5
// createBrowserRouter v6

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomaPage />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "movies/:category",
        element: <MoviePage />,
      },
      {
        path: "movie/:movieId",
        element: <MovieDetailPage />,
      }
    ],
  },
]);

function App() : React.ReactElement {
  return (
    <>
    <RouterProvider router={router} />
    </>
  )
}

export default App;
