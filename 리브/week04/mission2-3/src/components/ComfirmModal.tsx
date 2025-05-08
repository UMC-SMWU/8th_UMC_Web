interface ConfirmModalProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmModal = ({ message, onConfirm, onCancel }: ConfirmModalProps) => {
  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center">
      <div className="bg-[#1f1f1f] text-white p-6 rounded-xl w-80 flex flex-col items-center">
        <p className="mb-6">{message}</p>
        <div className="flex gap-4">
          <button
            onClick={onConfirm}
            className="bg-pink-400 hover:bg-pink-600 px-4 py-1 rounded font-semibold"
          >
            예
          </button>
          <button
            onClick={onCancel}
            className="bg-gray-600 hover:bg-gray-700 px-4 py-1 rounded font-semibold"
          >
            아니오
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
