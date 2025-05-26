interface SelectBoxProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
    label: string;
    id?: string;
    className?: string;
}

export const SelectBox = ({
    checked,
    onChange,
    label,
    id = "checkbox",
    className = '',
} : SelectBoxProps) => {
    return (
        <div className={`flex items-center space-x-2 ${className}`}>
            <input
                type="checkbox"
                id={id}
                checked={checked}
                onChange={(e) => onChange(e.target.checked)}
                className="size-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor={id} className="text-sm text-gray-700">
                {label}
            </label>
        </div>
    )
};
