import type { Movie } from "../types/movie.ts";

interface MovieCardProps {
  movie: Movie;
}

const MovieCard = ({ movie }: MovieCardProps) => {
  const baseImageUrl = "https://image.tmdb.org/t/p/w500";
  const fallbackImageUrl = "https://placehold.co/600x400";
  const imageUrl = movie.poster_path
    ? `${baseImageUrl}${movie.poster_path}`
    : fallbackImageUrl;

  return (
    <div
      className={`cursor-pointer overflow-hidden rounded-lg bg-white shadow-md transition-all hover:shadow-lg`}
    >
      <div className={`relative h-80 overflow-hidden`}>
        <img
          src={imageUrl}
          alt={movie.title}
          className={`h-full w-full object-cover transition-transform duration-300 ease-in-out hover:scale-105`}
        />
        <div
          className={`absolute right-2 top-2 rounded-md bg-blue-500 px-2 py-1 text-sm font-bold text-white`}
        >
          {movie.vote_average.toFixed(1)}
        </div>
      </div>
      <div
        className={`flex flex-col p-4 text-gray-600 space-y-2 justify-center items-center`}
      >
        <h3 className={`text-lg font-bold text-gray-700`}>{movie.title}</h3>
        <p className={`text-sm`}>
          {movie.release_date} | {movie.original_language.toUpperCase()}
        </p>
        <p className={`text-sm`}>
          {movie.overview.length > 100
            ? `${movie.overview.slice(0, 100)}...`
            : movie.overview}
        </p>
      </div>
    </div>
  );
};

export default MovieCard;
