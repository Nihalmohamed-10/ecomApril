// AddProducts.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getToken, getUserRole } from "../../utlis/auth";

function AddProduct() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    images: "",
  });

  useEffect(() => {
    const role = getUserRole();
    if (role !== "seller") {
      navigate("/products");
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = getToken();
      const payload = {
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        images: formData.images.split(",").map((url) => url.trim()),
      };

      const res = await axios.post("http://localhost:5006/api/products", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Product added successfully!");
      navigate("/products");
    } catch (err) {
      console.error("Error adding product:", err.response?.data || err.message);
      alert("Failed to add product");
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Add Product</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" placeholder="Product Name" value={formData.name} onChange={handleChange} className="w-full p-2 border rounded" required />
        <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input name="price" placeholder="Price" type="number" value={formData.price} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input name="category" placeholder="Category" value={formData.category} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input name="stock" placeholder="Stock" type="number" value={formData.stock} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input name="images" placeholder="Image URLs (comma-separated)" value={formData.images} onChange={handleChange} className="w-full p-2 border rounded" />
        <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">Add Product</button>
      </form>
    </div>
  );
}

export default AddProduct;