import { useState } from "react";
import ErrorText from "./ErrorText";
import { Eye, EyeClosed } from "lucide-react";

interface InputFieldProps {
  type: string;
  placeholder: string;
  error?: string;
  touched?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  inputProps: any;
}

export default function InputField({
  type,
  placeholder,
  error,
  touched,
  inputProps,
}: InputFieldProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col gap-2">
      <div className="relative w-[300px]">
        <input
          {...inputProps}
          type={type === "password" && !showPassword ? "password" : "text"}
          placeholder={placeholder}
          className={`text-white border w-[300px] p-[10px] focus:border-blue-300 rounded-md
            ${error && touched ? "border-red-500" : "border-gray-300"}
          `}
        />
        {type === "password" && (
          <button
            type="button"
            className="absolute inset-y-0 right-3 flex items-center"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <Eye color="white" size={20} />
            ) : (
              <EyeClosed color="white" size={20} />
            )}
          </button>
        )}
      </div>
      {error && touched && <ErrorText children={error} />}
    </div>
  );
}
