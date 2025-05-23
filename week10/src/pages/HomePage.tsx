import { useCallback, useMemo, useState } from "react";
import MovieFilter from "../components/MovieFilter";
import MovieList from "../components/MovieList";
import useFetch from "../hooks/useFetch";
import { MovieFilters, MovieResponse } from "../types/movie";

export default function HomePage() {
  const [filters, setFilters] = useState<MovieFilters>({
    query: "코난",
    include_adult: false,
    language: "ko-KR",
  });

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
    (filters: MovieFilters) => {
      setFilters(filters);
    },
    [setFilters]
  );

  if (error) {
    return <div>{error}</div>;
  }
  console.log(data);
  return (
    <div className="container">
      <MovieFilter onChange={handleMovieFilters} />
      {isLoading ? (
        <div>로딩 중 입니다...</div>
      ) : (
        <MovieList movies={data?.results || []} />
      )}
    </div>
  );
}
