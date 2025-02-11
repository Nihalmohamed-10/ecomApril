// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Link, useNavigate } from "react-router-dom";

// function ElectronicsProductItems() {
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     axios
//       .get("https://api.escuelajs.co/api/v1/products  ")
//       .then((res) => setProducts(res.data))
//       .catch((err) => console.error("Error:", err));
//   }, []);

//   return (
//       <div className="grid grid-cols-1 gap-6 p-5 w-[350px] mx-auto md:w-10/12 md:grid-cols-2 lg:w-[72%] lg:mx-0 xl:grid-cols-3 xl:w-[80%]">
//         {products
//           .filter((product) => product.category.name === "Electronics") 
//           .map((product) => (
//             <div
//               key={product.id}
//               className="flex flex-col gap-5 border border-[#999999] pt-6 pl-6 pr-6 pb-6 rounded-lg"
//             >
//               <Link to={`/productDetails/${product.id}`}>
//                 <div className="w-full h-77">
//                   <img
//                     src={product.images[0]} 
//                     alt={product.title}
//                     className="w-full h-full object-cover rounded-lg"
//                   />
//                 </div>
//               </Link>
  
//               <p className="text-xl font-semibold mt-3">{product.title}</p>
//               <div className="flex gap-1">
//                 <p className="text-xs text-gray-500">
//                   {product.description.substring(0, 30)}...
//                 </p>
//                 <a className="text-xs" href="/productDetails">
//                   Read more
//                 </a>
//               </div>
  
//               <div className="text-sm font-bold text-gray-700 bg-[#e5e7eb] pt-2 pb-2 pl-3 pr-3 w-fit border rounded-2xl">
//                 <p className="text-xs">{product.category.name}</p> 
//               </div>
  
//               <div className="flex justify-between items-center mt-3">
//                 <div>
//                   <p className="text-sm">Price</p>
//                   <p className="text-xl font-semibold">${product.price}</p>
//                 </div>
  
//                 <button className="bg-[#703BF7] text-white px-4 py-1 rounded">
//                   Add to Cart
//                 </button>
//               </div>
//             </div>
//           ))}
//       </div>
//     );
// }

// export default ElectronicsProductItems;

// import axios from "axios";

// const ProductionPage = () => {
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     axios
//       .get("https://api.escuelajs.co/api/v1/products/")
//       .then((res) => setProducts(res.data))
//       .catch((err) => console.error("Error fetching products:", err));
//   }, []);

//   return (
//     <div className="p-5">
//       <h1 className="text-2xl font-bold text-center mb-5">Our Products</h1>
//       <div className="grid md:grid-cols-3 gap-5">
//         {products.map((product) => (
//           <div key={product.id} className="border p-4 rounded-lg shadow-lg">
//             {/* Product Image */}
//             <div className="relative w-full h-52 overflow-hidden">
//               <img
//                 src={product.images[0]}
//                 alt={product.title}
//                 className="w-full h-full object-cover rounded-lg"
//               />
//             </div>

//             {/* Product Info */}
//             <h2 className="text-lg font-semibold mt-3">{product.title}</h2>
//             <p className="text-sm text-gray-500">{product.category.name}</p>
//             <p className="text-gray-700 text-sm mt-2">
//               {product.description.substring(0, 100)}...
//             </p>
//             <p className="text-xl font-bold mt-2">${product.price}</p>

//             {/* Add To Cart Button */}
//             <button className="mt-3 w-full bg-blue-500 text-white py-2 rounded">
//               Add To Cart
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ProductionPage;
