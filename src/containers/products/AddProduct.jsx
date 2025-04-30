// AddProduct.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { getToken, getUserRole } from "../../utlis/auth";

function AddProduct() {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const productId = searchParams.get("id");

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

    if (productId) {
      const fetchProduct = async () => {
        try {
          const token = getToken();
          const res = await axios.get(
            `http://localhost:5006/api/products/${productId}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          const product = res.data;
          setFormData({
            name: product?.name,
            description: product?.description,
            price: product?.price,
            category: product?.category,
            stock: product?.stock,
            images: product?.images.join(", "),
          });
        } catch (err) {
          console.error(
            "Error fetching product:",
            err.response?.data || err.message
          );
        }
      };

      fetchProduct();
    }
  }, [productId]);

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

      if (productId) {
        await axios.put(
          `http://localhost:5006/api/products/${productId}`,
          payload,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      } else {
        await axios.post("http://localhost:5006/api/products", payload, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }

      navigate("/products");
    } catch (err) {
      console.error(
        "Error submitting form:",
        err.response?.data || err.message
      );
      alert("Failed to submit form");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-purple-200 p-6">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-purple-700 mb-6 text-center">
          {productId ? "Update Product" : "Add Product"}
        </h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            name="name"
            placeholder="Product Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400"
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400"
            required
          />
          <input
            name="price"
            placeholder="Price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400"
            required
          />
          <input
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400"
            required
          />
          <input
            name="stock"
            placeholder="Stock"
            type="number"
            value={formData.stock}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400"
            required
          />
          <input
            name="images"
            placeholder="Images (comma-separated URLs)"
            value={formData.images}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400"
          />
          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-lg transition"
          >
            {productId ? "Update Product" : "Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;

// // AddProduct.jsx
// import React, { useState, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import axios from "axios";
// import { getToken, getUserRole } from "../../utlis/auth";

// function AddProduct() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const searchParams = new URLSearchParams(location.search);
//   const productId = searchParams.get("id");

//   const [formData, setFormData] = useState({
//     name: "",
//     description: "",
//     price: "",
//     category: "",
//     stock: "",
//     images: "",
//   });

//   useEffect(() => {
//     const role = getUserRole();
//     if (role !== "seller") {
//       navigate("/products");
//     }

//     if (productId) {
//       const fetchProduct = async () => {
//         try {
//           const token = getToken();
//           const res = await axios.get(
//             `http://localhost:5006/api/products/${productId}`,
//             {
//               headers: { Authorization: `Bearer ${token}` },
//             }
//           );

//           const product = res.data;
//           setFormData({
//             name: product?.name,
//             description: product?.description,
//             price: product?.price,
//             category: product?.category,
//             stock: product?.stock,
//             images: product?.images.join(", "),
//           });
//         } catch (err) {
//           console.error(
//             "Error fetching product:",
//             err.response?.data || err.message
//           );
//         }
//       };

//       fetchProduct();
//     }
//   }, [productId]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const token = getToken();
//       const payload = {
//         ...formData,
//         price: parseFloat(formData.price),
//         stock: parseInt(formData.stock),
//         images: formData.images.split(",").map((url) => url.trim()),
//       };

//       if (productId) {
//         await axios.put(
//           `http://localhost:5006/api/products/${productId}`,
//           payload,
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );
//       } 
//       else {
//         await axios.post("http://localhost:5006/api/products", payload, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//       }

//       navigate("/products");
//     } catch (err) {
//       console.error(
//         "Error submitting form:",
//         err.response?.data || err.message
//       );
//       alert("Failed to submit form");
//     }
//   };

//   return (
//     <div className="p-4 max-w-md mx-auto">
//       <h1 className="text-2xl font-bold mb-4">
//         {productId ? "Update Product" : "Add Product"}
//       </h1>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           name="name"
//           placeholder="Product Name"
//           value={formData.name}
//           onChange={handleChange}
//           className="w-full p-2 border rounded"
//           required
//         />
//         <textarea
//           name="description"
//           placeholder="Description"
//           value={formData.description}
//           onChange={handleChange}
//           className="w-full p-2 border rounded"
//           required
//         />
//         <input
//           name="price"
//           placeholder="Price"
//           type="number"
//           value={formData.price}
//           onChange={handleChange}
//           className="w-full p-2 border rounded"
//           required
//         />
//         <input
//           name="category"
//           placeholder="Category"
//           value={formData.category}
//           onChange={handleChange}
//           className="w-full p-2 border rounded"
//           required
//         />
//         <input
//           name="stock"
//           placeholder="Stock"
//           type="number"
//           value={formData.stock}
//           onChange={handleChange}
//           className="w-full p-2 border rounded"
//           required
//         />
//         <input
//           name="images"
//           placeholder="Images (comma-separated URLs)"
//           value={formData.images}
//           onChange={handleChange}
//           className="w-full p-2 border rounded"
//         />
//         <button
//           type="submit"
//           className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
//         >
//           {productId ? "Update Product" : "Add Product"}
//         </button>
//       </form>
//     </div>
//   );
// }

// export default AddProduct;
