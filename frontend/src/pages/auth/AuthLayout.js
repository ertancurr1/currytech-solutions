import React from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const AuthLayout = () => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return null;
  }

  if (user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default AuthLayout;
