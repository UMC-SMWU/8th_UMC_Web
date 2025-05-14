import "./App.css";
import NavBar from "./components/Navbar.tsx";
import CartList from "./components/CartList.tsx";
import { Provider } from "react-redux";
import store from "./store/store.ts";
import PriceBox from "./components/PriceBox.tsx";

function App() {
  return (
    <Provider store={store}>
      <NavBar />
      <CartList />
      <PriceBox />
    </Provider>
  );
}

export default App;
