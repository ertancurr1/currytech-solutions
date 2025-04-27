import api from "../utils/api";

// Get all blogs with pagination
export const getAllBlogs = async (page = 1, limit = 10) => {
  try {
    const response = await api.get(`/blogs?page=${page}&limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    throw error.response?.data?.error || "Failed to fetch blogs";
  }
};

// Get a single blog by ID
export const getBlogById = async (id) => {
  try {
    const response = await api.get(`/blogs/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching blog with ID ${id}:`, error);
    throw error.response?.data?.error || "Failed to fetch blog";
  }
};

// Create a new blog
export const createBlog = async (blogData) => {
  try {
    const response = await api.post("/blogs", blogData);
    return response.data;
  } catch (error) {
    console.error("Error creating blog:", error);
    throw error.response?.data?.error || "Failed to create blog";
  }
};

// Update a blog
export const updateBlog = async (id, blogData) => {
  try {
    const response = await api.put(`/blogs/${id}`, blogData);
    return response.data;
  } catch (error) {
    console.error(`Error updating blog with ID ${id}:`, error);
    throw error.response?.data?.error || "Failed to update blog";
  }
};

// Delete a blog
export const deleteBlog = async (id) => {
  try {
    const response = await api.delete(`/blogs/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting blog with ID ${id}:`, error);
    throw error.response?.data?.error || "Failed to delete blog";
  }
};

// Add a comment to a blog
export const addComment = async (blogId, comment) => {
  try {
    const response = await api.post(`/blogs/${blogId}/comments`, { comment });
    return response.data;
  } catch (error) {
    console.error(`Error adding comment to blog ${blogId}:`, error);
    throw error.response?.data?.error || "Failed to add comment";
  }
};

// Like a blog
export const likeBlog = async (blogId) => {
  try {
    const response = await api.put(`/blogs/${blogId}/like`);
    return response.data;
  } catch (error) {
    console.error(`Error liking blog ${blogId}:`, error);
    throw error.response?.data?.error || "Failed to like blog";
  }
};
