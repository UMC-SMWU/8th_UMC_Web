interface SortButtonProps {
  text: string;
  selected: boolean;
  onClick: () => void;
  position: "left" | "right";
}

export default function SortButton({
  text,
  selected,
  onClick,
  position,
}: SortButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`
          px-4 py-1 text-sm
          ${position === "left" ? "rounded-l-md" : "rounded-r-md"} 
          ${selected ? "bg-white border border-white text-black" : "text-white border border-white"}
        `}
    >
      {text}
    </button>
  );
}
