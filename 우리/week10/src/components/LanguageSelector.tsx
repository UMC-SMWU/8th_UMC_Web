interface LANGUAGE_OPTIONS {
    value: string;
    label: string;
}

interface LanguageSelectorProps {
    value: string;
    onChange: (value: string) => void;
    options: LANGUAGE_OPTIONS[];
    className?: string;
}

const LanguageSelector = ({
    value,
    onChange,
    options,
    className = '',
}: LanguageSelectorProps) => {
  return (
    <select 
        className="border border-gray-300 rounded-md p-3.5 rounded-md p-3 shadow-sm w-full"
        value={value}
        onChange={(e) => onChange(e.target.value)}    
    >
        {options.map((option) => (
            <option
                key={option.value}
                value={option.value}
                onChange={() => onChange(option.value)}
            >
                {option.label}
            </option>
        ))}
    </select>
  )
}

export default LanguageSelector