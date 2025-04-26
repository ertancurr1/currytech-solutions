export const submitContactForm = async (formData) => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return {
      success: true,
      message:
        "Your message has been sent successfully! We will get back to you soon.",
    };
  } catch (error) {
    console.error("Error submitting contact form:", error);
    throw error;
  }
};
