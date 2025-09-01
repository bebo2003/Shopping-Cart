// src/pages/login/Login.jsx
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Header from "../../shared/Header/Header";
export default function Login({ setIsAuth }) {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 🔹 نجيب بيانات اليوزر من localStorage
    const savedUser = JSON.parse(localStorage.getItem("user"));

if (
  savedUser &&
  savedUser.email === form.email &&
  savedUser.password === form.password
) {
  // تسجيل دخول ناجح
  localStorage.setItem("auth", "true"); // 👈 خزنها string
  setIsAuth(true);
  navigate("/"); // 👈 روح للرئيسية بدل /home
} else {
  alert("❌ Invalid Email or Password");
}

  };

  return (
    <div className="min-h-screen">
      {/* Header */}
    <Header />

      {/* Login Form Section */}
      <section className="flex flex-col items-center justify-center py-12">
        <h2 className="text-3xl font-bold text-blue-600 mb-6">Login User</h2>

        <form
          onSubmit={handleSubmit}
          className="bg-blue-600 shadow-lg rounded-xl p-8 w-full max-w-md"
        >
          <input
            type="email"
            id="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter User Email"
            className="w-full px-4 py-2 bg-white border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="password"
            id="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Enter User Password"
            className="w-full px-4 py-2 bg-white border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="submit"
            value="Sign In"
            id="signIn"
            className="w-full bg-blue-700 text-white py-2 rounded-lg hover:bg-blue-800 cursor-pointer font-semibold"
          />

          <p className="text-white text-center mt-4">
            Sign up Now?{" "}
            <Link to="/register" className="text-white hover:underline">
              Register
            </Link>
          </p>
        </form>
      </section>
    </div>
  );
}
