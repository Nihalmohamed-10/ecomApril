import React, { useState } from "react";
import SearchBar from "./SearchBar";
import ProductItems from "./ProductItems";
import Category from "./Category";
import { useParams } from "react-router-dom";

function Products() {
  const [searchTerm, setSearchTerm] = useState("");
  const { category } = useParams();

  return (
    <div className="mt-10 w-full lg:pl-[40px]  xl:pl-[55px] xl:pr-[30px] 2xl:pr-[10px]">
      <div className="sm:pl-[10px] md:pl-[20px] lg:pl-0">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>
      <div className="flex flex-col-reverse lg:flex-row lg:gap-3 xl:gap-1">
        <ProductItems
          filterIt={(product) =>
            (searchTerm
              ? product.title.toLowerCase().includes(searchTerm.toLowerCase()): true) &&
            (!category ||
              category === "All" ||
              product.category.name.toLowerCase() === category.toLowerCase())
          }
        />
        <div>
          <Category />
        </div>
      </div>
    </div>
  );
}

export default Products;

// import React, { useState } from "react";
// import { useParams } from "react-router-dom";
// import SearchBar from "./SearchBar";
// import ProductItems from "./ProductItems";
// import Category from "./Category";

// function Products() {
//   const { category } = useParams();
//   const [searchTerm, setSearchTerm] = useState("");

//   return (
//     <div className="mt-10 w-full lg:pl-[40px]  xl:pl-[55px] xl:pr-[30px] 2xl:pr-[10px]">
//       <div className="sm:pl-[10px] md:pl-[20px] lg:pl-0">
//         <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
//       </div>
//       <div className="flex flex-col-reverse lg:flex-row lg:gap-3 xl:gap-1">
//         <ProductItems
//           filterIt={(product) =>
//             (searchTerm ? product.title.toLowerCase().includes(searchTerm.toLowerCase()) : true) &&
//             (!category || category === "all" || product.category.name.toLowerCase() === category.toLowerCase())
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
