import { IoMdHeart } from "react-icons/io";
import { Lp } from "../../types/lp"

interface LpCardProps {
    lp: Lp;
    onClick: (lpId: number) => void;
}

const LpCard = ({lp, onClick}: LpCardProps) => {
  return (
    <div 
        key={lp.id}
        className="relative w-full pb-[100%] rounded overflow-hidden group 
        hover:scale-120 transition-transform duration-300 hover:z-10"
        onClick={() => onClick(lp.id)}
    >
        <img
        src={lp.thumbnail || "https://media.istockphoto.com/id/1408806884/photo/12-inch-vinyl-lp-record-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=RF9dJiOjNmu4pmLSnNWITncbOspZ7BYvTyAQis_OK1U="}
        alt={lp.title}
        className="absolute top-0 left-0 w-full h-full object-cover bg-gray-300"
        />

        <div 
            className="absolute top-0 left-0 w-full h-full bg-black/50 flex flex-col 
            justify-end p-2 gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
            <h3 className="text-white text-md font-bold">{lp.title}</h3>
            <div className="flex justify-between text-gray-300 text-sm w-full ">
                <p>{lp.createdAt.split("T")[0]}</p>
                <p className="flex items-center gap-1"> <IoMdHeart /> {lp.likes.length}</p>
            </div>
        </div>
    </div>
  )
}

export default LpCard