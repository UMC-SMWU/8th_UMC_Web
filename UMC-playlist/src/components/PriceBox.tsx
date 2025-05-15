import { useDispatch, useSelector } from "../hooks/useCustomRedux";
import { clearCart } from "../slices/cartSlice";
import { closeModal, openModal } from "../slices/modalSlice";
import ClearModal from "./ClearModal";

const PriceBox = () => {
  const { total } = useSelector((state) => state.cart);
  const { isOpen, modalContent } = useSelector((state) => state.modal);

  const dispatch = useDispatch();

  const handleModal = () => {
    dispatch(openModal("clear"));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    dispatch(closeModal());
  };

  const handleCloseModal = () => {
    dispatch(closeModal());
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

      {isOpen && modalContent === "clear" && (
        <ClearModal onConfirm={handleClearCart} onCancle={handleCloseModal}/>
      )}
    </div>
  )
}

export default PriceBox
