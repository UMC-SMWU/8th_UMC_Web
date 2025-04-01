import { useEffect, useState } from 'react';
import { Movie, MovieResponse } from '../types/movie';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Pagination from '../components/Pagination';
import LoadingSpinner from '../components/Loading';

const MoviesPage = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [movies, setMovies] = useState<Movie[]>([]);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    const [error, setError] = useState<string | null> (null);
    const navigate = useNavigate();
    const limit = 15;

    useEffect(() => {
        const fetchMovies = async () => {
            setLoading(true); // 로딩 시작
            setError(null);

            try { 
                const { data } = await axios.get<MovieResponse>(
                    `https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=${page}`,
                    {
                        headers: {
                            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMGE4NDVjYjUwN2Q4ZGY4NjA2NjQ3OTlhZDQ4MjhkMyIsIm5iZiI6MTcxOTY0NDk3OS43NjQ5OTk5LCJzdWIiOiI2NjdmYjMzMzRjMTc3N2UyNjM4YWExM2QiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.-anBEv37aZRQFhXbYbggV9RnFlHpdLh7FnhMU56f4M8`,
                        },
                    }
                );
                setMovies(data.results.slice(0, limit));
                setTotalResults(data.total_results);
            } catch (err) {
                setError("오류가 발생했습니다")
            } finally {
                setLoading(false);
            }
                
            };
            
        fetchMovies();
    }, [page]);

    return (
        <div className="p-8 bg-white min-h-screen">
            <Pagination totalResults={totalResults} page={page} setPage={setPage} />
            {/* 에러 메시지 */}
            {error && (
                <div className = "text-red-500 text-center text-lg p-4 bg-red-100 border border-red-400 rounded">
                    {error}
                </div>
            )}
            {loading ? ( // 로딩 중일 때 스피너 표시
                <div className="flex justify-center items-center h-64">
                    <LoadingSpinner />
                </div>
            ) : ( // 로딩이 끝난 후 영화 목록 표시
                <div className="grid grid-cols-5 gap-6">
                    {movies.map((movie) => (
                        <div key={movie.id} className="relative group rounded-xl shadow-lg overflow-hidden"
                        onClick={() => navigate(`/movies/${movie.id}`)}   >
                            {/* 영화 포스터 */}
                            <img
                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                alt={movie.title}
                                className="w-full h-auto transition-transform duration-300 group-hover:scale-105"
                            />
                            {/* Hover 때 보이는 정보 */}
                            <div className="absolute inset-0 flex flex-col justify-start bg-black/60 opacity-0 group-hover:opacity-100 backdrop-blur-md p-4 transition-all duration-300">
                                <h2 className="text-lg font-semibold text-white">{movie.title}</h2>
                                <p className="text-sm text-gray-300 line-clamp-10">{movie.overview}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MoviesPage;