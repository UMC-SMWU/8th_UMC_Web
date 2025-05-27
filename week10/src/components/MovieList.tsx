import { useState } from "react";
import { Movie } from "../types/movie"
import MovieCard from "./MovieCard";
import MovieModal from "./MovieModal"; // 모달 컴포넌트 import

interface MovieListProps {
    movies: Movie[];
}

const MovieList = ({ movies }: MovieListProps) => {
    const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);

    const selectedMovie = movies.find((movie) => movie.id === selectedMovieId);

    const handleCardClick = (movieId: number) => {
        setSelectedMovieId(movieId);
    };

    const handleCloseModal = () => {
        setSelectedMovieId(null);
    };

    if (movies.length === 0) {
        return (
            <div className="flex h-60 items-center justify-center">
                <p className="font-bold text-gray-500">
                    검색 결과가 없습니다.
                </p>
            </div>
        )
    }
    return (
        <>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {movies.map((movie) => (
                <MovieCard
                    key={movie.id}
                    movie={movie}
                    onClick={() => handleCardClick(movie.id)}
                />
            ))}
        </div>
        {selectedMovie && (
            <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
        )}
        </>
    )
}

export default MovieList
