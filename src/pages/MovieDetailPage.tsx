import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import LoadingSpinner from "../components/Loading";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY; 

const MovieDetailPage = () => {
    const { movieId } = useParams<{ movieId: string }>();
    const [loading, setLoading] = useState<boolean>(true);
    const [movie, setMovie] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const [cast, setCast] = useState<any[]>([]);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            setLoading(true);
            setError(null);

            try {
                // 쿼리 파라미터에 API 키 전달
                const movieResponse = await axios.get(
                      `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR&api_key=${API_KEY}`
                  );

                 const castResponse = await axios.get(
                      `https://api.themoviedb.org/3/movie/${movieId}/credits?language=ko-KR&api_key=${API_KEY}`
                 );

                   setMovie(movieResponse.data);
                  setCast(castResponse.data.cast?.slice(0, 10) || []);
            } catch (err) {
                setError("영화 정보를 불러오는 중 오류가 발생했습니다.");
            } finally {
                setLoading(false);
            }
        };

        fetchMovieDetails();
    }, [movieId]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <LoadingSpinner />
            </div>
        );
    }

    if (error) {
        return <div className="text-red-500 text-center p-4">{error}</div>;
    }

    return (
        <div className="bg-gray-100">
            <div className="flex flex-col lg:flex-row gap-8 p-15">
                {/* 포스터 */}
                <div className="w-full lg:w-1/3">
                    <img
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                        className="w-full max-w-xs rounded-lg shadow-lg"
                    />
                </div>

                {/* 영화 상세 정보 */}
                <div className="w-full lg:w-2/3">
                    <h1 className="text-3xl font-bold">{movie.title}</h1>
                    <br></br>
                    <p className="text-gray-500">
                        {movie.release_date.slice(0, 4)} • {movie.runtime}분 • ⭐ {movie.vote_average}
                    </p>
                    <p className="mt-4 text-gray-700">{movie.overview}</p>
                </div>
            </div>

            {/* 출연진 정보 */}
            {cast.length > 0 && (
                <div className="mt-6 p-8">
                    <h2 className="text-2xl font-bold mb-4">출연진</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {cast.map((actor) => (
                            <div key={actor.id} className="text-center">
                                <img
                                    src={actor.profile_path
                                        ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                                        : "https://via.placeholder.com/100x150?text=No+Image"} // 기본 이미지 추가
                                    alt={actor.name}
                                    className="w-24 h-24 rounded-full mx-auto"
                                />
                                <p className="mt-2 text-sm font-semibold">{actor.name}</p>
                                <p className="text-xs text-gray-500">{actor.character}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default MovieDetailPage;