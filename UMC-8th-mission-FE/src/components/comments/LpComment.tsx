import { MdPerson } from "react-icons/md";
import type { LpComment } from "../../types/lp";

interface LpCommentProps {
  comment: LpComment;
}

const LpComment = ({ comment }: LpCommentProps) => {
  return (
    <div className="flex gap-4 p-4 border-b border-gray-700">
      {comment.author.avatar ? (
        <img
          src={comment.author.avatar}
          alt={comment.author.name}
          className="w-10 h-10 rounded-full object-cover"
        />
      ) : (
        <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
          <MdPerson className="text-gray-300 text-xl" />
        </div>
      )}
      <div>
        <p className="text-sm font-bold text-white">{comment.author.name}</p>
        <p className="text-sm text-gray-300">{comment.content}</p>
      </div>
    </div>
  );
};

export default LpComment;
