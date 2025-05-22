interface TextInputProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const TextInput = ({
  id,
  value,
  onChange,
  placeholder = "검색어를 입력하세요.",
  className = "",
}: TextInputProps) => {
  return (
    <input
      id={id}
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={`border border-gray-300 rounded-md p-2 w-full text-sm ${className}`}
    />
  );
};

export default TextInput;
