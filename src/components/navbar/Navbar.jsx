import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonIcon from "@mui/icons-material/Person";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

function Navbar() {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const profileMenuRef = useRef(null);


  const toggleProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center text-white">
        <Link
          to="/home"
          className="font-bold text-2xl text-white hover:text-indigo-200 transition-all duration-300"
        >
          ShopEase
        </Link>

        <div className="hidden md:flex space-x-6">
          {["Home", "Products", "About", "Contact"].map((item) => (
            <motion.div
              key={item}
              whileHover={{ scale: 1.1 }}
              className="hover:text-indigo-200 transition-all duration-300"
            >
              <Link to={`/${item.toLowerCase()}`} className="text-lg font-medium">
                {item}
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="flex items-center space-x-6">
          <Link to="/cart" className="relative">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="cursor-pointer text-3xl hover:text-indigo-200 transition-all duration-300"
            >
              <ShoppingCartIcon />
            </motion.div>
            <div className="absolute -top-2 -right-2 w-5 h-5 bg-red-600 rounded-full text-xs text-white flex items-center justify-center">
              3
            </div>
          </Link>

          <div className="relative">
            <motion.div
              whileHover={{ scale: 1.1 }}
              onClick={toggleProfileMenu}
              className="cursor-pointer text-3xl hover:text-indigo-200 transition-all duration-300"
            >
              <PersonIcon />
            </motion.div>

            {showProfileMenu && (
              <div
                ref={profileMenuRef}
                className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-md p-4 z-50"
              >
                <ul>
                  <li>
                    <Link
                      to="/profile"
                      onClick={() => setShowProfileMenu(false)}
                      className="block py-2 px-4 hover:bg-indigo-100 rounded-lg"
                    >
                      View Profile
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/updateprofile"
                      onClick={() => setShowProfileMenu(false)}
                      className="block py-2 px-4 hover:bg-indigo-100 rounded-lg"
                    >
                      Update Profile
                    </Link>
                  </li>
                  <li>
                    <Link to="/deleteaccount">
                      <button
                        onClick={() => setShowProfileMenu(false)}
                        className="block py-2 px-4 hover:bg-indigo-100 rounded-lg text-red-600"
                      >
                        Delete Account
                      </button>
                    </Link>
                  </li>
                  <li>
                    <Link to="/logout">
                      <button
                        onClick={() => setShowProfileMenu(false)}
                        className="block py-2 px-4 hover:bg-indigo-100 rounded-lg text-blue-600"
                      >
                        Logout
                      </button>
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={toggleMobileMenu} className="text-white focus:outline-none">
              {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden mt-4 bg-indigo-400 rounded-lg p-4 space-y-4 shadow-lg">
          {["Home", "Products", "About", "Contact"].map((item) => (
            <Link
              key={item}
              to={`/${item.toLowerCase()}`}
              onClick={() => setMobileMenuOpen(false)} 
              className="block text-white text-lg font-medium hover:text-indigo-200"
            >
              {item}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default Navbar;

// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { motion } from "framer-motion";
// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
// import PersonIcon from "@mui/icons-material/Person"; // Profile Icon

// function Navbar() {
//   const [showProfileMenu, setShowProfileMenu] = useState(false); // To manage profile menu visibility

//   const toggleProfileMenu = () => {
//     setShowProfileMenu(!showProfileMenu); // Toggle the profile menu
//   };

//   return (
//     <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-4 shadow-lg">
//       <div className="max-w-7xl mx-auto flex justify-between items-center text-white">
//         {/* Logo */}
//         <Link to="/" className="font-bold text-2xl text-white hover:text-indigo-200 transition-all duration-300">
//           ShopEase
//         </Link>

//         {/* Navbar Links */}
//         <div className="flex space-x-6">
//           <motion.div
//             whileHover={{ scale: 1.1 }}
//             className="hover:text-indigo-200 transition-all duration-300"
//           >
//             <Link to="/" className="text-lg font-medium">Home</Link>
//           </motion.div>
//           <motion.div
//             whileHover={{ scale: 1.1 }}
//             className="hover:text-indigo-200 transition-all duration-300"
//           >
//             <Link to="/products" className="text-lg font-medium">Products</Link>
//           </motion.div>
//           <motion.div
//             whileHover={{ scale: 1.1 }}
//             className="hover:text-indigo-200 transition-all duration-300"
//           >
//             <Link to="/about" className="text-lg font-medium">About</Link>
//           </motion.div>
//           <motion.div
//             whileHover={{ scale: 1.1 }}
//             className="hover:text-indigo-200 transition-all duration-300"
//           >
//             <Link to="/contact" className="text-lg font-medium">Contact</Link>
//           </motion.div>
//         </div>

//         {/* Cart Icon and Profile Icon */}
//         <div className="flex items-center space-x-6">
//           {/* Cart Icon */}
//           <Link to="/cart" className="relative">
//             <motion.div
//               whileHover={{ scale: 1.1 }}
//               className="cursor-pointer text-3xl hover:text-indigo-200 transition-all duration-300"
//             >
//               <ShoppingCartIcon />
//             </motion.div>
//             {/* Cart Badge */}
//             <div className="absolute top-0 right-0 w-5 h-5 bg-red-600 rounded-full text-xs text-white flex items-center justify-center">
//               3 {/* Example number of items in the cart */}
//             </div>
//           </Link>

//           {/* Profile Icon with Dropdown Menu */}
//           <div className="relative">
//             <motion.div
//               whileHover={{ scale: 1.1 }}
//               className="cursor-pointer text-3xl hover:text-indigo-200 transition-all duration-300"
//               onClick={toggleProfileMenu}
//             >
//               <PersonIcon />
//             </motion.div>

//             {/* Dropdown Menu */}
//             {showProfileMenu && (
//               <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-md p-4">
//                 <ul>
//                   <li>
//                     <Link to="/profile" className="block py-2 px-4 hover:bg-indigo-100 rounded-lg">
//                       View Profile
//                     </Link>
//                   </li>
//                   <li>
//                     <Link to="/updateprofile" className="block py-2 px-4 hover:bg-indigo-100 rounded-lg">
//                       Update Profile
//                     </Link>
//                   </li>
//                   <li>
//                     <Link to="/deleteaccount">
//                       <button className="block py-2 px-4 hover:bg-indigo-100 rounded-lg text-red-600">
//                         Delete Account
//                       </button>
//                     </Link>
//                   </li>
//                   <li>
//                     <Link to="/logout">
//                       <button className="block py-2 px-4 hover:bg-indigo-100 rounded-lg text-blue-600">
//                         Logout
//                       </button>
//                     </Link>
//                   </li>
//                 </ul>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Navbar;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import LightModeIcon from "@mui/icons-material/LightMode";
// import LoginIcon from "@mui/icons-material/Login";
// import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
// import GitHubIcon from "@mui/icons-material/GitHub";
// import { getUserRole } from "../../utlis/auth";
// import Person2Icon from "@mui/icons-material/Person2";

// function Navbar() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [showProfileMenu, setShowProfileMenu] = useState(false);
//   const location = useLocation();
//   const [role, setRole] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     setIsMenuOpen(false);
//     setShowProfileMenu(false);
//     const userRole = getUserRole();
//     setRole(userRole);
//   }, [location.pathname]);

//   const handleHamburgerClick = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };
  
//   const handleLogout = async () => {
//     try {
//       await axios.get("http://localhost:5006/api/users/logout");
//       localStorage.removeItem("token");
//       navigate("/signin");
//     } catch (err) {
//       console.error("Logout failed:", err);
//     }
//   };

//   return (
//     <div className="relative flex justify-between items-center w-full p-5 border-b bg-white z-[50] xl:pl-[100px] xl:pr-[100px]">
//       {/* Hamburger */}
//       <div
//         onClick={handleHamburgerClick}
//         className="border p-2 rounded-lg flex flex-col gap-1.5 cursor-pointer xl:hidden z-[100] relative w-[40px] h-[38px]"
//       >
//         <div className="w-6 h-0.5 bg-[blue]"></div>
//         <div className="w-3 h-0.5 bg-[blue]"></div>
//         <div className="w-6 h-0.5 bg-[blue]"></div>
//       </div>

//       {/* Logo */}
//       {!isMenuOpen && (
//         <Link to="/">
//           <h1 className="text-[16px] font-bold sm:text-[22px] lg:text-5xl">
//             React Shop
//           </h1>
//         </Link>
//       )}

//       {/* Right icons */}
//       {!isMenuOpen && (
//         <div className="flex items-center gap-2 sm:gap-4 relative">
//           {role === "seller" && (
//             <Link
//               to="/addproduct"
//               className="border rounded-lg p-2 font-semibold text-sm"
//             >
//               Add Product
//             </Link>
//           )}

//           {!role ? (
//             <>
//               <Link
//                 to="/signin"
//                 className="border rounded-lg p-2 flex items-center gap-2"
//               >
//                 <LoginIcon />
//                 <span className="text-[14px] font-bold">Login</span>
//               </Link>
//               <Link
//                 to="/signup"
//                 className="border rounded-lg p-2 flex items-center gap-2"
//               >
//                 <PersonAddAltIcon />
//                 <span className="text-[14px] font-bold">Sign Up</span>
//               </Link>
//             </>
//           ) : (
//             <>
//               <div className="relative">
//                 <button
//                   onClick={() => setShowProfileMenu((prev) => !prev)}
//                   className="border p-2 rounded-lg"
//                 >
//                   <Person2Icon />
//                 </button>

//                 {showProfileMenu && (
//                   <div className="absolute right-0 mt-2 bg-white border rounded-lg shadow-md z-50 w-48">
//                     <Link
//                       to="/profile"
//                       onClick={() => setShowProfileMenu(false)}
//                       className="block px-4 py-2 hover:bg-gray-100"
//                     >
//                       View Profile
//                     </Link>
//                     <Link
//                       to="/updateprofile"
//                       onClick={() => setShowProfileMenu(false)}
//                       className="block px-4 py-2 hover:bg-gray-100"
//                     >
//                       Update Profile
//                     </Link>
//                     <Link
//                       to="/deleteaccount"
//                       onClick={() => setShowProfileMenu(false)}
//                       className="block px-4 py-2 hover:bg-gray-100"
//                     >
//                       Delete Account
//                     </Link>
//                     <button
//                       onClick={() => {
//                         handleLogout();
//                         setShowProfileMenu(false);
//                       }}
//                       className="w-full text-red-500 text-left px-4 py-2 hover:bg-gray-100"
//                     >
//                       Logout
//                     </button>
//                   </div>
//                 )}
//               </div>
//             </>
//           )}

//           {/* GitHub icon */}
//           <div className="hidden xl:flex border p-2 rounded-lg">
//             <a href="https://github.com/Nihalmohamed-10">
//               <GitHubIcon />
//             </a>
//           </div>
//         </div>
//       )}

//       {/* Hamburger menu content */}
//       {isMenuOpen && (
//         <div className="pt-30 gap-15 fixed top-0 left-0 w-full h-screen bg-white flex flex-col items-center p-4 shadow-md z-[50]">
//           <div className="absolute top-4 right-4 flex gap-2">
//             <div className="border p-2 rounded-lg">
//               <a href="https://github.com/Nihalmohamed-10">
//                 <GitHubIcon />
//               </a>
//             </div>
//           </div>

//           <Link to="/" className="text-[20px] py-2" onClick={() => setIsMenuOpen(false)}>
//             Home
//           </Link>
//           <Link to="/products" className="text-[20px] py-2" onClick={() => setIsMenuOpen(false)}>
//             Products
//           </Link>
//           <Link to="/about" className="text-[20px] py-2" onClick={() => setIsMenuOpen(false)}>
//             About
//           </Link>

//           {role === "seller" && (
//             <Link
//               to="/addproduct"
//               className="text-[20px] py-2"
//               onClick={() => setIsMenuOpen(false)}
//             >
//               Add Product
//             </Link>
//           )}

//           {role && (
//             <button
//               onClick={() => {
//                 handleLogout();
//                 setIsMenuOpen(false);
//               }}
//               className="text-[20px] py-2 border rounded-lg px-4 mt-4"
//             >
//               Logout
//             </button>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }

// export default Navbar;

