import React, { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { Link } from "react-router-dom";

function CartPage() {
  const { cartItems, removeFromCart, handleClearCart } =
    useContext(CartContext);

  return (
    <div className="w-[90%] md:w-[60%] lg:w-[50%] mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-5">Your Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-500 text-center">Your cart is empty.</p>
      ) : (
        <div className="grid gap-6">
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="flex flex-col md:flex-row items-center justify-between gap-5 p-5 border border-gray-300 rounded-lg"
            >
              <div className="flex gap-5 items-center w-full">
                <img
                  src={item.images?.[0]}
                  alt={item.title}
                  className="w-24 h-24 object-cover rounded-md"
                />
                <div className="flex-1">
                  <h2 className="text-lg font-semibold">{item.title}</h2>
                  <p className="text-sm text-gray-600">
                    {item.description?.substring(0, 40)}...
                  </p>
                  <p className="font-bold mt-2">${item.price}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Quantity: {item.quantity || 1}
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-3 items-end">
                <button
                  onClick={() => removeFromCart(item._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                >
                  Remove
                </button>

                <Link to="/products">
                  <button className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900 transition">
                    Continue Shopping
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
      <div>
      <div className="flex justify-center mt-20">
  <button
    onClick={handleClearCart}
    className="bg-red-500 text-white px-5 py-2 rounded-lg shadow-md hover:bg-red-600 transition duration-300"
  >
    Clear Cart
  </button>
</div>


      </div>
    </div>
  );
}

export default CartPage;
