import React from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";

function Category() {
  const { category } = useParams();
  const location = useLocation();
  const navigate = useNavigate()
  const categories = ["All","Clothes","Furniture","Electronics","Shoes","Miscellaneous"];
  return (
    <div className="mt-5 w-[90%] mx-auto flex flex-col gap-4 border border-[#999999] rounded-lg pb-3 lg:w-[200px] 2xl:w-[220px]">
      <div className="pl-3 flex items-center">
        <div className="w-[30px]">
          <PlaylistAddIcon sx={{ width: 30, height: 30, color: "#703BF7" }} />
        </div>
        <p className="p-2 text-center text-[18px]">Categories :</p>
      </div>
      {categories.map((cat) => {
        const categoryName = cat.toLowerCase();
        return (
          <div
            key={cat}
            className={`p-[5px] pl-4 bg-gradient-to-r from-[#e5e7eb] to-[#f9fafb] cursor-pointer ${
              categoryName === (category || "all")
                ? "border-l-4 border-[#703BF7]"
                : ""
            }`}
            onClick={() =>
              navigate(`/products/${categoryName === "all" ? "" : categoryName}`)
            }
          >
            {cat}
          </div>
        );
      })}
    </div>
  );
}

export default Category;





// import React from "react";
// import { useNavigate, useParams } from "react-router-dom";

// function Category() {
//   const navigate = useNavigate();
//   const { category } = useParams(); // Get category from URL

//   const categories = ["All", "Clothes", "Furniture", "Electronics", "Shoes", "Miscellaneous"];

//   return (
//     <div className="mt-5 w-[90%] mx-auto flex flex-col gap-4 border border-[#999999] rounded-lg pb-3 lg:w-[200px] 2xl:w-[220px]">
//       <p className="p-2 text-center text-[18px] font-semibold">Categories</p>
//       {categories.map((cat) => {
//         const categorySlug = cat.toLowerCase(); // Convert category to lowercase for URL matching

//         return (
//           <div
//             key={cat}
//             className={`p-[5px] pl-4 bg-gradient-to-r from-[#e5e7eb] to-[#f9fafb] cursor-pointer ${
//               categorySlug === (category || "all") ? "border-l-4 border-[#703BF7]" : ""
//             }`}
//             onClick={() => navigate(`/products/${categorySlug === "all" ? "" : categorySlug}`)}
//           >
//             {cat}
//           </div>
//         );
//       })}
//     </div>
//   );
// }

// export default Category;
