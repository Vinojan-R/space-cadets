// src/pages/RegisterPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import GalaxyBackground from "../components/GalaxyBackground";
import axios from "axios";

export default function RegisterPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");
  const navigate = useNavigate();

  // ✅ Generate username automatically
  const generateUsername = (first, last) => {
    const randomNum = Math.floor(Math.random() * 1000);
    return `${first.toLowerCase()}${last.toLowerCase()}${randomNum}`;
  };

  // ✅ Password strength checker
  const checkPasswordStrength = (pwd) => {
    if (pwd.length < 6) return "Weak";
    const hasUpper = /[A-Z]/.test(pwd);
    const hasLower = /[a-z]/.test(pwd);
    const hasNumber = /[0-9]/.test(pwd);
    const hasSpecial = /[!@#$%^&*]/.test(pwd);
    const strength = [hasUpper, hasLower, hasNumber, hasSpecial].filter(Boolean).length;

    if (strength <= 2) return "Weak";
    if (strength === 3) return "Medium";
    if (strength === 4 && pwd.length >= 8) return "Strong";
    return "Medium";
  };

  const handlePasswordChange = (e) => {
    const newPwd = e.target.value;
    setPassword(newPwd);
    setPasswordStrength(checkPasswordStrength(newPwd));
  };

  // ✅ Handle registration
  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    // --- Validation checks ---
    if (!firstName.trim() || !lastName.trim() || !dob) {
      setError("⚠️ Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("❌ Passwords do not match!");
      return;
    }

    if (passwordStrength === "Weak") {
      setError("🔒 Password is too weak! Try adding uppercase, numbers & symbols.");
      return;
    }

    // Generate username
    const username = generateUsername(firstName, lastName);

    // Save locally (optional for your game site)
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    const newUser = { firstName, lastName, dob, username, password, score: 0 };

    localStorage.setItem("users", JSON.stringify([...existingUsers, newUser]));
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("username", username);

    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", {
        firstName,
        lastName,
        dob,
        username,
        password,
      });
      console.log("Registration response:", res);
      if (res.status !== 200) {
        // setError("❌ Registration failed. Please try again.");
        alert(`🎉 Account created successfully!\nYour username is: ${username}`);
        navigate("/success");
      }
    } catch (err) {
      setError("❌ Registration  sunnn failed. Please try again.");
      console.log(err)
    }
  };

  return (
    <div className="relative min-h-screen bg-gray-900 text-white">
      <GalaxyBackground />

      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <form
          onSubmit={handleRegister}
          className="bg-gray-800 p-8 rounded-xl shadow-xl w-96"
        >
          <h2 className="text-3xl font-bold mb-6 text-center">Create Account</h2>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

          {/* First Name */}
          <input
            type="text"
            placeholder="First Name"
            className="w-full p-3 mb-4 rounded bg-gray-700 focus:bg-gray-600 transition duration-200"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value.replace(/[^A-Za-z]/g, ""))}
            onPaste={(e) => {
              e.preventDefault();
              const text = (e.clipboardData || window.clipboardData).getData("text");
              setFirstName(text.replace(/[^A-Za-z]/g, ""));
            }}
            required
          />

          {/* Last Name */}
          <input
            type="text"
            placeholder="Last Name"
            className="w-full p-3 mb-4 rounded bg-gray-700 focus:bg-gray-600 transition duration-200"
            value={lastName}
            onChange={(e) => setLastName(e.target.value.replace(/[^A-Za-z]/g, ""))}
            onPaste={(e) => {
              e.preventDefault();
              const text = (e.clipboardData || window.clipboardData).getData("text");
              setLastName(text.replace(/[^A-Za-z]/g, ""));
            }}
            required
          />
          {/* Date of Birth */}
          <input
            type="date"
            placeholder="Date of Birth"
            className="w-full p-3 mb-4 rounded bg-gray-700 focus:bg-gray-600 transition duration-200"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            required
          />
          {/* Password */}
          <div className="relative mb-4">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full p-3 rounded bg-gray-700 focus:bg-gray-600 transition duration-200 pr-10"
              value={password}
              onChange={handlePasswordChange}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-300 hover:text-white"
            >
              {showPassword ? "🙈" : "👁️"}
            </button>

            {/* Hint for strong password */}
            <p className="mt-2 text-xs text-gray-300">
              Tip: Use uppercase, lowercase, numbers (0–9) and symbols (e.g. # @ ! ) for a strong password.
            </p>

            {password && (
              <p
                className={`mt-1 text-sm ${
                  passwordStrength === "Weak"
                    ? "text-red-400"
                    : passwordStrength === "Medium"
                    ? "text-yellow-400"
                    : "text-green-400"
                }`}
              >
                Strength: {passwordStrength}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full p-3 mb-6 rounded bg-gray-700 focus:bg-gray-600 transition duration-200"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-500 p-3 rounded transition duration-200 font-semibold"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
