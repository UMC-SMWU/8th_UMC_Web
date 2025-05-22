interface SelectBoxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  id?: string;
  className?: string;
}

const CheckBox = ({
  checked,
  onChange,
  label,
  id = "checkbox",
  className = "",
}: SelectBoxProps) => {
  return (
    <div
      className={`${className} flex items-center rounded-md p-2 border border-gray-300`}
    >
      <input
        type={"checkbox"}
        id={id}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className={`size-4 rounded border-gray-300 bg-gray-300 text-blue-600 focus:ring-blue-500`}
      />
      <label htmlFor={id} className={`ml-2 text-gray-700 text-sm`}>
        {label}
      </label>
    </div>
  );
};

export default CheckBox;
