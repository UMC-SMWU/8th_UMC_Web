import { Genre } from "../dto/MovieDetailResponse";

interface MovieInfoSectionProps {
  title: string;
  poster_path: string;
  release_date: string;
  runtime: number;
  overview: string;
  vote_average: number;
  genres: Genre[];
}

export default function MovieInfoSection(data: MovieInfoSectionProps) {
  return (
    <section className="relative w-full flex items-center justify-center h-[400px]">
      <img
        className="absolute inset-0 w-full h-full object-cover opacity-60"
        src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
        alt={`${data.title} 포스터`}
      />
      <div
        className="relative w-full text-white p-6 h-[400px]
          bg-gradient-to-t from-black to-transparent"
      >
        <h1 className="text-3xl font-bold mt-20">{data.title}</h1>
        <ul className="mt-5">
          <li>개봉일: {data.release_date}</li>
          <li>상영 시간: {data.runtime}분</li>
          <li>평점: {data.vote_average}</li>
        </ul>
        <p className="text-gray-300 mt-3">{data.overview}</p>

        <div className="flex gap-3 mt-4">
          {data.genres?.map((genre) => (
            <span
              key={genre.id}
              className="bg-gray-700 px-3 py-1 rounded-full text-sm"
            >
              {genre.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
