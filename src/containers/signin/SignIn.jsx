import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { saveUserToLocalStorage } from "../../utlis/auth";

function SignIn() {
  const [data, setData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleSignin = async (e) => {
    console.log("button clicked");

    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5006/api/users/login",
        data
      );

      console.log("Full Backend response:", response);

      const { token, _id, name, email, role } = response.data;

      if (token && _id && name && email && role) {
        saveUserToLocalStorage({ _id, name, email, role }, token);
        console.log("Login success. Token:", token, "User:", {
          _id,
          name,
          email,
          role,
        });

        if (role === "seller") {
          navigate("/seller/dashboard");
        } else {
          navigate("/products");
        }
      }
    } 
    catch (error) {
      const message =
        error.response?.data?.message || "Invalid email or password";
      setError(message);
      console.error("Login failed:", message);
    }
  };

  // const handleSignin = async (e) => {
  //   console.log("button clicked");

  //   e.preventDefault();

  //   try {
  //     const response = await axios.post(
  //       "http://localhost:5006/api/users/login",
  //       data
  //     );

  //     console.log("Backend response:", response);

  //     const { token, user } = response.data;

  //     if (token && user) {
  //       saveUserToLocalStorage(user, token); // Save to localStorage
  //       console.log("Login success. Token:", token, "User:", user);

  //       // Navigate based on user role
  //       if (user.role === "seller") {
  //         navigate("/seller/dashboard");
  //       } else {
  //         navigate("/products");
  //       }
  //     } else {
  //       console.error("Invalid response structure:", response.data);
  //     }
  //   } catch (error) {
  //     console.error("Login failed:", error.response?.data || error.message);
  //   }
  // };

  // console.log("SignIn component loaded");

  return (
    <div className="mt-20 w-[90%] mx-auto border-3 rounded-lg border-gray-100 pt-8 pb-8">
      <h1 className="text-center text-[24px] font-bold text-[#703BF7]">
        Sign In
      </h1>
      {error && (
        <p className="text-red-500 text-center mt-4 font-semibold">{error}</p>
      )}

      <form onSubmit={handleSignin}>
        <div className="mt-8 grid grid-cols-1 gap-6 w-full px-4 md:grid-cols-2 lg:gap-15 xl:gap-20">
          <div className="w-full lg:pl-[40px] xl:pl-[80px]">
            <label className="block text-lg font-semibold">Email Address</label>
            <input
              name="email"
              type="email"
              value={data.email}
              onChange={handleChange}
              className="w-full mt-2 p-3 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div className="w-full lg:pr-[40px] xl:pr-[80px]">
            <label className="block text-lg font-semibold">Password</label>
            <input
              name="password"
              type="password"
              value={data.password}
              onChange={handleChange}
              className="w-full mt-2 p-3 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>

        <div className="flex flex-col items-center gap-5 mt-8">
          <button
            type="submit"
            className="w-[300px] cursor-pointer p-4 bg-[#703BF7] text-white rounded-lg hover:bg-[#5a2ed3] transition"
          >
            Sign In
          </button>
          <Link to="/signup">
            <button
              type="button"
              className="w-[300px] cursor-pointer p-4 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition"
            >
              Don't have an account? Sign Up
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default SignIn;

// import React, { useState } from "react";
// import axios from "axios";
// import { Link, useNavigate } from "react-router-dom";

// function SignIn() {
//   const [data, setData] = useState({ email: "", password: "" });
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setData({ ...data, [e.target.name]: e.target.value });
//   };

//   const handleSignin = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post("http://localhost:5006/api/users/login", data);
//       const { token } = response.data;

//       if (token) {
//         localStorage.setItem("token", token);
//         console.log(" Token saved:", token);
//         // navigate("/products");
//         // In SignIn.jsx, after successful login
//         if (response.data.role === "seller") {
//           navigate("/seller/dashboard");
//         } else {
//           navigate("/products");
//         }

//       } else {
//         console.error("Token is missing from response");
//       }
//     } catch (error) {
//       console.error(" Login failed:", error.response?.data || error.message);
//     }
//   };

//   return (
//     <form onSubmit={handleSignin}>
//       <div className="mt-20 w-[90%] mx-auto border-3 rounded-lg border-gray-100 pt-8 pb-8">
//         <h1 className="text-center text-[22px] font-bold text-[#703BF7]">Login</h1>
//         <div className="mt-8 grid flex flex-col gap-5 p-5 w-full max-w-[640px] mx-auto">
//           <div className="md:px-[50px]">
//             <label className="block text-[20px] font-semibold">Email Address</label>
//             <input
//               name="email"
//               type="email"
//               className="w-full pl-3 pt-3 pb-3 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
//               value={data.email}
//               onChange={handleChange}
//             />
//           </div>
//           <div className="md:px-[50px]">
//             <label className="block text-[20px] font-semibold">Password</label>
//             <input
//               name="password"
//               type="password"
//               className="w-full pl-3 pt-3 pb-3 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
//               value={data.password}
//               onChange={handleChange}
//             />
//           </div>
//         </div>
//         <div className="flex flex-col items-center gap-4 mt-5">
//           <button type="submit" className="w-[300px] p-4 bg-[#703BF7] text-white rounded-lg">Login</button>
//           <Link to="/signup">
//             <button type="button" className="w-[300px] p-4 bg-gray-800 text-white rounded-lg">Sign Up</button>
//           </Link>
//         </div>
//       </div>
//     </form>
//   );
// }

// export default SignIn;
