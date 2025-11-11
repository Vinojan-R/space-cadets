// src/components/AccountModal.jsx
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";
import { useDropzone } from "react-dropzone";
import Leaderboard from "./Leaderboard";
import DashBoard from "./DashBoard";

export default function AccountModal({ username, userId, onClose, onLogout }) {
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [leaderboard, setLeaderboard] = useState([]);
  // local copy of username so UI updates immediately after change
  const [currentUsername, setCurrentUsername] = useState(username || "");
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [uploadedImage, setUploadedImage] = useState(null);
  const [loginActivity, setLoginActivity] = useState([]);
  const [reminders, setReminders] = useState("");
  const [busy, setBusy] = useState(false); // general action flag
  const contentRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/leaderboard")
      .then((r) => r.json())
      .then((d) => setLeaderboard((d || []).sort((a, b) => (b.score || 0) - (a.score || 0))))
      .catch(() => {});
  }, [userId]);

  // token helper (supports either token or user object in localStorage)
  const getToken = () => {
    const t = localStorage.getItem("token");
    if (t) return t;
    const u = localStorage.getItem("user");
    if (!u) return null;
    try {
      const parsed = JSON.parse(u);
      return parsed?.token || parsed?.accessToken || null;
    } catch {
      return null;
    }
  };

  const authHeaders = () => {
    const token = getToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    if (typeof onLogout === "function") onLogout();
    navigate("/");
  };

  // generic PUT helper that attaches auth header
  const putJson = async (url, body) => {
    const res = await fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json", ...authHeaders() },
      body: JSON.stringify(body),
    });
    return res.json().then((j) => ({ ok: res.ok, body: j }));
  };

  // Update username on server and locally
  const updateUsername = async () => {
    if (!newUsername.trim()) return alert("Enter a valid username");
    setBusy(true);
    try {
      const { ok, body } = await putJson("http://localhost:5000/api/settings/username", { userId, newUsername: newUsername.trim() });
      if (ok) {
        setCurrentUsername(newUsername.trim());
        // update localStorage user if present
        try {
          const uRaw = localStorage.getItem("user");
          if (uRaw) {
            const uObj = JSON.parse(uRaw);
            uObj.username = newUsername.trim();
            localStorage.setItem("user", JSON.stringify(uObj));
          }
        } catch {}
        setNewUsername("");
        alert(body.message || "Username updated");
      } else {
        alert(body.message || "Failed to update username");
      }
    } catch (err) {
      console.error(err);
      alert("Network error while updating username");
    } finally {
      setBusy(false);
    }
  };

  // Update password on server
  const updatePassword = async () => {
    if (!newPassword.trim()) return alert("Enter a valid password");
    setBusy(true);
    try {
      const { ok, body } = await putJson("http://localhost:5000/api/settings/password", { userId, newPassword: newPassword.trim() });
      if (ok) {
        setNewPassword("");
        alert(body.message || "Password updated");
      } else {
        alert(body.message || "Failed to update password");
      }
    } catch (err) {
      console.error(err);
      alert("Network error while updating password");
    } finally {
      setBusy(false);
    }
  };

  // Upload profile picture (multipart) and include userId and auth header
  const updateProfilePicture = async () => {
    if (!uploadedImage) return alert("Upload an image");
    setBusy(true);
    try {
      const fd = new FormData();
      fd.append("userId", userId);
      fd.append("profilePicture", uploadedImage);
      const res = await fetch("http://localhost:5000/api/settings/profile-picture", {
        method: "PUT",
        headers: { ...authHeaders() }, // don't set Content-Type for multipart
        body: fd,
      });
      const data = await res.json();
      if (res.ok) {
        setProfilePicture(data.profilePictureUrl || profilePicture);
        // update localStorage user if present
        try {
          const uRaw = localStorage.getItem("user");
          if (uRaw) {
            const uObj = JSON.parse(uRaw);
            uObj.profilePicture = data.profilePictureUrl || uObj.profilePicture;
            localStorage.setItem("user", JSON.stringify(uObj));
          }
        } catch {}
        alert(data.message || "Profile picture updated");
        setUploadedImage(null);
      } else {
        alert(data.message || "Failed to update profile picture");
      }
    } catch (err) {
      console.error(err);
      alert("Network error while uploading profile picture");
    } finally {
      setBusy(false);
    }
  };

  // Fetch login activity from server (read)
  const fetchLoginActivity = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/settings/login-activity/${userId}`, { headers: { ...authHeaders() } });
      const data = await res.json();
      setLoginActivity(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setLoginActivity([]);
    }
  };

  // Remove (clear) login activity on server
  const clearLoginActivity = async () => {
    if (!confirm("Clear all login activity?")) return;
    setBusy(true);
    try {
      const res = await fetch(`http://localhost:5000/api/settings/login-activity/${userId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json", ...authHeaders() },
        body: JSON.stringify({ userId }),
      });
      const data = await res.json();
      if (res.ok) {
        setLoginActivity([]);
        alert(data.message || "Login activity cleared");
      } else {
        alert(data.message || "Failed to clear login activity");
      }
    } catch (err) {
      console.error(err);
      alert("Network error while clearing login activity");
    } finally {
      setBusy(false);
    }
  };

  const updateReminders = async () => {
    setBusy(true);
    try {
      const { ok, body } = await putJson("http://localhost:5000/api/settings/reminders", { userId, reminders });
      if (ok) alert(body.message || "Saved");
      else alert(body.message || "Failed to save reminders");
    } catch (err) {
      console.error(err);
      alert("Network error");
    } finally {
      setBusy(false);
    }
  };

  // Delete account — asks confirmation, calls server, clears local state and navigates
  const deleteAccount = async () => {
    const okConfirm = window.confirm("Are you sure you want to delete this account? This action is irreversible.");
    if (!okConfirm) return; // abort
    setBusy(true);
    try {
      const res = await fetch("http://localhost:5000/api/settings/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json", ...authHeaders() },
        body: JSON.stringify({ userId }),
      });
      const data = await res.json();
      if (res.ok) {
        alert(data.message || "Account deleted");
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        if (typeof onLogout === "function") onLogout();
        navigate("/landing");
      } else {
        alert(data.message || "Failed to delete account");
      }
    } catch (err) {
      console.error(err);
      alert("Network error while deleting account");
    } finally {
      setBusy(false);
    }
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
            <div className="font-semibold">{currentUsername}</div>
            <div className="text-xs text-gray-300">ID: {userId}</div>
          </div>
          <button onClick={onClose} className="ml-auto text-gray-400">✖</button>
        </div>

        <div ref={contentRef} className="space-y-2 overflow-auto" style={{ maxHeight: "62vh" }}>
          <button className="w-full text-left px-3 py-2 rounded hover:bg-white/5" onClick={() => setShowDashboard(true)}>🕘 Dashboard</button>
          <button className="w-full text-left px-3 py-2 rounded hover:bg-white/5" onClick={() => setShowLeaderboard(true)}>🏆 Leaderboard</button>
          <button className="w-full text-left px-3 py-2 rounded hover:bg-white/5" onClick={() => setShowSettings(true)}>⚙️ Settings</button>
        </div>

        <div className="mt-auto">
          <button onClick={handleLogout} className="w-full bg-red-600 py-2 rounded mt-3">Log out</button>
        </div>
      </aside>

      {showDashboard && createPortal(
        <div className="fixed inset-0 flex items-start justify-end p-6 pointer-events-none z-[11000]">
          <div className="pointer-events-auto">
            <DashBoard userId={userId} onClose={() => setShowDashboard(false)} />
          </div>
        </div>,
        document.body
      )}

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
                  <input value={newUsername} onChange={(e) => setNewUsername(e.target.value)} className="w-full p-2 bg-gray-800 rounded" placeholder={currentUsername || "New username"} />
                  <button onClick={updateUsername} className="mt-2 w-full bg-indigo-600 py-2 rounded" disabled={busy}>Update</button>
                </div>

                <div>
                  <label className="block text-sm">Password</label>
                  <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="w-full p-2 bg-gray-800 rounded" placeholder="New password" />
                  <button onClick={updatePassword} className="mt-2 w-full bg-blue-600 py-2 rounded" disabled={busy}>Update</button>
                </div>

                <div>
                  <label className="block text-sm">Profile Picture</label>
                  <div {...getRootProps()} className="w-full p-3 bg-gray-800 rounded text-center cursor-pointer">
                    <input {...getInputProps()} />
                    {uploadedImage ? <img src={profilePicture} alt="preview" className="w-20 h-20 rounded-full mx-auto" /> : <span className="text-gray-400">Upload or drop image</span>}
                  </div>
                  <button onClick={updateProfilePicture} className="mt-2 w-full bg-purple-600 py-2 rounded" disabled={busy}>Save Picture</button>
                </div>

                <div>
                  <label className="block text-sm">Reminders</label>
                  <input value={reminders} onChange={(e) => setReminders(e.target.value)} className="w-full p-2 bg-gray-800 rounded" placeholder="e.g. Daily 8pm" />
                  <button onClick={updateReminders} className="mt-2 w-full bg-green-600 py-2 rounded" disabled={busy}>Save</button>
                </div>

                <div>
                  <button onClick={fetchLoginActivity} className="w-full bg-yellow-500 py-2 rounded">Show Login Activity</button>
                  {loginActivity.length > 0 && (
                    <>
                      <ul className="mt-2 max-h-24 overflow-auto bg-gray-800 p-2 rounded text-sm">
                        {loginActivity.map((l, i) => <li key={i}>🛰️ {l}</li>)}
                      </ul>
                      <button onClick={clearLoginActivity} className="mt-2 w-full bg-amber-600 py-2 rounded" disabled={busy}>Clear Login Activity</button>
                    </>
                  )}
                </div>

                <div className="border-t border-gray-700 pt-3">
                  <button onClick={deleteAccount} className="w-full bg-red-600 py-2 rounded" disabled={busy}>Delete Account</button>
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
