import React, { useState, useEffect, useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import Button from "../ui/Button";
import CircularProgress from "@mui/material/CircularProgress";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  getAllBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
} from "../../services/blogService";

const BlogManagement = () => {
  const { theme } = useContext(ThemeContext);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    coverImage: "",
    tags: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const response = await getAllBlogs();
      setBlogs(response.data || []);
      setError(null);
    } catch (err) {
      console.error("Error fetching blogs:", err);
      setError("Failed to load blogs");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error when field is edited
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: null,
      });
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.title.trim()) {
      errors.title = "Title is required";
    }

    if (!formData.content.trim()) {
      errors.content = "Content is required";
    }

    if (formData.coverImage && !isValidURL(formData.coverImage)) {
      errors.coverImage = "Please enter a valid URL for the cover image";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const isValidURL = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleCreateBlog = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setLoading(true);

      // Process tags - convert comma-separated string to array
      const processedData = {
        ...formData,
        tags: formData.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag),
      };

      const response = await createBlog(processedData);

      // Update blogs list
      setBlogs([response.data, ...blogs]);

      // Reset form
      setFormData({
        title: "",
        content: "",
        coverImage: "",
        tags: "",
      });

      setShowForm(false);
    } catch (err) {
      console.error("Error creating blog:", err);
      setError("Failed to create blog");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateBlog = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setLoading(true);

      // Process tags - convert comma-separated string to array
      const processedData = {
        ...formData,
        tags: formData.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag),
      };

      const response = await updateBlog(editingBlog._id, processedData);

      // Update blogs list
      setBlogs(
        blogs.map((blog) =>
          blog._id === editingBlog._id ? response.data : blog
        )
      );

      // Reset form
      setFormData({
        title: "",
        content: "",
        coverImage: "",
        tags: "",
      });

      setEditingBlog(null);
      setShowForm(false);
    } catch (err) {
      console.error("Error updating blog:", err);
      setError("Failed to update blog");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (blog) => {
    setEditingBlog(blog);
    setFormData({
      title: blog.title,
      content: blog.content,
      coverImage: blog.coverImage || "",
      tags: Array.isArray(blog.tags) ? blog.tags.join(", ") : "",
    });
    setShowForm(true);
  };

  const handleDeleteClick = (blog) => {
    setBlogToDelete(blog);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteBlog(blogToDelete._id);
      setBlogs(blogs.filter((blog) => blog._id !== blogToDelete._id));
      setDeleteModalOpen(false);
      setBlogToDelete(null);
    } catch (err) {
      console.error("Error deleting blog:", err);
      setError("Failed to delete blog");
    }
  };

  const cancelDelete = () => {
    setDeleteModalOpen(false);
    setBlogToDelete(null);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div style={{ marginTop: "2rem" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h3
          style={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            color: theme.mode === "dark" ? "#fff" : "#333",
            marginBottom: "1.5rem",
          }}
        >
          Blog Management
        </h3>

        {!showForm && (
          <Button
            variant="primary"
            onClick={() => {
              setEditingBlog(null);
              setFormData({
                title: "",
                content: "",
                coverImage: "",
                tags: "",
              });
              setShowForm(true);
            }}
            style={{ display: "flex", alignItems: "center" }}
          >
            <AddIcon style={{ marginRight: "0.5rem" }} />
            New Blog Post
          </Button>
        )}
      </div>

      {error && (
        <div
          style={{
            padding: "1rem",
            marginTop: "1rem",
            marginBottom: "1.5rem",
            backgroundColor: theme.mode === "dark" ? "#5c3a3a" : "#f8d7da",
            color: theme.mode === "dark" ? "#ff8080" : "#721c24",
            borderRadius: "8px",
          }}
        >
          {error}
        </div>
      )}

      {showForm ? (
        <div
          style={{
            marginTop: "2rem",
            padding: "2rem",
            backgroundColor: theme.mode === "dark" ? "#1e1e1e" : "#f5f5f5",
            borderRadius: "8px",
          }}
        >
          <h4
            style={{
              marginBottom: "1.5rem",
              color: theme.mode === "dark" ? "#fff" : "#333",
            }}
          >
            {editingBlog ? "Edit Blog Post" : "Create New Blog Post"}
          </h4>

          <form onSubmit={editingBlog ? handleUpdateBlog : handleCreateBlog}>
            <div style={{ marginBottom: "1.5rem" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "0.5rem",
                  fontWeight: 500,
                  color: theme.mode === "dark" ? "#cccccc" : "#666666",
                }}
              >
                Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter blog title"
                style={{
                  width: "100%",
                  padding: "0.8rem",
                  border: `1px solid ${
                    formErrors.title
                      ? "#dc3545"
                      : theme.mode === "dark"
                      ? "#444444"
                      : "#dddddd"
                  }`,
                  borderRadius: "4px",
                  backgroundColor:
                    theme.mode === "dark" ? "#333333" : "#ffffff",
                  color: theme.mode === "dark" ? "#ffffff" : "#333333",
                }}
              />
              {formErrors.title && (
                <p
                  style={{
                    color: "#dc3545",
                    fontSize: "0.85rem",
                    marginTop: "0.3rem",
                  }}
                >
                  {formErrors.title}
                </p>
              )}
            </div>

            <div style={{ marginBottom: "1.5rem" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "0.5rem",
                  fontWeight: 500,
                  color: theme.mode === "dark" ? "#cccccc" : "#666666",
                }}
              >
                Cover Image URL (optional)
              </label>
              <input
                type="text"
                name="coverImage"
                value={formData.coverImage}
                onChange={handleInputChange}
                placeholder="https://example.com/image.jpg"
                style={{
                  width: "100%",
                  padding: "0.8rem",
                  border: `1px solid ${
                    formErrors.coverImage
                      ? "#dc3545"
                      : theme.mode === "dark"
                      ? "#444444"
                      : "#dddddd"
                  }`,
                  borderRadius: "4px",
                  backgroundColor:
                    theme.mode === "dark" ? "#333333" : "#ffffff",
                  color: theme.mode === "dark" ? "#ffffff" : "#333333",
                }}
              />
              {formErrors.coverImage && (
                <p
                  style={{
                    color: "#dc3545",
                    fontSize: "0.85rem",
                    marginTop: "0.3rem",
                  }}
                >
                  {formErrors.coverImage}
                </p>
              )}
            </div>

            <div style={{ marginBottom: "1.5rem" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "0.5rem",
                  fontWeight: 500,
                  color: theme.mode === "dark" ? "#cccccc" : "#666666",
                }}
              >
                Content
              </label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                placeholder="Write your blog content here..."
                style={{
                  width: "100%",
                  padding: "0.8rem",
                  border: `1px solid ${
                    formErrors.content
                      ? "#dc3545"
                      : theme.mode === "dark"
                      ? "#444444"
                      : "#dddddd"
                  }`,
                  borderRadius: "4px",
                  backgroundColor:
                    theme.mode === "dark" ? "#333333" : "#ffffff",
                  color: theme.mode === "dark" ? "#ffffff" : "#333333",
                  minHeight: "200px",
                  resize: "vertical",
                }}
              />
              {formErrors.content && (
                <p
                  style={{
                    color: "#dc3545",
                    fontSize: "0.85rem",
                    marginTop: "0.3rem",
                  }}
                >
                  {formErrors.content}
                </p>
              )}
            </div>

            <div style={{ marginBottom: "1.5rem" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "0.5rem",
                  fontWeight: 500,
                  color: theme.mode === "dark" ? "#cccccc" : "#666666",
                }}
              >
                Tags (comma-separated, optional)
              </label>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleInputChange}
                placeholder="technology, web development, react"
                style={{
                  width: "100%",
                  padding: "0.8rem",
                  border: `1px solid ${
                    formErrors.tags
                      ? "#dc3545"
                      : theme.mode === "dark"
                      ? "#444444"
                      : "#dddddd"
                  }`,
                  borderRadius: "4px",
                  backgroundColor:
                    theme.mode === "dark" ? "#333333" : "#ffffff",
                  color: theme.mode === "dark" ? "#ffffff" : "#333333",
                }}
              />
              {formErrors.tags && (
                <p
                  style={{
                    color: "#dc3545",
                    fontSize: "0.85rem",
                    marginTop: "0.3rem",
                  }}
                >
                  {formErrors.tags}
                </p>
              )}
            </div>

            <div
              style={{
                display: "flex",
                gap: "1rem",
                justifyContent: "flex-end",
              }}
            >
              <Button
                type="button"
                variant="secondary"
                onClick={() => {
                  setShowForm(false);
                  setEditingBlog(null);
                  setFormData({
                    title: "",
                    content: "",
                    coverImage: "",
                    tags: "",
                  });
                }}
              >
                Cancel
              </Button>
              <Button type="submit" variant="primary" disabled={loading}>
                {loading ? (
                  <>
                    <CircularProgress
                      size={20}
                      color="inherit"
                      style={{ marginRight: "0.5rem" }}
                    />
                    {editingBlog ? "Updating..." : "Creating..."}
                  </>
                ) : editingBlog ? (
                  "Update Blog Post"
                ) : (
                  "Create Blog Post"
                )}
              </Button>
            </div>
          </form>
        </div>
      ) : (
        <>
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
          ) : blogs.length > 0 ? (
            <div style={{ display: "grid", gap: "1.5rem" }}>
              {blogs.map((blog) => (
                <div
                  key={blog._id}
                  style={{
                    padding: "1.5rem",
                    borderRadius: "8px",
                    backgroundColor:
                      theme.mode === "dark" ? "#1e1e1e" : "#f5f5f5",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <h4
                      style={{
                        fontSize: "1.2rem",
                        marginBottom: "0.5rem",
                        color: theme.mode === "dark" ? "#ffffff" : "#333333",
                      }}
                    >
                      {blog.title}
                    </h4>
                    <div
                      style={{
                        display: "flex",
                        gap: "1rem",
                        color: theme.mode === "dark" ? "#aaaaaa" : "#888888",
                        fontSize: "0.9rem",
                      }}
                    >
                      <span>Published: {formatDate(blog.createdAt)}</span>
                      <span>{blog.views} Views</span>
                      <span>{blog.likes} Likes</span>
                      <span>{blog.comments?.length || 0} Comments</span>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <Button
                      variant="secondary"
                      onClick={() => window.open(`/blog/${blog._id}`, "_blank")}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        padding: "0.5rem",
                      }}
                    >
                      <VisibilityIcon fontSize="small" />
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={() => handleEdit(blog)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        padding: "0.5rem",
                      }}
                    >
                      <EditIcon fontSize="small" />
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={() => handleDeleteClick(blog)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        padding: "0.5rem",
                        backgroundColor:
                          theme.mode === "dark" ? "#3a2a2a" : "#f8d7da",
                        borderColor:
                          theme.mode === "dark" ? "#5c3a3a" : "#f5c6cb",
                        color: theme.mode === "dark" ? "#ff8080" : "#721c24",
                      }}
                    >
                      <DeleteIcon fontSize="small" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div
              style={{
                textAlign: "center",
                padding: "3rem",
                backgroundColor: theme.mode === "dark" ? "#1e1e1e" : "#f5f5f5",
                borderRadius: "8px",
                marginTop: "2rem",
              }}
            >
              <p
                style={{
                  color: theme.mode === "dark" ? "#aaa" : "#666",
                  marginBottom: "1rem",
                }}
              >
                No blog posts found. Create your first post!
              </p>
              <Button
                variant="primary"
                onClick={() => {
                  setEditingBlog(null);
                  setFormData({
                    title: "",
                    content: "",
                    coverImage: "",
                    tags: "",
                  });
                  setShowForm(true);
                }}
              >
                Create First Blog Post
              </Button>
            </div>
          )}
        </>
      )}

      {/* Delete Confirmation Modal */}
      {deleteModalOpen && blogToDelete && (
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
              Are you sure you want to delete the blog post "
              {blogToDelete.title}"? This action cannot be undone.
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
    </div>
  );
};

export default BlogManagement;
