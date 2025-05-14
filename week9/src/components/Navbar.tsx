import { ShoppingCart } from "lucide-react";
import { useDispatch, useSelector } from "../hooks/useCustomRedux.ts";
import { useEffect } from "react";
import { calculateTotal } from "../slices/cartSlice.ts";

const NavBar = () => {
  const { cartItems, amount } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(calculateTotal());
  }, [cartItems, dispatch]);

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
