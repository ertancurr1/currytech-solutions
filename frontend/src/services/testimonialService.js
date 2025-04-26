import api from "../utils/api";

// Get all testimonials
export const getTestimonials = async () => {
  try {
    const response = await api.get("/testimonials");
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || "Failed to fetch testimonials";
  }
};

// Get single testimonial
export const getTestimonial = async (id) => {
  try {
    const response = await api.get(`/testimonials/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || "Failed to fetch testimonial";
  }
};

// Submit a testimonial (requires auth)
export const submitTestimonial = async (testimonialData) => {
  try {
    const response = await api.post("/testimonials", testimonialData);
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || "Failed to submit testimonial";
  }
};

// Update a testimonial (owner or admin only)
export const updateTestimonial = async (id, testimonialData) => {
  try {
    const response = await api.put(`/testimonials/${id}`, testimonialData);
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || "Failed to update testimonial";
  }
};

// Delete a testimonial (owner or admin only)
export const deleteTestimonial = async (id) => {
  try {
    const response = await api.delete(`/testimonials/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || "Failed to delete testimonial";
  }
};

// Get all testimonials including unapproved (admin only)
export const getAllTestimonials = async () => {
  try {
    const response = await api.get("/testimonials/admin");
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || "Failed to fetch all testimonials";
  }
};

// Approve a testimonial (admin only)
export const approveTestimonial = async (id) => {
  try {
    const response = await api.put(`/testimonials/${id}/approve`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || "Failed to approve testimonial";
  }
};

// Get testimonials for current user
export const getUserTestimonials = async () => {
  try {
    const response = await api.get("/testimonials/me");
    return response.data;
  } catch (error) {
    console.error("Error fetching user testimonials:", error);
    throw error.response?.data?.error || "Failed to fetch user testimonials";
  }
};
