import { useState, useMemo, useCallback } from "react";

import MovieFilter from "../components/MovieFilter";
import MovieList from "../components/MovieList";
import MovieModal from "../components/MovieModal";
import useFetch from "../hooks/useFetch";
import { Movie, MovieFilters, MovieResponse } from "../types/movie";

export default function HomePage() {
  const [filters, setFilters] = useState<MovieFilters>({
    query: "어벤져스",
    include_adult: false,
    language: "ko-KR",
  });

  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const axiosRequestConfig = useMemo(
    (): { params: MovieFilters } => ({
      params: filters,
    }),
    [filters]
  );

  const { data, error, isLoading } = useFetch<MovieResponse>(
    "/search/movie",
    axiosRequestConfig
  );

  const handleMovieFilters = useCallback(
    (filters: MovieFilters): void => {
      setFilters(filters);
    },
    [setFilters]
  );

  const handleMovieClick = useCallback((movie: Movie) => {
    setSelectedMovie(movie);
  }, []);

  if (error) {
    return <div>{error}</div>;
  }
return (
  <div className="min-h-screen bg-gray-50 px-4 py-10">
    <div className="mx-auto max-w-4xl">
      {/* 검색 필터 박스 */}
      <div className="rounded-xl bg-white p-6 shadow-md">
        <MovieFilter onChange={handleMovieFilters} />
      </div>

      {/* 영화 목록 */}
      <div className="mt-10">
        {isLoading ? (
          <div className="text-center text-gray-600">로딩 중입니다...</div>
        ) : (
          <MovieList movies={data?.results || []} onMovieClick={handleMovieClick} />
        )}
      </div>
    </div>

    {/* 영화 상세 모달 */}
    {selectedMovie && (
      <MovieModal
        movie={selectedMovie}
        onClose={() => setSelectedMovie(null)}
      />
    )}
  </div>
  );
}

