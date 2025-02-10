import React from "react";

function Catogory() {
  return (
    <div className="mt-5 w-[90%] mx-auto flex flex-col gap-4 border border-[#999999] rounded-lg pb-3 lg:w-[200px] 2xl:w-[220px]">
      <p className="p-2 text-center text-[18px]">Catogories :</p>
      <div className="p-[5px] bg-gradient-to-r from-[#e5e7eb] to-[#f9fafb]">
        All
      </div>

      <div className="p-[5px] bg-gradient-to-r from-[#e5e7eb] to-[#f9fafb]">Cloths</div>
      <div className="p-[5px] bg-gradient-to-r from-[#e5e7eb] to-[#f9fafb]">Furniture</div>
      <div className="p-[5px] bg-gradient-to-r from-[#e5e7eb] to-[#f9fafb]">Electronics</div>
      <div className="p-[5px] bg-gradient-to-r from-[#e5e7eb] to-[#f9fafb]">Shoes</div>
      <div className="p-[5px] bg-gradient-to-r from-[#e5e7eb] to-[#f9fafb]">Miscellaneous</div>
    </div>
  );
}

export default Catogory;
