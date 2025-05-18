interface ModalButtonProps {
  text: string;
  onClick: () => void;
  style?: string;
}

const ModalButton = ({ text, onClick, style }: ModalButtonProps) => {
  return (
    <button onClick={onClick} className={`${style} text-sm rounded-xl`}>
      {text}
    </button>
  );
};

export default ModalButton;
