import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import LoadingSpinner from "./Loading";
import sorry from "../../assets/images/sorry.webp";
import { CartContext } from "../../context/CartContext";

function ProductItems({ filterIt }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5006/api/products")
      .then((res) => {
        console.log("Products response:", res.data); 
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setLoading(false);
      });
  }, []);

  const filteredProducts = products.filter(filterIt);

  const handleAddToCart = (product) => {
    addToCart(product);
    navigate("/cart");
  };

  return (
    <div className="grid grid-cols-1 gap-6 p-5 w-full mx-auto md:w-10/12 md:grid-cols-2 lg:w-[72%] lg:mx-0 xl:grid-cols-3 xl:w-[80%]">
      {loading ? (
        <div className="flex justify-center items-center w-full">
          <LoadingSpinner />
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="flex justify-center items-center w-full">
          <img src={sorry} alt="No products found" />
        </div>
      ) : (
        filteredProducts.map((product) => (
          <div
            key={product._id}
            className="flex flex-col gap-5 border border-[#999999] pt-6 pl-6 pr-6 pb-6 rounded-lg"
          >
            <Link to={`/productDetails/${product._id}`}>
              <div className="w-full h-77">
                <img
                  src={product.images?.[0] || sorry}
                  alt={product.name}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </Link>

            <p className="text-xl font-semibold mt-3">{product.name}</p>

            <div className="flex gap-1">
              <p className="text-xs text-gray-500">
                {product.description?.substring(0, 30)}...
              </p>
              <Link className="text-xs" to={`/productDetails/${product._id}`}>
                Read more
              </Link>
            </div>

            <div className="text-sm font-bold text-gray-700 bg-[#e5e7eb] pt-2 pb-2 pl-3 pr-3 w-fit border rounded-2xl">
              <p className="text-xs">{product.category}</p>
            </div>

            <div className="flex justify-between items-center mt-3">
              <div>
                <p className="text-sm">Price</p>
                <p className="text-xl font-semibold">${product.price}</p>
              </div>

              <button
                onClick={() => handleAddToCart(product)}
                className="bg-[#703BF7] text-white px-4 py-1 rounded"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default ProductItems;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Link, useNavigate } from "react-router-dom";

// function ProductItems({filterIt}) {
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     axios
//       .get("https://api.escuelajs.co/api/v1/products ")
//       .then((res) => setProducts(res.data))
//       .catch((err) => console.error("Error:", err));
//   }, []);
// const filterData = filterIt? products.filter(filterIt):products;
//   return (
//     <div className="grid grid-cols-1 gap-6 p-5 w-[350px] mx-auto md:w-10/12 md:grid-cols-2 lg:w-[72%] lg:mx-0 xl:grid-cols-3 xl:w-[80%] ">
//       {filterData.map((product) => (
//         <div
//           key={product.id}
//           className="flex flex-col gap-5 border border-[#999999]  pt-6 pl-6 pr-6 pb-6 rounded-lg "
//         >
//           <Link to={`/productDetails/${product.id}`}>
//             <div className="w-full h-77  ">
//               <img
//                 src={product.images[0]}
//                 alt={product.title}
//                 className="w-full h-full object-cover rounded-lg"
//               />
//             </div>
//           </Link>

//           <p className="text-xl font-semibold mt-3">{product.title}</p>
//           <div className="flex gap-1">
//             <p className="text-xs text-gray-500">
//               {product.description.substring(0, 30)}...
//             </p>
//             <a className="text-xs" href="/prodcutDetails">
//               Read more
//             </a>
//           </div>

//           <div className=" text-sm font-bold text-gray-700 bg-[#e5e7eb] pt-2 pb-2 pl-3 pr-3 w-fit border rounded-2xl">
//             <p className="text-xs">{product.category.name}</p>
//           </div>

//           <div className="flex justify-between items-center mt-3">
//             <div>
//               <p className="text-sm ">Price</p>
//               <p className="text-xl font-semibold ">${product.price}</p>
//             </div>

//             <button className="bg-[#703BF7] text-white px-4 py-1 rounded">
//               Add to Cart
//             </button>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default ProductItems;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Link, useNavigate } from "react-router-dom";

// function ProductItems() {
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     axios
//       .get("https://api.escuelajs.co/api/v1/products ")
//       .then((res) => setProducts(res.data))
//       .catch((err) => console.error("Error:", err));
//   }, []);

//   return (
//     <div className="grid grid-cols-1 gap-6 p-5 w-[350px] mx-auto md:w-10/12 md:grid-cols-2 lg:w-[72%] lg:mx-0 xl:grid-cols-3 xl:w-[80%] ">
//       {products.map((product) => (
//         <div
//           key={product.id}
//           className="flex flex-col gap-5 border border-[#999999]  pt-6 pl-6 pr-6 pb-6 rounded-lg "
//         >
//           <Link to={`/productDetails/${product.id}`}>
//             <div className="w-full h-77  ">
//               <img
//                 src={product.images[0]}
//                 alt={product.title}
//                 className="w-full h-full object-cover rounded-lg"
//               />
//             </div>
//           </Link>

//           <p className="text-xl font-semibold mt-3">{product.title}</p>
//           <div className="flex gap-1">
//             <p className="text-xs text-gray-500">
//               {product.description.substring(0, 30)}...
//             </p>
//             <a className="text-xs" href="/prodcutDetails">
//               Read more
//             </a>
//           </div>

//           <div className=" text-sm font-bold text-gray-700 bg-[#e5e7eb] pt-2 pb-2 pl-3 pr-3 w-fit border rounded-2xl">
//             <p className="text-xs">{product.category.name}</p>
//           </div>

//           <div className="flex justify-between items-center mt-3">
//             <div>
//               <p className="text-sm ">Price</p>
//               <p className="text-xl font-semibold ">${product.price}</p>
//             </div>

//             <button className="bg-[#703BF7] text-white px-4 py-1 rounded">
//               Add to Cart
//             </button>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default ProductItems;
