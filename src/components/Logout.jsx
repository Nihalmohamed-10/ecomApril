import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { FiLogOut } from "react-icons/fi";
import { IoMdArrowBack } from "react-icons/io";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:5006/api/users/logout");
      localStorage.removeItem("token");
      navigate("/signin");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const handleBack = () => {
    navigate("/products");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 px-4 pt-20">

      {/* Back Button */}
      <div className="flex justify-end pr-4 mb-6">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 bg-gray-300 text-gray-800 py-2 px-4 rounded-full shadow-md hover:bg-gray-400 transition duration-300"
        >
          <IoMdArrowBack className="text-lg" /> Back
        </button>
      </div>

      {/* Logout Box */}
      <div className="flex justify-center items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-md text-center"
        >
          <motion.div
            initial={{ rotate: -15 }}
            animate={{ rotate: 0 }}
            transition={{ duration: 0.5 }}
            className="text-blue-500 mb-4"
          >
            <FiLogOut className="text-5xl mx-auto" />
          </motion.div>

          <h2 className="text-3xl font-bold text-gray-800 mb-4">Logout</h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Are you sure you want to <span className="font-semibold text-blue-500">logout</span> from your account?
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 w-full bg-red-500 text-white font-semibold py-2 rounded-lg hover:bg-red-600 transition duration-300"
          >
            <FiLogOut className="text-xl" /> Yes, Logout
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default Logout;

// import React from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const Logout = () => {
//   const navigate = useNavigate();

//   const handleLogout = async () => {
//     try {
//       await axios.get("http://localhost:5006/api/users/logout");
//       localStorage.removeItem("token");
//       navigate("/signin");
//     } catch (error) {
//       console.error("Error logging out:", error);
//     }
//   };

//   return (
//     <div className="min-h-screen flex justify-center items-center bg-gray-50 px-4">
//       <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md text-center">
//         <h2 className="text-2xl font-bold text-gray-800 mb-4">Logout</h2>
//         <p className="text-gray-600 mb-6">
//           Are you sure you want to logout from your account?
//         </p>
//         <button
//           onClick={handleLogout}
//           className="w-full bg-red-500 text-white font-semibold py-2 rounded-lg hover:bg-red-600 transition duration-300"
//         >
//           Yes, Logout
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Logout;
