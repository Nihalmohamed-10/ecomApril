// src/context/CartContext.jsx

import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

// Create CartContext
export const CartContext = createContext();

// Custom hook to access CartContext
export const useCartContext = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  // Decode JWT to get user ID
  const getUserIdFromToken = (token) => {
    try {
      if (!token) return null;
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.id;
    } catch (err) {
      console.error("Failed to decode token:", err);
      return null;
    }
  };

  // Fetch cart from backend on mount
  useEffect(() => {
    const fetchCart = async () => {
      const token = localStorage.getItem("token");
      const userId = getUserIdFromToken(token);
      if (!userId) return;

      try {
        const response = await axios.get("http://localhost:5006/api/cart", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const cartProducts = response.data.products;
        setCartItems(cartProducts);

        // Calculate total amount from cart items
        const total = cartProducts.reduce(
          (acc, item) => acc + item.quantity * item.price,
          0
        );
        setTotalAmount(total);
      } catch (err) {
        console.error("Failed to fetch cart:", err.message);
      }
    };

    fetchCart();
  }, []);

  // Add product to cart
  const addToCart = async (product) => {
    const token = localStorage.getItem("token");
    console.log("Token:", token);
    const userId = getUserIdFromToken(token);
    if (!userId) return;

    const alreadyInCart = cartItems.some((item) => item._id === product._id);
    if (alreadyInCart) return;

    try {
      await axios.post(
        "http://localhost:5006/api/cart/add",
        {
          productId: product._id,
          quantity: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCartItems((prev) => [...prev, { ...product, quantity: 1 }]);

      // Update total amount
      setTotalAmount((prevTotal) => prevTotal + product.price);
      console.log("Product added to cart");
    } catch (err) {
      console.error("Error adding to cart:", err.message);
    }
  };

  // Remove product from cart
  const removeFromCart = async (productId) => {
    const token = localStorage.getItem("token");
    const userId = getUserIdFromToken(token);
    if (!userId) return;

    console.log("Removing from cart: ", { productId });

    setCartItems((prevItems) =>
      prevItems.filter((item) => item._id !== productId)
    );

    try {
      const response = await axios.post(
        "http://localhost:5006/api/cart/remove",
        {
          productId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update total amount after removing product
      const updatedTotal = cartItems
        .filter((item) => item._id !== productId)
        .reduce((acc, item) => acc + item.quantity * item.price, 0);

      setTotalAmount(updatedTotal);
      console.log("Product removed from cart:", response.data);
    } catch (err) {
      console.error("Error removing from cart (MongoDB):", err.message);
    }
  };

  // Clear the cart
  const handleClearCart = async () => {
    const confirmClear = window.confirm("Are you sure?");
    if (!confirmClear) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete("http://localhost:5006/api/cart/clear", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCartItems([]);
      setTotalAmount(0); // Reset total amount when clearing cart
    } catch (error) {
      console.error("Failed to clear cart:", error);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        totalAmount,
        addToCart,
        removeFromCart,
        handleClearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// import React, { createContext, useState, useEffect } from "react";
// import axios from "axios";

// export const CartContext = createContext();

// export const CartProvider = ({ children }) => {
//   const [cartItems, setCartItems] = useState([]);

//   // Decode JWT to get user ID
//   const getUserIdFromToken = (token) => {
//     try {
//       if (!token) return null;
//       const payload = JSON.parse(atob(token.split(".")[1]));
//       return payload.id;
//     } catch (err) {
//       console.error(" Failed to decode token:", err);
//       return null;
//     }
//   };

//   //  Fetch cart from backend on mount
//   useEffect(() => {
//     const fetchCart = async () => {
//       const token = localStorage.getItem("token");
//       const userId = getUserIdFromToken(token);
//       if (!userId) return;

//       try {
//         const response = await axios.get("http://localhost:5006/api/cart", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         // const response = await axios.get(
//         //   `http://localhost:5006/api/cart/${userId}`,
//         //   {
//         //     headers: {
//         //       Authorization: `Bearer ${token}`,
//         //     },
//         //   }
//         // );

//         const cartProducts = response.data.products;
//         setCartItems(cartProducts);
//       } catch (err) {
//         console.error(" Failed to fetch cart:", err.message);
//       }
//     };

//     fetchCart();
//   }, []);

//   //  Add to cart
//   // Add to cart
// const addToCart = async (product) => {
//   const token = localStorage.getItem("token");
//   console.log("Token:", token);
//   const userId = getUserIdFromToken(token);
//   if (!userId) return;

//   const alreadyInCart = cartItems.some((item) => item._id === product._id);
//   if (alreadyInCart) return;

//   try {
//     await axios.post(
//       "http://localhost:5006/api/cart/add",
//       {
//         productId: product._id,
//         quantity: 1,
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );

//     setCartItems((prev) => [...prev, { ...product, quantity: 1 }]);
//     console.log("Product added to cart");
//   } catch (err) {
//     console.error("Error adding to cart:", err.message);
//   }
// };


//   //  Remove from cart
// const removeFromCart = async (productId) => {
//   const token = localStorage.getItem("token");
//   const userId = getUserIdFromToken(token);
//   if (!userId) return;

//   console.log("Removing from cart: ", { productId });

//   setCartItems((prevItems) =>
//     prevItems.filter((item) => item._id !== productId)
//   );

//   try {
//     const response = await axios.post(
//       "http://localhost:5006/api/cart/remove",
//       {
//         productId,
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );
//     console.log("Product removed from cart:", response.data);
//   } catch (err) {
//     console.error("Error removing from cart (MongoDB):", err.message);
//   }
// };


//   //clear cart
//   const handleClearCart = async () => {
//     const confirmClear = window.confirm(
//       "Are you sure?"
//     );
//     if (!confirmClear) return;

//     try {
//       const token = localStorage.getItem("token");
//       await axios.delete("http://localhost:5006/api/cart/clear", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       setCartItems([]); 
      
//     } catch (error) {
//       console.error("Failed to clear cart:", error);
//     }
//   };

//   return (
//     <CartContext.Provider
//       value={{ cartItems, addToCart, removeFromCart, handleClearCart }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };
