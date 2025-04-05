import MovieCard from "../components/MovieCard";
import LoadingSpinner from "../components/LoadingSpinner";
import { useParams } from "react-router-dom";
import { MovieResponse } from "../dto/MovieResponse";
import useCustomFetch from "../hooks/useCustomFetch";
import { useState } from "react";
import ErrorPage from "./ErrorPage";

const MoviePage = () => {
  const [page, setPage] = useState(1);
  const params = useParams();
  const url = `https://api.themoviedb.org/3/movie/${params.category}?page=${page}`;
  const { data, isPending, isError } = useCustomFetch<MovieResponse>(url);
  const buttonClass =
    "bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 transition-all duration-200";

  if (isPending) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }
  if (isError) {
    return <ErrorPage />;
  }

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

      <div
        className="p-10 grid grid-cols-2 sm:grid-cols-3 
  md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4"
      >
        {data?.results?.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </>
  );
};

export default MoviePage;
