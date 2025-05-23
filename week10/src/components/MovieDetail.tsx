import { Movie } from "../types/movie";

interface MovieDetailProps {
  movie: Movie;
  onClose: () => void;
}

const MovieDetail = ({ movie, onClose }: MovieDetailProps) => {
  const imageBaseUrl = "https://image.tmdb.org/t/p/w500";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="relative max-w-4xl w-full mx-4 bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="h-64 bg-black relative">
          {movie.backdrop_path && (
            <img
              src={imageBaseUrl + movie.backdrop_path}
              alt="배경 이미지"
              className="h-full w-full object-cover opacity-70"
            />
          )}
          <button
            className="absolute top-4 right-4 text-white text-2xl font-bold"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        <div className="flex flex-col md:flex-row p-6 gap-6 bg-white">
          <div className="w-full md:w-1/3">
            <img
              src={
                movie.poster_path
                  ? imageBaseUrl + movie.poster_path
                  : "http://via.placeholder.com/640x480"
              }
              alt="포스터"
              className="w-full rounded-lg shadow-md"
            />
          </div>

          <div className="flex-1 text-left">
            <h2 className="text-2xl font-bold">{movie.title}</h2>
            <p className="text-sm text-gray-500 mb-2">
              {movie.original_title} ({movie.original_language.toUpperCase()})
            </p>
            <div className="flex items-center space-x-4 mb-2">
              <span className="text-blue-600 font-bold text-xl">
                {movie.vote_average.toFixed(1)}
              </span>
              <span className="text-sm text-gray-600">
                ({movie.vote_count} 평가)
              </span>
            </div>
            <p className="mb-1">
              <span className="font-semibold">개봉일:</span>{" "}
              {movie.release_date}
            </p>
            <p className="mb-2 font-semibold">줄거리</p>
            <p className="text-sm text-gray-700">
              {movie.overview || "줄거리 정보가 없습니다."}
            </p>

            <div className="mt-4 flex gap-3">
              <a
                href={`https://www.imdb.com/find?q=${encodeURIComponent(
                  movie.title
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                IMDb에서 검색
              </a>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
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

export default MovieDetail;
