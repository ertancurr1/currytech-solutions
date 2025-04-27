import React, { useState, useEffect, useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { AuthContext } from "../context/AuthContext";
import Section from "../components/ui/Section";
import Button from "../components/ui/Button";
import BlogManagement from "../components/admin/BlogManagement";
import {
  getAllTestimonials,
  approveTestimonial,
  deleteTestimonial,
} from "../services/testimonialService";
import CircularProgress from "@mui/material/CircularProgress";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import DeleteIcon from "@mui/icons-material/Delete";

const AdminDashboard = () => {
  const { theme } = useContext(ThemeContext);
  const { user } = useContext(AuthContext);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [testimonialToDelete, setTestimonialToDelete] = useState(null);
  const [activeTab, setActiveTab] = useState("testimonials");

  useEffect(() => {
    if (user?.role === "admin") {
      fetchTestimonials();
    }
  }, [user]);

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      const response = await getAllTestimonials();

      console.log("All testimonials response:", response);

      setTestimonials(response.data || []);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
      setMessage({
        type: "error",
        text:
          "Failed to load testimonials: " + (error.message || "Unknown error"),
      });
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    try {
      await approveTestimonial(id);
      setMessage({
        type: "success",
        text: "Testimonial approved successfully!",
      });
      fetchTestimonials(); // Refresh the list
    } catch (error) {
      console.error("Error approving testimonial:", error);
      setMessage({
        type: "error",
        text:
          "Failed to approve testimonial: " +
          (error.message || "Unknown error"),
      });
    }
  };

  const handleDeny = async (id) => {
    try {
      await deleteTestimonial(id);
      setMessage({
        type: "success",
        text: "Testimonial denied and removed!",
      });
      fetchTestimonials(); // Refresh the list
    } catch (error) {
      console.error("Error denying testimonial:", error);
      setMessage({
        type: "error",
        text:
          "Failed to deny testimonial: " + (error.message || "Unknown error"),
      });
    }
  };

  const handleDelete = (testimonial) => {
    setTestimonialToDelete(testimonial);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteTestimonial(testimonialToDelete._id);
      setMessage({
        type: "success",
        text: "Testimonial deleted successfully!",
      });
      fetchTestimonials(); // Refresh the list
    } catch (error) {
      console.error("Error deleting testimonial:", error);
      setMessage({
        type: "error",
        text:
          "Failed to delete testimonial: " + (error.message || "Unknown error"),
      });
    } finally {
      // Close the modal
      setDeleteModalOpen(false);
      setTestimonialToDelete(null);
    }
  };

  const cancelDelete = () => {
    setDeleteModalOpen(false);
    setTestimonialToDelete(null);
  };

  // Filter testimonials by approval status
  const pendingTestimonials = testimonials.filter((t) => !t.isApproved);
  const approvedTestimonials = testimonials.filter((t) => t.isApproved);

  // If user is not admin, show message
  if (user?.role !== "admin") {
    return (
      <Section title="Admin Dashboard" centered>
        <div
          style={{
            textAlign: "center",
            padding: "2rem",
            backgroundColor: theme.mode === "dark" ? "#3a2a2a" : "#f8d7da",
            borderRadius: "8px",
          }}
        >
          <h3 style={{ color: theme.mode === "dark" ? "#ff8080" : "#721c24" }}>
            Access Denied
          </h3>
          <p
            style={{
              marginTop: "1rem",
              color: theme.mode === "dark" ? "#ddd" : "#333",
            }}
          >
            You need administrator privileges to access this page.
          </p>
          <Button
            variant="primary"
            to="/dashboard"
            style={{ marginTop: "1rem" }}
          >
            Back to Dashboard
          </Button>
        </div>
      </Section>
    );
  }

  const TestimonialCard = ({ testimonial, isPending }) => (
    <div
      style={{
        padding: "1.5rem",
        borderRadius: "8px",
        backgroundColor: theme.mode === "dark" ? "#1e1e1e" : "#f5f5f5",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        border: isPending
          ? `1px solid ${theme.mode === "dark" ? "#5c4d1a" : "#ffeeba"}`
          : `1px solid ${theme.mode === "dark" ? "#1a5c4d" : "#c3e6cb"}`,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "1rem",
        }}
      >
        <span
          style={{
            backgroundColor: isPending
              ? theme.mode === "dark"
                ? "#5c4d1a"
                : "#fff3cd"
              : theme.mode === "dark"
              ? "#1a5c4d"
              : "#d4edda",
            color: isPending
              ? theme.mode === "dark"
                ? "#ffeeba"
                : "#856404"
              : theme.mode === "dark"
              ? "#c3e6cb"
              : "#155724",
            padding: "0.25rem 0.75rem",
            borderRadius: "50px",
            fontSize: "0.8rem",
            fontWeight: "bold",
          }}
        >
          {isPending ? "Pending Review" : "Approved"}
        </span>
        <span
          style={{
            color: theme.mode === "dark" ? "#999" : "#777",
            fontSize: "0.9rem",
          }}
        >
          ID: {testimonial._id.substring(0, 8)}...
        </span>
      </div>

      <p
        style={{
          fontStyle: "italic",
          marginBottom: "1.5rem",
          fontSize: "1.1rem",
          color: theme.mode === "dark" ? "#e0e0e0" : "#333",
        }}
      >
        "{testimonial.content}"
      </p>

      <div style={{ marginBottom: "1.5rem" }}>
        <div
          style={{
            fontWeight: "bold",
            color: theme.mode === "dark" ? "#fff" : "#000",
          }}
        >
          {testimonial.author.name}
        </div>
        {testimonial.author.position && testimonial.author.company && (
          <div style={{ color: theme.mode === "dark" ? "#aaa" : "#666" }}>
            {testimonial.author.position}, {testimonial.author.company}
          </div>
        )}
        <div
          style={{
            color: theme.mode === "dark" ? "#888" : "#999",
            fontSize: "0.9rem",
            marginTop: "0.5rem",
          }}
        >
          Rating: {testimonial.rating}/5
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: isPending ? "space-between" : "flex-end",
          borderTop: `1px solid ${theme.mode === "dark" ? "#333" : "#ddd"}`,
          paddingTop: "1rem",
        }}
      >
        {isPending ? (
          <>
            <Button
              variant="primary"
              onClick={() => handleApprove(testimonial._id)}
              style={{ display: "flex", alignItems: "center" }}
            >
              <CheckCircleIcon style={{ marginRight: "0.5rem" }} />
              Approve
            </Button>
            <Button
              variant="secondary"
              onClick={() => handleDeny(testimonial._id)}
              style={{
                display: "flex",
                alignItems: "center",
                backgroundColor: theme.mode === "dark" ? "#3a2a2a" : "#f8d7da",
                borderColor: theme.mode === "dark" ? "#5c3a3a" : "#f5c6cb",
                color: theme.mode === "dark" ? "#ff8080" : "#721c24",
              }}
            >
              <CancelIcon style={{ marginRight: "0.5rem" }} />
              Deny
            </Button>
          </>
        ) : (
          <Button
            variant="secondary"
            onClick={() => handleDelete(testimonial)}
            style={{
              display: "flex",
              alignItems: "center",
              backgroundColor: theme.mode === "dark" ? "#3a2a2a" : "#f8d7da",
              borderColor: theme.mode === "dark" ? "#5c3a3a" : "#f5c6cb",
              color: theme.mode === "dark" ? "#ff8080" : "#721c24",
            }}
          >
            <DeleteIcon style={{ marginRight: "0.5rem" }} />
            Delete
          </Button>
        )}
      </div>
    </div>
  );

  return (
    <>
      <Section
        title="Admin Dashboard"
        subtitle="Manage website content"
        centered
      >
        {/* Tab navigation */}
        <div
          style={{
            display: "flex",
            borderBottom: `1px solid ${
              theme.mode === "dark" ? "#333" : "#ddd"
            }`,
            marginBottom: "2rem",
          }}
        >
          <div
            onClick={() => setActiveTab("testimonials")}
            style={{
              padding: "1rem 1.5rem",
              cursor: "pointer",
              borderBottom:
                activeTab === "testimonials"
                  ? `3px solid ${theme.mode === "dark" ? "#1e88e5" : "#007bff"}`
                  : "none",
              fontWeight: activeTab === "testimonials" ? "bold" : "normal",
              color:
                activeTab === "testimonials"
                  ? theme.mode === "dark"
                    ? "#1e88e5"
                    : "#007bff"
                  : theme.mode === "dark"
                  ? "#aaa"
                  : "#666",
            }}
          >
            Testimonials
          </div>
          <div
            onClick={() => setActiveTab("blogs")}
            style={{
              padding: "1rem 1.5rem",
              cursor: "pointer",
              borderBottom:
                activeTab === "blogs"
                  ? `3px solid ${theme.mode === "dark" ? "#1e88e5" : "#007bff"}`
                  : "none",
              fontWeight: activeTab === "blogs" ? "bold" : "normal",
              color:
                activeTab === "blogs"
                  ? theme.mode === "dark"
                    ? "#1e88e5"
                    : "#007bff"
                  : theme.mode === "dark"
                  ? "#aaa"
                  : "#666",
            }}
          >
            Blog Posts
          </div>
        </div>

        {/* Message display */}
        {message && (
          <div
            style={{
              padding: "1rem",
              marginBottom: "2rem",
              borderRadius: "8px",
              backgroundColor:
                message.type === "success"
                  ? theme.mode === "dark"
                    ? "#1a5c4d"
                    : "#d4edda"
                  : theme.mode === "dark"
                  ? "#5c3a3a"
                  : "#f8d7da",
              color:
                message.type === "success"
                  ? theme.mode === "dark"
                    ? "#c3e6cb"
                    : "#155724"
                  : theme.mode === "dark"
                  ? "#ff8080"
                  : "#721c24",
              textAlign: "center",
            }}
          >
            {message.text}
          </div>
        )}

        {/* Content based on active tab */}
        {activeTab === "testimonials" && (
          <>
            {/* Loading indicator */}
            {loading ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  padding: "3rem",
                }}
              >
                <CircularProgress />
              </div>
            ) : (
              <>
                {/* Pending Testimonials Section */}
                <div style={{ marginBottom: "4rem" }}>
                  <h3
                    style={{
                      fontSize: "1.5rem",
                      fontWeight: "bold",
                      marginBottom: "1.5rem",
                      color: theme.mode === "dark" ? "#fff" : "#333",
                      borderBottom: `2px solid ${
                        theme.mode === "dark" ? "#444" : "#eee"
                      }`,
                      paddingBottom: "0.5rem",
                    }}
                  >
                    Pending Testimonials ({pendingTestimonials.length})
                  </h3>

                  {pendingTestimonials.length > 0 ? (
                    <div style={{ display: "grid", gap: "1.5rem" }}>
                      {pendingTestimonials.map((testimonial) => (
                        <TestimonialCard
                          key={testimonial._id}
                          testimonial={testimonial}
                          isPending={true}
                        />
                      ))}
                    </div>
                  ) : (
                    <p
                      style={{
                        textAlign: "center",
                        padding: "2rem",
                        backgroundColor:
                          theme.mode === "dark" ? "#1e1e1e" : "#f5f5f5",
                        borderRadius: "8px",
                        color: theme.mode === "dark" ? "#aaa" : "#666",
                      }}
                    >
                      No pending testimonials to review.
                    </p>
                  )}
                </div>

                {/* Approved Testimonials Section */}
                <div>
                  <h3
                    style={{
                      fontSize: "1.5rem",
                      fontWeight: "bold",
                      marginBottom: "1.5rem",
                      color: theme.mode === "dark" ? "#fff" : "#333",
                      borderBottom: `2px solid ${
                        theme.mode === "dark" ? "#444" : "#eee"
                      }`,
                      paddingBottom: "0.5rem",
                    }}
                  >
                    Approved Testimonials ({approvedTestimonials.length})
                  </h3>

                  {approvedTestimonials.length > 0 ? (
                    <div style={{ display: "grid", gap: "1.5rem" }}>
                      {approvedTestimonials.map((testimonial) => (
                        <TestimonialCard
                          key={testimonial._id}
                          testimonial={testimonial}
                          isPending={false}
                        />
                      ))}
                    </div>
                  ) : (
                    <p
                      style={{
                        textAlign: "center",
                        padding: "2rem",
                        backgroundColor:
                          theme.mode === "dark" ? "#1e1e1e" : "#f5f5f5",
                        borderRadius: "8px",
                        color: theme.mode === "dark" ? "#aaa" : "#666",
                      }}
                    >
                      No approved testimonials yet.
                    </p>
                  )}
                </div>

                {/* Refresh button */}
                <div style={{ textAlign: "center", marginTop: "2rem" }}>
                  <Button
                    variant="primary"
                    onClick={fetchTestimonials}
                    disabled={loading}
                  >
                    {loading ? "Refreshing..." : "Refresh Testimonials"}
                  </Button>
                </div>
              </>
            )}
          </>
        )}

        {activeTab === "blogs" && <BlogManagement />}

        {/* Delete Confirmation Modal */}
        {deleteModalOpen && testimonialToDelete && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 1000,
            }}
          >
            <div
              style={{
                width: "90%",
                maxWidth: "500px",
                backgroundColor: theme.mode === "dark" ? "#1e1e1e" : "#ffffff",
                borderRadius: "8px",
                padding: "2rem",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
              }}
            >
              <h3
                style={{
                  marginBottom: "1.5rem",
                  color: theme.mode === "dark" ? "#fff" : "#333",
                  fontSize: "1.5rem",
                }}
              >
                Confirm Deletion
              </h3>

              <p
                style={{
                  marginBottom: "2rem",
                  color: theme.mode === "dark" ? "#ccc" : "#666",
                }}
              >
                Are you sure you want to delete this testimonial from{" "}
                {testimonialToDelete.author.name}? This action cannot be undone.
              </p>

              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "1rem",
                }}
              >
                <Button variant="secondary" onClick={cancelDelete}>
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  onClick={confirmDelete}
                  style={{
                    backgroundColor:
                      theme.mode === "dark" ? "#5c3a3a" : "#dc3545",
                    borderColor: theme.mode === "dark" ? "#5c3a3a" : "#dc3545",
                  }}
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        )}
      </Section>
    </>
  );
};

export default AdminDashboard;
