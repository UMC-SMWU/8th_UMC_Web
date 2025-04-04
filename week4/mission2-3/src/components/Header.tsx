interface HeaderProps {
  text: string;
  onClick: () => void;
}

export default function Header({ text, onClick }: HeaderProps) {
  return (
    <div className="relative flex items-center w-[300px] py-5 text-white text-2xl">
      <p
        className="absolute left-0"
        onClick={onClick}
      >
        &lt;
      </p>
      <p className="w-full text-center">{text}</p>
    </div>
  );
}
