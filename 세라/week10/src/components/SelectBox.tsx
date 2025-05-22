import type { MovieLanguage } from "../types/movie.ts";

interface LanguageOption {
  value: string;
  label: string;
}

interface SelectBoxProps {
  id: string;
  options: LanguageOption[];
  value: string;
  onChange: (value: MovieLanguage) => void;
  className?: string;
}

const SelectBox = ({
  id,
  options,
  value,
  onChange,
  className,
}: SelectBoxProps) => {
  return (
    <select
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value as MovieLanguage)}
      className={`w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-black ${className}`}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default SelectBox;
