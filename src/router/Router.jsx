import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import SignUp from "../containers/signUp/SignUp";
import SignIn from "../containers/signin/SignIn";
import Products from "../containers/products/Products";
import Footer from "../containers/footer/Footer";
import ProductDetail from "../containers/productDetail.jsx/ProductDetail";
import ProtectedRoutes from "../ProtectRoutes";
import Cart from "../containers/cart/Cart";
import AddProduct from "../containers/products/AddProduct";
import SellerDashboard from "../pages/SellerDashboard";
import Profile from "../components/Profile";
import UpdateProfile from "../components/UpdateProfile";
import Logout from "../components/Logout";
import DeleteAccount from "../components/DeleteAccount";
import OrderPage from "../pages/orderPage";
import OrderSuccess from "../pages/OrderSuccess";

function RouterComponent() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/cart" element={<Cart />} />

        <Route path="/" element={<ProtectedRoutes />}>
          <Route path="addproduct" element={<AddProduct />} />
          <Route path="products/:category?" element={<Products />} />
          <Route path="productDetails/:id" element={<ProductDetail />} />
          <Route path="seller/dashboard" element={<SellerDashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="updateprofile" element={<UpdateProfile />} />
          <Route path="logout" element={<Logout />} />
          <Route path="deleteaccount" element={<DeleteAccount />} />
          <Route path="/orders" element={<OrderPage />} />
          <Route path="/order-success" element={<OrderSuccess />} />

        </Route>
      </Routes>
      <Footer />
    </Router>
  );
}

export default RouterComponent;
