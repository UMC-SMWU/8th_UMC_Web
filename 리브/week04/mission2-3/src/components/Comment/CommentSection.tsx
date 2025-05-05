import { useState } from "react";
import CommentList from "./CommentList";
import CommentInput from "./CommentInput";

interface CommentSectionProps {
  lpId: number;
}

const CommentSection = ({ lpId }: CommentSectionProps) => {
  const [order, setOrder] = useState<"asc" | "desc">("desc");

  return (
    <div className="w-full">
      {/* 정렬 및 작성창 */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-white text-lg font-bold">댓글</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setOrder("asc")}
            className={`text-sm px-3 py-1 rounded-md border ${order === "asc" ? "bg-white text-black" : "text-white border-white"}`}
          >
            오래된순
          </button>
          <button
            onClick={() => setOrder("desc")}
            className={`text-sm px-3 py-1 rounded-md border ${order === "desc" ? "bg-white text-black" : "text-white border-white"}`}
          >
            최신순
          </button>
        </div>
      </div>

      {/* 작성란 (기능 없음) */}
      <CommentInput />

      {/* 댓글 리스트 */}
      <CommentList lpId={lpId} order={order} />
    </div>
  );
};

export default CommentSection;
