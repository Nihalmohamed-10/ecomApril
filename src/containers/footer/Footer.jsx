import React from "react";
import { GitHub, LinkedIn, Instagram } from "@mui/icons-material";
import FavoriteIcon from "@mui/icons-material/Favorite";

const Footer = () => {
  return (
    <footer className="mt-auto bg-gray-900 text-gray-300 py-8 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
        
        <div className="mb-6 md:mb-0 text-center md:text-left">
          <h1 className="text-xl font-bold text-white">Nihal's Store</h1>
          <p className="text-gray-400 mt-2">Building quality experiences with passion.</p>
        </div>

        <div className="flex space-x-6 mb-6 md:mb-0">
          <a href="#" className="hover:text-indigo-400 transition">About</a>
          <a href="#" className="hover:text-indigo-400 transition">Privacy</a>
          <a href="#" className="hover:text-indigo-400 transition">Terms</a>
          <a href="#" className="hover:text-indigo-400 transition">Contact</a>
        </div>

        <div className="flex space-x-6">
          <a href="https://github.com/Nihalmohamed-10" target="_blank" rel="noopener noreferrer" className="hover:text-white">
            <GitHub />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
            <LinkedIn />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400">
            <Instagram />
          </a>
        </div>

      </div>

      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-gray-500 text-sm">
        <p>
          Made with <FavoriteIcon fontSize="small" className="text-pink-500" /> by{" "}
          <a href="https://github.com/Nihalmohamed-10" className="text-indigo-400 hover:underline">Nihal Mohamed</a> © {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
};

export default Footer;


// import React from "react";
// import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
// import GitHubIcon from "@mui/icons-material/GitHub";
// import FavoriteIcon from "@mui/icons-material/Favorite";

// function Footer() {
//   return (
//     <div className="mt-20 max-w-6xl mx-auto pt-10 pb-10  ">
//       <div className="text-center pb-10">
//         <a href="">Terms .</a>
//         <a href="">Privacy Policy</a>
//       </div>
      
//       <div className="border-t pt-10 flex flex-col-reverse pl-10 md:flex-row md:justify-between md:pl-5">
//         <p>
//           <span>made with</span>{" "}
//           <FavoriteIcon className="w-3 h-3 text-[#926ffa]" />
//           <span>by</span> <span className="text-[#926ffa]"> <a href="https://github.com/Nihalmohamed-10">Nihal</a> </span>
//         </p>
//         <div>
//           <a href="https://github.com/Nihalmohamed-10">
//             <GitHubIcon />
//           </a>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Footer;


// import React from "react";
// import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
// import GitHubIcon from "@mui/icons-material/GitHub";
// import FavoriteIcon from "@mui/icons-material/Favorite";

// function Footer() {
//   return (
//     <div className="mt-20 max-w-6xl mx-auto pt-10 pb-10  ">
//       <div className="text-center pb-10">
//         <a href="">Terms .</a>
//         <a href="">Privacy Policy</a>
//       </div>
//       {/* <div className="mt-10 flex flex-col gap-5 justify-between pb-10 border-b pl-5 pr-5 text-center sm:flex-row sm:flex-wrap sm:text-start ">
//         <div className="flex flex-col gap-2">
//           <p className="text-[#926ffa] font-bold">Products</p>
//           <a href="">web Studio</a>
//           <a href="">DynamicBox flex</a>
//           <a href="">Programming forms</a>
//           <a href="">Integrations</a>
//           <a href="">Command Lines</a>
//         </div>
//         <div className="flex flex-col gap-2">
//           <p className="text-[#926ffa] font-bold">Resources</p>
//           <a href="">Documentation</a>
//           <a href="">Tutorials& guides</a>
//           <a href="">Blog</a>
//           <a href="">Support Center</a>
//           <a href="">Partners</a>
//         </div>
//         <div className="flex flex-col gap-2">
//           <p className="text-[#926ffa] font-bold">Company</p>
//           <a href="">Home</a>
//           <a href="">About Us</a>
//           <a href="">Comapny values</a>
//           <a href="">Pricing</a>
//           <a href="">Privacy Policy</a>
//         </div>
//         <div className="flex flex-col gap-2 sm:w-[300px]">
//           <p className="text-[#926ffa] font-bold">Subscribe</p>
//           <p>Get the latest news and articles to your inbox every month</p>
//           <div className="flex justify-evenly items-center gap-5">
//             <input
//               type="text"
//               placeholder="your email id"
//               className="border-r  p-4"
//             />
//             <div>
//               <ArrowForwardIcon />
//             </div>
//           </div>
//         </div>
//       </div> */}
//       <div className="border-t pt-10 flex flex-col-reverse pl-10 md:flex-row md:justify-between md:pl-5">
//         <p>
//           <span>made with</span>{" "}
//           <FavoriteIcon className="w-3 h-3 text-[#926ffa]" />
//           <span>by</span> <span className="text-[#926ffa]"> <a href="https://github.com/Nihalmohamed-10">Nihal</a> </span>
//         </p>
//         <div>
//           <a href="https://github.com/Nihalmohamed-10">
//             <GitHubIcon />
//           </a>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Footer;
