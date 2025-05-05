import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import { motion } from "framer-motion";

function Category() {
  const { category } = useParams(); 
  const navigate = useNavigate();

  const categories = [
    "All",
    "Clothes",
    "furniture",
    "Electronics",
    "Shoes",
    "Miscellaneous",
  ];

  return (
    <motion.div
      className="mt-5 w-[90%] mx-auto flex flex-col gap-5 border border-gray-300 rounded-2xl p-5 lg:w-[220px] 2xl:w-[250px] bg-gradient-to-br from-indigo-600 via-purple-500 to-pink-400 shadow-2xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex items-center text-white mb-4">
        <motion.div whileHover={{ rotate: 20 }}>
          <PlaylistAddIcon sx={{ width: 32, height: 32, color: "#fff" }} />
        </motion.div>
        <p className="ml-3 text-xl font-bold tracking-wide">Categories</p>
      </div>

      {categories.map((cat) => {
        const categoryName = cat.toLowerCase();
        const isSelected =
          (category?.toLowerCase() === categoryName) ||
          (!category && categoryName === "all"); // Highlight "All" when no category in URL

        return (
          <motion.div
            key={cat}
            whileHover={{ scale: 1.05, rotate: 1 }}
            className={`flex items-center space-x-3 p-3 rounded-xl cursor-pointer transition-all
              ${
                isSelected
                  ? "bg-white text-indigo-600 font-bold shadow-md"
                  : "bg-gradient-to-r from-gray-100 to-gray-200 hover:bg-gradient-to-l hover:from-pink-200 hover:to-purple-200 text-gray-700"
              }
            `}
            onClick={() =>
              navigate(`/home/${categoryName === "all" ? "" : categoryName}`)

            }
          >
            <motion.div
              whileHover={{ scale: 1.2 }}
              className="flex items-center justify-center"
            >
              <PlaylistAddIcon
                sx={{
                  width: 24,
                  height: 24,
                  color: isSelected ? "#703BF7" : "#666",
                }}
              />
            </motion.div>
            <span className="text-lg">{cat}</span>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

export default Category;



// import React from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";

// function Category() {
//   const { category } = useParams(); 
//   const navigate = useNavigate();
//   const categories = ["All", "Clothes", "Furniture", "Electronics", "Shoes", "Miscellaneous"];

//   return (
//     <div className="mt-5 w-[90%] mx-auto flex flex-col gap-4 border border-[#999999] rounded-lg pb-3 lg:w-[200px] 2xl:w-[220px]">
//       <div className="pl-3 flex items-center">
//         <div className="w-[30px]">
//           <PlaylistAddIcon sx={{ width: 30, height: 30, color: "#703BF7" }} />
//         </div>
//         <p className="p-2 text-center text-[18px]">Categories :</p>
//       </div>
//       {categories.map((cat) => {
//         const categoryName = cat.toLowerCase();
//         console.log("cat:", cat);
        
        
//         return (
//           <div
//             key={cat}
//             className={`p-[5px] pl-4 bg-gradient-to-r from-[#e5e7eb] to-[#f9fafb] cursor-pointer ${
//               category?.toLowerCase() === categoryName || (!category && categoryName === "All")
//                 ? "border-l-4 border-[#703BF7]"
//                 : ""
//             }`}
//             onClick={() =>
//               navigate(`/products/${categoryName === "all" ? "" : categoryName}`)
//             }
//           >
//             {cat}
//           </div>
//         );
//       })}
//     </div>
//   );
// }

// export default Category;

