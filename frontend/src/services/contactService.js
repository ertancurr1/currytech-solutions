import api from "../utils/api";

// Submit contact form
export const submitContactForm = async (formData) => {
  try {
    const response = await api.post("/contact", formData);
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || "Failed to submit contact form";
  }
};

// Get all contacts (admin only)
export const getContacts = async () => {
  try {
    const response = await api.get("/contact");
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || "Failed to fetch contacts";
  }
};

// Get single contact (admin only)
export const getContact = async (id) => {
  try {
    const response = await api.get(`/contact/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || "Failed to fetch contact";
  }
};

// Update contact status (admin only)
export const updateContact = async (id, data) => {
  try {
    const response = await api.put(`/contact/${id}`, data);
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || "Failed to update contact";
  }
};

// Delete contact (admin only)
export const deleteContact = async (id) => {
  try {
    const response = await api.delete(`/contact/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || "Failed to delete contact";
  }
};
