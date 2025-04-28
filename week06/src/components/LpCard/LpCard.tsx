import dayjs from "dayjs";
import "dayjs/locale/ko";
import LpCardSkeleton from "./LpCardSkeleton";

type LpCardProps = {
  lp: {
    id: number;
    title: string;
    thumbnail: string;
    createdAt: string;
    likes: { id: number }[];
  };
  onClick: (lpId: number) => void;
};

const LpCard = ({ lp, onClick }: LpCardProps) => {
  return (
    <div
      onClick={() => onClick(lp.id)}
      className="relative overflow-hidden rounded-lg shadow-md cursor-pointer transition-transform transform hover:scale-110"
    >
      <img
        src={lp.thumbnail}
        alt={lp.title}
        className="w-full h-60 object-cover"
      />
      <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center p-4 text-center">
        <h2 className="text-lg font-bold mb-2">{lp.title}</h2>
        <p className="text-sm text-gray-300">
          {dayjs(lp.createdAt).locale("ko").format("YYYY.MM.DD")}
        </p>
        <p className="text-sm mt-1">❤️ {lp.likes.length}개</p>
      </div>
    </div>
  );
};

export default LpCard;