// src/components/AccountModal.jsx
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";
import { useDropzone } from "react-dropzone";
import Leaderboard from "./Leaderboard";

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

  const [uploadedImage, setUploadedImage] = useState(null);
  const contentRef = useRef(null);
  const [showCornerScroll, setShowCornerScroll] = useState(false);
  const [atBottom, setAtBottom] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/leaderboard")
      .then((res) => res.json())
      .then((data) => {
        // keep leaderboard sorted desc by score
        const sorted = (data || []).sort((a, b) => (b.score || 0) - (a.score || 0));
        setLeaderboard(sorted);
        // set user's rank if available
        const idx = sorted.findIndex((p) => String(p._id) === String(userId) || p._id === userId);
        setUserRank(idx >= 0 ? idx + 1 : null);
      })
      .catch((err) => console.error("Failed to fetch leaderboard:", err));
  }, [userId]);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    const checkOverflow = () => {
      setShowCornerScroll(el.scrollHeight > el.clientHeight);
      setAtBottom(el.scrollTop + el.clientHeight >= el.scrollHeight - 4);
    };
    checkOverflow();
    el.addEventListener("scroll", checkOverflow);
    window.addEventListener("resize", checkOverflow);
    return () => {
      el.removeEventListener("scroll", checkOverflow);
      window.removeEventListener("resize", checkOverflow);
    };
  }, []);

  const handleCornerScroll = () => {
    const el = contentRef.current;
    if (!el) return;
    if (!atBottom) {
      // scroll down one "page"
      el.scrollBy({ top: el.clientHeight - 48, behavior: "smooth" });
    } else {
      // if already at bottom, scroll to top
      el.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    if (typeof onLogout === "function") onLogout();
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
    if (!uploadedImage) return alert("Please upload a valid image.");
    try {
      const formData = new FormData();
      formData.append("userId", userId);
      formData.append("profilePicture", uploadedImage);

      const res = await fetch("http://localhost:5000/api/settings/profile-picture", {
        method: "PUT",
        body: formData,
      });

      const data = await res.json();
      alert(data.message);
      setProfilePicture(data.profilePictureUrl); // Update preview
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
    if (!window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) return;
    try {
      const res = await fetch("http://localhost:5000/api/settings/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });
      const data = await res.json();
      if (res.ok) {
        alert(data.message);
        localStorage.removeItem("user");
        navigate("/landing");
      } else {
        alert("Failed to delete account. Please try again.");
      }
    } catch (error) {
      console.error("Failed to delete account:", error);
      alert("An error occurred while deleting the account.");
    }
  };

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setUploadedImage(file);
      const reader = new FileReader();
      reader.onload = () => {
        setProfilePicture(reader.result); // preview
      };
      reader.readAsDataURL(file);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "image/*": [] },
    multiple: false,
  });

  // Sidebar-style account modal (matches image layout)
  return (
    <div className="fixed top-4 right-4 z-50">
      {/* Panel */}
      <aside className="w-80 h-[90vh] rounded-l-2xl overflow-hidden shadow-2xl bg-gradient-to-b from-slate-900 to-slate-800 text-white border-l-2 border-white/5 relative">
        {/* close button */}
        <div className="flex items-start justify-between p-4">
          <div className="flex items-start gap-3">
            <img
              src={profilePicture || "/src/assets/default-profile.png"}
              alt="avatar"
              className="w-14 h-14 rounded-full border-2 border-white/10 object-cover"
            />
            <div>
              <div className="text-lg font-semibold">{username}</div>
              <button
                onClick={() => navigate("/profile")}
                className="text-xs text-gray-300 hover:text-white mt-1"
              >
                Edit profile &rarr;
              </button>
            </div>
          </div>

          <div className="flex flex-col items-end gap-2">
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white mt-2"
              aria-label="Close account panel"
            >
              ✖
            </button>
          </div>
        </div>

        {/* scrollable content (nav, billing, etc.) */}
        <div
          ref={contentRef}
          className="px-4 mt-2 overflow-y-auto"
          style={{ maxHeight: "calc(90vh - 160px)" }}
        >
          <nav>
            <ul className="space-y-1">
              <li>
                <button
                  className="w-full flex items-center gap-3 px-3 py-3 rounded-md hover:bg-white/5 text-left"
                  onClick={() => navigate("/dashboard", { state: { openStreakModal: true } })}
                >
                  <span className="text-2xl">🕘</span>
                  <span className="font-medium">Dashboard</span>
                </button>
              </li>

              <li>
                <button
                  className="w-full flex items-center gap-3 px-3 py-3 rounded-md hover:bg-white/5 text-left"
                  onClick={() => setShowLeaderboard(true)}
                >
                  <span className="text-2xl">🏆</span>
                  <span className="font-medium">Leaderboard</span>
                </button>
              </li>

              <li>
                <button
                  className="w-full flex items-center gap-3 px-3 py-3 rounded-md hover:bg-white/5 text-left"
                  onClick={() => navigate("/tutorials")}
                >
                  <span className="text-2xl">💡</span>
                  <span className="font-medium">Tutorials</span>
                </button>
              </li>

              <li>
                <button
                  className="w-full flex items-center gap-3 px-3 py-3 rounded-md hover:bg-white/5 text-left"
                  onClick={() => navigate("/bookmarks")}
                >
                  <span className="text-2xl">🔖</span>
                  <span className="font-medium">Bookmarks</span>
                </button>
              </li>

              <li>
                <button
                  className="w-full flex items-center gap-3 px-3 py-3 rounded-md hover:bg-white/5 text-left"
                  onClick={() => navigate("/learning-paths")}
                >
                  <span className="text-2xl">🧭</span>
                  <span className="font-medium">Learning Paths</span>
                </button>
              </li>

              <li>
                <button
                  className="w-full flex items-center gap-3 px-3 py-3 rounded-md hover:bg-white/5 text-left"
                  onClick={() => navigate("/courses")}
                >
                  <span className="text-2xl">🎓</span>
                  <span className="font-medium">Courses</span>
                </button>
              </li>

              <li>
                <button
                  className="w-full flex items-center gap-3 px-3 py-3 rounded-md hover:bg-white/5 text-left"
                  onClick={() => navigate("/spaces")}
                >
                  <span className="text-2xl">🗂️</span>
                  <span className="font-medium">Spaces</span>
                </button>
              </li>

              <li>
                <button
                  className="w-full flex items-center gap-3 px-3 py-3 rounded-md hover:bg-white/5 text-left"
                  onClick={() => navigate("/certificates")}
                >
                  <span className="text-2xl">📜</span>
                  <span className="font-medium">Certificates</span>
                </button>
              </li>
            </ul>
          </nav>

          <div className="mt-4 border-t border-white/5 px-4 pt-4">
            <button
              className="w-full flex items-center gap-3 px-3 py-3 rounded-md hover:bg-white/5 text-left"
              onClick={() => navigate("/billing")}
            >
              <span className="text-2xl">⚙️</span>
              <span className="font-medium">Billing</span>
            </button>
          </div>

          {/* spacer so logout stays visible at bottom when scrolled */}
          <div className="h-4" />
        </div>

        {/* logout stays outside scrollable area so always visible */}
        <div className="mt-auto px-4 pb-6 pt-4">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-3 rounded-md bg-red-600 hover:bg-red-700 text-white font-semibold justify-start"
          >
            <span className="text-2xl">↩️</span>
            <span>Log out</span>
          </button>
        </div>
      </aside>

      {/* Leaderboard modal */}
      {showLeaderboard &&
        createPortal(
          <Leaderboard data={leaderboard} onClose={() => setShowLeaderboard(false)} userId={userId} />,
          document.body
        )}

      {/* Settings modal (kept as floating window to edit) */}
      {showSettings && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
          <div className="bg-gray-900 text-white rounded-2xl shadow-xl p-6 w-[420px] relative">
            <button
              onClick={() => setShowSettings(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-white text-xl"
            >
              ✖
            </button>

            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">⚙️ Settings</h2>

            <div className="flex items-center gap-4 mb-6">
              <img
                src={profilePicture || "/src/assets/default-profile.png"}
                alt="Profile"
                className="w-16 h-16 rounded-full border-2 border-gray-600 object-cover"
              />
              <div>
                <p className="font-bold text-lg">{username}</p>
                <p className="text-sm text-gray-400">User ID: {userId}</p>
              </div>
            </div>

            <div className="mb-5">
              <label className="block text-sm mb-1 font-medium">👤 Change Username</label>
              <input
                type="text"
                className="w-full p-2 rounded bg-gray-800 border border-gray-700 focus:border-indigo-500 outline-none"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
              />
              <button
                className="mt-2 w-full bg-indigo-500 px-4 py-2 rounded font-bold hover:bg-indigo-600"
                onClick={updateUsername}
              >
                Update Username
              </button>
            </div>

            <div className="mb-5">
              <label className="block text-sm mb-1 font-medium">🔑 Change Password</label>
              <input
                type="password"
                className="w-full p-2 rounded bg-gray-800 border border-gray-700 focus:border-blue-500 outline-none"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <button
                className="mt-2 w-full bg-blue-500 px-4 py-2 rounded font-bold hover:bg-blue-600"
                onClick={updatePassword}
              >
                Update Password
              </button>
            </div>

            <div className="mb-5">
              <label className="block text-sm mb-1 font-medium">🖼️ Profile Picture</label>
              <div
                {...getRootProps()}
                className="w-full p-4 rounded bg-gray-800 border border-gray-700 text-center cursor-pointer"
              >
                <input {...getInputProps()} />
                {uploadedImage ? (
                  <img
                    src={profilePicture}
                    alt="Uploaded Preview"
                    className="w-24 h-24 object-cover rounded-full mx-auto"
                  />
                ) : (
                  <p className="text-gray-400">Drag & drop an image here, or click to select</p>
                )}
              </div>
              <button
                className="mt-2 w-full bg-purple-500 px-4 py-2 rounded font-bold hover:bg-purple-600"
                onClick={updateProfilePicture}
              >
                Update Picture
              </button>
            </div>

            <div className="mb-5">
              <label className="block text-sm mb-1 font-medium">📅 Learning Reminders</label>
              <input
                type="text"
                className="w-full p-2 rounded bg-gray-800 border border-gray-700 focus:border-green-500 outline-none"
                value={reminders}
                onChange={(e) => setReminders(e.target.value)}
              />
              <button
                className="mt-2 w-full bg-green-500 px-4 py-2 rounded font-bold hover:bg-green-600"
                onClick={updateReminders}
              >
                Save Reminders
              </button>
            </div>

            <div className="mb-6">
              <button
                className="w-full bg-yellow-500 px-4 py-2 rounded font-bold hover:bg-yellow-600"
                onClick={fetchLoginActivity}
              >
                Show Login Activity
              </button>
              {loginActivity.length > 0 && (
                <ul className="mt-3 space-y-2 max-h-32 overflow-y-auto text-sm bg-gray-800 p-3 rounded border border-gray-700">
                  {loginActivity.map((log, index) => (
                    <li key={index} className="flex items-center gap-2">
                      🛰️ <span>{log}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="border-t border-gray-700 pt-4">
              <h3 className="text-red-400 font-bold mb-2">⚠️ Danger Zone</h3>
              <button
                className="w-full bg-red-500 px-4 py-2 rounded font-bold hover:bg-red-600"
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
