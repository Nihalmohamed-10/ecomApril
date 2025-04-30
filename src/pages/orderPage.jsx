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

      if (response.data) {
        localStorage.setItem(
          "latestOrder",
          JSON.stringify(response.data.order)
        );
        navigate("/order-success");
      }
    } catch (error) {
      console.error("Error placing order:", error.response?.data || error.message);
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
          <p className="text-lg text-gray-700 mt-2">
            ₹{singleProduct.price}
          </p>
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

//     const token = localStorage.getItem("token"); // Make sure token is stored at login

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

//       if (response.data) {
//         localStorage.setItem(
//           "latestOrder",
//           JSON.stringify(response.data.order)
//         );
//         navigate("/order-success");
//       }
//     } catch (error) {
//       console.error("Error placing order:", error);
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



// import React, { useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import axios from "axios";

// const OrderPage = () => {
//   const location = useLocation();
//   const singleProduct = location.state?.singleProduct; // Product passed from CartPage

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
//     setShippingAddress({
//       ...shippingAddress,
//       [name]: value,
//     });
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

//     const token = localStorage.getItem("token"); // Get JWT token from localStorage

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
//       const response = await axios.post("http://localhost:5006/api/orders/create-order",orderData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       if (response.data) {
//         alert("Order placed successfully!");
//         navigate("/order-success");
//       }
//     } catch (error) {
//       console.error("Error placing order:", error);
//       alert(
//         error.response?.data?.message ||
//           "There was an error placing your order."
//       );
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
//             ${singleProduct.price}
//           </p>
//         </div>
//       )}

//       <div className="bg-white rounded-xl shadow-md p-6 mb-6">
//         <h2 className="text-xl font-semibold mb-4">Payment Summary</h2>
//         <div className="flex justify-between text-lg">
//           <span>Total Amount:</span>
//           <span className="font-bold text-green-600">
//             $
//             {(
//               singleProduct?.price * (singleProduct?.quantity || 1)
//             ).toFixed(2)}
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

// import React, { useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import axios from "axios";

// const OrderPage = () => {
//   const location = useLocation();
//   const singleProduct = location.state?.singleProduct; // This should hold the product passed from CartPage

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
//     setShippingAddress({
//       ...shippingAddress,
//       [name]: value,
//     });
//   };

//   const handleSubmitOrder = async () => {
//     if (!shippingAddress.address || !shippingAddress.city || !shippingAddress.state || !shippingAddress.zip) {
//       alert("Please fill in all shipping details");
//       return;
//     }

//     setIsLoading(true);

//     const orderData = {
//       user: "userId", // Replace with actual user ID
//       items: singleProduct ? [{ product: singleProduct._id, quantity: singleProduct.quantity || 1 }] : [],
//       shippingAddress,
//       totalAmount: singleProduct ? singleProduct.price * (singleProduct.quantity || 1) : 0,
//     };

//     try {
//       const response = await axios.post("/api/orders", orderData);
//       if (response.data) {
//         alert("Order placed successfully!");
//         navigate("/order-success");
//       }
//     } catch (error) {
//       console.error("Error placing order:", error);
//       alert("There was an error placing your order.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="container mx-auto p-6">
//       <h1 className="text-3xl font-bold mb-6 text-center">Order Review</h1>

//       {/* Display product details if singleProduct is available */}
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
//           <p className="text-lg text-gray-700 mt-2">${singleProduct.price}</p>
//         </div>
//       )}

//       <div className="bg-white rounded-xl shadow-md p-6 mb-6">
//         <h2 className="text-xl font-semibold mb-4">Payment Summary</h2>
//         <div className="flex justify-between text-lg">
//           <span>Total Amount:</span>
//           <span className="font-bold text-green-600">${(singleProduct?.price * (singleProduct?.quantity || 1)).toFixed(2)}</span>
//         </div>
//       </div>

//       <div className="bg-white rounded-xl shadow-md p-6 mb-6">
//         <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <input type="text" name="address" placeholder="Address" value={shippingAddress.address} onChange={handleInputChange} className="border p-3 rounded-md" />
//           <input type="text" name="city" placeholder="City" value={shippingAddress.city} onChange={handleInputChange} className="border p-3 rounded-md" />
//           <input type="text" name="state" placeholder="State" value={shippingAddress.state} onChange={handleInputChange} className="border p-3 rounded-md" />
//           <input type="text" name="country" placeholder="Country" value={shippingAddress.country} onChange={handleInputChange} className="border p-3 rounded-md" />
//           <input type="text" name="zip" placeholder="Zip Code" value={shippingAddress.zip} onChange={handleInputChange} className="border p-3 rounded-md" />
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



// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const OrderPage = () => {
//   const [orders, setOrders] = useState([]);

//   // Retrieve the token from localStorage
//   const token = localStorage.getItem('token'); 

//   useEffect(() => {
//     const fetchOrders = async () => {
//       if (!token) {
//         console.error('No token found');
//         return; // No token, so we don't proceed with the API request
//       }

//       try {
//         const res = await axios.get('http://localhost:5006/api/orders', {
//           headers: {
//             Authorization: `Bearer ${token}`, // Send token in Authorization header
//           },
//         });
//         setOrders(res.data);
//       } catch (error) {
//         console.error('Error fetching orders:', error.response?.data?.message || error.message);
//       }
//     };

//     fetchOrders();
//   }, [token]);

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Ordered Products</h1>
//       {orders.length === 0 ? (
//         <p>No orders found.</p>
//       ) : (
//         <div className="space-y-4">
//           {orders.map((order) => (
//             <div
//               key={order._id}
//               className="border p-4 rounded shadow bg-white"
//             >
//               <h2 className="text-xl font-semibold mb-2">Order ID: {order._id}</h2>
//               <p className="text-gray-600 mb-2">Ordered By: {order.user?.name || 'Unknown User'}</p>
//               <div className="space-y-2">
//                 {order.products.map((prod) => (
//                   <div
//                     key={prod.productId?._id}
//                     className="flex justify-between border-b pb-2"
//                   >
//                     <span>{prod.productId?.name}</span>
//                     <span>Qty: {prod.quantity}</span>
//                     <span>₹{prod.productId?.price}</span>
//                     <span>Total: ₹{prod.quantity * prod.productId?.price}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default OrderPage;

