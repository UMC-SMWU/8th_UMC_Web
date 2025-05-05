import { Heart } from "lucide-react";
import formatDate from "../utils/formatDate";

interface LpItemProps {
  title: string;
  thumbnail: string;
  createdAt: Date;
  likes: number;
  onClick: () => void;
}

export default function LpItem({
  title,
  thumbnail,
  createdAt,
  likes,
  onClick,
}: LpItemProps) {
  return (
    <div
      className="relative overflow-hidden rounded-lg cursor-pointer transform transition-transform duration-300 hover:scale-105 group aspect-square"
      onClick={() => onClick()}
    >
      <img src={thumbnail} alt={title} className="object-cover w-full h-full" />

      <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-50 transition-opacity duration-300 flex flex-col justify-end items-center px-4 py-4">
        <h1 className="w-full text-white text-sm font-bold">{title}</h1>
        <div className="flex justify-between text-gray-300 text-sm w-full">
          <span className="text-gray-300 text-sm">{formatDate(createdAt)}</span>
          <div className="flex items-center gap-1">
            <Heart color="white" size={12} />
            <span className="text-gray-300 text-sm">{likes}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
