import { useParams } from 'react-router-dom';
import useCustomFetch from '../hooks/useCustomFetch';
import { MovieDetailResponse, CreditResponse, ProductionCompany } from '../types/movie';
import { LoadingSpinner } from '../components/LoadingSpinner';

const MovieDetailPage = () => {
  const { movieId } = useParams();

  const movieUrl = `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`;
  const creditUrl = `https://api.themoviedb.org/3/movie/${movieId}/credits?language=ko-KR`;

  const { isPending: movieLoading, isError: movieError, data: movie } = useCustomFetch<MovieDetailResponse>(movieUrl);
  const { isPending: creditLoading, isError: creditError, data: credits } = useCustomFetch<CreditResponse>(creditUrl);

  if (movieLoading || creditLoading) {
    return (
      <div className="flex items-center justify-center h-dvh">
        <LoadingSpinner />
      </div>
    );
  }

  if (movieError || creditError || !movie || !credits) {
    return <div className="text-red-500 text-center text-xl mt-10">영화 정보를 불러오는 데 실패했습니다.</div>;
  }

  const director = credits.crew.find((person) => person.job === "Director");
  const topCast = credits.cast.slice(0, 5);

  return (
    <div className="p-10 max-w-4xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
          alt={movie.title}
          className="rounded-xl shadow-md w-full md:w-auto"
        />
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">{movie.title}</h1>
          <p className="text-gray-500">{movie.release_date} | ⭐ {movie.vote_average}</p>
          <p className="text-gray-600">{movie.overview}</p>
          <p><strong>상영 시간:</strong> {movie.runtime}분</p>
          <p><strong>감독:</strong> {director?.name ?? "정보 없음"}</p>
          <p><strong>장르:</strong> {movie.genres.map((g) => g.name).join(', ')}</p>
          <p><strong>제작사:</strong> {movie.production_companies.map((c) => c.name).join(', ')}</p>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-3">주요 출연진</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {topCast.map((actor: {
            id: number;
            name: string;
            character: string;
            profile_path: string | null;
          }) => (
            <div key={actor.id} className="text-center">
              <img
                src={
                  actor.profile_path
                    ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                    : "https://via.placeholder.com/200x300?text=No+Image"
                }
                alt={actor.name}
                className="rounded-lg shadow-md mx-auto"
              />
              <p className="mt-2 font-medium text-sm">{actor.name}</p>
              <p className="text-xs text-gray-500">{actor.character}</p>
            </div>
          ))
          }
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;
