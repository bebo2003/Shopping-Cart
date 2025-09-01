// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Login from "./pages/login/Login.jsx";
import Register from "./pages/register/Register.jsx";
import Home from "../src/pages/Home/Home.jsx";

// ...existing code...
function App() {
  const [isAuth, setIsAuth] = useState(null); // Start with null

  useEffect(() => {
    const auth = localStorage.getItem("auth");
    setIsAuth(auth === "true");
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("auth");
    setIsAuth(false);
  };

  // Wait for auth check before rendering routes
  if (isAuth === null) {
    return null; // Or show a loading spinner
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={isAuth ? <Home onLogout={handleLogout} /> : <Navigate to="/login" />}
        />
        <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}
// ...existing code...

export default App;
