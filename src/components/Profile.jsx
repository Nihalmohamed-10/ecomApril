import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { FaUserAlt, FaEnvelope, FaUserShield } from "react-icons/fa"; 
import { ImSpinner2 } from "react-icons/im"; 

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5006/api/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
      } catch (err) {
        console.error("Error fetching profile:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleBack = () => {
    navigate("/home");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-300 via-purple-300 to-pink-300 px-4 pt-20">
      
      <div className="flex justify-end mb-4 pr-4">
        <button
          onClick={handleBack}
          className="bg-gray-300 text-gray-800 py-2 px-4 rounded-full shadow-md hover:bg-gray-400 transition duration-300"
        >
          Back
        </button>
      </div>

      <div className="flex justify-center items-center">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white shadow-xl rounded-3xl p-8 w-full max-w-md"
        >
          <h2 className="text-3xl font-extrabold text-center text-indigo-700 mb-8">
             User Profile 
          </h2>

          {loading ? (
            <div className="flex justify-center">
              <ImSpinner2 className="animate-spin text-4xl text-indigo-600" />
            </div>
          ) : user ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-3 bg-gray-100 p-4 rounded-xl shadow-sm">
                <FaUserAlt className="text-indigo-600 text-xl" />
                <div className="flex flex-col">
                  <span className="text-gray-500 text-sm">Name</span>
                  <span className="text-gray-800 font-semibold">{user.name}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-gray-100 p-4 rounded-xl shadow-sm">
                <FaEnvelope className="text-indigo-600 text-xl" />
                <div className="flex flex-col">
                  <span className="text-gray-500 text-sm">Email</span>
                  <span className="text-gray-800 font-semibold">{user.email}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-gray-100 p-4 rounded-xl shadow-sm">
                <FaUserShield className="text-indigo-600 text-xl" />
                <div className="flex flex-col">
                  <span className="text-gray-500 text-sm">Role</span>
                  <span className="text-gray-800 font-semibold capitalize">{user.role}</span>
                </div>
              </div>
            </motion.div>
          ) : (
            <p className="text-center text-gray-600">Error loading profile</p>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;


// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { motion } from "framer-motion";
// import { FaUserAlt, FaEnvelope, FaUserShield } from "react-icons/fa"; // Icons
// import { ImSpinner2 } from "react-icons/im"; // Loading Spinner

// const Profile = () => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const response = await axios.get("http://localhost:5006/api/users/profile", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setUser(response.data);
//       } catch (err) {
//         console.error("Error fetching profile:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfile();
//   }, []);

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-300 via-pink-300 to-indigo-400 px-4">
//       <motion.div
//         initial={{ opacity: 0, y: -50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//         className="bg-white shadow-2xl rounded-3xl p-8 w-full max-w-md"
//       >
//         <h2 className="text-3xl font-extrabold text-center text-indigo-700 mb-8">
//           ✨ User Profile ✨
//         </h2>

//         {loading ? (
//           <div className="flex justify-center">
//             <ImSpinner2 className="animate-spin text-4xl text-indigo-600" />
//           </div>
//         ) : user ? (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.4 }}
//             className="space-y-6"
//           >
//             <div className="flex items-center gap-3 bg-gray-100 p-4 rounded-xl shadow-sm">
//               <FaUserAlt className="text-indigo-600 text-xl" />
//               <div className="flex flex-col">
//                 <span className="text-gray-500 text-sm">Name</span>
//                 <span className="text-gray-800 font-semibold">{user.name}</span>
//               </div>
//             </div>

//             <div className="flex items-center gap-3 bg-gray-100 p-4 rounded-xl shadow-sm">
//               <FaEnvelope className="text-indigo-600 text-xl" />
//               <div className="flex flex-col">
//                 <span className="text-gray-500 text-sm">Email</span>
//                 <span className="text-gray-800 font-semibold">{user.email}</span>
//               </div>
//             </div>

//             <div className="flex items-center gap-3 bg-gray-100 p-4 rounded-xl shadow-sm">
//               <FaUserShield className="text-indigo-600 text-xl" />
//               <div className="flex flex-col">
//                 <span className="text-gray-500 text-sm">Role</span>
//                 <span className="text-gray-800 font-semibold capitalize">{user.role}</span>
//               </div>
//             </div>
//           </motion.div>
//         ) : (
//           <p className="text-center text-gray-600">Error loading profile</p>
//         )}
//       </motion.div>
//     </div>
//   );
// };

// export default Profile;

