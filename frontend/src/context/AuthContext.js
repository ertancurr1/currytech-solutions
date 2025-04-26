import React, { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { getCurrentUser } from "../services/authService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [loading, setLoading] = useState(true);

  // Function to login user
  const login = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);

    try {
      const decoded = jwt_decode(newToken);
      setUser(decoded);
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  };

  // Function to logout user
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  // Check if token is valid and get current user on mount
  useEffect(() => {
    const verifyToken = async () => {
      setLoading(true);

      if (token) {
        try {
          const decoded = jwt_decode(token);
          const currentTime = Date.now() / 1000;

          if (decoded.exp < currentTime) {
            logout();
          } else {
            const currentUser = await getCurrentUser();
            setUser(currentUser);
          }
        } catch (error) {
          console.error("Error verifying token:", error);
          logout();
        }
      }

      setLoading(false);
    };

    verifyToken();
  }, [token]);

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
