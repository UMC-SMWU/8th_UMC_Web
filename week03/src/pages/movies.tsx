import { useEffect, useState } from "react"
import { Movie, MovieResponse } from "../types/movie";
import axios from "axios";

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

            setMovies(data.results);
        };

        fetchMovies();
    }, []);

    return (
        <ul>
            {/* optional chain 이용 */}
            {movies?.map((movie) => (
                <li key={movie.id}>
                    <h1>{movie.title}</h1>
                </li>
            ))}
        </ul>
    );
};

export default MoviePage