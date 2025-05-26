import { useCallback, useMemo, useState } from "react";
import MovieFilter from "../components/MovieFilter";
import MovieList from "../components/MovieList";
import useFetch from "../hooks/useFetch"
import { MovieFilters, MovieResponse } from "../types/movie"

export default function HomePage() {
    const [filter, setFilter] = useState<MovieFilters>({
        query: '어벤져스',
        include_adult: false,
        language: 'ko-KR',
    });

    const axiosRequestConfig = useMemo(
        () => ({
        params: filter,
    }), [filter]);

    const { data, error, isloading } = useFetch<MovieResponse>(
        '/search/movie', 
        axiosRequestConfig,
    );

    const handleMovieFilters = useCallback(
        (filter: MovieFilters) => {
        setFilter(filter);
    }, [setFilter]);


    if (error) {
        return <div>{error}</div>;
    }
    
    return (
        <>
            <div className="container mx-auto px-4 py-8">
                <MovieFilter onChange={handleMovieFilters} />
                {isloading ? (
                    <div>로딩중입니다</div>
                ) : (
                    <MovieList movies={data?.results || []} />
                )}
            </div>
        </>
    )
}
