import axios from "axios";
import { Link, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import LoadingSpinner from "../products/Loading";

function ProductDetail() {
  const { id } = useParams();
  const [productDetails, setProductDetails] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    axios
      .get("https://api.escuelajs.co/api/v1/products/")
      .then((res) => {
        const product = res.data.find((item) => item.id === Number(id));
        if (product) {
          setProductDetails(product);
          setSelectedImage(product.images[0] || "");
        }
        
      })
      .catch((err) => console.error("Error", err));
  }, []);

  if (!productDetails) {
    return <LoadingSpinner/>;
  }

  return (
    <div className="mt-5 w-[90%] mx-auto lg:w-[80%]">
      <div className="relative border rounded-xl bg-[#F4F4F5] flex flex-col items-center lg:flex-row lg:p-10 xl:gap-10">
        <Link to="/products" className="absolute right-2 top-2">
          <button className="cursor-pointer p-2 w-[85px] bg-[#E4E4E7] border border-[#878789] rounded-2xl">
            Back
          </button>
        </Link>

        <div className="flex flex-col-reverse md:gap-10 lg:flex-row lg:gap-10 w-full items-center xl:pl-8">
          <div className="flex gap-4 lg:flex-col lg:gap-5">
            {productDetails.images.map((image, index) => (
              <img
                key={index}
                className={`w-[60px] h-[60px] cursor-pointer md:w-[70px] md:h-[70px] rounded-lg ${
                  selectedImage === image ? "opacity-50" : "opacity-100"
                }`}
                src={image}
                alt={`Thumbnail ${index}`}
                onClick={() => setSelectedImage(image)}
              />
            ))}
          </div>

          <div className="w-full p-5 h-[350px] sm:h-[500px] md:p-0 lg:w-[270px] lg:h-[270px] xl:w-[400px] xl:h-[400px]">
            <img
              className="w-full h-full border rounded-lg object-cover"
              src={selectedImage}
              alt="Selected Product"
            />
          </div>
        </div>

        <div className="flex flex-col gap-6 p-5 lg:w-full">
          <h2 className="font-semibold text-2xl lg:text-4xl">
            {productDetails.title}
          </h2>
          <div className="text-sm font-bold text-gray-700 bg-[#e5e7eb] px-3 py-2 w-fit border rounded-2xl">
            {productDetails.category?.name}
          </div>
          <p className="text-[#999999] text-base font-medium lg:text-xl">
            {productDetails.description}
          </p>
          <div className="flex justify-between items-center mt-3">
            <div>
              <p className="text-sm">Price</p>
              <p className="text-xl font-semibold">${productDetails.price}</p>
            </div>
            <button className="bg-[#703BF7] text-white px-4 py-2 rounded">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;

// import axios from "axios";
// import { Link, useParams } from "react-router-dom";
// import React, { useEffect, useState } from "react";

// function ProductDetail() {
//   const param = useParams();

//   const [productDetails, setProductDetails] = useState([]);
//   const [selectedImage, setSelectedImage] = useState();

//   useEffect(() => {
//     axios
//       .get("https://react-shop-backend.liara.run/products/")
//       .then((res) => setProductDetails(res.data))
//       .catch((err) => {
//         console.error("error", err);
//       });
//   }, []);

//   return (
//     <div>
//       {productDetails
//         .filter((product) => product.id === Number(param.id))
//         .map((product) => (
//           <div key={product.id}>
//             <div className="mt-5 relative border rounded-xl flex flex-col items-center bg-[#F4F4F5] w-[90%] mx-auto lg:flex-row lg:pt-10 lg:pb-10 xl:pl-10 lg:w-[90%] xl:w-[80%]">
//               <div className="absolute right-2 top-2 ">
//                 <Link to="/products">
//                   <button className="cursor-pointer p-2 w-[85px] bg-[#E4E4E7] border border-[#878789] rounded-2xl">
//                     Back
//                   </button>
//                 </Link>
//               </div>

//               <div className="w-full mt-5 flex flex-col-reverse  gap-5 items-center md:mt-0 lg:flex-row lg:pl-10 lg:gap-10 lg:w-[100%] xl:pr-10">
//                 <div className="flex gap-4 lg:flex-col lg:gap-13">
//                   {[product.images[0],product.images[1], product.images[2]].map(
//                     (image, index) => (
//                       <div
//                         key={index}
//                         className="w-[60px] h-[60px] cursor-pointer md:w-[70px] md:h-[70px]"
//                       >
//                         <img
//                           className={`w-full h-full rounded-lg  ${
//                             selectedImage === image
//                               ? "opacity-50"
//                               : "opacity-100"
//                           }`}
//                           src={image}
//                           alt={`Thumbnail ${index}`}
//                           onClick={() => setSelectedImage(image)}
//                         />
//                       </div>
//                     )
//                   )}
//                 </div>

//                 <div className="w-full pl-5 pr-5 h-[350px] md:pl-0 md:pr-0 lg:w-[270px] lg:h-[270px] xl:w-[400px] xl:h-[400px]">
//                   <img
//                     className="w-full h-full border rounded-lg object-cover"
//                     src={selectedImage}
//                     alt="Selected"
//                   />
//                 </div>
//               </div>

//               <div className="flex flex-col gap-12 pt-10 pl-5 pr-5 pb-10 lg:pr-10 lg:w-[100%] xl:pr15">
//                 <h2 className=" font-semibold text-[24px] lg:text-4xl">
//                   {product.title}
//                 </h2>
//                 <div className="text-sm font-bold text-gray-700 bg-[#e5e7eb] pt-2 pb-2 pl-3 pr-3 w-fit border rounded-2xl">
//                   <p className="text-xs">{product.category.name}</p>
//                 </div>
//                 <p className="text-[#999999] text-base font-medium lg:text-xl">
//                   {product.description}
//                 </p>
//                 <div className="flex justify-between items-center mt-3">
//                   <div>
//                     <p className="text-sm">Price</p>
//                     <p className="text-xl font-semibold">{product.price}</p>
//                   </div>
//                   <button className="bg-[#703BF7] text-white px-4 py-1 rounded">
//                     Add to Cart
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//     </div>
//   );
// }

// export default ProductDetail;
