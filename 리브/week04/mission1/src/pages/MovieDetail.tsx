import { useParams } from "react-router-dom";
import useCustomFetch from "../hooks/useCustomFetch";
import { Movie, CreditResponse } from "../types/movie";

const API_KEY = import.meta.env.VITE_TMDB_KEY;
const BASE_URL = "https://api.themoviedb.org/3/movie";

export default function MovieDetail() {
  const { movieId } = useParams();
  const options = {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  };

  const { data: movie, loading: loadingMovie, error: errorMovie } = useCustomFetch<Movie>(
    `${BASE_URL}/${movieId}?language=En-Us`,
    options
  );

  const { data: credits, loading: loadingCast, error: errorCast } = useCustomFetch<CreditResponse>(
    `${BASE_URL}/${movieId}/credits?language=En-Us`,
    options
  );

  if (loadingMovie || loadingCast) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin h-10 w-10 border-t-4 border-b-4 border-sky-400 rounded-full"></div>
      </div>
    );
  }

  if (errorMovie || errorCast || !movie) {
    return <div className="text-red-500 text-xl text-center font-bold">{errorMovie || errorCast || "데이터 없음"}</div>;
  }

  return (
    <div className="bg-gray-100 p-4">
      <div className="bg-black text-white p-6 rounded-xl shadow-xl mb-8">
        <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>
        <p className="text-sm text-gray-300 mb-1">
          평균 ⭐ {movie.vote_average} / {movie.release_date?.slice(0, 4)} / {movie.runtime}분
        </p>
        <p className="italic text-sm text-blue-300 mb-4">줄거리</p>
        <p className="text-gray-100 leading-relaxed text-sm max-w-4xl">{movie.overview}</p>
        {movie.backdrop_path && (
          <img
            src={`https://image.tmdb.org/t/p/w1280/${movie.backdrop_path}`}
            alt={movie.title}
            className="mt-4 rounded-lg shadow"
          />
        )}
      </div>

      <h2 className="text-xl font-bold mb-4">감독/출연</h2>
      <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-4">
        {credits?.cast?.slice(0, 14).map((actor) => (
          <div key={actor.id} className="text-center">
            <img
              src={
                actor.profile_path
                  ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                  : "https://via.placeholder.com/185x278?text=No+Image"
              }
              alt={actor.name}
              className="w-24 h-24 object-cover rounded-full mx-auto shadow-md"
            />
            <p className="text-sm mt-2 font-medium text-gray-800">{actor.name}</p>
            <p className="text-xs text-gray-500">{actor.character}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
