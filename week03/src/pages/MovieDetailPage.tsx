import { useState } from "react";
import { useParams } from "react-router-dom";
import { MovieCredits, MovieDetail } from "../types/movie";
import { LoadingSpinner } from "../components/LoadingSpinner";
import NotFound from "./not-found";
import CastCard from "../components/CastCard";
import CrewCard from "../components/CrewCard";
import MovieDetailCompo from "../components/MovieDetailCompo";
import useCustomFetch from "../hooks/useCustomFetch";

const MovieDetailPage = () => {
    const [isCastVisible, setIsCastVisible] = useState(true);

    const { movieId } = useParams<{
        movieId: string;
    }>();

    const url1 = `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`;
    const url2 = `https://api.themoviedb.org/3/movie/${movieId}/credits?language=ko-KR`;

    const { data: movie, isPending: isMoviePending, isError: isMovieError} = useCustomFetch<MovieDetail>(url1);
    const { data: credits, isPending: isCreditPending, isError: isCreditError} = useCustomFetch<MovieCredits>(url2);


    if (isMovieError || isCreditError) {
        return (
            <NotFound />
        )
    }

    return (
        <>
        <div className="bg-gradient-to-b from-black to-gray-800 text-white">
            {( isMoviePending || isCreditPending) && (
                <div className="flex items-center justify-center h-dvh">
                    <LoadingSpinner />    
                </div>
            )}
            <div className="relative">
                <MovieDetailCompo movie={movie} />
            </div>

            {/* <div className="pt-5 pl-10 text-2xl font-bold">출연</div>
            <div className="p-10 grid gap-4 grid-cols-2 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-8">
                {cast?.map((cast) => (
                    <CastCard key={cast.id} cast={cast} />
                ))}
            </div> */}
            <div
                className="pt-5 pl-10 text-2xl font-bold cursor-pointer"
                onClick={() => setIsCastVisible(!isCastVisible)} // 클릭 시 토글
            >
                {isCastVisible ? "▼ 출연" : "▶ 출연"}
            </div>
            {isCastVisible && ( // 토글 상태에 따라 렌더링
                <div className="p-10 grid gap-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-8">
                    {credits?.cast.map((cast) => (
                        <CastCard key={cast.id} cast={cast} />
                    ))}
                </div>
            )}
            <div className="pt-5 pl-10 text-2xl font-bold">제작</div>
            <div className="grid pt-5 sm:grid-cols-7 md:grid-cols-8 lg:grid-cols-9 xl:grid-cols-10 gap-4 p-10">
                {credits?.crew.map((crew) => (
                    <CrewCard key={crew.credit_id} crew={crew} />
                ))}
            </div>
        </div>
        </>
    )
};

export default MovieDetailPage;