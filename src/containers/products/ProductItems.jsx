import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import LoadingSpinner from "./Loading";
import sorry from "../../assets/images/sorry.webp";
import { CartContext } from "../../context/CartContext";
import { getUserRole } from "../../utlis/auth";
import { motion } from "framer-motion";

function ProductItems() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();
  const userRole = getUserRole();
  const { category } = useParams(); 

  useEffect(() => {
    axios
      .get("http://localhost:5006/api/products")
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setLoading(false);
      });
  }, []);

  const filteredProducts = products.filter((product) => {
    if (!category || category.toLowerCase() === "all") return true;
    return product.category?.toLowerCase() === category.toLowerCase();
  });

  const handleAddToCart = (product) => {
    addToCart(product);
    navigate("/cart");
  };

  const handleAddProductClick = () => {
    navigate("/addproduct");
  };

  return (
    <div className="w-[90%] mx-auto p-5">
      {userRole === "seller" && (
        <div className="flex justify-end mb-5">
          <button
            onClick={handleAddProductClick}
            className="bg-green-600 hover:bg-green-700 transition duration-300 cursor-pointer text-white px-5 py-2 rounded-lg"
          >
            Add Product
          </button>
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
            <motion.div
              key={product._id}
              className="bg-white border border-gray-200 rounded-2xl shadow-md p-4 flex flex-col justify-between hover:shadow-xl transition-shadow duration-300"
              whileHover={{ scale: 1.03 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Link to={`/productDetails/${product._id}`}>
                <div className="w-full h-48 overflow-hidden rounded-xl mb-3">
                  <img
                    src={product.images}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <h2 className="text-lg font-semibold text-gray-800">
                  {product.name.length > 15
                    ? `${product.name.substring(0, 15)}...`
                    : product.name}
                </h2>
                <span className="text-green-600 font-bold text-md mt-1 block">
                  ${product.price}
                </span>
              </Link>

              <button
                onClick={() => handleAddToCart(product)}
                className="mt-3 bg-purple-600 hover:bg-purple-700 transition duration-300 text-white py-2 rounded-lg"
              >
                Add to Cart
              </button>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}

export default ProductItems;



// import React, { useEffect, useState, useContext } from "react";
// import axios from "axios";
// import { Link, useNavigate } from "react-router-dom";
// import LoadingSpinner from "./Loading";
// import sorry from "../../assets/images/sorry.webp";
// import { CartContext } from "../../context/CartContext";
// import { getUserRole } from "../../utlis/auth";

// function ProductItems({ filterIt }) {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const { addToCart } = useContext(CartContext);
//   const navigate = useNavigate();
//   const userRole = getUserRole(); 

//   useEffect(() => {
//     axios
//       .get("http://localhost:5006/api/products")
//       .then((res) => {
//         setProducts(res.data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Error fetching products:", err);
//         setLoading(false);
//       });
//   }, []);

//   const filteredProducts = products.filter(filterIt); 

//   const handleAddToCart = (product) => {
//     addToCart(product);
//     navigate("/cart");
//   };

//   const handleAddProductClick = () => {
//     navigate("/addproduct");
//   };

//   return (
//     <div className="w-[80%] p-5">
//       {userRole === "seller" && (
//         <div className="flex justify-end mb-5">
//           <button
//             onClick={handleAddProductClick}
//             className="bg-green-600 cursor-pointer text-white px-4 py-2 rounded-lg"
//           >
//             Add Product
//           </button>
//         </div>
//       )}

//       <div className="grid grid-cols-1 gap-6 md:w-10/12 md:grid-cols-2 lg:w-[72%] xl:grid-cols-3 xl:w-[80%] mx-auto">
//         {loading ? (
//           <div className="flex justify-center items-center w-full">
//             <LoadingSpinner />
//           </div>
//         ) : filteredProducts.length === 0 ? (
//           <div className="flex justify-center items-center w-full">
//             <img src={sorry} alt="No products found" />
//           </div>
//         ) : (
//           filteredProducts.map((product) => (
//             <div
//               key={product._id}
//               className="flex flex-col gap-5 border border-[#999999] pt-6 pl-6 pr-6 pb-6 rounded-lg"
//             >
//               <Link to={`/productDetails/${product._id}`}>
//                 <div className="w-full h-[300px] overflow-hidden rounded-lg">
//                   <img
//                     src={product.images}
//                     alt={product.name}
//                     className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
//                   />
//                 </div>
//               </Link>
//               <div className="flex justify-between items-center">
//                 <h2 className="text-xl font-semibold">{product.name}</h2>
//                 {/* <h5 className="text-xl font-semibold">{product.category}</h5> */}
//                 <span className="text-green-600 font-bold">
//                   ${product.price}
//                 </span>
//               </div>
//               <div>
//                 <h3 className="text-sm text-gray-500 opacity-70">
//                   {product.description.length > 30
//                     ? `${product.description.slice(0, 30)}...`
//                     : product.description}
//                 </h3>
//               </div>
//               <button
//                 onClick={() => handleAddToCart(product)}
//                 className="bg-[#703BF7] cursor-pointer hover:bg-[#5a2ed3] text-white py-2 rounded-lg"
//               >
//                 Add to Cart
//               </button>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// }

// export default ProductItems;

