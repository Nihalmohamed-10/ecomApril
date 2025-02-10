import React from "react";
import { Link } from "react-router-dom";

function Catogory() {
  return (
    <div className="mt-5 w-[90%] mx-auto flex flex-col gap-4 border border-[#999999] rounded-lg pb-3 lg:w-[200px] 2xl:w-[220px]">
      <p className="p-2 text-center text-[18px]">Catogories :</p>
      <Link to="/products">
        <div className="p-[5px] pl-4 bg-gradient-to-r from-[#e5e7eb] to-[#f9fafb]">
          All
        </div>
      </Link>

      <Link to="/clothproducts">
        <div className="p-[5px] pl-4 bg-gradient-to-r from-[#e5e7eb] to-[#f9fafb]">
          Cloths
        </div>
      </Link>
      <Link>
        <div className="p-[5px] pl-4 bg-gradient-to-r from-[#e5e7eb] to-[#f9fafb]">
          Furniture
        </div>
      </Link>
      <Link to='/electonicproducts'>
        <div className="p-[5px] pl-4 bg-gradient-to-r from-[#e5e7eb] to-[#f9fafb]">
          Electronics
        </div>
      </Link>
      <Link>
        <div className="p-[5px] pl-4 bg-gradient-to-r from-[#e5e7eb] to-[#f9fafb]">
          Shoes
        </div>
      </Link>
      <Link>
        <div className="p-[5px] pl-4 bg-gradient-to-r from-[#e5e7eb] to-[#f9fafb]">
          Miscellaneous
        </div>
      </Link>
    </div>
  );
}

export default Catogory;
