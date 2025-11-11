import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";
import SpaceBackground from "./SpaceBackground";

export default function DashBoard() {
  const [showModal, setShowModal] = useState(false);
  const [streakDays, setStreakDays] = useState(0);
  const [xp, setXp] = useState(0);
  const [lastClaim, setLastClaim] = useState(null);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");
  const [leaderboard, setLeaderboard] = useState([
    { id: "1", username: "ChillCat19", score: 1800, avatarUrl: "/src/assets/default-profile.png" },
    { id: "2", username: "You", score: 0, avatarUrl: "/src/assets/default-profile.png" },
    { id: "3", username: "AussieMike", score: 1500, avatarUrl: "/src/assets/default-profile.png" },
  ]);

  // helper to read token from localStorage (token or user.token)
  const getToken = () => {
    let token = localStorage.getItem("token");
    if (token) return token;
    const u = localStorage.getItem("user");
    if (!u) return null;
    try {
      const parsed = JSON.parse(u);
      return parsed?.token || parsed?.accessToken || null;
    } catch {
      return null;
    }
  };

  const fetchStreak = async () => {
    setLoading(true);
    setMsg("");
    try {
      const token = getToken();
      if (!token) {
        setMsg("Log in to track and claim streaks.");
        setLoading(false);
        return;
      }
      const res = await fetch("/api/streaks", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        setStreakDays(data.streakDays || 0);
        setXp(data.xp || 0);
        setLastClaim(data.lastClaim || null);
      } else {
        setMsg(data.message || "Failed to load streak");
      }
    } catch (err) {
      console.error(err);
      setMsg("Network error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStreak();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // open modal when navigated from AccountModal with state.openStreakModal
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (location?.state?.openStreakModal) {
      setShowModal(true);
      // clear location state so refresh/back won't reopen
      navigate(location.pathname, { replace: true, state: null });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // close modal on Escape
  useEffect(() => {
    if (!showModal) return;
    const onKey = (e) => { if (e.key === "Escape") setShowModal(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [showModal]);

  const claimSpot = async () => {
    setMsg("");
    try {
      const token = getToken();
      if (!token) {
        setMsg("Please log in to claim today's streak.");
        return;
      }
      const res = await fetch("/api/streaks/claim", {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        setStreakDays(data.streakDays || 0);
        setXp(data.xp || 0);
        setLastClaim(data.lastClaim || new Date().toISOString());
        setMsg("Claim successful! +50 XP");
        // Update local leaderboard "You" visually
        setLeaderboard((prev) => prev.map((p) => (p.username === "You" ? { ...p, score: data.xp || p.score } : p)));
      } else {
        setMsg(data.message || "Failed to claim");
      }
    } catch (err) {
      console.error(err);
      setMsg("Network error");
    }
  };

  return (
    <div className="relative min-h-screen text-white">
      {/* Space background behind dashboard */}
      <div className="absolute inset-0 -z-10">
        <SpaceBackground />
      </div>

      <div className="min-h-screen bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-slate-900/70 to-black/80 p-6 relative z-10">
        {/* Top area / hero */}
        <header className="max-w-6xl mx-auto flex items-center justify-between">
          <h1 className="text-4xl font-extrabold">Welcome to our space cadets website</h1>
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-300">XP: <span className="font-semibold">{xp}</span></div>
            <button
              onClick={() => setShowModal(true)}
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white font-medium"
            >
              Open Leaderboard / Streak
            </button>
          </div>
        </header>

        {/* Example dashboard content placeholder */}
        <main className="max-w-6xl mx-auto mt-10 space-y-6">
          <section className="bg-gray-800/80 rounded-lg p-6 shadow">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">Current Streak</h2>
                <p className="text-sm text-gray-400">Keep a streak to increase activity score</p>
              </div>

              <div className="text-right">
                <div className="text-2xl font-bold text-orange-400">🔥 {streakDays} days</div>
                <div className="text-sm text-gray-300">Claim daily to maintain streak</div>
              </div>
            </div>

            {/* weekly indicators */}
            <div className="mt-4 flex gap-2 items-center">
              {["M","T","W","T","F","S","S"].map((d, i) => {
                const active = i < Math.min(streakDays, 7); // simple active indicator
                return (
                  <div key={d} className={`w-8 h-8 rounded-full flex items-center justify-center ${active ? "bg-orange-400 text-black" : "bg-gray-700 text-gray-400"}`}>
                    {d}
                  </div>
                );
              })}
            </div>
          </section>

          <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="col-span-2 bg-gray-800/80 rounded-lg p-6 shadow">
              <h3 className="font-semibold text-lg mb-2">Featured</h3>
              <p className="text-gray-300">Content area — add courses, progress charts, announcements...</p>
            </div>

            <aside className="bg-gray-800/80 rounded-lg p-6 shadow">
              <h4 className="font-semibold mb-3">Activity Score</h4>
              <div className="text-sm text-gray-300">Lessons 10 · Exercises 14 · Quizzes 0</div>
              <div className="mt-4">
                <div className="text-xs text-gray-400 mb-2">Progress</div>
                <div className="h-2 bg-gray-700 rounded overflow-hidden">
                  <div className="h-full bg-green-500" style={{ width: "3%" }} />
                </div>
              </div>
            </aside>
          </section>
        </main>
      </div>

      {/* Centered modal as a portal with single close button */}
      {showModal &&
        createPortal(
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* overlay - clicking outside closes */}
            <div className="absolute inset-0 bg-black/60" onClick={() => { setShowModal(false); setMsg(""); }} />

            {/* centered panel */}
            <div className="relative w-full max-w-4xl mx-4">
              <div className="relative bg-gradient-to-b from-slate-800 to-gray-900 text-white rounded-2xl shadow-2xl p-8">
                {/* single close button in corner */}
                <button
                  aria-label="Close"
                  onClick={() => { setShowModal(false); setMsg(""); }}
                  className="absolute right-4 top-4 text-2xl text-white/70 hover:text-white"
                >
                  ✖
                </button>

                <div className="max-w-3xl mx-auto text-center">
                  <h2 className="text-4xl font-extrabold mb-4">Daily Streak & Leaderboard</h2>
                  <p className="text-gray-300 mb-6">Claim daily to keep your streak and earn XP.</p>

                  {/* Claim/leaderboard area */}
                  <div className="bg-gray-800 rounded-xl p-6 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-full bg-gray-700 overflow-hidden flex items-center justify-center">
                        <img src="/src/assets/default-profile.png" alt="You" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <div className="font-semibold">You</div>
                        <div className="text-sm text-gray-400">Claim your daily streak</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-lg font-bold">{xp} XP</div>
                      <button
                        onClick={claimSpot}
                        disabled={loading}
                        className="bg-green-500 disabled:opacity-60 hover:bg-green-600 px-6 py-3 rounded-full font-bold"
                      >
                        {loading ? "Loading…" : "Claim today's streak"}
                      </button>
                    </div>
                  </div>

                  {msg && <div className="mt-4 text-sm text-yellow-300">{msg}</div>}

                  {/* small leaderboard preview */}
                  <div className="mt-6 space-y-3">
                    {leaderboard.map((p, idx) => (
                      <div key={p.id} className={`flex items-center justify-between bg-gray-800 p-3 rounded ${p.username === "You" ? "ring-2 ring-green-500" : ""}`}>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full overflow-hidden">
                            <img src={p.avatarUrl} alt={p.username} className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <div className="font-medium">{p.username}</div>
                            <div className="text-xs text-gray-400">Rank {idx + 1}</div>
                          </div>
                        </div>
                        <div className="font-bold">{p.score} XP</div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 text-sm text-gray-400">
                    Last claimed: {lastClaim ? new Date(lastClaim).toLocaleString() : "Never"}
                  </div>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}