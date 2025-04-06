import { useParams } from "react-router-dom";
import { MovieDetailResponse } from "../dto/MovieDetailResponse";
import ErrorPage from "./ErrorPage";
import LoadingSpinner from "../components/LoadingSpinner";
import CastCard from "../components/CastCard";
import MovieInfoSection from "../components/MovieInfoSection";
import useCustomFetch from "../hooks/useCustomFetch";
import { MovieCreditResponse } from "../dto/MovieCreditResponse";

export default function MovieDetailPage() {
  const { movieId } = useParams();
  const movieDetailUrl = `https://api.themoviedb.org/3/movie/${movieId}`;
  const movieCreditsUrl = `https://api.themoviedb.org/3/movie/${movieId}/credits`;

  const {
    data: movieDetail,
    isPending: isMovieDetailPending,
    isError: isMovieDetailError,
  } = useCustomFetch<MovieDetailResponse>(movieDetailUrl);
  const {
    data: movieCredits,
    isPending: isMovieCreditsPending,
    isError: isMovieCreditsError,
  } = useCustomFetch<MovieCreditResponse>(movieCreditsUrl);

  if (isMovieDetailPending || isMovieCreditsPending) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (isMovieDetailError || isMovieCreditsError) {
    return <ErrorPage />;
  }

  return (
    <div className="flex-col items-center justify-center min-h-screen">
      {movieDetail && <MovieInfoSection {...movieDetail} />}
      <div className="bg-black grid h-full w-full">
        <h2 className="text-white text-2xl font-bold p-6">출연진</h2>
        <div className="grid xl:grid-cols-8 lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-2 gap-4 p-6">
          {movieCredits?.cast.map((cast) => (
            <CastCard key={cast.id} cast={cast} />
          ))}
        </div>
      </div>
    </div>
  );
}
