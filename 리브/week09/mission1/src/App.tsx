import { Provider } from 'react-redux';
import './App.css'
import Cartlist from './components/CartList';
import Navbar from './components/Navbar'
import store from './store/store';
import PriceBox from './components/PriceBox';

function App() {
  return (
  <Provider store={store}>
    <Navbar/>
    <Cartlist/>
    <PriceBox/>
  </Provider>
  )
}

export default App;
