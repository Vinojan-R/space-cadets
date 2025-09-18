// src/pages/LoginPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import GalaxyBackground from "../components/GalaxyBackground"; // Import GalaxyBackground

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // ✅ Get stored users (from RegisterPage.jsx)
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      // ✅ Save login state
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("username", user.username);

      // ✅ Redirect to HomePage
      navigate("/home");
    } else {
      setError("❌ Invalid username or password!");
    }
  };

  return (
    <div className="relative min-h-screen bg-gray-900 text-white">
      {/* Galaxy Background */}
      <GalaxyBackground />

      {/* Login Form */}
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <form onSubmit={handleLogin} className="bg-gray-800 p-8 rounded-lg shadow-lg w-96">
          <h2 className="text-3xl font-bold mb-6 text-center">Login</h2>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

          <div className="mb-4">
            <input
              type="text"
              placeholder="Username"
              className="w-full p-3 rounded bg-gray-700 focus:bg-gray-600 transition duration-200"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 rounded bg-gray-700 focus:bg-gray-600 transition duration-200"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-500 p-3 rounded transition duration-200"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
