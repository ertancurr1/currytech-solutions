import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import GlobalStyles from "./styles/GlobalStyles";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Import pages (TODO: create these later)
import HomePage from "./pages/HomePage";
// Other pages will be imported here

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <GlobalStyles />
        <Router>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              minHeight: "100vh",
            }}
          >
            <Navbar />
            <main style={{ flex: 1 }}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                {/* Other routes will go here */}
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
