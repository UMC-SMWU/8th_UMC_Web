import { useParams } from "react-router-dom";
import { MovieDetailResponse } from "../dto/MovieDetailResponse";
import axios from "axios";
import { useEffect, useState } from "react";
import ErrorPage from "./ErrorPage";
import LoadingSpinner from "../components/LoadingSpinner";
import { Cast, MovieCreditResponse } from "../dto/MovieCreditResponse";
import CastCard from "../components/CastCard";
import MovieInfoSection from "../components/MovieInfoSection";

export default function MovieDetailPage() {
  const { movieId } = useParams();
  const [movieDetail, setMovieDetail] = useState<MovieDetailResponse>(
    {} as MovieDetailResponse
  );
  const [credits, setMovieCredits] = useState<Cast[]>([]);
  const [isPending, setIsPending] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchMovieDetail = async () => {
      setIsPending(true);
      try {
        const [movieDetailRes, movieCreditsRes] = await Promise.all([
          axios.get<MovieDetailResponse>(
            `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`,
            {
              headers: {
                Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
              },
            }
          ),
          axios.get<MovieCreditResponse>(
            `https://api.themoviedb.org/3/movie/${movieId}/credits?language=ko-KR`,
            {
              headers: {
                Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
              },
            }
          ),
        ]);

        setMovieDetail(movieDetailRes.data);
        setMovieCredits(movieCreditsRes.data.cast);
      } catch {
        setIsError(true);
      } finally {
        setIsPending(false);
      }
    };
    fetchMovieDetail();
  }, [movieId]);

  return (
    <>
      {isPending ? (
        <div className="flex items-center justify-center h-screen">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="flex-col items-center justify-center min-h-screen">
          <MovieInfoSection {...movieDetail} />
          <div className="bg-black grid h-full w-full">
            <h2 className="text-white text-2xl font-bold p-6">출연진</h2>
            <div className="grid xl:grid-cols-8 lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-2 gap-4 p-6">
              {credits.map((cast) => (
                <CastCard key={cast.id} cast={cast} />
              ))}
            </div>
          </div>
        </div>
      )}
      {isError && <ErrorPage />}
    </>
  );
}
