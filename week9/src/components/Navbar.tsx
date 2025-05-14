import { ShoppingCart } from "lucide-react";
import { useEffect } from "react";
import { useCartActions, useCartInfo } from "../hooks/useCartStore.ts";

const NavBar = () => {
  const { amount, cartItems } = useCartInfo();
  const { calculateTotal } = useCartActions();

  useEffect(() => {
    calculateTotal();
  }, [cartItems, calculateTotal]);

  return (
    <nav
      className={`flex justify-between items-center p-4 bg-gray-800 text-white`}
    >
      <h1
        onClick={() => {
          window.location.href = "/";
        }}
        className={`text-2xl font-semibold cursor-pointer`}
      >
        Shopping Cart
      </h1>
      <div className={`flex items-center gap-2`}>
        <ShoppingCart />
        <span className={`text-xl font-medium`}>{amount}</span>
      </div>
    </nav>
  );
};

export default NavBar;
