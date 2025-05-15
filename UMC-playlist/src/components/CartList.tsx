import cartItems from "../constants/cartItems"
import CartItem from "./CartItem"

const CartList = () => {
  return (
    <div className="flex flex-col items-center">
			<ul>
				{cartItems.map((item) => (
					<CartItem />
				))}
			</ul>
		</div>
  )
}

export default CartList
