import { useEffect, useState } from "react"
import { Movie, MovieResponse } from "../types/movie";
import axios from "axios";
import MovieCard from "../components/MovieCard";

const MoviePage = () => {
    const [movies, setMovies] = useState<Movie[]>([]);

    // 최초 실행
    useEffect(() => {
        const fetchMovies = async () => {
            // 응답에 대한 타입 정의
            const { data } = await axios.get<MovieResponse>(
                `https://api.themoviedb.org/3/movie/popular?language=en-US&page=1`,
                {
                    headers: {
                        Authorization: `Bearer ${import.meta.env.VITE_MOVIE_API_KEY}`,
                    },
                }
            );
            console.log(data);
            setMovies(data.results);
        };

        fetchMovies();
    }, []);

    return (
        <div className="p-10 grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {movies?.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
            ))}
        </div>
    );
};

export default MoviePage