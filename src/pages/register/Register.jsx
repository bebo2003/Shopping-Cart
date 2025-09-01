// src/pages/register/Register.jsx
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Register() {
  const [form, setForm] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ نحفظ بيانات اليوزر في localStorage
    localStorage.setItem("user", JSON.stringify(form));

    alert("User Registered Successfully!");

    // ✅ بعد التسجيل يروح مباشرة لصفحة تسجيل الدخول
    navigate("/login");
  };

  return (
    <div>
      {/* Header */}
      <header className="bg-blue-600 h-[70px] flex items-center">
        <div className="container mx-auto flex justify-between items-center px-4">
          <Link to="/" className="flex items-center">
            <img
              src="/images/14603825_5484736.jpg"
              alt="Logo"
              className="w-[100px] h-[70px] object-cover"
            />
          </Link>

          <nav>
            <ul className="flex space-x-4 text-white">
              <li>
                <Link to="/login" className="hover:underline">
                  Sign In
                </Link>
              </li>
              <li>
                <Link to="/register" className="hover:underline">
                  Sign Up
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Register Form */}
      <section className="flex flex-col items-center py-8">
        <h2 className="text-blue-600 text-2xl mb-4">Register User</h2>

        <form
          onSubmit={handleSubmit}
          className="bg-blue-600 p-6 rounded-lg shadow-md w-80 flex flex-col gap-4"
        >
          <input
            type="text"
            id="userName"
            value={form.userName}
            onChange={handleChange}
            placeholder="Enter User Name"
            className="border p-2 rounded bg-white"
            required
          />
          <input
            type="email"
            id="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter User Email"
            className="border p-2 rounded bg-white"
            required
          />
          <input
            type="password"
            id="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Enter User Password"
            className="border p-2 rounded bg-white"
            required
          />
          <input
            type="submit"
            value="Sign Up"
            className="bg-blue-600 text-white py-2 rounded cursor-pointer hover:bg-blue-700"
          />

          <p className="text-sm text-center text-white">
            Have Already Account?{" "}
            <Link to="/login" className="hover:underline">
              Login
            </Link>
          </p>
        </form>
      </section>
    </div>
  );
}
