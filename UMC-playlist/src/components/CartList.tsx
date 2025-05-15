import CartItem from "./CartItem"
import { RootState } from "../store/store";
import { useSelector } from "../hooks/useCustomRedux";

const CartList = () => {
	const {total, amount, cartItems} = useSelector(
		(state: RootState) => state.cart
	);

	return (
		<div className="flex flex-col items-center">
				<ul>
					{cartItems.map((item) => (
						<CartItem key={item.id} lp={item}/>
					))}
				</ul>
			</div>
	)
}

export default CartList
