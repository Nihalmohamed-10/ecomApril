import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const OrderSuccess = () => {
  const [order, setOrder] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedOrder = localStorage.getItem("latestOrder");
    if (storedOrder) {
      setOrder(JSON.parse(storedOrder));
    } else {
      navigate("/"); // No order found, redirect
    }
  }, [navigate]);

  return (
    <div className="max-w-3xl mx-auto p-6 text-center">
      <h1 className="text-4xl font-bold text-green-600 mb-4">
        🎉 Order Placed Successfully!
      </h1>
      <p className="text-lg text-gray-700 mb-8">Thank you for your purchase.</p>

      {order && (
        <div className="bg-white p-6 rounded-lg shadow-md text-left">
          <h2 className="text-xl font-semibold mb-2">Order Summary</h2>
          <p>
            <strong>Order ID:</strong> {order._id}
          </p>
          <p>
            <strong>Amount:</strong> ₹{order.totalAmount}
          </p>
          <p className="mt-4">
            <strong>Shipping Address:</strong>
            <br />
            {order.shippingAddress.address}, {order.shippingAddress.city},{" "}
            {order.shippingAddress.state}, {order.shippingAddress.zip},{" "}
            {order.shippingAddress.country}
          </p>

          <h3 className="mt-6 font-semibold">Items:</h3>
          {order.items.map((item, index) => (
            <p key={index}>
              📦 {item.product} (Qty: {item.quantity})
            </p>
          ))}
        </div>
      )}

      <button
        className="mt-6 bg-blue-600 text-white py-2 px-4 rounded-md"
        onClick={() => navigate("/")}
      >
        Back to Home
      </button>
    </div>
  );
};

export default OrderSuccess;
