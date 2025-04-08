import { MovieDetail } from "../types/movie";

interface MovieDetailProps {
    movie?: MovieDetail | null;
}

export default function MovieDetailCompo({ movie }: MovieDetailProps) {
    return (
        <>
        <img
            className="object-cover w-full h-[400px] sm:h-[500px]" 
            src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
            alt={`${movie?.title} 영화의 포스터`}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent 
        flex flex-col text-white p-8">
            <div className="text-4xl font-bold">{movie?.title}</div>
            <div className="pt-1 font-bold">{movie?.original_title}</div>
            <div>{`⭐ ${movie?.vote_average}`}</div>
            <div>{`개봉일 ${movie?.release_date}`}</div>
            <div>{`${movie?.runtime} 분`}</div>
            <div className="text-2xl font-bold italic p-5">{`" ${movie?.tagline} "`}</div>
            <div className="text-sm max-w-[30%] break-words">{movie?.overview}</div>
        </div>
        </>
    )
};
