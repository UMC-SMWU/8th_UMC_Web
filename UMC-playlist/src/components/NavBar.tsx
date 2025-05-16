import { FaShoppingBag } from "react-icons/fa"
import { useEffect } from "react";
import { useCartActions, useCartInfo } from "../hooks/useCartStore";

const NavBar = () => {
  const { amount, cartItems } = useCartInfo();
  const { calculateTotal } = useCartActions();

  useEffect(() => {
    calculateTotal();
  }, [cartItems, calculateTotal]);

  return (
  <div className="flex justify-between items-center p-4 bg-gray-800 text-white">
    <h1
      onClick={() => {
        window.location.href = "/";
      }} 
      className="text-2xl font-semibold">
        NavBar
    </h1>
    <div className="flex items-center space-x-2">
      <FaShoppingBag className="text-2xl" />
			<span className="text-xl font-medium">{amount}</span>
    </div>
  </div>
  )
}

export default NavBar
