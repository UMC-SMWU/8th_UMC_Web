import { useEffect, useState } from "react";
import { Movie, MovieResponse } from "../types/movie";
import axios from "axios";
import MovieCard from "../components/MovieCard";
import LoadingSpinner from "../components/LoadingSpinner";
import { useParams } from "react-router-dom";

const MoviePage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isPending, setIsPending] = useState(false);
  const [isError, setIsError] = useState(false);
  const [page, setPage] = useState(1);
  const { category } = useParams<{ category: string }>();
  const buttonClass =
    "bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 transition-all duration-200";

  useEffect(() => {
    const fetchMovies = async () => {
      setIsPending(true);
      try {
        const { data } = await axios.get<MovieResponse>(
          `https://api.themoviedb.org/3/movie/${category}?language=ko-KR&page=${page}`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
            },
          }
        );
        setMovies(data.results);
      } catch {
        setIsError(true);
      } finally {
        setIsPending(false);
      }
    };
    fetchMovies();
  }, [category, page]);

  return (
    <>
      <div className="flex items-center justify-center gap-6 mt-5">
        <button
          className={`${buttonClass} disabled:bg-gray-300 cursor-pointer disabled:cursor-not-allowed`}
          onClick={() => setPage((prev) => prev - 1)}
          disabled={page === 1}
        >{`<`}</button>
        <span className="">{page} 페이지</span>
        <button
          className={`${buttonClass} cursor-pointer`}
          onClick={() => setPage((prev) => prev + 1)}
        >{`>`}</button>
      </div>

      {isPending ? (
        <div className="flex items-center justify-center h-dvh">
          <LoadingSpinner />
        </div>
      ) : (
        <div
          className="p-10 grid grid-cols-2 sm:grid-cols-3 
  md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4"
        >
          {movies?.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}

      {isError && (
        <div className="flex items-center justify-center h-dvh text-red-500 text-2xl">
          에러가 발생했습니다.
        </div>
      )}
    </>
  );
};

export default MoviePage;
