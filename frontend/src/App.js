import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import GlobalStyles from "./styles/GlobalStyles";

// Import pages (TODO: to be created soon)
import HomePage from "./pages/HomePage";
// Other pages will be imported here

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <GlobalStyles />
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            {/* Other routes will go here */}
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
