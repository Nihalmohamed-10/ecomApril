import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import SearchBar from "./SearchBar";
import ProductItems from "./ProductItems";
import Category from "./Category";
import SpotlightSlider from "./SpotlightSlider";

function Products() {
  const [searchTerm, setSearchTerm] = useState("");
  const { category } = useParams();

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-r from-[#a2c2e1] to-[#d0e6f3] py-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Search Bar */}
      <motion.div
        className="ml-10 mb-8"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </motion.div>

      {/* Spotlight Products Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <SpotlightSlider />
      </motion.div>

      {/* Main Content */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-4 gap-6 mx-10">
        {/* Categories (Visible on Mobile First) */}
        <motion.div
          className="md:hidden mb-8"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <Category />
        </motion.div>

        {/* Products */}
        <motion.div
          className="md:col-span-3"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <ProductItems
            filterIt={(product) =>
              (searchTerm
                ? product.name?.toLowerCase().includes(searchTerm.toLowerCase())
                : true) &&
              (!category ||
                category.toLowerCase() === "all" ||
                product.category?.toLowerCase() === category.toLowerCase())
            }
          />
        </motion.div>

        {/* Categories (Visible on Larger Screens) */}
        <motion.div
          className="hidden md:block mb-8"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <Category />
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Products;



// import React, { useState } from "react";
// import SearchBar from "./SearchBar";
// import ProductItems from "./ProductItems";
// import Category from "./Category";
// import { useParams } from "react-router-dom";

// function Products() {
//   const [searchTerm, setSearchTerm] = useState("");
//   const { category } = useParams();  

//   return (
//     <div className="mt-10">
//       <div className="ml-20">
//         <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
//       </div>
//       <div className="flex ">
//         <ProductItems
//           filterIt={(product) =>
//             (searchTerm
//               ? product.name?.toLowerCase().includes(searchTerm.toLowerCase())
//               : true) &&
//             (!category ||
//               category.toLowerCase() === "all" ||
//               // product.category?.name?.toLowerCase() === category.toLowerCase()
//               product.category?.toLowerCase() === category.toLowerCase()

//             )
//           }
//         />
//         <div>
//           <Category />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Products;
