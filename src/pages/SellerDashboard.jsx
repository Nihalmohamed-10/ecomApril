import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SellerDashboard() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  const fetchSellerProducts = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:5006/api/products/seller/products",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("Fetched response:", response.data);

      if (Array.isArray(response.data)) {
        setProducts(response.data);
      } else if (Array.isArray(response.data.products)) {
        setProducts(response.data.products);
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.error(
        "Error fetching seller products:",
        error.response?.data || error.message
      );
      setProducts([]);
    }
  };

  const deleteProduct = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5006/api/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchSellerProducts();
    } catch (error) {
      console.error(
        "Error deleting product:",
        error.response?.data || error.message
      );
      alert("Failed to delete product");
    }
  };

  useEffect(() => {
    fetchSellerProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-tr from-[#f5f7fa] to-[#c3cfe2] p-10">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-purple-700 mb-10">
          Seller Dashboard
        </h1>

        <div className="flex justify-center mb-10">
          <button
            onClick={() => navigate("/addproduct")}
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-3 rounded-full shadow-md hover:shadow-lg transition duration-300"
          >
            + Add New Product
          </button>
        </div>

        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {products && products.length > 0 ? (
            products.map((product) => (
              <div
                key={product._id}
                className="bg-white border border-gray-200 rounded-3xl shadow-lg hover:shadow-2xl transition duration-300 overflow-hidden flex flex-col"
              >
                <img
                  src={product.image || product.images?.[0] || "/default.jpg"}
                  alt={product.name}
                  className="w-full h-[220px] object-cover"
                />
                <div className="p-5 flex flex-col flex-1">
                  <h2 className="text-2xl font-bold text-gray-800">{product.name}</h2>
                  <p className="text-sm text-gray-500 mt-1">{product.category}</p>
                  <p className="text-gray-600 text-sm mt-2 flex-1">{product.description}</p>
                  <p className="text-lg font-semibold text-green-600 mt-3">${product.price}</p>

                  <div className="flex justify-between gap-3 mt-5">
                    <button
                      onClick={() => navigate(`/addproduct?id=${product._id}`)}
                      className="flex-1 bg-purple-100 text-purple-700 hover:bg-purple-600 hover:text-white font-semibold py-2 rounded-full transition"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => deleteProduct(product._id)}
                      className="flex-1 bg-red-100 text-red-600 hover:bg-red-600 hover:text-white font-semibold py-2 rounded-full transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600 col-span-3">No products found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default SellerDashboard;

// // SellerDashboard.jsx
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// function SellerDashboard() {
//   const navigate = useNavigate();
//   const [products, setProducts] = useState([]);

//   const fetchSellerProducts = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await axios.get(
//         "http://localhost:5006/api/products/seller/products",
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       console.log("Fetched response:", response.data);

//       if (Array.isArray(response.data)) {
//         setProducts(response.data);
//       } else if (Array.isArray(response.data.products)) {
//         setProducts(response.data.products);
//       } else {
//         setProducts([]);
//       }
//     } catch (error) {
//       console.error(
//         "Error fetching seller products:",
//         error.response?.data || error.message
//       );
//       setProducts([]);
//     }
//   };

//   const deleteProduct = async (id) => {
   
//     try {
//       const token = localStorage.getItem("token");
//       await axios.delete(`http://localhost:5006/api/products/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       fetchSellerProducts(); 
//     } catch (error) {
//       console.error("Error deleting product:", error.response?.data || error.message);
//       alert("Failed to delete product");
//     }
//   };

//   useEffect(() => {
//     fetchSellerProducts();
//   }, []);

//   return (
//     <div className="p-10">
//       <h1 className="text-3xl font-bold mb-6">Seller Dashboard</h1>
//       <button
//         onClick={() => navigate("/addproduct")}
//         className="mb-4 inline-block bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
//       >
//         + Add New Product
//       </button>

//       <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
//         {products && products.length > 0 ? (
//           products.map((product) => (
//             <div key={product._id} className="border p-4 rounded-lg shadow-md">
//               <img
//                 src={product.image || product.images?.[0] || "/default.jpg"}
//                 alt={product.name}
//                 className="w-full h-[200px] object-cover rounded"
//               />
//               <h2 className="text-xl font-semibold mt-2">{product.name}</h2>
//               <p className="text-gray-600">{product.category}</p>
//               <p className="text-gray-600">{product.description}</p>
//               <p className="text-green-600 font-bold">${product.price}</p>
//               <div className="flex gap-2 mt-4">
//                 <button
//                   onClick={() => navigate(`/addproduct?id=${product._id}`)}
//                   className="border border-[#878789] rounded-2xl text-black px-4 py-2 hover:bg-purple-700 hover:text-white transition"
//                 >
//                   Update
//                 </button>
//                 <button
//                   onClick={() => deleteProduct(product._id)}
//                   className="border border-red-500 rounded-2xl text-red-600 px-4 py-2 hover:bg-red-600 hover:text-white transition"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p>No products found.</p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default SellerDashboard;
