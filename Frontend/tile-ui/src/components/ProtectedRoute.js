// src/components/ProtectedRoute.js
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const location = useLocation();

  // If no token, redirect to login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    if (decoded.exp < currentTime) {
      // Token expired
      localStorage.clear();
      return <Navigate to="/login" replace />;
    }

    const isAdminRoute = location.pathname.startsWith("/admin");
    const isViewerRoute = location.pathname.startsWith("/viewer");

    if (role === "Admin" && isViewerRoute) {
      return <Navigate to="/admin/dashboard" replace />;
    }

    if ((role === "Client" || role === "Viewer") && isAdminRoute) {
      return <Navigate to="/viewer/dashboard" replace />;
    }

    return children;

  } catch (err) {
    console.error("Invalid token", err);
    localStorage.clear();
    return <Navigate to="/login" replace />;
  }
};

export default ProtectedRoute;
