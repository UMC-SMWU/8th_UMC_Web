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
        className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
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