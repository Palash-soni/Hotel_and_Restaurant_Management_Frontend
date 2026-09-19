import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ReceptionistRoute = () => {
  const token = localStorage.getItem("token");
  const role = (localStorage.getItem("role") || "").toLowerCase();

  if (!token) {
    return <Navigate to="/Login" replace />;
  }

  if (role !== "receptionist" && role !== "admin") {
    return <Navigate to="/Unauthorized" replace />;
  }

  return <Outlet />;
};

export default ReceptionistRoute;
