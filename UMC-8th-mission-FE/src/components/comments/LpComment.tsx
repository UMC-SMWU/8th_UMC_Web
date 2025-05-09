import { MdCheck, MdDelete, MdEdit, MdPerson } from "react-icons/md";
import type { LpComment } from "../../types/lp";
import useGetMyInfo from "../../hooks/queries/useGetMyInfo";
import { useAuth } from "../../context/AuthContext";
import { CiMenuKebab } from "react-icons/ci";
import { useState } from "react";
import usePatchComment from "../../hooks/mutations/usePatchComment";
import useDeleteComment from "../../hooks/mutations/useDeleteComment";

interface LpCommentProps {
  comment: LpComment;
}

const LpComment = ({ comment }: LpCommentProps) => {
  const { accessToken } = useAuth();
  const {data: me} = useGetMyInfo(accessToken);
  const isAuthor = comment?.author.id === me?.data.id;

  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content); // 수정된 내용


  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
  }

  const {mutate: patchcomment} = usePatchComment();
  const {mutate: deleteComment} = useDeleteComment();

  const handlePatch = () => {
    setIsEdit(true);
    setIsOpen(false);
  };
  const handleSave = () => {
    patchcomment({
      lpId: comment.lpId,
      commentId: comment.id,
      content: editedContent,
    }, {
      onSuccess: () => {
        setIsEdit(false);
        setEditedContent(comment.content);
      }
    })
  }

  const handleDelete = () => {
    deleteComment({
      lpId: comment.lpId,
      commentId: comment.id,
    });
  };

  return (
    <div className="flex justify-between items-center gap-4 p-4 border-b border-gray-700">
      <div className="flex gap-4">
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
          {isEdit ? (
            <div className="flex items-center justify-between gap-2">
              <input
                type="text"
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                className="px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                className="text-green-500 hover:text-green-700"
                onClick={handleSave}
              >
                <MdCheck />
              </button>
            </div>
          ) : (
            <p className="text-sm text-gray-300">{comment.content}</p>
          )}
        </div>
      </div>
      {isAuthor && (
        <div className="relative">
          <button className="text-white" onClick={toggleOpen}>
            <CiMenuKebab />
          </button>

          {isOpen && (
            <div className="absolute right-0 mt-2 w-24 bg-gray-800 rounded shadow-lg z-10">
              <button
                className="flex items-center gap-2 px-4 py-2 text-sm text-white hover:bg-gray-700 w-full"
                onClick={handlePatch}
              >
                <MdEdit /> 수정
              </button>
              <button
                className="flex items-center gap-2 px-4 py-2 text-sm text-white hover:bg-gray-700 w-full"
                onClick={handleDelete}
              >
                <MdDelete /> 삭제
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LpComment;
