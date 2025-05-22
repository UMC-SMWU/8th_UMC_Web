import useFetch from "../hooks/useFetch.ts";
import type { MovieFilters, MovieResponse } from "../types/movie.ts";
import MovieList from "../components/MovieList.tsx";
import MovieFilter from "../components/MovieFilter.tsx";
import { useCallback, useMemo, useState } from "react";

const HomePage = () => {
  const [filters, setFilters] = useState<MovieFilters>({
    query: "어벤져스",
    include_adult: false,
    language: "ko-KR",
  });

  const axiosRequestConfig = useMemo(
    () => ({
      params: filters,
    }),
    [filters],
  );

  const { data, error, loading } = useFetch<MovieResponse>(
    "/search/movie",
    axiosRequestConfig,
  );

  const handleMovieFilters = useCallback(
    (filters: MovieFilters) => {
      setFilters(filters);
    },
    [setFilters],
  );

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div
      className={`flex flex-col px-20 py-10 items-center justify-center w-full space-y-10`}
    >
      <MovieFilter onChange={handleMovieFilters} />
      {loading ? (
        <div>로딩 입니다...</div>
      ) : (
        <MovieList movies={data?.results || []} />
      )}
    </div>
  );
};

export default HomePage;
