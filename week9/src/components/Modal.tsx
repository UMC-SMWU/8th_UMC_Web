import { useModalActions, useModalInfo } from "../hooks/useModalStore.ts";
import { useCartActions } from "../hooks/useCartStore.ts";

const Modal = () => {
  const { isOpen } = useModalInfo();
  const { clearCart } = useCartActions();
  const { closeModal } = useModalActions();

  if (!isOpen) return null; // isOpen이 false면 Modal을 렌더링하지 않음

  const handleClose = () => {
    closeModal();
  };

  const handleClearCart = () => {
    clearCart();
    closeModal();
  };

  return (
    <div
      className={`bg-black/30 fixed top-0 left-0 w-full h-full flex items-center justify-center z-50`}
    >
      <div
        className={`flex flex-col bg-white rounded-md p-6 relative space-y-4 shadow-black`}
      >
        <h1 className={`font-semibold`}>정말 삭제하시겠습니까?</h1>
        <div className={`flex justify-center gap-4`}>
          <button
            onClick={handleClose}
            className={`px-2 py-1 text-sm bg-gray-400 rounded-xl text-gray-950`}
          >
            아니요
          </button>
          <button
            onClick={handleClearCart}
            className={`px-4 py-1 text-sm bg-red-700 rounded-xl text-white`}
          >
            네
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
