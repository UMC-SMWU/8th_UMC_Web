import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { clearCart } from "../slices/cartSlice";
import { closeModal } from "../slices/modalSlice";

const Modal = () => {
  const dispatch = useDispatch();
  const { isOpen, type } = useSelector((state: RootState) => state.modal);
  if (!isOpen || type !== "CONFIRM_CLEAR_CART") return null;

  const handleConfirm = () => {
    dispatch(clearCart());
    dispatch(closeModal());
  };
  const handleCancel = () => {
    dispatch(closeModal());
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
