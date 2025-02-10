// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import LightModeIcon from "@mui/icons-material/LightMode";
// import LoginIcon from "@mui/icons-material/Login";
// import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
// import GitHubIcon from "@mui/icons-material/GitHub";
// import MenuIcon from "@mui/icons-material/Menu";
// import CloseIcon from "@mui/icons-material/Close";

// function Navbar() {
//   const [menuOpen, setMenuOpen] = useState(false);

//   return (
//     <div className="flex justify-between items-center w-full pt-5 pb-5 border-b gap-1 sm:justify-evenly relative">
//       {/* Hamburger Icon (Always Visible) */}
//       <div
//         className="xl:hidden pl-0 absolute top-5 left-4 z-50"
//         onClick={() => setMenuOpen(!menuOpen)}
//       >
//         {menuOpen ? (
//           <CloseIcon className="cursor-pointer" />
//         ) : (
//           <MenuIcon className="cursor-pointer" />
//         )}
//       </div>

//       {/* Title (Hidden when menu is open, but space is maintained) */}
//       <div className="flex-1 flex justify-center">
//         <h1
//           className={` text-[16px] font-bold sm:text-[22px] lg:text-5xl transition-opacity duration-300 ${
//             menuOpen ? "opacity-0" : "opacity-100"
//           }`}
//         >
//           React Shop
//         </h1>
//       </div>

//       {/* Desktop Navigation */}
//       <div className="hidden xl:flex w-[28%] justify-evenly border px-5 py-2 rounded-3xl xl:ml-[70px]">
//         <Link to="/" className="text-[20px]">
//           Home
//         </Link>
//         <Link to="/products" className="text-[20px]">
//           Products
//         </Link>
//         <Link to="/about" className="text-[20px]">
//           About
//         </Link>
//       </div>

//       {/* Right Side Buttons (Hidden when menu is open) */}
//       <div
//         className={`flex justify-end items-center w-[200px] gap-1 sm:w-[250px] sm:justify-evenly xl:w-[334px] transition-opacity duration-300 ${
//           menuOpen ? "opacity-0 pointer-events-none" : "opacity-100"
//         }`}
//       >
//         <div className="w-[87px] pt-1 pr-2 pl-2 pb-1 border rounded-lg lg:w-[110px]">
//           <Link to="/signin">
//             <button className="relative flex items-center gap-2 text-[14px] font-bold lg:text-[18px]">
//               <LoginIcon className="w-2" /> Login
//             </button>
//           </Link>
//         </div>
//         <div className="w-[105px] pt-1 pr-2 pl-2 pb-1 border rounded-lg lg:w-[130px] xl:w-[116px]">
//           <Link to="/signup">
//             <button className="relative flex items-center gap-2 text-[14px] font-bold lg:text-[18px]">
//               <PersonAddAltIcon /> Sign Up
//             </button>
//           </Link>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       {menuOpen && (
//         <div className="absolute top-[100%] left-0 w-full h-screen bg-white shadow-lg flex flex-col items-center py-5 space-y-4 xl:hidden z-40">
//           <Link
//             to="/"
//             className="text-[20px]"
//             onClick={() => setMenuOpen(false)}
//           >
//             Home
//           </Link>
//           <Link
//             to="/products"
//             className="text-[20px]"
//             onClick={() => setMenuOpen(false)}
//           >
//             Products
//           </Link>
//           <Link
//             to="/about"
//             className="text-[20px]"
//             onClick={() => setMenuOpen(false)}
//           >
//             About
//           </Link>
//           <div className="flex gap-4">
//             <LightModeIcon className="cursor-pointer" />
//             <GitHubIcon className="cursor-pointer" />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Navbar;
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import LightModeIcon from "@mui/icons-material/LightMode";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import GitHubIcon from "@mui/icons-material/GitHub";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const handleHamburgerClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="relative flex justify-between items-center w-full p-5 border-b bg-white z-[50] xl:pl-[100px] xl:pr-[100px]">
      <div
        onClick={handleHamburgerClick}
        className="border p-2 rounded-lg flex flex-col gap-1.5 cursor-pointer xl:hidden z-[100] relative w-[40px] h-[38px]"
      >
        <div className="w-6 h-0.5 bg-[blue]"></div>
        <div className="w-3 h-0.5 bg-[blue]"></div>
        <div className="w-6 h-0.5 bg-[blue]"></div>
      </div>

      {!isMenuOpen && (
        <h1 className="text-[16px] font-bold sm:text-[22px] lg:text-5xl">
          React Shop
        </h1>
      )}

      <div className="hidden xl:flex w-[28%] justify-evenly border p-2 rounded-3xl">
        <Link to="/" className="text-[20px]">
          Home
        </Link>
        <Link to="/products" className="text-[20px]">
          Products
        </Link>
        <Link to="/about" className="text-[20px]">
          About
        </Link>
      </div>

      {!isMenuOpen && (
        <div className="flex items-center gap-2 sm:gap-4">
          <Link
            to="/signin"
            className="border rounded-lg p-2 flex items-center gap-2"
          >
            <LoginIcon />
            <span className="text-[14px] font-bold">Login</span>
          </Link>
          <Link
            to="/signup"
            className="border rounded-lg p-2 flex items-center gap-2"
          >
            <PersonAddAltIcon />
            <span className="text-[14px] font-bold">Sign Up</span>
          </Link>
          <div className="hidden xl:flex border p-2 rounded-lg">
            <LightModeIcon />
          </div>
          <div className="hidden xl:flex border p-2 rounded-lg">
            <GitHubIcon />
          </div>
        </div>
      )}

      {isMenuOpen && (
        <div className="pt-30 gap-15 fixed top-0 left-0 w-full h-screen bg-white flex flex-col items-center p-4 shadow-md z-[50] ">
          <div className="absolute top-4 right-4 flex gap-2">
            <div className="border p-2 rounded-lg">
              <LightModeIcon />
            </div>
            <div className="border p-2 rounded-lg">
              <GitHubIcon />
            </div>
          </div>

          <Link
            to="/"
            className="text-[20px] py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/products"
            className="text-[20px] py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            Products
          </Link>
          <Link
            to="/about"
            className="text-[20px] py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            About
          </Link>
        </div>
      )}
    </div>
  );
}

export default Navbar;
