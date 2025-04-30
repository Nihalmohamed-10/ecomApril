// import React, { useState } from "react";
// import axios from "axios";

// function AddProduct() {
//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//     price: "",
//     category: "",
//     images: []
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleImageChange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       images: [...e.target.files],
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const token = localStorage.getItem("token");

//     try {
//       const data = new FormData();
//       for (const key in formData) {
//         if (key === "images") {
//           formData.images.forEach((img) => data.append("images", img));
//         } else {
//           data.append(key, formData[key]);
//         }
//       }

//       const response = await axios.post("http://localhost:5000/api/products/add", data, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//           Authorization: `Bearer ${token}`
//         }
//       });

//       alert("Product added successfully!");
//       setFormData({ title: "", description: "", price: "", category: "", images: [] });
//     } catch (err) {
//       console.error(err);
//       alert("Something went wrong!");
//     }
//   };

//   return (
//     <div className="w-[90%] md:w-[60%] lg:w-[40%] mx-auto mt-10 p-6 bg-white rounded shadow">
//       <h2 className="text-xl font-bold mb-4">Add New Product</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           type="text"
//           name="title"
//           placeholder="Title"
//           value={formData.title}
//           onChange={handleChange}
//           required
//           className="w-full p-2 border rounded"
//         />
//         <textarea
//           name="description"
//           placeholder="Description"
//           value={formData.description}
//           onChange={handleChange}
//           required
//           className="w-full p-2 border rounded"
//         />
//         <input
//           type="number"
//           name="price"
//           placeholder="Price"
//           value={formData.price}
//           onChange={handleChange}
//           required
//           className="w-full p-2 border rounded"
//         />
//         <input
//           type="text"
//           name="category"
//           placeholder="Category"
//           value={formData.category}
//           onChange={handleChange}
//           required
//           className="w-full p-2 border rounded"
//         />
//         <input
//           type="file"
//           multiple
//           onChange={handleImageChange}
//           className="w-full"
//         />
//         <button
//           type="submit"
//           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//         >
//           Add Product
//         </button>
//       </form>
//     </div>
//   );
// }

// export default AddProduct;
