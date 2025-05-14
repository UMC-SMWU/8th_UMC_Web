import "./App.css";
import NavBar from "./components/Navbar.tsx";
import CartList from "./components/CartList.tsx";
import { Provider } from "react-redux";
import store from "./store/store.ts";
import PriceBox from "./components/PriceBox.tsx";
import Modal from "./components/Modal.tsx";

function App() {
  return (
    <Provider store={store}>
      <NavBar />
      <CartList />
      <Modal />
      <PriceBox />
    </Provider>
  );
}

export default App;
