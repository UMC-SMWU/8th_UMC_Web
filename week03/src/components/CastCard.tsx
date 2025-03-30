import { MovieCast } from "../types/movie";

interface CastCardProps {
    cast: MovieCast;
}

export default function CastCard({ cast }: CastCardProps) { 
    return (
        <>
            <div key={cast.id}>
                <img src={`https://image.tmdb.org/t/p/w200/${cast.profile_path}`} alt={`${cast.name} 배우의 프로필 사진`}/>
                <div>{`이름 : ${cast.name}`}</div>
                <div>{`이름 : ${cast.original_name}`}</div>
                <div>{`배역 : ${cast.character}`}</div>
            </div>
        </>
    )
}
