import ErrorText from "./ErrorText";

interface InputFieldProps {
  type: string;
  placeholder: string;
  error?: string;
  touched?: boolean;
  inputProps: any;
}

export default function InputField({
  type,
  placeholder,
  error,
  touched,
  inputProps,
}: InputFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <input
        {...inputProps}
        type={type}
        placeholder={placeholder}
        className={`text-white border w-[300px] p-[10px] focus:border-blue-300 rounded-md
            ${error && touched ? "border-red-500" : "border-gray-300"}
          `}
      />
      {error && touched && <ErrorText>{error}</ErrorText>}
    </div>
  );
}
