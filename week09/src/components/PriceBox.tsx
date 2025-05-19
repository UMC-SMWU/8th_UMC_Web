import { useDispatch } from "react-redux";
import { useSelector } from "../hooks/useCustomRedux";
import { clearCart } from "../slices/cartSlice";
import { openModal } from "../slices/modalSlice";

const PriceBox = () => {
  const { total } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleResetCartClick = () => {
    dispatch(openModal("CONFIRM_CLEAR_CART"));
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
