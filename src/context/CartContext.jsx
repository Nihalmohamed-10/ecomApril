import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Decode JWT to get user ID
  const getUserIdFromToken = (token) => {
    try {
      if (!token) return null;
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.id;
    } catch (err) {
      console.error(" Failed to decode token:", err);
      return null;
    }
  };

  //  Fetch cart from backend on mount
  useEffect(() => {
    const fetchCart = async () => {
      const token = localStorage.getItem("token");
      const userId = getUserIdFromToken(token);
      if (!userId) return;

      try {
        const response = await axios.get(`http://localhost:5006/api/cart/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const cartProducts = response.data.products;
        setCartItems(cartProducts);
      } catch (err) {
        console.error(" Failed to fetch cart:", err.message);
      }
    };

    fetchCart();
  }, []);

  //  Add to cart
  const addToCart = async (product) => {
    const token = localStorage.getItem("token");
    const userId = getUserIdFromToken(token);
    if (!userId) return;

    const alreadyInCart = cartItems.some((item) => item._id === product._id);
    if (alreadyInCart) return;

    try {
      await axios.post("http://localhost:5006/api/cart/add", {
        userId,
        productId: product._id,
        quantity: 1,
      });

      setCartItems((prev) => [...prev, { ...product, quantity: 1 }]);
      console.log(" Product added to cart");
    } catch (err) {
      console.error(" Error adding to cart:", err.message);
    }
  };

  //  Remove from cart
  const removeFromCart = async (productId) => {
    const token = localStorage.getItem("token");
    const userId = getUserIdFromToken(token);
    if (!userId) return;
  
    console.log(" Sending to backend:", { userId, productId }); 
  
    setCartItems((prevItems) => prevItems.filter((item) => item._id !== productId));
  
    try {
      const response = await axios.post("http://localhost:5006/api/cart/remove", {
        userId,
        productId,
      });
  
      console.log(" Backend response:", response.data);
    } catch (err) {
      console.error(" Error removing from cart (MongoDB):", err.message);
    }
  };
  
  //clear cart
  const handleClearCart = async () => {
    const confirmClear = window.confirm("Are you sure you want to clear your cart?");
    if (!confirmClear) return;
  
    try {
      const token = localStorage.getItem("token"); // match token name correctly
      await axios.delete("http://localhost:5006/api/cart/clear", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      setCartItems([]); // correctly update cartItems
      alert("Cart cleared successfully!");
    } catch (error) {
      console.error("Failed to clear cart:", error);
    }
  };
  

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, handleClearCart }}>
      {children}
    </CartContext.Provider>
  );
};

