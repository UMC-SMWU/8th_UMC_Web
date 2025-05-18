import './App.css'
import Cartlist from './components/CartList';
import Navbar from './components/Navbar'
import PriceBox from './components/PriceBox';
import ConfirmModal from './components/ConfirmModal';

function App() {
  return (
    <>
      <Navbar/>
      <Cartlist/>
      <PriceBox/>
      <ConfirmModal/>
    </>
  );
}

export default App;
