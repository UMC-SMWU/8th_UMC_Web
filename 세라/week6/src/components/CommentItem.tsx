import { EllipsisVertical } from "lucide-react";

interface CommentItemProps {
  avatar?: string;
  name: string;
  content: string;
}

export default function CommentItem({
  avatar,
  name,
  content,
}: CommentItemProps) {
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
          <EllipsisVertical color="white" size={16} />
        </div>
        <div>{content}</div>
      </div>
    </div>
  );
}
