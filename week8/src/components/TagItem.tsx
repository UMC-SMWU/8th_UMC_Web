interface TagItemProps {
  name: string;
  className?: string;
}

const TagItem: React.FC<TagItemProps> = ({ name, className = "" }) => {
  return (
    <li
      className={`text-gray-200 text-sm bg-gray-700 rounded-xl px-3 py-0.5 ${className}`}
    >
      #{name}
    </li>
  );
};

export default TagItem;
