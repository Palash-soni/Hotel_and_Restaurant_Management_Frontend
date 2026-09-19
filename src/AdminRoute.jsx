import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const AdminRoute = () => {
  const token = localStorage.getItem("token");
  const role = (localStorage.getItem("role") || "").toLowerCase();

  if (!token) {
    return <Navigate to="/Login" replace />;
  }

  if (role !== "admin") {
    return <Navigate to="/Unauthorized" replace />;
  }

  return <Outlet />;
};

export default AdminRoute;
