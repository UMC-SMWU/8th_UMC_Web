import { useEffect, useState } from "react"
import { Movie, MovieResponse } from "../types/movie";
import axios from "axios";
import MovieCard from "../components/MovieCard";
import { LoadingSpinner } from "../components/LoadingSpinner";
import Pagination from "../components/Pagination";
import { useParams } from "react-router-dom";
import NotFound from "./not-found";

const MoviePage = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    // 1. 로딩 상태
    const [isPending, setIsPending] = useState(false);
    // 2. 에러 상태
    const [isError, setIsError] = useState(false);
    // 3. 페이지
    const [page, setPage] = useState(1);
    // 전체 페이지
    const [totalPage, setTotalPage] = useState(0);

    const { category } = useParams<{
        category: string;
    }>();

    // 최초 실행
    useEffect(() => {
        const fetchMovies = async () => {
            setIsPending(true); // 데이터 요청 시작 시 로딩 활성화
            // 응답에 대한 타입 정의
            try {
                const { data } = await axios.get<MovieResponse>(
                    `https://api.themoviedb.org/3/movie/${category}?language=ko-KR&page=${page}`,
                    {
                        headers: {
                            Authorization: `Bearer ${import.meta.env.VITE_MOVIE_API_KEY}`,
                        },
                    }
                );
                setTotalPage(data.total_pages);
                setMovies(data.results);
            } catch{
                setIsError(true);
            } finally {
                setIsPending(false); // 모든 구문에 공통으로 들어가야 할 사항
            }
        };

        fetchMovies();
    }, [page, category]);

    if (isError) {
        return (
            <NotFound />
        )
    }

    return (
        <>
        <Pagination page={page} setPage={setPage} totalPage={totalPage} />
        {/* 분기처리로 스피너 적용 */}
        {isPending && (
            <div className="flex items-center justify-center h-dvh">
                <LoadingSpinner />    
            </div>
        )}

        {!isPending && (
            <div className="p-10 grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                {movies?.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} category={category || "default"}/>
                ))}
            </div>
        )}
        </>
    );
};

export default MoviePage