interface InputProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
}

export const Input = ({
    value,
    onChange,
    placeholder = '검색어를 입력하세요',
    className,
} : InputProps) => {
    return (
        <input 
            className={`w-full rounded-md p-3 border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${className}`}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
        />
    )
}