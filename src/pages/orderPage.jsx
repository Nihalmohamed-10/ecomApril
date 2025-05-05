import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const OrderPage = () => {
  const location = useLocation();
  const singleProduct = location.state?.singleProduct;

  const [shippingAddress, setShippingAddress] = useState({
    address: "",
    city: "",
    state: "",
    country: "",
    zip: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress({ ...shippingAddress, [name]: value });
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleSubmitOrder = async () => {
    if (
      !shippingAddress.address ||
      !shippingAddress.city ||
      !shippingAddress.state ||
      !shippingAddress.zip
    ) {
      alert("Please fill in all shipping details");
      return;
    }

    setIsLoading(true);

    const token = localStorage.getItem("token");

    const orderData = {
      items: singleProduct
        ? [
            {
              product: singleProduct._id,
              quantity: singleProduct.quantity || 1,
            },
          ]
        : [],
      shippingAddress,
      totalAmount: singleProduct
        ? singleProduct.price * (singleProduct.quantity || 1)
        : 0,
    };

    try {
      const isRazorpayLoaded = await loadRazorpayScript();
      if (!isRazorpayLoaded) {
        alert("Failed to load Razorpay SDK. Please try again.");
        setIsLoading(false);
        return;
      }

      const response = await axios.post(
        "http://localhost:5006/api/orders/create-order",
        orderData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const { razorpayOrder, key_id, order } = response.data;

      localStorage.setItem("latestOrder", JSON.stringify(order));

      const options = {
        key: key_id,
        amount: razorpayOrder.amount,
        currency: "INR",
        name: "Your Store Name",
        description: "Purchase Description",
        image: "/logo.png",
        order_id: razorpayOrder.id,
        handler: async function (response) {
          try {
            await axios.post(
              "http://localhost:5006/api/orders/update-payment-status",
              {
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
                // order_id: order._id,
                orderId: order._id,

              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json",
                },
              }
            );

            alert("Payment Successful");
            navigate("/order-success");
          } catch (error) {
            console.error(
              "Error updating payment status:",
              error.response?.data || error.message
            );
            alert(
              "Payment was successful, but there was an error updating the order status."
            );
          }
        },
        prefill: {
          name: "",
          email: "",
          contact: "",
        },
        notes: {
          address: shippingAddress.address,
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error(
        "Error placing order:",
        error.response?.data || error.message
      );
      alert("There was an error placing your order.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Order Review</h1>

      {singleProduct && (
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold text-green-700">
            Ordering: {singleProduct.title}
          </h2>
          <img
            src={singleProduct.images?.[0]}
            alt={singleProduct.title}
            className="w-48 h-48 object-cover mx-auto mt-4"
          />
          <p className="text-lg text-gray-700 mt-2">₹{singleProduct.price}</p>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Payment Summary</h2>
        <div className="flex justify-between text-lg">
          <span>Total Amount:</span>
          <span className="font-bold text-green-600">
            ₹{(singleProduct?.price * (singleProduct?.quantity || 1)).toFixed(2)}
          </span>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={shippingAddress.address}
            onChange={handleInputChange}
            className="border p-3 rounded-md"
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={shippingAddress.city}
            onChange={handleInputChange}
            className="border p-3 rounded-md"
          />
          <input
            type="text"
            name="state"
            placeholder="State"
            value={shippingAddress.state}
            onChange={handleInputChange}
            className="border p-3 rounded-md"
          />
          <input
            type="text"
            name="country"
            placeholder="Country"
            value={shippingAddress.country}
            onChange={handleInputChange}
            className="border p-3 rounded-md"
          />
          <input
            type="text"
            name="zip"
            placeholder="Zip Code"
            value={shippingAddress.zip}
            onChange={handleInputChange}
            className="border p-3 rounded-md"
          />
        </div>
      </div>

      <button
        onClick={handleSubmitOrder}
        className={`mt-6 w-full py-3 text-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition duration-300 ${
          isLoading ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={isLoading}
      >
        {isLoading ? "Placing Order..." : "Place Order"}
      </button>
    </div>
  );
};

export default OrderPage;


// import React, { useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import axios from "axios";

// const OrderPage = () => {
//   const location = useLocation();
//   const singleProduct = location.state?.singleProduct;

//   const [shippingAddress, setShippingAddress] = useState({
//     address: "",
//     city: "",
//     state: "",
//     country: "",
//     zip: "",
//   });

//   const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setShippingAddress({ ...shippingAddress, [name]: value });
//   };

//   const handleSubmitOrder = async () => {
//     if (
//       !shippingAddress.address ||
//       !shippingAddress.city ||
//       !shippingAddress.state ||
//       !shippingAddress.zip
//     ) {
//       alert("Please fill in all shipping details");
//       return;
//     }

//     setIsLoading(true);

//     const token = localStorage.getItem("token");

//     const orderData = {
//       items: singleProduct
//         ? [
//             {
//               product: singleProduct._id,
//               quantity: singleProduct.quantity || 1,
//             },
//           ]
//         : [],
//       shippingAddress,
//       totalAmount: singleProduct
//         ? singleProduct.price * (singleProduct.quantity || 1)
//         : 0,
//     };

//     try {
//       const response = await axios.post(
//         "http://localhost:5006/api/orders/create-order",
//         orderData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       const { razorpayOrder, key_id, order } = response.data;

//       // Save order to localStorage
//       localStorage.setItem("latestOrder", JSON.stringify(order));

//       // Razorpay options
//       const options = {
//         key: key_id,
//         amount: razorpayOrder.amount,
//         currency: "INR",
//         name: "Your Store Name",
//         description: "Purchase Description",
//         image: "/logo.png", // optional
//         order_id: razorpayOrder.id,
//         handler: async function (response) {
//           // This function is triggered after payment is successful
//           try {
//             // Update payment status in the backend
//             await axios.post(
//               "http://localhost:5006/api/orders/update-payment-status",
//               {
//                 razorpay_payment_id: response.razorpay_payment_id,
//                 razorpay_order_id: response.razorpay_order_id,
//                 razorpay_signature: response.razorpay_signature,
//                 order_id: order._id,
//               },
//               {
//                 headers: {
//                   Authorization: `Bearer ${token}`,
//                   "Content-Type": "application/json",
//                 },
//               }
//             );

//             alert("Payment Successful");
//             navigate("/order-success");
//           } catch (error) {
//             console.error("Error updating payment status:", error.response?.data || error.message);
//             alert("Payment was successful, but there was an error updating the order status.");
//           }
//         },
//         prefill: {
//           name: "", // Optional user name
//           email: "", // Optional user email
//           contact: "", // Optional contact number
//         },
//         notes: {
//           address: shippingAddress.address,
//         },
//         theme: {
//           color: "#3399cc",
//         },
//       };

//       // Open Razorpay payment popup
//       const rzp1 = new window.Razorpay(options);
//       rzp1.open();
//     } catch (error) {
//       console.error("Error placing order:", error.response?.data || error.message);
//       alert("There was an error placing your order.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="container mx-auto p-6">
//       <h1 className="text-3xl font-bold mb-6 text-center">Order Review</h1>

//       {singleProduct && (
//         <div className="text-center mb-6">
//           <h2 className="text-2xl font-semibold text-green-700">
//             Ordering: {singleProduct.title}
//           </h2>
//           <img
//             src={singleProduct.images?.[0]}
//             alt={singleProduct.title}
//             className="w-48 h-48 object-cover mx-auto mt-4"
//           />
//           <p className="text-lg text-gray-700 mt-2">
//             ₹{singleProduct.price}
//           </p>
//         </div>
//       )}

//       <div className="bg-white rounded-xl shadow-md p-6 mb-6">
//         <h2 className="text-xl font-semibold mb-4">Payment Summary</h2>
//         <div className="flex justify-between text-lg">
//           <span>Total Amount:</span>
//           <span className="font-bold text-green-600">
//             ₹{(singleProduct?.price * (singleProduct?.quantity || 1)).toFixed(2)}
//           </span>
//         </div>
//       </div>

//       <div className="bg-white rounded-xl shadow-md p-6 mb-6">
//         <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <input
//             type="text"
//             name="address"
//             placeholder="Address"
//             value={shippingAddress.address}
//             onChange={handleInputChange}
//             className="border p-3 rounded-md"
//           />
//           <input
//             type="text"
//             name="city"
//             placeholder="City"
//             value={shippingAddress.city}
//             onChange={handleInputChange}
//             className="border p-3 rounded-md"
//           />
//           <input
//             type="text"
//             name="state"
//             placeholder="State"
//             value={shippingAddress.state}
//             onChange={handleInputChange}
//             className="border p-3 rounded-md"
//           />
//           <input
//             type="text"
//             name="country"
//             placeholder="Country"
//             value={shippingAddress.country}
//             onChange={handleInputChange}
//             className="border p-3 rounded-md"
//           />
//           <input
//             type="text"
//             name="zip"
//             placeholder="Zip Code"
//             value={shippingAddress.zip}
//             onChange={handleInputChange}
//             className="border p-3 rounded-md"
//           />
//         </div>
//       </div>

//       <button
//         onClick={handleSubmitOrder}
//         className={`mt-6 w-full py-3 text-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition duration-300 ${
//           isLoading ? "opacity-50 cursor-not-allowed" : ""
//         }`}
//         disabled={isLoading}
//       >
//         {isLoading ? "Placing Order..." : "Place Order"}
//       </button>
//     </div>
//   );
// };

// export default OrderPage;
