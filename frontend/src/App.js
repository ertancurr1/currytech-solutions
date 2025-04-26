// frontend/src/App.js
import React from "react";
import { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, ThemeContext } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import GlobalStyles from "./styles/GlobalStyles";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

// Import pages
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ServicesPage from "./pages/ServicesPage";
import BlogPage from "./pages/BlogPage";
import BlogPostPage from "./pages/BlogPostPage";
import ContactPage from "./pages/ContactPage";
import DashboardPage from "./pages/DashboardPage";
import NotFoundPage from "./pages/NotFoundPage";

// Auth pages
import AuthLayout from "./pages/auth/AuthLayout";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <AppContent />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

function AppContent() {
  const { theme } = useContext(ThemeContext);

  return (
    <>
      <GlobalStyles theme={theme} />
      <div
        style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <Navbar />
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:id" element={<BlogPostPage />} />
            <Route path="/contact" element={<ContactPage />} />

            {/* Auth routes */}
            <Route path="/auth" element={<AuthLayout />}>
              <Route path="login" element={<LoginPage />} />
              <Route path="register" element={<RegisterPage />} />
            </Route>

            {/* Protected routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<DashboardPage />} />
            </Route>

            {/* Add a catch-all route */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </>
  );
}

// function App() {
//   return (
//     <ThemeProvider>
//       <AuthProvider>
//         <GlobalStyles />
//         <Router>
//           <div
//             style={{
//               display: "flex",
//               flexDirection: "column",
//               minHeight: "100vh",
//             }}
//           >
//             <Navbar />
//             <main style={{ flex: 1 }}>
//               <Routes>
//                 <Route path="/" element={<HomePage />} />
//                 <Route path="/about" element={<AboutPage />} />
//                 <Route path="/services" element={<ServicesPage />} />
//                 <Route path="/blog" element={<BlogPage />} />
//                 <Route path="/blog/:id" element={<BlogPostPage />} />
//                 <Route path="/contact" element={<ContactPage />} />

//                 {/* Auth routes */}
//                 <Route path="/auth" element={<AuthLayout />}>
//                   <Route path="login" element={<LoginPage />} />
//                   <Route path="register" element={<RegisterPage />} />
//                 </Route>

//                 {/* Protected routes */}
//                 <Route element={<ProtectedRoute />}>
//                   <Route path="/dashboard" element={<DashboardPage />} />
//                 </Route>

//                 {/* Add a catch-all route */}
//                 <Route path="*" element={<NotFoundPage />} />
//               </Routes>
//             </main>
//             <Footer />
//           </div>
//         </Router>
//       </AuthProvider>
//     </ThemeProvider>
//   );
// }

export default App;
