import './App.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import HomePage from './pages/home';
import MoviesPage from './pages/movies';
import OnGoingPage from './pages/ongoing.tsx';
import HighRatedPage from './pages/highrated.tsx';
import UpComingPage from './pages/upcoming.tsx';
import MovieDetailPage from './pages/MovieDetailPage.tsx';
import NotFound from './pages/not-found';
import RootLayout from "./layout/root-layout.tsx"


const router = createBrowserRouter ([
  {
    path:'/',
    element: <RootLayout/>,
    errorElement : <NotFound/>,
    children : [
      {
        index:true,
        element:<HomePage/>
      },
      {
        path:'movies',
        element:<MoviesPage/>
      },
      {
        path:'ongoing',
        element:<OnGoingPage/>
      },
      {
        path:'highrated',
        element:<HighRatedPage/>
      },
      {
        path:'upcoming',
        element:<UpComingPage/>
      },
      {
        path: 'movies/:movieId', 
        element: <MovieDetailPage />,
      },
    ]
  },

])

function App(){
  return (
    <div>

      <RouterProvider router = {router}/>
  </div>)
}
export default App

