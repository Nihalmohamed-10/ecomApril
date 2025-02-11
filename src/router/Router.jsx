import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import SignUp from "../containers/signUp/SignUp";
import SignIn from "../containers/signin/SignIn";
import Products from "../containers/products/Products";
import Footer from "../containers/footer/Footer";
import ProductDetail from "../containers/productDetail.jsx/ProductDetail";
import ClothProducts from  "../containers/cloths/ClothProducts"
import ElectronicsProducts from "../containers/electronics/ElectronicsProducts";
function RouterComponent() {
  return (
    <Router>
      <Navbar />
      <Routes>
        
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/products" element={<Products />} />
        <Route path="/productDetails/:id" element={<ProductDetail />} />
        <Route path="/clothproducts" element={<ClothProducts />} />
        <Route path="/electonicproducts" element={<ElectronicsProducts />} />
        
      </Routes>
      <Footer />
    </Router>
  );
}

export default RouterComponent;
