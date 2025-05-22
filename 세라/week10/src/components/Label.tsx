interface LabelProps {
  id: string;
  label: string;
}

const Label = ({ id, label }: LabelProps) => {
  return (
    <label
      htmlFor={id}
      className={`w-full flex justify-center text-sm font-semibold text-gray-700`}
    >
      {label}
    </label>
  );
};

export default Label;
