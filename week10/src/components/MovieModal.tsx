import { Movie } from "../types/movie";

interface MovieModalProps {
    movie: Movie;
    onClose: () => void;
}

const MovieModal = ({ movie, onClose }: MovieModalProps) => {
    const imageBaseUrl = 'https://image.tmdb.org/t/p/w500';
    const backdropBaseUrl = 'https://image.tmdb.org/t/p/original';

    const popularityPercent = Math.min(100, Math.round((movie.popularity ?? 0) / 10));

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full relative overflow-hidden">
                <div className="relative h-48 w-full">
                    {movie.backdrop_path && (
                        <img
                            src={backdropBaseUrl + movie.backdrop_path}
                            alt={movie.title}
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                    )}
                    <div className="absolute left-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent w-full px-6 py-4">
                        <div className="text-white">
                            <div className="text-2xl font-bold">{movie.title}</div>
                            <div className="text-sm opacity-80">{movie.original_title}</div>
                        </div>
                    </div>
                    <button
                        className="absolute top-2 right-2 text-white bg-black/40 rounded-full w-8 h-8 flex items-center justify-center hover:bg-black/70"
                        onClick={onClose}
                    >
                        ✕
                    </button>
                </div>
                <div className="flex gap-6 p-6">
                    {movie.poster_path && (
                        <img
                            src={imageBaseUrl + movie.poster_path}
                            alt={movie.title}
                            className="w-40 h-60 object-cover rounded shadow"
                        />
                    )}
                    <div className="flex-1 flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                            <span className="text-yellow-400 text-lg">★</span>
                            <span className="font-bold">{movie.vote_average?.toFixed(1)}</span>
                            <span className="text-gray-500 text-sm">({movie.vote_count?.toLocaleString()}개 평가)</span>
                        </div>
                        <div className="text-sm text-gray-700">개봉일: {movie.release_date}</div>
                        <div className="text-sm text-gray-700 flex items-center gap-2">
                            인기도:
                            <div className="w-32 bg-gray-200 rounded h-3 overflow-hidden">
                                <div
                                    className="bg-blue-500 h-3 w-full"
                                    style={{ width: `${popularityPercent}%` }}
                                />
                            </div>
                            <span className="text-xs text-gray-500">{popularityPercent}%</span>
                        </div>
                        <div className="mt-2 text-gray-800 text-sm line-clamp-5">{movie.overview}</div>
                        <div className="flex gap-2">
                            <a
                                href={`https://www.themoviedb.org/movie/${movie.id}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-3 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-center text-sm font-semibold"
                                >
                                TMDB에서 자세히 보기
                            </a>
                            <button 
                                className="mt-3 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-center text-sm font-semibold"
                                onClick={onClose}
                            >
                                닫기
                            </button>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieModal;