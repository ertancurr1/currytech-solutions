// Register a new user
export const register = async (userData) => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return {
      success: true,
      message: "Registration successful! You can now log in.",
      user: {
        id: Math.floor(Math.random() * 1000),
        name: userData.name,
        email: userData.email,
      },
    };
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

// Login user
export const login = async (credentials) => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (!credentials.email.includes("@")) {
      throw new Error("Invalid email format");
    }

    if (credentials.password.length < 6) {
      throw new Error("Password must be at least 6 characters");
    }

    const token = "mock_jwt_token_" + Math.random().toString(36).substring(2);
    const user = {
      id: Math.floor(Math.random() * 1000),
      name: credentials.email.split("@")[0], // Use part of email as name
      email: credentials.email,
      role: "user",
    };

    return {
      success: true,
      token,
      user,
    };
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

// Get current user
export const getCurrentUser = async () => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      return null;
    }

    return {
      id: Math.floor(Math.random() * 1000),
      name: "John Doe",
      email: "john.doe@example.com",
      role: "user",
    };
  } catch (error) {
    console.error("Error getting current user:", error);
    throw error;
  }
};

// Logout user
export const logout = () => {
  localStorage.removeItem("token");
};
