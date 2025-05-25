import { Movie } from "../types/movie";

interface MovieModalProps {
  movie: Movie;
  onClose: () => void;
}

const MovieModal = ({ movie, onClose }: MovieModalProps) => {
  const imageBaseUrl = "https://image.tmdb.org/t/p/w500";

  const handleIMDBSearch = () => {
    const query = encodeURIComponent(movie.title || movie.original_title);
    window.open(`https://www.imdb.com/find?q=${query}`, "_blank");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
      <div className="bg-white rounded-lg max-w-3xl w-full p-6 relative">
        {/* 닫기 버튼 */}
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl font-bold">×</button>

        {/* 상단 배경 + 제목 */}
        <div className="mb-6 relative">
          <img src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} alt="backdrop" className="w-full h-56 object-cover rounded-lg" />
          <div className="absolute bottom-4 left-4 text-white">
            <h2 className="text-2xl font-bold">{movie.title}</h2>
            <p className="text-sm">{movie.original_title}</p>
          </div>
        </div>

        {/* 하단 콘텐츠 */}
        <div className="flex gap-6">
          <img src={movie.poster_path ? `${imageBaseUrl}${movie.poster_path}` : "https://via.placeholder.com/640x480"} alt="poster" className="w-32 h-48 rounded shadow-md" />

          <div className="flex-1">
            <div className="text-blue-500 font-bold text-lg">
              {movie.vote_average.toFixed(1)}{" "}
              <span className="text-sm text-gray-500">({movie.vote_count} 평가)</span>
            </div>

            <div className="mt-2 text-sm text-gray-600">개봉일: {movie.release_date}</div>
            <div className="mt-2 text-sm text-gray-600">인기: {movie.popularity}</div>

            <div className="mt-4 text-sm text-gray-700 leading-relaxed">
              {movie.overview || "줄거리가 제공되지 않습니다."}
            </div>

            <div className="mt-4 flex gap-2">
              <button onClick={handleIMDBSearch} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded text-sm">
                IMDb에서 검색
              </button>
              <button onClick={onClose} className="border border-gray-300 hover:bg-gray-100 px-4 py-2 rounded text-sm">
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
