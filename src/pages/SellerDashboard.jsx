
// SellerDashboard.jsx
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
      console.error("Error fetching seller products:", error.response?.data || error.message);
      setProducts([]);
    }
  };

  useEffect(() => {
    fetchSellerProducts();
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">Seller Dashboard</h1>
      <button
        onClick={() => navigate("/addproduct")}
        className="mb-4 inline-block bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
      >
        + Add New Product
      </button>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {products && products.length > 0 ? (
          products.map((product) => (
            <div key={product._id} className="border p-4 rounded-lg shadow-md">
              <img
                src={product.image || product.images?.[0] || "/default.jpg"}
                alt={product.name}
                className="w-full h-[200px] object-cover rounded"
              />
              <h2 className="text-xl font-semibold mt-2">{product.name}</h2>
              <p className="text-gray-600">{product.category}</p>
              <p className="text-green-600 font-bold">₹{product.price}</p>
            </div>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
}

export default SellerDashboard;