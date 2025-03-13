import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import "./index.css";
import Header from "./components/Header.jsx";
import HomePage from "./pages/HomePage.jsx";
import Footer from "./components/Footer.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import ChaptersPage from "./pages/ChaptersPage.jsx";
import ChapterPage from "./pages/ChapterPage.jsx";
import LessonsPage from "./pages/LessonsPage.jsx";
import { AuthProvider } from "./AuthContext"; // Import AuthProvider (đường dẫn tùy thuộc vào cấu trúc dự án)

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="chapters" element={<ChaptersPage />} />
          <Route path="chapters/:id" element={<ChapterPage />} />
          <Route path="lessons/:id" element={<LessonsPage />} />
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  </StrictMode>
);
