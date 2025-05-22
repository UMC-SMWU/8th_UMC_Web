import { useCartInfo } from "../hooks/useCartStore.ts";
import { useModalActions } from "../hooks/useModalStore.ts";

const PriceBox = () => {
  const { total } = useCartInfo();
  const { openModal } = useModalActions();
  const handleClearCart = () => {
    openModal();
  };

  return (
    <div
      className={`flex justify-between items-center px-14 py-4 font-semibold`}
    >
      <button
        onClick={handleClearCart}
        className={`border border-gray-300 rounded-xl px-4 py-1`}
      >
        장바구니 초기화
      </button>
      <span>총 가격: {total}원</span>
    </div>
  );
};

export default PriceBox;
