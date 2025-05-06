import { ChangeEvent } from "react";
import * as React from "react";

interface TextInputProps {
  type: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  className?: string;
}

const TextInput: React.FC<TextInputProps> = ({
  type,
  value,
  onChange,
  placeholder,
  className = "",
}) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`border border-gray-400 rounded-md p-2 text-white ${className}`}
    />
  );
};

export default TextInput;
