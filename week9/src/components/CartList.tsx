import CartItem from "./CartItem.tsx";
import { useCartInfo } from "../hooks/useCartStore.ts";

const CartList = () => {
  const { cartItems } = useCartInfo();

  return (
    <div className={`flex flex-col items-center justify-center px-10`}>
      {cartItems.map((item, idx) => (
        <CartItem key={idx} lp={item} />
      ))}
    </div>
  );
};

export default CartList;
