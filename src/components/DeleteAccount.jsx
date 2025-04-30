import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { FaExclamationTriangle } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";
import { IoMdArrowBack } from "react-icons/io";

const DeleteAccount = () => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete("http://localhost:5006/api/users/delete", {
        headers: { Authorization: `Bearer ${token}` },
      });
      localStorage.removeItem("token");
      navigate("/signup");
    } catch (error) {
      console.error("Error deleting account:", error);
    }
  };

  const cancelDelete = () => {
    navigate("/profile");
  };

  const handleBack = () => {
    navigate("/products");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-100 via-pink-100 to-red-200 px-4 pt-20">

      {/* Back Button */}
      <div className="flex justify-end pr-4 mb-6">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 bg-gray-300 text-gray-800 py-2 px-4 rounded-full shadow-md hover:bg-gray-400 transition duration-300"
        >
          <IoMdArrowBack className="text-lg" /> Back
        </button>
      </div>

      {/* Delete Account Box */}
      <div className="flex justify-center items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-md text-center"
        >
          <motion.div
            initial={{ rotate: -20 }}
            animate={{ rotate: 0 }}
            transition={{ duration: 0.5 }}
            className="text-red-500 mb-4"
          >
            <FaExclamationTriangle className="text-5xl mx-auto" />
          </motion.div>

          <h2 className="text-3xl font-bold text-gray-800 mb-4">Delete Account</h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Are you absolutely sure you want to <span className="font-semibold text-red-500">permanently</span> delete your account? <br />
            This action <span className="font-semibold">cannot</span> be undone!
          </p>

          <div className="flex gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleDelete}
              className="flex items-center gap-2 bg-red-500 text-white font-semibold py-2 px-6 rounded-lg hover:bg-red-600 transition duration-300"
            >
              <FaExclamationTriangle /> Yes, Delete
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={cancelDelete}
              className="flex items-center gap-2 bg-gray-300 text-gray-800 font-semibold py-2 px-6 rounded-lg hover:bg-gray-400 transition duration-300"
            >
              <MdOutlineCancel /> Cancel
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DeleteAccount;

// import React from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const DeleteAccount = () => {
//   const navigate = useNavigate();

//   const handleDelete = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       await axios.delete("http://localhost:5006/api/users/delete", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       localStorage.removeItem("token");
//       navigate("/signup");
//     } catch (error) {
//       console.error("Error deleting account:", error);
//     }
//   };

//   const cancelDelete = () => {
//     navigate("/profile");
//   };

//   return (
//     <div className="min-h-screen flex justify-center items-center bg-gray-50 px-4">
//       <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md text-center">
//         <h2 className="text-2xl font-bold text-gray-800 mb-4">Delete Account</h2>
//         <p className="text-gray-600 mb-6">
//           Are you absolutely sure you want to delete your account? This action is permanent.
//         </p>
//         <div className="flex gap-4 justify-center">
//           <button
//             onClick={handleDelete}
//             className="bg-red-500 text-white font-semibold py-2 px-6 rounded-lg hover:bg-red-600 transition duration-300"
//           >
//             Yes, Delete
//           </button>
//           <button
//             onClick={cancelDelete}
//             className="bg-gray-300 text-gray-800 font-semibold py-2 px-6 rounded-lg hover:bg-gray-400 transition duration-300"
//           >
//             Cancel
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DeleteAccount;
