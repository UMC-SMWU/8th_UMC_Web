import "./App.css"
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Layout from "./components/Layout.tsx";
import Home from "./pages/Home.tsx";
import MoviePage from "./pages/MoviePage.tsx";
import MovieDetail from "./pages/MovieDetail.tsx"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="movies/:type" element={<MoviePage />} />
          <Route path="movie/:movieId" element={<MovieDetail />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

