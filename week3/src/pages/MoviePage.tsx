import { useEffect, useState } from "react";
import { Movie, MovieResponse } from "../types/movie";
import axios from "axios";
import MovieCard from "../components/MovieCard";

const MoviePage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  console.log(movies);

  useEffect(() => {
    const fetchMovies = async () => {
      const { data } = await axios.get<MovieResponse>(
        `https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1`,
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
          },
        }
      );
      setMovies(data.results);
    };
    fetchMovies();
  }, []);

  return (
    <div className="p-10 grid grid-cols-2 sm:grid-cols-3 
    md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      {movies?.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default MoviePage;
