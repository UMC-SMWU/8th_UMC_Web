import { useDispatch, useSelector } from "../hooks/useCustomRedux";
import { clearCart } from "../slices/cartSlice";

const PriceBox = () => {
  const { total } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className="flex justify-between p-8">
      <button 
        className="border p-4 rounded-md cursor-pointer"
        onClick={handleClearCart}
      >
          장바구니 초기화
      </button>
      <div>
        총 가격 : {total} 원
      </div>
    </div>
  )
}

export default PriceBox
