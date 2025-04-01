import { Cast } from "../dto/MovieCreditResponse";

interface CastCardProps {
  cast: Cast;
}

export default function CastCard({ cast }: CastCardProps) {
  return (
    <div className="flex flex-col items-center">
      <img
        className="w-36 h-36 rounded-full object-cover"
        src={
          cast.profile_path
            ? `https://image.tmdb.org/t/p/w500${cast.profile_path}`
            : "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
        }
        alt={`${cast.name} 사진`}
      />
      <p className="text-white mt-2 text-center">{cast.name}</p>
      <p className="text-gray-300 text-center">{cast.character}</p>
    </div>
  );
}
