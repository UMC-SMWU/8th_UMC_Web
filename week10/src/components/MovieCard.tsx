import { Movie } from "../types/movie"

interface MovieCardProps {
    movie: Movie;
}

const MovieCard = ({ movie }:  MovieCardProps) => {
    const imageBaseUrl = 'https://image.tmdb.org/t/p/w500';
    const fallbackImage = 'https://via.placeholder.com/500x750?text=No+Image+Available';
  
    return (
        <div className="cursor-pointer bg-white rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg bg-white">
            <div className="relative h-80 overflow-hidden">
                <img 
                    src={movie.poster_path ? `${imageBaseUrl}${movie.poster_path}` : fallbackImage} 
                    alt={movie.title}
                    className="w-full h-full object-cover transition-transform duration-300 transform hover:scale-105 ease-in-out"
                />
                <div className="bg-black absolute right-2 top-2 rounded-md bg-black-500 px-2 py-1 text-sm font-bold text-white">
                    {movie.vote_average.toFixed(1)}
                </div>
            </div>

            <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{movie.title}</h3>
                <p className="text-sm text-gray-600 mb-2">{movie.release_date} | {movie.original_language}</p>
                <p className="text-sm text-gray-700 line-clamp-3">{movie.overview}</p>
            </div>
        </div>
    )
}

export default MovieCard