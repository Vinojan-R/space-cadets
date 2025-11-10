// src/components/AccountModal.jsx
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";
import { useDropzone } from "react-dropzone";
import Leaderboard from "./Leaderboard";

export default function AccountModal({ username, userId, onClose, onLogout }) {
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [leaderboard, setLeaderboard] = useState([]);
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [uploadedImage, setUploadedImage] = useState(null);
  const [loginActivity, setLoginActivity] = useState([]);
  const [reminders, setReminders] = useState("");
  const contentRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/leaderboard")
      .then((r) => r.json())
      .then((d) => setLeaderboard((d || []).sort((a, b) => (b.score || 0) - (a.score || 0))))
      .catch(() => {});
  }, [userId]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    if (typeof onLogout === "function") onLogout();
    navigate("/");
  };

  const putJson = async (url, body) => {
    const res = await fetch(url, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    return res.json();
  };

  const updateUsername = async () => {
    if (!newUsername.trim()) return alert("Enter a valid username");
    const data = await putJson("http://localhost:5000/api/settings/username", { userId, newUsername });
    alert(data.message || "Updated");
  };

  const updatePassword = async () => {
    if (!newPassword.trim()) return alert("Enter a valid password");
    const data = await putJson("http://localhost:5000/api/settings/password", { userId, newPassword });
    alert(data.message || "Updated");
  };

  const updateProfilePicture = async () => {
    if (!uploadedImage) return alert("Upload an image");
    const fd = new FormData();
    fd.append("userId", userId);
    fd.append("profilePicture", uploadedImage);
    const res = await fetch("http://localhost:5000/api/settings/profile-picture", { method: "PUT", body: fd });
    const data = await res.json();
    setProfilePicture(data.profilePictureUrl || profilePicture);
    alert(data.message || "Updated");
  };

  const fetchLoginActivity = async () => {
    const res = await fetch(`http://localhost:5000/api/settings/login-activity/${userId}`);
    const data = await res.json();
    setLoginActivity(Array.isArray(data) ? data : []);
  };

  const updateReminders = async () => {
    const data = await putJson("http://localhost:5000/api/settings/reminders", { userId, reminders });
    alert(data.message || "Saved");
  };

  const deleteAccount = async () => {
    if (!confirm("Delete account?")) return;
    const res = await fetch("http://localhost:5000/api/settings/delete", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ userId }) });
    const data = await res.json();
    if (res.ok) {
      alert(data.message || "Deleted");
      localStorage.removeItem("user");
      navigate("/landing");
    } else alert(data.message || "Failed");
  };

  const onDrop = (files) => {
    const f = files[0];
    if (!f) return;
    setUploadedImage(f);
    const reader = new FileReader();
    reader.onload = () => setProfilePicture(reader.result);
    reader.readAsDataURL(f);
  };

  const { getRootProps, getInputProps } = useDropzone({ accept: { "image/*": [] }, multiple: false, onDrop });

  // Portal the entire account panel so it sits above page content.
  return createPortal(
    <div className="fixed top-4 right-4 z-[9999]">
      <aside className="w-72 h-auto rounded-l-2xl overflow-hidden shadow-lg bg-gradient-to-b from-slate-900 to-slate-800 text-white p-3">
        <div className="flex items-center gap-3 mb-3">
          <img src={profilePicture || "/src/assets/default-profile.png"} alt="avatar" className="w-12 h-12 rounded-full object-cover" />
          <div>
            <div className="font-semibold">{username}</div>
            <div className="text-xs text-gray-300">ID: {userId}</div>
          </div>
          <button onClick={onClose} className="ml-auto text-gray-400">✖</button>
        </div>

        <div ref={contentRef} className="space-y-2 overflow-auto" style={{ maxHeight: "62vh" }}>
          <button className="w-full text-left px-3 py-2 rounded hover:bg-white/5" onClick={() => navigate("/dashboard")}>🕘 Dashboard</button>
          <button className="w-full text-left px-3 py-2 rounded hover:bg-white/5" onClick={() => setShowLeaderboard(true)}>🏆 Leaderboard</button>
          <button className="w-full text-left px-3 py-2 rounded hover:bg-white/5" onClick={() => setShowSettings(true)}>⚙️ Settings</button>
        </div>

        <div className="mt-auto">
          <button onClick={handleLogout} className="w-full bg-red-600 py-2 rounded mt-3">Log out</button>
        </div>
      </aside>

      {showLeaderboard && createPortal(<Leaderboard data={leaderboard} onClose={() => setShowLeaderboard(false)} userId={userId} />, document.body)}

      {showSettings &&
        createPortal(
          <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-[10000]">
            <div className="bg-gray-900 text-white rounded-2xl shadow-xl p-5 w-[420px]">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold">Settings</h3>
                <button onClick={() => setShowSettings(false)} className="text-gray-400">✖</button>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-sm">Username</label>
                  <input value={newUsername} onChange={(e) => setNewUsername(e.target.value)} className="w-full p-2 bg-gray-800 rounded" placeholder="New username" />
                  <button onClick={updateUsername} className="mt-2 w-full bg-indigo-600 py-2 rounded">Update</button>
                </div>

                <div>
                  <label className="block text-sm">Password</label>
                  <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="w-full p-2 bg-gray-800 rounded" placeholder="New password" />
                  <button onClick={updatePassword} className="mt-2 w-full bg-blue-600 py-2 rounded">Update</button>
                </div>

                <div>
                  <label className="block text-sm">Profile Picture</label>
                  <div {...getRootProps()} className="w-full p-3 bg-gray-800 rounded text-center cursor-pointer">
                    <input {...getInputProps()} />
                    {uploadedImage ? <img src={profilePicture} alt="preview" className="w-20 h-20 rounded-full mx-auto" /> : <span className="text-gray-400">Upload or drop image</span>}
                  </div>
                  <button onClick={updateProfilePicture} className="mt-2 w-full bg-purple-600 py-2 rounded">Save Picture</button>
                </div>

                <div>
                  <label className="block text-sm">Reminders</label>
                  <input value={reminders} onChange={(e) => setReminders(e.target.value)} className="w-full p-2 bg-gray-800 rounded" placeholder="e.g. Daily 8pm" />
                  <button onClick={updateReminders} className="mt-2 w-full bg-green-600 py-2 rounded">Save</button>
                </div>

                <div>
                  <button onClick={fetchLoginActivity} className="w-full bg-yellow-500 py-2 rounded">Show Login Activity</button>
                  {loginActivity.length > 0 && (
                    <ul className="mt-2 max-h-24 overflow-auto bg-gray-800 p-2 rounded text-sm">
                      {loginActivity.map((l, i) => <li key={i}>🛰️ {l}</li>)}
                    </ul>
                  )}
                </div>

                <div className="border-t border-gray-700 pt-3">
                  <button onClick={deleteAccount} className="w-full bg-red-600 py-2 rounded">Delete Account</button>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>,
    document.body
  );
}
