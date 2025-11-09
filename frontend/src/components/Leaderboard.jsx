import React from "react";

export default function Leaderboard({ data = [], onClose, userId }) {
  // ensure sorted by score desc
  const sorted = [...data].sort((a, b) => (b.score || 0) - (a.score || 0));

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50 p-4">
      <div className="relative w-full max-w-3xl bg-gradient-to-b from-blue-900 to-blue-800 text-white rounded-2xl shadow-2xl p-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/80 hover:text-white text-2xl"
          aria-label="Close leaderboard"
        >
          ✖
        </button>

        <h2 className="text-3xl font-bold mb-6 text-center uppercase tracking-wider">Leaderboard</h2>

        <div className="space-y-4">
          {sorted.map((player, idx) => {
            const rank = idx + 1;
            const isMe = String(player._id) === String(userId) || player._id === userId;
            // simple star rating from score (example)
            const stars = Math.min(5, Math.max(0, Math.round((player.score || 0) / 800)));
            return (
              <div
                key={player._id || idx}
                className={`flex items-center gap-4 p-3 rounded-lg ${isMe ? "bg-white/10 ring-2 ring-white/10" : "bg-white/5"}`}
              >
                <div className="w-10 text-center font-bold text-lg">
                  {rank <= 3 ? (
                    <span className={rank === 1 ? "text-yellow-400" : rank === 2 ? "text-gray-300" : "text-orange-400"}>
                      {rank}
                    </span>
                  ) : (
                    <span className="text-white/80">{rank}</span>
                  )}
                </div>

                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center overflow-hidden">
                  {/* avatar placeholder */}
                  <img src={player.avatarUrl || "/src/assets/default-profile.png"} alt={player.username} className="w-full h-full object-cover" />
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div className="font-semibold">{player.username || "Player"}</div>
                    <div className="font-bold">{player.score ?? 0}</div>
                  </div>

                  <div className="mt-2 flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, sIdx) => (
                      <svg key={sIdx} viewBox="0 0 20 20" className={`w-4 h-4 ${sIdx < stars ? "text-yellow-400" : "text-white/30"}`} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 1.5l2.6 5.3 5.8.8-4.2 4 1 5.8L10 15.7 4.8 18.6l1-5.8L1.6 8.8l5.8-.8L10 1.5z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}