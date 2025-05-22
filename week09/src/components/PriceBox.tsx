import { useCartStore } from "../hooks/useCartStore";
import { useModalStore } from "../hooks/useModalStore";

const PriceBox = () => {
  const total = useCartStore((state) => state.total);
  const openModal = useModalStore((state) => state.openModal);

  const handleResetCartClick = () => {
    openModal("CONFIRM_CLEAR_CART");
  };
  return (
    <div className="p-12 flex justify-between">
      <button
        onClick={handleResetCartClick}
        className="border p-4 rounded-md cursor-pointer"
      >
        장바구니 초기화
      </button>
      <div>총 가격: {total}원</div>
    </div>
  );
};

export default PriceBox;
