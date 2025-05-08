import { useState } from "react";
import { usePostComment } from "../../hooks/mutations/usePostComment";
import { useAuth } from "../../context/AuthContext";

interface CommentInputProps {
  lpId: number;
}

const CommentInput = ({ lpId }: CommentInputProps) => {
  const { user } = useAuth();
  const [content, setContent] = useState("");

  const { mutate: postComment, isPending } = usePostComment();

  const handleSubmit = () => {
    if (!content.trim()) return;
    postComment({ lpId, content });
    setContent("");
  };

  if (!user) return null;

  return (
    <div className="mt-4 border rounded-md border-gray-600 p-4 bg-[#1f1f1f]">
      <textarea
        className="w-full bg-transparent text-sm text-white resize-none focus:outline-none"
        rows={3}
        placeholder="댓글을 입력하세요"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        disabled={isPending}
      />
      <button
        onClick={handleSubmit}
        disabled={isPending || !content.trim()}
        className={`mt-2 px-3 py-1 text-sm rounded ${
          !content.trim() || isPending
            ? "bg-gray-700 opacity-50 cursor-not-allowed"
            : "bg-pink-500 hover:bg-pink-600 text-white"
        }`}
      >
        등록
      </button>
    </div>
  );
};

export default CommentInput;


  