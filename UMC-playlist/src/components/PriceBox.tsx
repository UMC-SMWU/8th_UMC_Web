import { useCartActions, useCartInfo } from "../hooks/useCartStore";
import ClearModal from "./ClearModal";

const PriceBox = () => {
  const { clearCart, openModal, closeModal } = useCartActions();
  const { total, isOpen } = useCartInfo();
  

  const handleModal = () => {
    openModal();
  };

  const handleClearCart = () => {
    clearCart();
    closeModal();
  };

  const handleCloseModal = () => {
    closeModal();
  }

  return (
    <div className="flex justify-between p-8">
      <button 
        className="border p-4 rounded-md cursor-pointer"
        onClick={handleModal}
      >
          장바구니 초기화
      </button>
      <div>
        총 가격 : {total} 원
      </div>

      {isOpen &&  (
        <ClearModal onConfirm={handleClearCart} onCancle={handleCloseModal}/>
      )}
    </div>
  )
}

export default PriceBox
