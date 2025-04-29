interface NavButtonProps {
  text: string;
  onClick: () => void;
  style?: string;
}

export default function NavButton({ text, onClick, style }: NavButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`${style ?? ""} text-white px-2 py-1 rounded-sm`}
    >
      {text}
    </button>
  );
}
