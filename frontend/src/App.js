import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from './components/Landing/Landing';
import AddProduct from './components/AddProduct/AddProduct';
import Background from './components/Background/Background';
import Products from './components/Products/Products';
import ProductDetails from './components/Products/ProductDetails/ProductDetails';
import { useEffect } from 'react';
import $ from 'jquery';
import { ethers } from 'ethers';
import { useDispatch } from "react-redux";
import { updateAbi } from '../src/redux/slices/abiSlice';

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
  let abi ="";
  $.getJSON(`https://api-testnet.polygonscan.com/api?module=contract&action=getabi&address=0x19712a7AC35019a4c1E8C2411BAf5ba7a870Be09&apikey=${process.env.REACT_APP_EXPLORER_API_KEY}`, async function (data) {
      abi = JSON.parse(data.result);
      if (abi !=='') {
        const providerr = new ethers.providers.Web3Provider(window.ethereum, "any");
        const signer = providerr.getSigner();
        const contract = new ethers.Contract('0x19712a7AC35019a4c1E8C2411BAf5ba7a870Be09', abi, signer );
        dispatch(updateAbi({contract, provider: providerr}));
    } else {
        console.log("Error");
    }
  });
  
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='add' element={<AddProduct />} />
        <Route path='/products' element={<Products />} />
        <Route path='/product/:id' element={<ProductDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;