import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const WaiterRoute = () => {
  const token = localStorage.getItem("token");
  const role = (localStorage.getItem("role") || "").toLowerCase();

  if (!token) {
    return <Navigate to="/Login" replace />;
  }

  if (role !== "waiter" && role !== "admin") {
    return <Navigate to="/Unauthorized" replace />;
  }

  return <Outlet />;
};

export default WaiterRoute;
