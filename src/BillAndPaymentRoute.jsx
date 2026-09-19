import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const BillAndPaymentRoute = () => {
  const token = localStorage.getItem("token");
  const role = (localStorage.getItem("role") || "").toLowerCase();

  if (!token) {
    return <Navigate to="/Login" replace />;
  }

  const allowedRoles = ["admin", "customer", "receptionist", "waiter"];
  if (allowedRoles.includes(role)) {
    return <Outlet />;
  }

  return <Navigate to="/Unauthorized" replace />;
};

export default BillAndPaymentRoute;
