// src/pages/HomePage.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import NotificationModal from "../components/NotificationModal";
import AccountModal from "../components/AccountModal";
import SearchBar from "../components/SearchBar";
import SpaceBackground from "../components/SpaceBackground"; 


const data = [
  { name: "Sun", img: "/src/assets/logo.png", description: "Explore the Sun" },
  { name: "Earth", img: "/src/assets/logo.png", description: "Explore the Earth" },
  { name: "Moon", img: "/src/assets/logo.png", description: "Explore the Moon" },
  { name: "Other Planets", img: "/src/assets/logo.png", description: "Explore Other Planets" },
  { name: "Universe", img: "/src/assets/logo.png", description: "Explore the Universe" },
];

export default function HomePage() {
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showAccount, setShowAccount] = useState(false);
  const [inactive, setInactive] = useState(false);

  // Check last visit time and show notifications if inactive for 5 days
  useEffect(() => {
    const lastVisit = localStorage.getItem("lastVisit");
    const now = Date.now();
    localStorage.setItem("lastVisit", now);

    if (lastVisit) {
      const FIVE_DAYS = 5 * 24 * 60 * 60 * 1000;
      if (now - lastVisit > FIVE_DAYS) {
        setInactive(true);
        setShowNotifications(true);
      }
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen  text-white relative">
      <SpaceBackground />
      <Header
        onNotificationClick={() => setShowNotifications(true)}
        onAccountClick={() => setShowAccount(true)}
      />
      <SearchBar data={data} />

      <main className="flex-grow flex flex-wrap justify-center items-center gap-6 p-6">
        {[
          { label: "☀️ Sun", path: "/sun" },
          { label: "🌍 Earth", path: "/earth" },
          { label: "🪐 Other Planets", path: "/otherplanets" },
          { label: "🌌 Universe", path: "/universe" },
          { label: "🌙 Moon", path: "/moon" },
          { label: "✨ Star Constellation", path: "/starconstellation" },
          { label: "🚀 New Technologies", path: "/newtechnologies" },
          { label: "🌀 Known Galaxies", path: "/knowngalaxies" },
        ].map(({ label, path }) => (
          <div
            key={path}
            className="bg-gray-800/80 rounded-xl shadow-lg p-6 flex flex-col items-center w-48 h-40 justify-between hover:scale-105 transition-transform"
          >
            <span className="text-3xl mb-2">{label}</span>
            <button
              onClick={() => navigate(path)}
              className="bg-blue-500 px-4 py-2 rounded font-bold text-white hover:bg-blue-600"
            >
              Explore
            </button>
          </div>
        ))}

        {/* Game Console Card */}
        <div className="w-full max-w-2xl mt-10 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 rounded-2xl shadow-2xl p-8 flex flex-col items-center justify-center border-4 border-blue-500">
          <span className="text-5xl mb-4">🎮</span>
          <h2 className="text-3xl font-bold mb-2 text-blue-300">Space Cadets Game Console</h2>
          <p className="text-lg mb-6 text-blue-200 text-center">
            Ready for fun? Play space-themed games and challenge your friends!
          </p>
          <button
            className="bg-green-500 px-8 py-3 rounded-xl font-bold text-white text-xl hover:bg-green-600 transition-colors"
            onClick={() => navigate("/games")}
          >
            Let's Play!
          </button>
        </div>
      </main>

      <Footer />

      {/* Notifications Modal */}
      {showNotifications && (
        <NotificationModal onClose={() => setShowNotifications(false)} inactive={inactive} />
      )}

      {/* Account Modal */}
      {showAccount && <AccountModal onClose={() => setShowAccount(false)} />}
    </div>
  );
}
