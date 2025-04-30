import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaUserAlt, FaEnvelope, FaKey } from "react-icons/fa";
import { ImSpinner2 } from "react-icons/im";

function UpdateProfile() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:5006/api/users/profile", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setFormData({ ...formData, name: res.data.name, email: res.data.email });
      } catch (err) {
        console.error(err);
        setErrorMsg("Failed to load user info");
      }
    };
    fetchUser();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const res = await axios.put("http://localhost:5006/api/users/update", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setSuccessMsg("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      setErrorMsg("Profile update failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate("/products"); // Go to homepage
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-500 px-4 pt-20">
      {/* Back Button below the Navbar */}
      <div className="flex justify-end mb-4 pr-4">
        <button
          onClick={handleBack}
          className="bg-gray-300 text-gray-800 py-2 px-4 rounded-full shadow-md hover:bg-gray-400 transition duration-300"
        >
          Back
        </button>
      </div>

      {/* Form Section */}
      <div className="flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-lg w-full bg-white rounded-3xl shadow-lg p-8"
        >
          <h2 className="text-3xl font-extrabold text-center text-indigo-700 mb-6">Update Profile</h2>

          {successMsg && <div className="text-green-600 mb-4 text-center">{successMsg}</div>}
          {errorMsg && <div className="text-red-600 mb-4 text-center">{errorMsg}</div>}

          <form onSubmit={handleUpdate} className="space-y-6">
            {/* Name Field */}
            <div className="flex items-center gap-3 bg-gray-100 p-4 rounded-xl shadow-md">
              <FaUserAlt className="text-indigo-600 text-xl" />
              <div className="flex flex-col w-full">
                <label className="text-sm font-medium text-gray-700">Name</label>
                <input
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="flex items-center gap-3 bg-gray-100 p-4 rounded-xl shadow-md">
              <FaEnvelope className="text-indigo-600 text-xl" />
              <div className="flex flex-col w-full">
                <label className="text-sm font-medium text-gray-700">Email</label>
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="flex items-center gap-3 bg-gray-100 p-4 rounded-xl shadow-md">
              <FaKey className="text-indigo-600 text-xl" />
              <div className="flex flex-col w-full">
                <label className="text-sm font-medium text-gray-700">New Password (Optional)</label>
                <input
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="password"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300 font-semibold"
            >
              {loading ? <ImSpinner2 className="animate-spin mx-auto" /> : "Update Profile"}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}

export default UpdateProfile;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// function UpdateProfile() {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });
//   const [loading, setLoading] = useState(false);
//   const [successMsg, setSuccessMsg] = useState("");
//   const [errorMsg, setErrorMsg] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const res = await axios.get("http://localhost:5006/api/users/profile", {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         });
//         setFormData({ ...formData, name: res.data.name, email: res.data.email });
//       } catch (err) {
//         console.error(err);
//         setErrorMsg("Failed to load user info");
//       }
//     };
//     fetchUser();
//   }, []);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setErrorMsg("");
//     setSuccessMsg("");

//     try {
//       const res = await axios.put("http://localhost:5006/api/users/update", formData, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });
//       setSuccessMsg("Profile updated successfully!");
//     } catch (err) {
//       console.error(err);
//       setErrorMsg("Profile update failed. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex justify-center items-center bg-gray-50 px-4">
//       <div className="max-w-lg w-full bg-white rounded-2xl shadow-md p-8">
//         <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
//           Update Profile
//         </h2>

//         {successMsg && <div className="text-green-600 mb-4 text-center">{successMsg}</div>}
//         {errorMsg && <div className="text-red-600 mb-4 text-center">{errorMsg}</div>}

//         <form onSubmit={handleUpdate} className="space-y-5">
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Name</label>
//             <input
//               name="name"
//               type="text"
//               value={formData.name}
//               onChange={handleChange}
//               className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700">Email</label>
//             <input
//               name="email"
//               type="email"
//               value={formData.email}
//               onChange={handleChange}
//               className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               New Password (Optional)
//             </label>
//             <input
//               name="password"
//               type="password"
//               value={formData.password}
//               onChange={handleChange}
//               className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
//               placeholder="password"
//             />
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300 font-semibold"
//           >
//             {loading ? "Updating..." : "Update Profile"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default UpdateProfile;
