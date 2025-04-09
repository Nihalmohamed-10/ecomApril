import React, { useEffect, useState } from "react";
import { data, Link, useNavigate } from "react-router-dom";
import axios from "axios";

function SignUp() {
  const [user, setUser] = useState({
    firstName :"",
    lastName :"",
    email: "",
    password: "",
    avatar: "https://api.lorem.space/image/face?w=640&h=480",
  });

 
  useEffect(()=>{
    localStorage.removeItem("accessToken");
    console.log("Access token removed:", localStorage.getItem("accessToken"));
  },[])
  
  
  const navigate = useNavigate();
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData ={
      name: `${user.firstName} ${user.lastName}`.trim(),
      email: user.email,
      password: user.password,
      avatar: user.avatar,

    }

    try {
      const response = await axios.post(
        "http://localhost:5006/api/users/register",
        userData
      );
      console.log("Successful:", response.data);
      navigate("/signin");
    } catch (error) {
      console.error("Failed:", error.response?.data || error.message);
    }
  };

  return (
    <div className="mt-20 w-[90%] mx-auto border-3 rounded-lg border-gray-100 pt-8  pb-8 ">
      <h1 className="text-center text-[24px] font-bold text-[#703BF7]">
        Sign Up
      </h1>

      <form onSubmit={handleSubmit}> 
        <div
          
          className="mt-8 grid grid-cols-1 gap-6 w-full px-4 md:grid-cols-2 lg:gap-15 xl:gap-20"
        >
          <div className="w-full lg:pl-[40px] xl:pl-[80px]">
            <label className="block text-lg font-semibold" type="firstName">
              First Name
            </label>
            <input
              id="firstName"
              name="firstName"
              className="w-full mt-2 p-3 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
              type="text"
              value={user.name}
              onChange={handleChange}
            />
          </div>
  
          <div className="w-full lg:pr-[40px] xl:pr-[80px]">
            <label className="block text-lg font-semibold" type="lastName">
              Last Name
            </label>
            <input
              id="lastName"
              name="lastName"
              className="w-full mt-2 p-3 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
              type="text"
              value={user.lastName}
              onChange={handleChange}
            />
          </div>
  
          <div className="w-full lg:pl-[40px] xl:pl-[80px]">
            <label className="block text-lg font-semibold" type="email">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              className="w-full mt-2 p-3 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
              type="email"
              value={user.email}
              onChange={handleChange}
            />
          </div>
  
          <div className="w-full lg:pr-[40px] xl:pr-[80px]">
            <label className="block text-lg font-semibold" type="password">
              Password
            </label>
            <input
              id="password"
              name="password"
              className="w-full mt-2 p-3 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
              type="password"
              value={user.password}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex flex-col items-center gap-5 mt-8 md:justify-items-center">
            <button
              type="submit"
              className="w-[300px] p-4 bg-[#703BF7] text-white rounded-lg hover:bg-[#5a2ed3] transition"
            >
              Sign Up
            </button>
            <Link to="/signin">
              <button
                type="button"
                className="w-[300px] p-4 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition"
              >
                Login
              </button>
            </Link>
          </div>
      </form>
    </div>
  );
}

export default SignUp;
