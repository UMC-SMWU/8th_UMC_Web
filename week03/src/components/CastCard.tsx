import { MovieCast } from "../types/movie";
import profileSvg from "../assets/profile.svg";

interface CastCardProps {
    cast: MovieCast;
}

export default function CastCard({ cast }: CastCardProps) { 
    return (
        <>
            <div key={cast.id} className="flex flex-col items-center justify-center p-2 bg-gray-800 rounded-lg text-white">
                <img 
                    src={cast.profile_path ? `https://image.tmdb.org/t/p/original/${cast.profile_path}` : profileSvg}
                    className="rounded-full w-32 h-32 object-cover mb-2 bg-black text-black"                    
                />
                <div 
                    className="flex justify-center text-md font-bold"
                >
                    {cast.name}
                </div>
                <div
                    className="flex justify-center text-sm text-gray-500"
                >
                    {cast.character}
                </div>
            </div>
        </>
    )
}
