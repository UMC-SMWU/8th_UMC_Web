interface SubmitButtonProps {
  text: string;
  onClick: () => void;
  disabled?: boolean;
}

export default function SubmitButton({
  text,
  onClick,
  disabled,
}: SubmitButtonProps) {
  return (
    <button
      className="w-full bg-pink-600 text-white p-[10px] rounded-sm 
      transition-colors duration-200 disabled:bg-[#111111] disabled:text-[#484747]"
      type="button"
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
}
