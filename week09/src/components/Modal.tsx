import { useModalStore } from "../hooks/useModalStore";
import { useCartStore } from "../hooks/useCartStore";

const Modal = () => {
  const { isOpen, type, closeModal } = useModalStore();
  const clearCart = useCartStore((state) => state.actions.clearCart);

  if (!isOpen || type !== "CONFIRM_CLEAR_CART") return null;

  const handleConfirm = () => {
    clearCart();
    closeModal();
  };
  const handleCancel = () => {
    closeModal();
  };

  return (
    <div
      className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50"
      aria-modal="true"
      role="dialog"
    >
      <div className="bg-white p-6 rounded-2xl shadow-lg w-[300px] text-center">
        <p className="text-lg font-semibold mb-6">정말 삭제하시겠습니까?</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={handleCancel}
            className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100 transition"
          >
            아니요
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600 transition"
          >
            네
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
