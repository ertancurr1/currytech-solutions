import React, { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState({
    mode: localStorage.getItem("theme") || "light",
  });

  const toggleTheme = () => {
    setTheme((prevTheme) => ({
      mode: prevTheme.mode === "light" ? "dark" : "light",
    }));
  };

  useEffect(() => {
    localStorage.setItem("theme", theme.mode);
  }, [theme.mode]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
