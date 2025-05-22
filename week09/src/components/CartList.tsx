import CartItem from "./CartItem";
import { useCartStore } from "../hooks/useCartStore";

const CartList = () => {
  const cartItems = useCartStore((state) => state.cartItems);
  return (
    <div className="flex flex-col items-center justify-center">
      <ul>
        {cartItems.map((item) => (
          <CartItem key={item.id} lp={item} />
        ))}
      </ul>
    </div>
  );
};

export default CartList;
