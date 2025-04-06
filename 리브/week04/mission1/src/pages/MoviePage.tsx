import { useParams, Link } from "react-router-dom";
import useCustomFetch from "../hooks/useCustomFetch";
import { useState, useMemo } from "react";

const API_KEY = import.meta.env.VITE_TMDB_KEY;
const BASE_URL = "https://api.themoviedb.org/3/movie";

const endpointMap: Record<string, string> = {
    popular: "popular",
    upcoming: "upcoming",
    top_rated: "top_rated",
    now_playing: "now_playing",
  };
  
  export default function MoviePage() {
    const { type } = useParams();
    const [page, setPage] = useState(1);
    const resolvedType = endpointMap[type || "popular"];
  
    const url = useMemo(() => `${BASE_URL}/${resolvedType}?language=En-Us&page=${page}`, [resolvedType, page]);
    const options = {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    };
  
    const { data, loading, error } = useCustomFetch<{ results: any[] }>(url, options);
    const movies = data?.results || [];
  
    if (loading) {
      return (
        <div className="flex justify-center items-center h-96">
          <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-b-4 border-green-400"></div>
        </div>
      );
    }
  
    if (error) {
      return <div className="text-red-500 text-xl font-bold">{error}</div>;
    }
  
    return (
      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {movies.map((movie) => (
            <Link to={`/movie/${movie.id}`} key={movie.id}>
              <div className="rounded shadow-md overflow-hidden bg-white hover:scale-105 transition-transform">
                <img
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-80 object-cover"
                />
                <div className="p-2 text-center font-semibold text-sm">
                  {movie.title}
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="flex justify-center gap-4">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className={`px-4 py-2 rounded ${
              page === 1 ? "bg-gray-200 cursor-not-allowed" : "bg-sky-200 hover:bg-sky-300"
            }`}
          >
            &lt;
          </button>
          <span className="py-2">{page} 페이지</span>
          <button
            onClick={() => setPage((p) => p + 1)}
            className="px-4 py-2 bg-purple-300 hover:bg-purple-400 rounded"
          >
            &gt;
          </button>
        </div>
      </div>
    );
  }