import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MovieCast, MovieCredits, MovieCrew, MovieDetail } from "../types/movie";
import { LoadingSpinner } from "../components/LoadingSpinner";
import NotFound from "./not-found";
import CastCard from "../components/CastCard";
import CrewCard from "../components/CrewCard";

const MovieDetailPage = () => {
    const [movie, setMovie] = useState<MovieDetail | null>();
    const [cast, setCast] = useState<MovieCast[]>([]);
    const [crew, setCrew] = useState<MovieCrew[]>([]);
    const [isPending, setIsPending] = useState(false);
    const [isError, setIsError] = useState(false);

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
            {isPending && (
                <div className="flex items-center justify-center h-dvh">
                    <LoadingSpinner />    
                </div>
            )}
            <div>{`제목 : ${movie?.title}`}</div>
            <div>{`제목 : ${movie?.original_title}`}</div>
            <div>{`별점 : ${movie?.vote_average}`}</div>
            <div>{`개봉년도 : ${movie?.release_date}`}</div>
            <div>{`러닝타임 : ${movie?.runtime}`}</div>
            <div>{`tagline : ${movie?.tagline}`}</div>
            <div>{`overview : ${movie?.overview}`}</div>
            <img src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`} alt={`${movie?.title} 영화의 포스터`}/>
            <div>출연</div>
            <div>
                {cast?.map((cast) => (
                    <CastCard key={cast.id} cast={cast} />
                ))}
            </div>
            <div>제작</div>
            <div>
                {crew?.map((crew) => (
                    <CrewCard key={crew.credit_id} crew={crew} />
                ))}
            </div>
        </>
    )
};

export default MovieDetailPage;