import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import React, { useEffect, useState, useContext } from "react";
import LoadingSpinner from "../products/Loading";
import { CartContext } from "../../context/CartContext";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate(); // ✅ added navigate
  const [productDetails, setProductDetails] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    axios
      .get(`http://localhost:5006/api/products/${id}`)
      .then((res) => {
        const product = res.data;
        setProductDetails(product);
        setSelectedImage(product.images?.[0] || "");
      })
      .catch((err) => console.error("Error", err));
  }, [id]);

  if (!productDetails) {
    return <LoadingSpinner />;
  }

  return (
    <div className="mt-10 w-[92%] mx-auto animate-fade-in lg:w-[80%] mb-12">
      <div className="relative border rounded-3xl bg-gradient-to-r from-[#F4F4F5] via-[#EFEFFE] to-[#F4F4F5] shadow-lg flex flex-col-reverse lg:flex-row p-5 lg:p-10 gap-10 transition-all">
        
        {/* Back Button */}
        <Link to="/home" className="absolute top-3 right-3">
          <button className="bg-white border border-gray-400 text-gray-700 rounded-full px-4 py-2 hover:bg-gray-200 hover:scale-105 transition">
            ← Back
          </button>
        </Link>

        {/* Left Side */}
        <div className="flex flex-col gap-5 lg:w-1/2">
          {/* Thumbnails */}
          <div className="flex gap-4 overflow-x-auto">
            {productDetails.images?.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Thumbnail ${index}`}
                onClick={() => setSelectedImage(image)}
                className={`w-[70px] h-[70px] object-cover rounded-xl border-2 ${
                  selectedImage === image
                    ? "border-[#703BF7] opacity-80"
                    : "border-transparent opacity-100"
                } hover:scale-110 transition-all cursor-pointer`}
              />
            ))}
          </div>

          {/* Product Info */}
          <h2 className="text-3xl font-bold text-gray-800">{productDetails.name}</h2>
          
          {/* Category Badge */}
          <div className="bg-[#e0d4fc] text-[#703BF7] font-semibold px-4 py-1 rounded-full w-fit text-sm tracking-wide shadow-sm">
            {productDetails.category}
          </div>

          {/* Description */}
          <p className="text-gray-600 text-base leading-relaxed">{productDetails.description}</p>

          {/* Price and Add to Cart */}
          <div className="flex justify-between items-center mt-5">
            <div className="group">
              <p className="text-sm text-gray-500">Price</p>
              <p className="text-2xl font-bold text-[#703BF7] group-hover:scale-110 transition-transform">
                ${productDetails.price}
              </p>
            </div>

            <button 
              onClick={() => {
                addToCart(productDetails); // ✅ add to context/backend
                navigate("/cart"); // ✅ navigate to cart page
              }}
              className="bg-[#703BF7] hover:bg-[#5c2dd5] transition-all text-white px-6 py-3 rounded-xl shadow-md hover:scale-105"
            >
              Add to Cart
            </button>
          </div>
        </div>

        {/* Right Side (Main Image) */}
        <div className="flex justify-center items-center lg:w-1/2">
          <img
            src={selectedImage}
            alt="Selected Product"
            className="rounded-3xl border shadow-2xl w-full h-[300px] sm:h-[400px] object-cover hover:shadow-purple-300 transition-all duration-500"
          />
        </div>

      </div>
    </div>
  );
}

export default ProductDetail;


// import axios from "axios";
// import { Link, useParams } from "react-router-dom";
// import React, { useEffect, useState, useContext } from "react";
// import LoadingSpinner from "../products/Loading";
// import { CartContext } from "../../context/CartContext";

// function ProductDetail() {
//   const { id } = useParams();
//   const [productDetails, setProductDetails] = useState(null);
//   const [selectedImage, setSelectedImage] = useState(null);
//   const { addToCart } = useContext(CartContext);

//   useEffect(() => {
//     axios
//       .get(`http://localhost:5006/api/products/${id}`)
//       .then((res) => {
//         const product = res.data;
//         setProductDetails(product);
//         setSelectedImage(product.images?.[0] || "");
//       })
//       .catch((err) => console.error("Error", err));
//   }, [id]);

//   if (!productDetails) {
//     return <LoadingSpinner />;
//   }

//   return (
//     <div className="mt-10 w-[92%] mx-auto animate-fade-in lg:w-[80%]">
//       <div className="relative border rounded-3xl bg-gradient-to-r from-[#F4F4F5] via-[#EFEFFE] to-[#F4F4F5] shadow-lg flex flex-col-reverse lg:flex-row p-5 lg:p-10 gap-10 transition-all">
        
//         {/* Back Button */}
//         <Link to="/products" className="absolute top-3 right-3">
//           <button className="bg-white border border-gray-400 text-gray-700 rounded-full px-4 py-2 hover:bg-gray-200 hover:scale-105 transition">
//             ← Back
//           </button>
//         </Link>

//         {/* Left Side */}
//         <div className="flex flex-col gap-5 lg:w-1/2">
//           {/* Thumbnails */}
//           <div className="flex gap-4 overflow-x-auto">
//             {productDetails.images?.map((image, index) => (
//               <img
//                 key={index}
//                 src={image}
//                 alt={`Thumbnail ${index}`}
//                 onClick={() => setSelectedImage(image)}
//                 className={`w-[70px] h-[70px] object-cover rounded-xl border-2 ${
//                   selectedImage === image
//                     ? "border-[#703BF7] opacity-80"
//                     : "border-transparent opacity-100"
//                 } hover:scale-110 transition-all cursor-pointer`}
//               />
//             ))}
//           </div>

//           {/* Product Info */}
//           <h2 className="text-3xl font-bold text-gray-800">{productDetails.name}</h2>
          
//           {/* Category Badge */}
//           <div className="bg-[#e0d4fc] text-[#703BF7] font-semibold px-4 py-1 rounded-full w-fit text-sm tracking-wide shadow-sm">
//             {productDetails.category}
//           </div>

//           {/* Description */}
//           <p className="text-gray-600 text-base leading-relaxed">{productDetails.description}</p>

//           {/* Price and Add to Cart */}
//           <div className="flex justify-between items-center mt-5">
//             <div className="group">
//               <p className="text-sm text-gray-500">Price</p>
//               <p className="text-2xl font-bold text-[#703BF7] group-hover:scale-110 transition-transform">
//                 ${productDetails.price}
//               </p>
//             </div>

//             <button 
//               onClick={() => addToCart(productDetails)}
//               className="bg-[#703BF7] hover:bg-[#5c2dd5] transition-all text-white px-6 py-3 rounded-xl shadow-md hover:scale-105"
//             >
//               Add to Cart
//             </button>
//           </div>
//         </div>

//         {/* Right Side (Main Image) */}
//         <div className="flex justify-center items-center lg:w-1/2">
//           <img
//             src={selectedImage}
//             alt="Selected Product"
//             className="rounded-3xl border shadow-2xl w-full h-[300px] sm:h-[400px] object-cover hover:shadow-purple-300 transition-all duration-500"
//           />
//         </div>

//       </div>
//     </div>
//   );
// }

// export default ProductDetail;
