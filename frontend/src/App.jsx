import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Header from "./components/Header/Navbar";
import Shop from './pages/Shop';
import ProductDetails from "./pages/ProductDetails";
import ShoppingCart from "./components/ShoppingCart/ShoppingCart";
import { Toaster } from "react-hot-toast";
import Authentication from "./pages/Authentication";
// import Details from "./components/Products/Details";
import StickyText from './components/Footer/StickyText';
import Profile from "./components/Authentication/Profile";
import CartItems from "./components/Cart/CartItems";
import ShippingAddress from "./components/Cart/ShippingAddress";
import Payment from "./components/Cart/Payment";


const App = () => {
  return (
    <>
      <Router>
        <Header />
        <Toaster/>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<Shop />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          {/* <Route path="/shopcart" element={<ShoppingCart />} /> */}
          <Route path="/cart" element={<CartItems/>} />
          <Route path="/address" element={<ShippingAddress/>} />
          <Route path="/payment" element={<Payment/>} />
          <Route path="/loginSignUp" element={<Authentication />} />
          <Route path="/profile" element={<Profile/>} />
        </Routes>
        
      </Router>
    </>
  );
};

export default App;
