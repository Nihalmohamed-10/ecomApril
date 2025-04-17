import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import LightModeIcon from "@mui/icons-material/LightMode";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import GitHubIcon from "@mui/icons-material/GitHub";
import { getUserRole } from "../../utlis/auth";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const [role, setRole] = useState(null);

  useEffect(() => {
    setIsMenuOpen(false);
    const userRole = getUserRole();
    console.log("Current Role:", userRole);
    setRole(userRole);
  }, [location.pathname]);

  const handleHamburgerClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role"); // Important!
    setRole(null);
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
        <Link to="/">
          <h1 className="text-[16px] font-bold sm:text-[22px] lg:text-5xl">
            React Shop
          </h1>
        </Link>
      )}

      {!isMenuOpen && (
        <div className="flex items-center gap-2 sm:gap-4">
          {role === "seller" && (
            <Link
              to="/addproduct"
              className="border rounded-lg p-2 font-semibold text-sm"
            >
              Add Product
            </Link>
          )}

          {!role ? (
            <>
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
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="border rounded-lg p-2 text-sm font-semibold"
            >
              Logout
            </button>
          )}

          <div className="hidden xl:flex border p-2 rounded-lg">
            <a href="https://github.com/Nihalmohamed-10">
              <GitHubIcon />
            </a>
          </div>
        </div>
      )}

      {isMenuOpen && (
        <div className="pt-30 gap-15 fixed top-0 left-0 w-full h-screen bg-white flex flex-col items-center p-4 shadow-md z-[50]">
          <div className="absolute top-4 right-4 flex gap-2">
            <div className="border p-2 rounded-lg">
              <a href="https://github.com/Nihalmohamed-10">
                <GitHubIcon />
              </a>
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

          {role === "seller" && (
            <Link
              to="/addproduct"
              className="text-[20px] py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Add Product
            </Link>
          )}

          {role && (
            <button
              onClick={() => {
                handleLogout();
                setIsMenuOpen(false);
              }}
              className="text-[20px] py-2 border rounded-lg px-4 mt-4"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default Navbar;


// import React, { useState, useEffect } from "react";
// import { Link, useLocation } from "react-router-dom";
// import LightModeIcon from "@mui/icons-material/LightMode";
// import LoginIcon from "@mui/icons-material/Login";
// import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
// import GitHubIcon from "@mui/icons-material/GitHub";

// function Navbar() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const location = useLocation();

//   useEffect(() => {
//     setIsMenuOpen(false);
//   }, [location.pathname]);

//   const handleHamburgerClick = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   return (
//     <div className="relative flex justify-between items-center w-full p-5 border-b bg-white z-[50] xl:pl-[100px] xl:pr-[100px]">
//       <div
//         onClick={handleHamburgerClick}
//         className="border p-2 rounded-lg flex flex-col gap-1.5 cursor-pointer xl:hidden z-[100] relative w-[40px] h-[38px]"
//       >
//         <div className="w-6 h-0.5 bg-[blue]"></div>
//         <div className="w-3 h-0.5 bg-[blue]"></div>
//         <div className="w-6 h-0.5 bg-[blue]"></div>
//       </div>

//       {!isMenuOpen && (
//         <Link to="/">
//           <h1 className="text-[16px] font-bold sm:text-[22px] lg:text-5xl">
//             React Shop
//           </h1>
//         </Link>
//       )}

//       {/* <div className="hidden xl:flex xl:ml-[49px] w-[28%] justify-evenly border p-2 rounded-3xl">
//         <Link to="/" className="text-[20px]">
//           Home
//         </Link>
//         <Link to="/products" className="text-[20px]">
//           Products
//         </Link>
//         <Link to="/about" className="text-[20px]">
//           About
//         </Link>
//       </div> */}

//       {!isMenuOpen && (
//         <div className="flex items-center gap-2 sm:gap-4">
//           <Link
//             to="/signin"
//             className="border rounded-lg p-2 flex items-center gap-2"
//           >
//             <LoginIcon />
//             <span className="text-[14px] font-bold">Login</span>
//           </Link>
//           <Link
//             to="/signup"
//             className="border rounded-lg p-2 flex items-center gap-2"
//           >
//             <PersonAddAltIcon />
//             <span className="text-[14px] font-bold">Sign Up</span>
//           </Link>
//           {/* <div className="hidden xl:flex border p-2 rounded-lg">
//             <LightModeIcon sx={{color: "#703BF7"}}/>
//           </div> */}
//           <div className="hidden xl:flex border p-2 rounded-lg">
//             <a href="https://github.com/Nihalmohamed-10">
//               <GitHubIcon />
//             </a>
//           </div>
//         </div>
//       )}

//       {isMenuOpen && (
//         <div className="pt-30 gap-15 fixed top-0 left-0 w-full h-screen bg-white flex flex-col items-center p-4 shadow-md z-[50] ">
//           <div className="absolute top-4 right-4 flex gap-2">
//             {/* <div className="border p-2 rounded-lg">
//               <LightModeIcon />
//             </div> */}
//             <div className=" border p-2 rounded-lg">
//               <a href="https://github.com/Nihalmohamed-10">
//                 <GitHubIcon />
//               </a>
//             </div>
//           </div>

//           <Link
//             to="/"
//             className="text-[20px] py-2"
//             onClick={() => setIsMenuOpen(false)}
//           >
//             Home
//           </Link>
//           <Link
//             to="/products"
//             className="text-[20px] py-2"
//             onClick={() => setIsMenuOpen(false)}
//           >
//             Products
//           </Link>
//           <Link
//             to="/about"
//             className="text-[20px] py-2"
//             onClick={() => setIsMenuOpen(false)}
//           >
//             About
//           </Link>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Navbar;
