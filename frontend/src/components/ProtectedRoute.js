import React, { useContext } from "react";
import { Navigate, useLocation, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import CircularProgress from "@mui/material/CircularProgress";

const ProtectedRoute = () => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
