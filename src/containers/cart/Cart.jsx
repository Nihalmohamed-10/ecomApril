import React, { useContext, useMemo } from "react";
import { CartContext } from "../../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaTrashAlt,
  FaShoppingCart,
  FaArrowLeft,
  FaMoneyBillWave,
} from "react-icons/fa";

function CartPage() {
  const { cartItems, removeFromCart, handleClearCart } = useContext(CartContext);

  // Use navigate hook
  const navigate = useNavigate();

  // Calculate subtotal using useMemo for performance
  const subtotal = useMemo(() => {
    return cartItems.reduce(
      (acc, item) => acc + item.price * (item.quantity || 1),
      0
    );
  }, [cartItems]);

  const taxRate = 0.05;
  const tax = subtotal * taxRate;
  const total = subtotal + tax;

  // Handle the Shop Now button click
  const handleShopNow = (item) => {
    // Navigate to the OrderPage with the product details
    navigate("/orders", { state: { singleProduct: item } });
  };

  return (
    <div className="w-[90%] md:w-[70%] lg:w-[60%] mx-auto mt-10 mb-12">
      <div className="flex items-center gap-3 mb-6">
        <FaShoppingCart className="text-3xl text-green-600" />
        <h1 className="text-3xl font-bold text-gray-800">Your Cart</h1>
      </div>

      {cartItems.length === 0 ? (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-gray-500 text-center mt-10 text-lg mb-8"
        >
          Your cart is empty.
        </motion.p>
      ) : (
        <div className="grid gap-6 mb-10">
          {cartItems.map((item) => (
            <motion.div
              key={item._id}
              className="flex flex-col md:flex-row items-center justify-between gap-5 p-5 border border-gray-300 rounded-2xl bg-white shadow-md hover:shadow-lg transition duration-300"
              whileHover={{ scale: 1.02 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex gap-5 items-center w-full">
                <img
                  src={item.images?.[0]}
                  alt={item.title}
                  className="w-24 h-24 object-cover rounded-xl border-2 border-green-400"
                />
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-gray-800">
                    {item.title}
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">
                    {item.description?.substring(0, 40)}...
                  </p>
                  <p className="text-green-600 font-bold mt-2">${item.price}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Quantity: {item.quantity || 1}
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-3 items-end">
                <button
                  onClick={() => removeFromCart(item._id)}
                  className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600 transition duration-300"
                >
                  <FaTrashAlt /> Remove
                </button>

                <button
                  onClick={() => handleShopNow(item)}
                  className="w-full flex items-center justify-center gap-2 bg-green-800 text-white px-4 py-2 w-full rounded-xl hover:bg-gray-900 transition duration-300"
                >
                  Shop now
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Price Summary */}
      {cartItems.length > 0 && (
        <>
          <div className="mt-12 p-6 bg-gray-100 rounded-2xl shadow-inner mb-10">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-green-700">
              <FaMoneyBillWave /> Price Summary
            </h2>

            <div className="flex flex-col gap-3 text-gray-700 text-lg">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (5%):</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="border-t pt-3 flex justify-between font-bold text-green-800 text-xl">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Clear Cart button */}
          <div className="flex justify-center mt-10 mb-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleClearCart}
              className="flex items-center gap-3 bg-red-500 text-white px-6 py-3 rounded-full shadow-lg hover:bg-red-600 transition duration-300"
            >
              <FaTrashAlt /> Clear Cart
            </motion.button>
          </div>
        </>
      )}
    </div>
  );
}

export default CartPage;


// import React, { useContext } from "react";
// import { CartContext } from "../../context/CartContext";
// import { Link } from "react-router-dom";

// function CartPage() {
//   const { cartItems, removeFromCart, handleClearCart } =
//     useContext(CartContext);

//   return (
//     <div className="w-[90%] md:w-[60%] lg:w-[50%] mx-auto mt-10">
//       <h1 className="text-2xl font-bold mb-5">Your Cart</h1>

//       {cartItems.length === 0 ? (
//         <p className="text-gray-500 text-center">Your cart is empty.</p>
//       ) : (
//         <div className="grid gap-6">
//           {cartItems.map((item) => (
//             <div
//               key={item._id}
//               className="flex flex-col md:flex-row items-center justify-between gap-5 p-5 border border-gray-300 rounded-lg"
//             >
//               <div className="flex gap-5 items-center w-full">
//                 <img
//                   src={item.images?.[0]}
//                   alt={item.title}
//                   className="w-24 h-24 object-cover rounded-md"
//                 />
//                 <div className="flex-1">
//                   <h2 className="text-lg font-semibold">{item.title}</h2>
//                   <p className="text-sm text-gray-600">
//                     {item.description?.substring(0, 40)}...
//                   </p>
//                   <p className="font-bold mt-2">${item.price}</p>
//                   <p className="text-sm text-gray-500 mt-1">
//                     Quantity: {item.quantity || 1}
//                   </p>
//                 </div>
//               </div>

//               <div className="flex flex-col gap-3 items-end">
//                 <button
//                   onClick={() => removeFromCart(item._id)}
//                   className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
//                 >
//                   Remove
//                 </button>

//                 <Link to="/products">
//                   <button className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900 transition">
//                     Continue Shopping
//                   </button>
//                 </Link>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//       <div>
//       <div className="flex justify-center mt-20">
//   <button
//     onClick={handleClearCart}
//     className="bg-red-500 text-white px-5 py-2 rounded-lg shadow-md hover:bg-red-600 transition duration-300"
//   >
//     Clear Cart
//   </button>
// </div>

//       </div>
//     </div>
//   );
// }

// export default CartPage;
