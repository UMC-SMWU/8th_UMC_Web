import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useUpdateComment } from "../../hooks/mutations/useUpdateComment";
import { useDeleteComment } from "../../hooks/mutations/useDeleteComment";
import { Comment } from "../../types/comment";
import { Pencil, Trash2 } from "lucide-react";

interface CommentItemProps {
  lpId: number;
  comment: Comment;
}

const CommentItem = ({ comment, lpId }: CommentItemProps) => {
  const { user } = useAuth();
  const isMine = user?.id === comment.author.id;

  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);
  const [menuOpen, setMenuOpen] = useState(false);

  const { mutate: updateComment, isPending: isUpdating } = useUpdateComment();
  const { mutate: deleteComment, isPending: isDeleting } = useDeleteComment();

  const handleSave = () => {
    updateComment({ commentId: comment.id, lpId, content: editedContent });
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm("정말로 댓글을 삭제하시겠습니까?")) {
      deleteComment({ commentId: comment.id, lpId });
    }
  };

  return (
    <div className="text-white border-b border-gray-700 py-3 relative">
      <div className="flex justify-between items-start">
        <span className="font-semibold">{comment.author.name}</span>

        {isMine && (
          <div className="relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-400 hover:text-white text-xl px-2"
            >
              ⋯
            </button>

            {menuOpen && (
              <div className="absolute right-0 mt-1 flex items-center bg-[#2f2f2f] px-2 py-1 rounded-lg shadow z-10 gap-2">
                <button onClick={() => {
                  setIsEditing(true);
                  setMenuOpen(false);
                }}>
                  <Pencil size={18} className="text-white hover:text-pink-400" />
                </button>
                <button onClick={handleDelete} disabled={isDeleting}>
                  <Trash2 size={18} className="text-white hover:text-red-400" />
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {isEditing ? (
        <div className="mt-2">
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            className="w-full bg-black border border-gray-600 rounded p-2 text-sm"
            rows={2}
          />
          <div className="flex justify-end mt-2 gap-2">
            <button
              onClick={handleSave}
              disabled={isUpdating}
              className="text-sm text-pink-400"
            >
              저장
            </button>
            <button
              onClick={() => {
                setIsEditing(false);
                setEditedContent(comment.content);
              }}
              className="text-sm text-gray-400"
            >
              취소
            </button>
          </div>
        </div>
      ) : (
        <p className="mt-1 text-sm text-gray-300 whitespace-pre-wrap">
          {comment.content}
        </p>
      )}
    </div>
  );
};

export default CommentItem;
