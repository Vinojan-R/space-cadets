// src/components/AccountModal.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AccountModal({ username, userId, onClose, onLogout }) {
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [leaderboard, setLeaderboard] = useState([]);
  const [userRank, setUserRank] = useState(null);

  // Settings fields
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [loginActivity, setLoginActivity] = useState([]);
  const [reminders, setReminders] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/leaderboard")
      .then((res) => res.json())
      .then((data) => setLeaderboard(data))
      .catch((err) => console.error("Failed to fetch leaderboard:", err));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const updateUsername = async () => {
    if (!newUsername.trim()) return alert("Enter a valid username");
    try {
      const res = await fetch("http://localhost:5000/api/settings/username", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, newUsername }),
      });
      const data = await res.json();
      alert(data.message);
    } catch (error) {
      console.error("Failed to update username:", error);
    }
  };

  const updatePassword = async () => {
    if (!newPassword.trim()) return alert("Enter a valid password");
    try {
      const res = await fetch("http://localhost:5000/api/settings/password", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, newPassword }),
      });
      const data = await res.json();
      alert(data.message);
    } catch (error) {
      console.error("Failed to update password:", error);
    }
  };

  const updateProfilePicture = async () => {
    if (!profilePicture.trim()) return alert("Enter a valid image URL");
    try {
      const res = await fetch("http://localhost:5000/api/settings/profile-picture", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, profilePicture }),
      });
      const data = await res.json();
      alert(data.message);
    } catch (error) {
      console.error("Failed to update profile picture:", error);
    }
  };

  const fetchLoginActivity = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/settings/login-activity/${userId}`);
      const data = await res.json();
      setLoginActivity(data);
    } catch (error) {
      console.error("Failed to fetch login activity:", error);
    }
  };

  const updateReminders = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/settings/reminders", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, reminders }),
      });
      const data = await res.json();
      alert(data.message);
    } catch (error) {
      console.error("Failed to update reminders:", error);
    }
  };

  const deleteAccount = async () => {
    if (!window.confirm("Are you sure you want to delete your account?")) return;
    try {
      const res = await fetch("http://localhost:5000/api/settings/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });
      const data = await res.json();
      alert(data.message);
      handleLogout();
    } catch (error) {
      console.error("Failed to delete account:", error);
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      {/* Main account popup */}
      <div className="bg-gray-800 text-white rounded-xl shadow-lg p-6 w-80 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-white"
        >
          ✖
        </button>

        <h2 className="text-xl font-bold mb-3">Account</h2>
        <p className="text-lg mb-4">
          Welcome, <span className="font-bold">{username}</span>!
        </p>

        <div className="space-y-3">
          <button
            className="w-full bg-indigo-500 px-4 py-2 rounded font-bold hover:bg-indigo-600"
            onClick={() => setShowLeaderboard(true)}
          >
            Leaderboard
          </button>
          <button
            className="w-full bg-green-500 px-4 py-2 rounded font-bold hover:bg-green-600"
            onClick={() => setShowSettings(true)}
          >
            Settings
          </button>
          <button
            className="w-full bg-red-500 px-4 py-2 rounded font-bold hover:bg-red-600"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Leaderboard popup */}
      {showLeaderboard && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50">
          <div className="bg-gray-800 text-white rounded-xl shadow-lg p-6 w-80 relative">
            <button
              onClick={() => setShowLeaderboard(false)}
              className="absolute top-2 right-2 text-gray-400 hover:text-white"
            >
              ✖
            </button>
            <h2 className="text-xl font-bold mb-3">🏆 Leaderboard</h2>
            <ul className="space-y-2 max-h-60 overflow-y-auto">
              {leaderboard.map((player, index) => (
                <li
                  key={player._id}
                  className="flex justify-between bg-gray-700 p-2 rounded"
                >
                  <span>{index + 1}. {player.username}</span>
                  <span>{player.score} pts</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Settings popup */}
      {showSettings && (
        <div className="fixed top-4 right-4 z-50">
          <div className="bg-gray-800 text-white rounded-xl p-6 w-96 relative">
            <button
              onClick={() => setShowSettings(false)}
              className="absolute top-2 right-2 text-gray-400 hover:text-white"
            >
              ✖
            </button>
            <h2 className="text-xl font-bold mb-4">⚙️ Settings</h2>

            {/* Username */}
            <div className="mb-3">
              <label className="block text-sm mb-1">Change Username</label>
              <input
                type="text"
                className="w-full p-2 rounded bg-gray-700 border border-gray-600"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
              />
              <button
                className="mt-2 w-full bg-indigo-500 px-4 py-2 rounded hover:bg-indigo-600"
                onClick={updateUsername}
              >
                Update Username
              </button>
            </div>

            {/* Password */}
            <div className="mb-3">
              <label className="block text-sm mb-1">Change Password</label>
              <input
                type="password"
                className="w-full p-2 rounded bg-gray-700 border border-gray-600"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <button
                className="mt-2 w-full bg-blue-500 px-4 py-2 rounded hover:bg-blue-600"
                onClick={updatePassword}
              >
                Update Password
              </button>
            </div>

            {/* Profile picture */}
            <div className="mb-3">
              <label className="block text-sm mb-1">Profile Picture URL</label>
              <input
                type="text"
                className="w-full p-2 rounded bg-gray-700 border border-gray-600"
                value={profilePicture}
                onChange={(e) => setProfilePicture(e.target.value)}
              />
              <button
                className="mt-2 w-full bg-purple-500 px-4 py-2 rounded hover:bg-purple-600"
                onClick={updateProfilePicture}
              >
                Update Picture
              </button>
            </div>

            {/* Learning reminders */}
            <div className="mb-3">
              <label className="block text-sm mb-1">Learning Reminders</label>
              <input
                type="text"
                className="w-full p-2 rounded bg-gray-700 border border-gray-600"
                value={reminders}
                onChange={(e) => setReminders(e.target.value)}
              />
              <button
                className="mt-2 w-full bg-green-500 px-4 py-2 rounded hover:bg-green-600"
                onClick={updateReminders}
              >
                Save Reminders
              </button>
            </div>

            {/* Login activity */}
            <div className="mb-3">
              <button
                className="w-full bg-yellow-500 px-4 py-2 rounded hover:bg-yellow-600"
                onClick={fetchLoginActivity}
              >
                Show Login Activity
              </button>
              {loginActivity.length > 0 && (
                <ul className="mt-2 space-y-1 max-h-32 overflow-y-auto text-sm bg-gray-700 p-2 rounded">
                  {loginActivity.map((log, index) => (
                    <li key={index}>📍 {log}</li>
                  ))}
                </ul>
              )}
            </div>

            {/* Delete account */}
            <div className="mt-4">
              <button
                className="w-full bg-red-500 px-4 py-2 rounded hover:bg-red-600"
                onClick={deleteAccount}
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
