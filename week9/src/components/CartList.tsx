import CartItem from "./CartItem.tsx";
import { useSelector } from "../hooks/useCustomRedux.ts";

const CartList = () => {
  const { cartItems } = useSelector((state) => state.cart);
  return (
    <div className={`flex flex-col items-center justify-center px-10`}>
      {cartItems.map((item, idx) => (
        <CartItem key={idx} lp={item} />
      ))}
    </div>
  );
};

export default CartList;
