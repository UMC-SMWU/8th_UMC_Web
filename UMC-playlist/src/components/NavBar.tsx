import { FaShoppingBag } from "react-icons/fa"

const NavBar = () => {
  return (
  <div className="flex justify-between items-center p-4 bg-gray-800 text-white">
    <h1 className="text-2xl font-semibold">NavBar</h1>
    <div className="flex items-center space-x-2">
      <FaShoppingBag className="text-2xl" />
			<span className="text-xl font-medium">12</span>
    </div>
  </div>
  )
}

export default NavBar
