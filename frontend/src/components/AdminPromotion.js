// frontend/src/components/AdminPromotion.js
import React, { useState } from "react";
import api from "../utils/api";
import Button from "./ui/Button";

const AdminPromotion = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const makeAdmin = async () => {
    try {
      setLoading(true);
      setMessage("");

      const response = await api.get("/auth/make-admin");

      if (response.data.success) {
        setMessage("You are now an admin! Please refresh the page.");
      }
    } catch (error) {
      setMessage(
        "Failed to make you an admin. " +
          (error.response?.data?.error || error.message)
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        marginTop: "2rem",
        padding: "1rem",
        borderRadius: "8px",
        backgroundColor: "#f8f9fa",
        textAlign: "center",
      }}
    >
      <h3 style={{ marginBottom: "1rem" }}>Need Admin Access?</h3>
      <p style={{ marginBottom: "1rem" }}>
        For development purposes, you can make yourself an admin to approve
        testimonials.
      </p>
      <Button onClick={makeAdmin} disabled={loading} variant="primary">
        {loading ? "Processing..." : "Make Me Admin"}
      </Button>
      {message && (
        <p
          style={{
            marginTop: "1rem",
            color: message.includes("Failed") ? "red" : "green",
          }}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default AdminPromotion;
