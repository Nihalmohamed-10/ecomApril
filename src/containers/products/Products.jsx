import React, { useState } from "react";
import SearchBar from "./SearchBar";
import ProductItems from "./ProductItems";
import Catogory from "./Catogory";

function Products() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="mt-10 w-[100%] lg:pl-[40px] lg:w-[1024] xl:pl-[55px] xl:pr-[30px] 2xl:pr-[10px]">
      <div className="sm:pl-[10px] md:pl-[20px] lg:pl-0">
        
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>
      <div className="flex flex-col-reverse lg:flex-row lg:gap-3 xl:gap-1">
        <ProductItems filterIt={(product) =>
          searchTerm
            ? product.title.toLowerCase().includes(searchTerm.toLowerCase())
            : true
        } />
        <div>
          <Catogory />
        </div>
      </div>
    </div>
  );
}

export default Products;


// import React from 'react'
// import SearchBar from './SearchBar'
// import ProductItems from './ProductItems'
// import Catogory from './Catogory'
// function Products() {

  
//   return (
    
//     <div className='mt-10 w-[100%] lg:pl-[40px] lg:w-[1024] xl:pl-[55px] xl:pr-[30px] 2xl:pr-[10px]'>
//       <div className='sm:pl-[10px] md:pl-[20px] lg:pl-0'><SearchBar/></div>
//       <div className='flex flex-col-reverse lg:flex-row lg:gap-3 xl:gap-1'>
        
//           <ProductItems/>
        
//         <div>
//             <Catogory/>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Products


















