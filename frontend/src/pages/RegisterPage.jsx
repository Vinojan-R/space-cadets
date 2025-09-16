// src/pages/RegisterPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Function to auto-generate username
  const generateUsername = (first, last) => {
    const randomNum = Math.floor(Math.random() * 1000);
    return `${first.toLowerCase()}${last.toLowerCase()}${randomNum}`;
  };

  const handleRegister = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("❌ Passwords do not match!");
      return;
    }

    // Generate username automatically
    const username = generateUsername(firstName, lastName);

    // Load existing users from localStorage
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

    // Create new user
    const newUser = {
      firstName,
      lastName,
      dob,
      username,
      password,
      score: 0, // later useful for leaderboard/games
    };

    // Save back to localStorage
    localStorage.setItem("users", JSON.stringify([...existingUsers, newUser]));

    // Save login state right after registration
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("username", username);

    alert(`🎉 Account created successfully!\nYour username is: ${username}`);

    // Redirect to SuccessPage
    navigate("/success");
  };

  return (
    <div className="flex items-center justify-center h-screen bg-black text-white">
      <form onSubmit={handleRegister} className="bg-gray-900 p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        {error && <p className="text-red-500">{error}</p>}

        <input
          type="text"
          placeholder="First Name"
          className="w-full p-2 mb-3 rounded bg-gray-800"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Last Name"
          className="w-full p-2 mb-3 rounded bg-gray-800"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        <input
          type="date"
          className="w-full p-2 mb-3 rounded bg-gray-800"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-3 rounded bg-gray-800"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full p-2 mb-3 rounded bg-gray-800"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 p-2 rounded"
        >
          Register
        </button>
      </form>
    </div>
  );
}
