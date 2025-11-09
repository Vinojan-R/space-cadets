// src/pages/HomePage.jsx
import { useState, useEffect, useRef } from "react";
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

// Solar system video URL
const SOLAR_SYSTEM_VIDEO = "https://www.solarsystemscope.com/video/sss3_intro_720p_2-5b.mp4";

export default function HomePage() {
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showAccount, setShowAccount] = useState(false);
  const [inactive, setInactive] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const videoRef = useRef(null);

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

  // Navigation function that scrolls to top
  const navigateToTop = (path) => {
    // Scroll to top first
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Then navigate after a small delay
    setTimeout(() => {
      navigate(path);
    }, 100);
  };

  const handleVideoLoad = () => {
    setIsVideoLoaded(true);
    if (videoRef.current) {
      videoRef.current.play().catch(console.error);
    }
  };

  const explorationCards = [
    { 
      label: "Sun", 
      path: "/sun", 
      gradient: "from-yellow-500 to-orange-600",
      bgGradient: "from-yellow-900/40 to-orange-900/40",
      borderColor: "border-yellow-500",
      icon: "☀️"
    },
    { 
      label: "Earth", 
      path: "/earth", 
      gradient: "from-blue-500 to-green-500",
      bgGradient: "from-blue-900/40 to-green-900/40",
      borderColor: "border-blue-400",
      icon: "🌍"
    },
    { 
      label: "Other Planets", 
      path: "/otherplanets", 
      gradient: "from-purple-500 to-pink-600",
      bgGradient: "from-purple-900/40 to-pink-900/40",
      borderColor: "border-purple-500",
      icon: "🪐"
    },
    { 
      label: "Universe", 
      path: "/universe", 
      gradient: "from-indigo-600 to-purple-900",
      bgGradient: "from-indigo-900/40 to-purple-900/40",
      borderColor: "border-indigo-500",
      icon: "🌌"
    },
    { 
      label: "Moon", 
      path: "/moon", 
      gradient: "from-gray-400 to-gray-700",
      bgGradient: "from-gray-800/40 to-gray-900/40",
      borderColor: "border-gray-400",
      icon: "🌙"
    },
    { 
      label: "Star Constellation", 
      path: "/starconstellation", 
      gradient: "from-blue-300 to-indigo-500",
      bgGradient: "from-blue-900/40 to-indigo-900/40",
      borderColor: "border-blue-300",
      icon: "✨"
    },
    { 
      label: "New Technologies", 
      path: "/newtechnologies", 
      gradient: "from-green-400 to-cyan-500",
      bgGradient: "from-green-900/40 to-cyan-900/40",
      borderColor: "border-cyan-400",
      icon: "🚀"
    },
    { 
      label: "Known Galaxies", 
      path: "/knowngalaxies", 
      gradient: "from-violet-500 to-fuchsia-600",
      bgGradient: "from-violet-900/40 to-fuchsia-900/40",
      borderColor: "border-violet-500",
      icon: "🌀"
    },
  ];

  return (
    <div className="flex flex-col min-h-screen text-white relative overflow-x-hidden">
      {/* Space Background for entire page */}
      <SpaceBackground />
      
      {/* Hero Section with Solar System Video */}
      <section className="relative h-screen overflow-hidden">
        {/* Solar System Video Background */}
        <div className="absolute inset-0">
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover"
            muted
            loop
            playsInline
            onLoadedData={handleVideoLoad}
            preload="autoplay"
          >
            <source src={SOLAR_SYSTEM_VIDEO} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        
        {/* Gradient Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/70 to-gray-900/50"></div>
        
        {/* Header with Search Bar */}
        <div className="relative z-20">
          <Header
            onNotificationClick={() => setShowNotifications(true)}
            onAccountClick={() => setShowAccount(true)}
          />
          {/* Search Bar at Top */}
          <div className="container mx-auto px-6 mt-4">
            <SearchBar data={data} />
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 h-full flex items-center pt-16">
          <div className="container mx-auto px-6">
            <div className="max-w-2xl">
              <h1 className="text-2xl md:text-7xl font-bold mb-6 text-white">
                Welcome to our space cadets website 
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-gray-200 leading-relaxed">
                Journey through the cosmos and discover the wonders of our planetary neighborhood. 
                From the fiery Sun to distant planets, experience the beauty of our solar system.
              </p>
            </div>
          </div>
        </div>

        {/* Video Loading Indicator */}
        {!isVideoLoaded && (
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
            <div className="flex items-center space-x-2 text-white/70 bg-black/30 rounded-full px-4 py-2">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              <span className="text-sm">Loading solar system video...</span>
            </div>
          </div>
        )}
      </section>

      {/* Exploration Cards Section */}
      <section className="py-16 px-6 relative">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-transparent bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text">
            Explore the Cosmos
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {explorationCards.map((card, index) => (
              <div
                key={card.path}
                className="relative bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 flex flex-col items-center justify-between h-64 transition-all duration-500 border-2 border-gray-700/50 hover:border-gray-500 overflow-hidden group hover:scale-105 hover:shadow-2xl"
              >
                {/* Animated background gradient */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${card.bgGradient}`}></div>
                
                {/* Card content */}
                <div className="relative z-10 flex flex-col items-center justify-center h-full">
                  <span className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                    {card.icon}
                  </span>
                  <h3 className="text-xl font-bold text-center mb-2 text-white">{card.label}</h3>
                </div>
                
                <button
                  onClick={() => navigateToTop(card.path)}
                  className={`relative z-10 bg-gradient-to-r ${card.gradient} px-6 py-2 rounded-full font-bold text-white hover:shadow-lg transition-all transform hover:scale-105 w-full max-w-xs`}
                >
                  Explore
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Game Console Section */}
      <section className="py-16 px-6 relative">
        <div className="container mx-auto max-w-4xl">
          <div className="relative bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 rounded-2xl shadow-2xl p-8 flex flex-col items-center justify-center border-4 border-blue-500 overflow-hidden group hover:border-cyan-400 transition-all duration-500">
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-cyan-500 rounded-full opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-purple-500 rounded-full opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
            
            <div className="relative z-10 text-center">
              <span className="text-6xl mb-4 block transform group-hover:scale-110 transition-transform duration-300">🎮</span>
              <h2 className="text-3xl font-bold mb-2 text-blue-300 group-hover:text-cyan-300 transition-colors">
                Space Cadets Game Console
              </h2>
              <p className="text-lg mb-6 text-blue-200 group-hover:text-cyan-200 transition-colors text-center max-w-2xl">
                Ready for fun? Play space-themed games and challenge your friends in our interactive gaming hub!
              </p>
              <button
                className="bg-gradient-to-r from-green-500 to-cyan-500 px-8 py-3 rounded-xl font-bold text-black text-xl hover:from-green-600 hover:to-cyan-600 transition-all transform hover:scale-105 shadow-lg hover:shadow-green-500/30 group-hover:shadow-cyan-500/50"
                onClick={() => navigateToTop("/games")}
              >
                Let's Play!
              </button>
            </div>
          </div>
        </div>
      </section>

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