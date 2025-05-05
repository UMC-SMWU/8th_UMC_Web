import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Lp } from "../types/lp";
import { timeAgo } from "../utils/timeAgo";

interface LpCardProps {
  lp: Lp;
}

const LpCard: FC<LpCardProps> = ({ lp }) => {
  const navigate = useNavigate();
  const { accessToken } = useAuth();

  const handleClick = () => {
    if (!accessToken) {
      alert("로그인이 필요한 서비스입니다. 로그인을 해주세요!");
      navigate("/login");
      return;
    }
    navigate(`/lp/${lp.id}`);
  };

  return (
    <div
      className="relative group cursor-pointer overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
      onClick={handleClick}
    >
      {/* 이미지 */}
      <img
        src={lp.thumbnail}
        alt={lp.title}
        className="w-full h-[250px] object-cover"
      />

      {/* 오버레이: hover 시에만 등장 */}
      <div className="absolute inset-0 bg-black/60 flex flex-col justify-center items-center text-white text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <h1 className="text-lg font-bold">{lp.title}</h1>
        <p className="text-sm mt-1">{timeAgo(lp.createdAt)}</p>
        <p className="text-sm mt-1">❤️ {lp.likes.length}</p>
      </div>
    </div>
  );
};

export default LpCard;



