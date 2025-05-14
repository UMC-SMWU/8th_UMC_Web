import { EllipsisVertical, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";

interface CommentItemProps {
  avatar?: string;
  name: string;
  content: string;
  isMe: boolean;
  onPatch: (content: string) => void;
  onDelete: () => void;
}

export default function CommentItem({
  avatar,
  name,
  content,
  isMe,
  onPatch,
  onDelete,
}: CommentItemProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedContent, setEditedContent] = useState(content);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleEdit = () => {
    onPatch(editedContent);
    setIsEditMode(false);
  };

  return (
    <div className="flex justify-between gap-2 py-2">
      <img
        src={avatar}
        alt="프로필 이미지"
        className="size-8 rounded-full bg-white "
      />
      <div className="flex-col flex-1 text-sm text-white">
        <div className="flex justify-between items-center">
          <div>{name}</div>
          {isMe && (
            <div className="relative">
              <EllipsisVertical
                color="white"
                size={16}
                onClick={toggleMenu}
                className="cursor-pointer"
              />
              {isMenuOpen && (
                <div className="absolute flex p-2 gap-2 right-0 mt-2 bg-gray-800 text-white rounded-md shadow-lg z-10">
                  <Pencil
                    size={20}
                    onClick={() => {
                      setIsEditMode(true);
                      setIsMenuOpen(false);
                    }}
                  />
                  <Trash2
                    size={20}
                    onClick={() => {
                      onDelete();
                      setIsMenuOpen(false);
                    }}
                  />
                </div>
              )}
            </div>
          )}
        </div>
        {isEditMode ? (
          <div className={`flex mt-2 items-center justify-between gap-2`}>
            <input
              type="text"
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              className={`flex-1 border px-2 py-1 border-gray-400 text-white rounded-md`}
            />
            <button
              className="bg-gray-400 text-white py-1.5 px-2 text-sm rounded"
              onClick={handleEdit}
            >
              수정
            </button>
          </div>
        ) : (
          <div>{content}</div>
        )}
      </div>
    </div>
  );
}
