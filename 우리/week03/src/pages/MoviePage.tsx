import { useState } from "react"
import { MovieResponse } from "../types/movie";
import MovieCard from "../components/MovieCard";
import { LoadingSpinner } from "../components/LoadingSpinner";
import Pagination from "../components/Pagination";
import { useParams } from "react-router-dom";
import NotFound from "./not-found";
import useCustomFetch from "../hooks/useCustomFetch";

const MoviePage = () => {
    // 3. 페이지
    const [page, setPage] = useState(1);

    const { category } = useParams<{
        category: string;
    }>();

    const url = `https://api.themoviedb.org/3/movie/${category}?language=ko-KR&page=${page}`

    const { data: movies, isPending, isError } = useCustomFetch<MovieResponse>(url);
    console.log(movies);
    if (isError) {
        return (
            <NotFound />
        )
    }

    return (
        <>
        <Pagination page={page} setPage={setPage} />
        {/* 분기처리로 스피너 적용 */}
        {isPending && (
            <div className="flex items-center justify-center h-dvh">
                <LoadingSpinner />    
            </div>
        )}

        {!isPending && (
            <div className="p-10 grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                {movies?.results.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} category={category || "default"}/>
                ))}
            </div>
        )}
        </>
    );
};

export default MoviePage