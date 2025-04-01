import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MovieCast, MovieCredits, MovieCrew, MovieDetail } from "../types/movie";
import { LoadingSpinner } from "../components/LoadingSpinner";
import NotFound from "./not-found";
import CastCard from "../components/CastCard";
import CrewCard from "../components/CrewCard";
import MovieDetailCompo from "../components/MovieDetailCompo";

const MovieDetailPage = () => {
    const [movie, setMovie] = useState<MovieDetail>();
    const [cast, setCast] = useState<MovieCast[]>([]);
    const [crew, setCrew] = useState<MovieCrew[]>([]);
    const [isPending, setIsPending] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isCastVisible, setIsCastVisible] = useState(true);

    const { movieId } = useParams<{
        movieId: string;
    }>();


    useEffect(() => {
        const fetchDetail = async () => {
            setIsPending(true); // 데이터 요청 시작 시 로딩 활성화
            // 응답에 대한 타입 정의
            try {
                const { data } = await axios.get<MovieDetail>(
                    `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`,
                    {
                        headers: {
                            Authorization: `Bearer ${import.meta.env.VITE_MOVIE_API_KEY}`,
                        },
                    }
                );
                setMovie(data);
            } catch{
                setIsError(true);
            } finally {
                setIsPending(false); // 모든 구문에 공통으로 들어가야 할 사항
            }
        };

        fetchDetail();
    },[movieId]);

    useEffect(() => {
        const fetchCredit = async () => {
            setIsPending(true);
            try {
                const { data } = await axios.get<MovieCredits>(
                    `https://api.themoviedb.org/3/movie/${movieId}/credits?language=ko-KR`,
                    {
                        headers: {
                            Authorization: `Bearer ${import.meta.env.VITE_MOVIE_API_KEY}`,
                        },
                    }
                );
                setCast(data.cast);
                setCrew(data.crew);
            } catch  {
                setIsError(true);
            } finally {
                setIsPending(false);
            }
        };

        fetchCredit();
    },[movieId]);

    if (isError) {
        return (
            <NotFound />
        )
    }

    return (
        <>
        <div className="bg-gradient-to-b from-black to-gray-800 text-white">
            {isPending && (
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
                    {cast?.map((cast) => (
                        <CastCard key={cast.id} cast={cast} />
                    ))}
                </div>
            )}
            <div className="pt-5 pl-10 text-2xl font-bold">제작</div>
            <div className="grid pt-5 sm:grid-cols-7 md:grid-cols-8 lg:grid-cols-9 xl:grid-cols-10 gap-4 p-10">
                {crew?.map((crew) => (
                    <CrewCard key={crew.credit_id} crew={crew} />
                ))}
            </div>
        </div>
        </>
    )
};

export default MovieDetailPage;