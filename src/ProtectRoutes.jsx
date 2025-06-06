import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  const token = localStorage.getItem("token"); 
  console.log("Token in ProtectedRoutes:", token);
  return token ? <Outlet /> : <Navigate to="/signin" />;
};

export default ProtectedRoutes;
