import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { LoadingSpinner } from "../components/LoadingSpinner";

interface MovieDetail {
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  genres: { id: number; name: string }[];
  runtime: number;
}

interface CreditResponse {
  cast: { id: number; name: string; character: string; profile_path: string | null }[];
  crew: { id: number; name: string; job: string }[];
}

export default function MovieDetailPage(): React.ReactElement {
  const { movieId } = useParams();
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [credits, setCredits] = useState<CreditResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setIsLoading(true);
      try {
        const [movieRes, creditRes] = await Promise.all([
          axios.get<MovieDetail>(
            `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`,
            {
              headers: {
                Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
              },
            }
          ),
          axios.get<CreditResponse>(
            `https://api.themoviedb.org/3/movie/${movieId}/credits?language=ko-KR`,
            {
              headers: {
                Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
              },
            }
          ),
        ]);

        setMovie(movieRes.data);
        setCredits(creditRes.data);
      } catch (err) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-dvh">
        <LoadingSpinner />
      </div>
    );
  }

  if (isError || !movie || !credits) {
    return <div className="text-red-500 text-2xl text-center">영화 정보를 불러오는 데 실패했습니다.</div>;
  }

  const director = credits.crew.find((person) => person.job === "Director");
  const mainCast = credits.cast.slice(0, 5); // 주연 5명

  return (
    <div className="p-10 max-w-4xl mx-auto space-y-6">
      <div className="flex gap-6">
        <img
          src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
          alt={movie.title}
          className="rounded-xl shadow-lg"
        />
        <div>
          <h1 className="text-3xl font-bold">{movie.title}</h1>
          <p className="text-gray-500">{movie.release_date} · ⭐ {movie.vote_average}</p>
          <p className="mt-2 text-gray-600">{movie.overview}</p>
          <p className="mt-2"><strong>상영시간:</strong> {movie.runtime}분</p>
          <p><strong>장르:</strong> {movie.genres.map(g => g.name).join(", ")}</p>
          <p><strong>감독:</strong> {director?.name}</p>
        </div>
      </div>
      <div>
        <h2 className="text-2xl font-semibold mb-2">출연</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {mainCast.map((actor) => (
            <div key={actor.id} className="text-center">
              <img
                src={
                  actor.profile_path
                    ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                    : "https://via.placeholder.com/200x300?text=No+Image"
                }
                alt={actor.name}
                className="rounded-lg shadow-md w-full"
              />
              <p className="mt-1 text-sm font-medium">{actor.name}</p>
              <p className="text-xs text-gray-500">{actor.character}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
