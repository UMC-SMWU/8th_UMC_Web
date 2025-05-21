import { useModalActions, useModalInfo } from "../hooks/useModalStore.ts";
import { X } from "lucide-react";

const Modal = () => {
  const { isOpen, movie } = useModalInfo();
  const { closeModal } = useModalActions();

  if (!isOpen || !movie) return null;

  const baseImageUrl = "https://image.tmdb.org/t/p/w500";
  const fallbackImageUrl = "https://placehold.co/600x400";
  const imageUrl = movie.poster_path
    ? `${baseImageUrl}${movie.poster_path}`
    : fallbackImageUrl;
  const backdropImageUrl = `${baseImageUrl}${movie.backdrop_path}`;

  const handleSearch = () => {
    window.open(`https://www.imdb.com/find?q=${movie.title}`, "_blank");
  };

  return (
    <div
      className={`fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4`}
      onClick={closeModal}
    >
      <div
        className={`bg-white rounded-lg shadow-lg max-w-2xl w-full overflow-hidden`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* 상단 이미지 배너 */}
        <div className={`relative w-full h-64 overflow-hidden`}>
          <img
            src={backdropImageUrl}
            alt={movie.title}
            className={`w-full h-full object-cover`}
          />
          <X
            className={`absolute text-white top-0 right-0 m-4`}
            onClick={closeModal}
          />
          <div className={`absolute bottom-0 left-0 text-white p-4`}>
            <h2 className={`text-xl font-bold`}>{movie.title}</h2>
            <p>{movie.original_title}</p>
          </div>
        </div>

        {/* 영화 상세 정보 */}
        <div className={`flex justify-between w-full space-x-4 p-4`}>
          <img
            src={imageUrl}
            alt={movie.title}
            className={`w-40 h-60 object-cover rounded-lg shadow-lg`}
          />
          <div className={`flex-1 flex-col space-y-2`}>
            <div className={`flex items-center space-x-2`}>
              <span className={`text-blue-600 font-semibold`}>
                평점 {movie.vote_average || "N/A"}
              </span>
              <span className={`text-gray-500`}>
                ({movie.vote_count || 0}명)
              </span>
            </div>
            <h2 className={`text-xl font-bold`}>{movie.title}</h2>
            <p className={`text-sm font-semibold text-gray-600`}>
              개봉일 {movie.release_date}
            </p>
            <p className={`text-gray-700 text-sm`}>{movie.overview}</p>

            {/* 하단 버튼 */}
            <div className={`flex justify-start space-x-2 text-sm mt-4`}>
              <button
                className={`cursor-pointer px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600`}
                onClick={handleSearch}
              >
                IMDB에서 검색
              </button>
              <button
                onClick={closeModal}
                className={`cursor-pointer px-4 py-2 border border-blue-500 rounded-md text-blue-500`}
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

export default Modal;
