import { X } from "lucide-react";

interface EditTagItemProps {
  tag: string;
  onRemove: (tag: string) => void;
}

const EditTagItem: React.FC<EditTagItemProps> = ({ tag, onRemove }) => {
  return (
    <div className="flex items-center border-1 border-gray-400 text-white rounded-lg px-3 py-1">
      <span>{tag}</span>
      <button className="ml-2 text-white" onClick={() => onRemove(tag)}>
        <X size={16} color="white" />
      </button>
    </div>
  );
};

export default EditTagItem;
