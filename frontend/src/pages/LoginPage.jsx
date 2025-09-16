// src/pages/LoginPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
    <div className="flex items-center justify-center h-screen bg-black text-white">
      <form onSubmit={handleLogin} className="bg-gray-900 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        {error && <p className="text-red-500">{error}</p>}

        <input
          type="text"
          placeholder="Username"
          className="w-full p-2 mb-3 rounded bg-gray-800"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-3 rounded bg-gray-800"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 p-2 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
}
