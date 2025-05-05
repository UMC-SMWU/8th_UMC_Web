import { FC } from "react";

interface CommentProps {
  author: string;
  content: string;
  createdAt: string;
}

const CommentItem: FC<CommentProps> = ({ author, content, createdAt }) => (
  <div className="p-4 border-b border-gray-700">
    <p className="font-bold text-sm">{author}</p>
    <p className="text-sm text-gray-300 mt-1">{content}</p>
    <p className="text-xs text-gray-500 mt-1">{createdAt}</p>
  </div>
);

export default CommentItem;
