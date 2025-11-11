import { useState } from "react";
import { FaChevronDown, FaChevronUp, FaStar, FaExpand } from "react-icons/fa";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";
import SpaceBackground from "../components/SpaceBackground";
import solar from "../assets/sunspa.jpeg";

export default function OtherPlanetsPage() {
  // Floating stars
  const stars = Array.from({ length: 50 }, () => ({
    size: `${Math.random() * 3 + 1}px`,
    top: Math.random() * 100,
    left: Math.random() * 100,
    duration: Math.random() * 5 + 2,
  }));

  // Solar System Planets
  const planets = [
    {
      name: "Mercury",
      subtitle: "Swift Messenger",
      description: "The smallest and innermost planet in our solar system, Mercury races around the Sun faster than any other planet.",
      features: [
        "Completes orbit in just 88 days",
        "Surface temperatures range from -173°C to 427°C",
        "Heavily cratered surface similar to our Moon",
        "No moons or rings"
      ],
      img: "https://upload.wikimedia.org/wikipedia/commons/4/4a/Mercury_in_true_color.jpg",
      type: "rocky",
      distance: "57.9 million km",
      diameter: "4,879 km",
      funFact: "A day on Mercury lasts 59 Earth days!"
    },
    {
      name: "Venus",
      subtitle: "Morning Star",
      description: "Often called Earth's sister planet, Venus is shrouded in thick clouds of sulfuric acid and has a runaway greenhouse effect.",
      features: [
        "Hottest planet with surface at 462°C",
        "Rotates backwards compared to other planets",
        "Day longer than its year (243 Earth days)",
        "Atmospheric pressure 92 times Earth's"
      ],
      img: "https://upload.wikimedia.org/wikipedia/commons/e/e5/Venus-real_color.jpg",
      type: "rocky",
      distance: "108.2 million km",
      diameter: "12,104 km",
      funFact: "Venus is the brightest natural object in the night sky after the Moon"
    },
    {
      name: "Earth",
      subtitle: "Blue Marble",
      description: "Our home world, the only planet known to support life, with perfect conditions for liquid water and diverse ecosystems.",
      features: [
        "Only planet with confirmed life",
        "71% surface covered by water",
        "Active tectonic plate system",
        "Protective magnetic field"
      ],
      img: "https://upload.wikimedia.org/wikipedia/commons/9/97/The_Earth_seen_from_Apollo_17.jpg",
      type: "rocky",
      distance: "149.6 million km",
      diameter: "12,742 km",
      funFact: "Earth is the only planet not named after a god"
    },
    {
      name: "Mars",
      subtitle: "Red Planet",
      description: "The fourth planet from the Sun, Mars shows evidence of ancient water flows and may have once hosted microbial life.",
      features: [
        "Home to Olympus Mons, solar system's tallest volcano",
        "Valles Marineris canyon system",
        "Polar ice caps of water and dry ice",
        "Two small moons: Phobos and Deimos"
      ],
      img: "https://upload.wikimedia.org/wikipedia/commons/0/02/OSIRIS_Mars_true_color.jpg",
      type: "rocky",
      distance: "227.9 million km",
      diameter: "6,779 km",
      funFact: "Mars has the largest dust storms in the solar system"
    },
    {
      name: "Jupiter",
      subtitle: "Giant Planet",
      description: "The largest planet in our solar system, a gas giant with a Great Red Spot that has raged for centuries.",
      features: [
        "Mass greater than all other planets combined",
        "Great Red Spot is a massive storm",
        "79 known moons including Ganymede",
        "Faint ring system discovered in 1979"
      ],
      img: "https://upload.wikimedia.org/wikipedia/commons/e/e2/Jupiter.jpg",
      type: "gas-giant",
      distance: "778.5 million km",
      diameter: "139,820 km",
      funFact: "Jupiter's Great Red Spot has been storming for over 400 years"
    },
    {
      name: "Saturn",
      subtitle: "Ringed Wonder",
      description: "Famous for its spectacular ring system, Saturn is a gas giant with complex atmospheric patterns and numerous moons.",
      features: [
        "Most extensive ring system",
        "Rings made of ice and rock particles",
        "83 confirmed moons including Titan",
        "Lowest density of all planets"
      ],
      img: "https://upload.wikimedia.org/wikipedia/commons/c/c7/Saturn_during_Equinox.jpg",
      type: "gas-giant",
      distance: "1.4 billion km",
      diameter: "116,460 km",
      funFact: "Saturn would float if you could find a bathtub big enough"
    },
    {
      name: "Uranus",
      subtitle: "Ice Giant",
      description: "An ice giant that rotates on its side, Uranus has a unique orientation and faint ring system with 27 known moons.",
      features: [
        "Rotates on its side (98° tilt)",
        "Methane gives it blue-green color",
        "13 faint rings discovered in 1977",
        "Extremely cold at -224°C"
      ],
      img: "https://upload.wikimedia.org/wikipedia/commons/3/3d/Uranus2.jpg",
      type: "ice-giant",
      distance: "2.9 billion km",
      diameter: "50,724 km",
      funFact: "Uranus was the first planet discovered with a telescope"
    },
    {
      name: "Neptune",
      subtitle: "Windy World",
      description: "The farthest known planet from the Sun, Neptune has the strongest winds in the solar system and a dynamic atmosphere.",
      features: [
        "Fastest winds at 2,100 km/h",
        "Great Dark Spot storm system",
        "14 known moons including Triton",
        "Takes 165 Earth years to orbit Sun"
      ],
      img: "https://upload.wikimedia.org/wikipedia/commons/5/56/Neptune_Full.jpg",
      type: "ice-giant",
      distance: "4.5 billion km",
      diameter: "49,244 km",
      funFact: "Neptune was discovered through mathematical calculations"
    }
  ];

  // Quiz data
  const quiz = [
    { question: "Which planet is closest to the Sun?", options: ["Mercury", "Venus", "Earth", "Mars"], correct: "Mercury" },
    { question: "Which planet is the hottest?", options: ["Venus", "Mercury", "Earth", "Mars"], correct: "Venus" },
    { question: "Which planet is our home?", options: ["Earth", "Mars", "Venus", "Mercury"], correct: "Earth" },
    { question: "Which planet is called the Red Planet?", options: ["Mars", "Earth", "Venus", "Mercury"], correct: "Mars" },
    { question: "Which planet is the largest?", options: ["Jupiter", "Saturn", "Uranus", "Neptune"], correct: "Jupiter" },
    { question: "Which planet has rings?", options: ["Saturn", "Jupiter", "Uranus", "Neptune"], correct: "Saturn" },
    { question: "Which planet spins on its side?", options: ["Uranus", "Saturn", "Jupiter", "Neptune"], correct: "Uranus" },
    { question: "Which planet is the windiest?", options: ["Neptune", "Uranus", "Saturn", "Jupiter"], correct: "Neptune" },
  ];

  // States
  const [openPlanet, setOpenPlanet] = useState(null);
  const [hoveredPlanet, setHoveredPlanet] = useState(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [qIndex, setQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showBadge, setShowBadge] = useState(false);
  const [showScore, setShowScore] = useState(false);
  const [selected, setSelected] = useState(null);

  const handleAnswer = (ans) => {
    setSelected(ans);
    if (ans === quiz[qIndex].correct) setScore((p) => p + 1);
    setTimeout(() => {
      if (qIndex < quiz.length - 1) {
        setQIndex((p) => p + 1);
        setSelected(null);
      } else {
        if (score + 1 >= 5) setShowBadge(true);
        else setShowScore(true);
        setShowQuiz(false);
      }
    }, 800);
  };

  const getTypeClass = (type) => {
    switch (type) {
      case "rocky": return "bg-orange-500/20 text-orange-400 border-orange-500/30";
      case "gas-giant": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "ice-giant": return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      default: return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  return (
    <div className="relative flex flex-col min-h-screen text-white bg-gray-900 overflow-hidden">
      {/* Floating stars */}
      {stars.map((star, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white opacity-70 animate-pulse"
          style={{
            width: star.size,
            height: star.size,
            top: `${star.top}%`,
            left: `${star.left}%`,
            animationDuration: `${star.duration}s`,
          }}
        />
      ))}

      <div className="relative z-10 flex flex-col min-h-screen">
        <SpaceBackground />
        <Header activePage="planets" />
        <SearchBar data={planets} />

        {/* Hero Section - Clean Layout */}
<section
  className="relative flex flex-col justify-center items-start px-6 md:px-16 py-24 md:py-32 min-h-[90vh] bg-cover bg-center bg-no-repeat"
  style={{ backgroundImage: `url(${solar})` }}
>
  {/* Brighter overlay */}
  <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/30 to-black/60"></div>
  
  <div className="relative z-10 max-w-4xl w-full">
    {/* Main Heading */}
    <h1 className="text-4xl md:text-6xl font-black mb-8 text-white leading-tight">
      PLANETS<br />EXPLORATION
    </h1>


     {/* Content */}
     <div className="mb-8">
      <p className="text-lg md:text-xl text-gray-200 leading-relaxed mb-4">
        Explore the eight diverse worlds of our solar system: <span className="text-cyan-300 font-semibold">Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, and Neptune</span>.
        Plus five recognized dwarf planets: <span className="text-amber-300 font-semibold">Ceres, Pluto, Haumea, Makemake, and Eris</span>, each with unique characteristics.
      </p>
    </div>

    {/* Statistics */}
    <div className="flex gap-12 md:gap-20 mb-8">
      <div className="text-left">
        <div className="text-6xl md:text-8xl font-black text-cyan-400 mb-2 leading-none drop-shadow-lg">8</div>
        <div className="text-xl md:text-2xl text-cyan-300 font-semibold">Major Planets</div>
      </div>
      <div className="text-left">
        <div className="text-6xl md:text-8xl font-black text-amber-400 mb-2 leading-none drop-shadow-lg">5</div>
        <div className="text-xl md:text-2xl text-amber-300 font-semibold">Dwarf Planets</div>
      </div>
    </div>

   
  </div>
</section>

        {/* Planets Grid Section - More Interactive */}
        <section className="py-20 bg-gradient-to-b from-gray-900 to-black px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-black text-center mb-4 text-white">
              Explore The Planets
            </h2>
            <p className="text-center text-gray-400 max-w-2xl mx-auto mb-16 text-lg">
              Click on any planet to discover its secrets and wonders
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {planets.map((planet, index) => (
                <div 
                  key={index}
                  className={`bg-gray-800/40 backdrop-blur-sm rounded-2xl overflow-hidden border-2 transition-all duration-500 cursor-pointer group relative ${
                    openPlanet === index 
                      ? "border-purple-500 shadow-2xl shadow-purple-500/30 scale-105 z-10" 
                      : "border-gray-600 hover:border-purple-400 hover:shadow-xl hover:shadow-purple-500/20 hover:scale-105"
                  }`}
                  onMouseEnter={() => setHoveredPlanet(index)}
                  onMouseLeave={() => setHoveredPlanet(null)}
                  onClick={() => setOpenPlanet(openPlanet === index ? null : index)}
                >
                  {/* Interactive Background Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Planet Header */}
                  <div className="p-5 flex items-center justify-between bg-gray-900/60 border-b border-gray-700 relative z-10">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${
                        planet.type === "rocky" ? "bg-orange-400" :
                        planet.type === "gas-giant" ? "bg-yellow-400" : "bg-blue-400"
                      }`}></div>
                      <div>
                        <h3 className="font-bold text-white text-lg">{planet.name}</h3>
                        <p className="text-gray-400 text-sm">{planet.subtitle}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaStar className="text-yellow-400 text-sm" />
                      <button className="text-purple-400 hover:text-purple-300 transition-colors duration-200 transform hover:scale-110">
                        {openPlanet === index ? <FaChevronUp /> : <FaChevronDown />}
                      </button>
                    </div>
                  </div>

                  {/* Planet Content */}
                  <div className="p-5 relative z-10">
                    {/* Planet Image with Hover Effect */}
                    <div className="flex justify-center mb-4">
                      <div className={`relative transition-all duration-500 ${
                        hoveredPlanet === index ? 'scale-110 rotate-6' : 'scale-100'
                      }`}>
                        <div className="w-24 h-24 rounded-full overflow-hidden bg-transparent border-2 border-gray-600 group-hover:border-purple-400 transition-colors duration-300">
                          <img
                            src={planet.img}
                            alt={planet.name}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                        </div>
                        {/* Orbital Ring Effect */}
                        <div className="absolute inset-0 rounded-full border-2 border-purple-400/30 animate-ping opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-300 text-sm leading-relaxed text-center mb-4">
                      {planet.description}
                    </p>

                    {/* Quick Stats Grid */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="text-center p-3 bg-gray-700/30 rounded-lg border border-gray-600 group-hover:border-gray-500 transition-colors">
                        <div className="text-xs text-gray-400 mb-1">Distance</div>
                        <div className="text-sm text-white font-bold">{planet.distance}</div>
                      </div>
                      <div className="text-center p-3 bg-gray-700/30 rounded-lg border border-gray-600 group-hover:border-gray-500 transition-colors">
                        <div className="text-xs text-gray-400 mb-1">Diameter</div>
                        <div className="text-sm text-white font-bold">{planet.diameter}</div>
                      </div>
                    </div>

                    {/* Fun Fact - Only show on hover */}
                    {hoveredPlanet === index && !openPlanet && (
                      <div className="mb-4 p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                        <div className="text-xs text-purple-300 font-semibold mb-1">Did You Know?</div>
                        <div className="text-xs text-gray-300">{planet.funFact}</div>
                      </div>
                    )}

                    {/* Expanded Content */}
                    {openPlanet === index && (
                      <div className="mt-4 pt-4 border-t border-gray-700 animate-fadeIn">
                        <h4 className="font-semibold text-white mb-3 text-sm flex items-center gap-2">
                          <FaExpand className="text-purple-400" />
                          Key Features
                        </h4>
                        <div className="space-y-3">
                          {planet.features.map((feature, i) => (
                            <div key={i} className="flex items-start text-sm text-gray-300 group/feature">
                              <span className="text-purple-400 mr-2 mt-1 group-hover/feature:scale-110 transition-transform">•</span>
                              <span className="group-hover/feature:text-white transition-colors">{feature}</span>
                            </div>
                          ))}
                        </div>
                        
                        {/* Fun Fact in Expanded View */}
                        <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                          <div className="text-xs text-blue-300 font-semibold mb-1">🌟 Fun Fact</div>
                          <div className="text-xs text-gray-300">{planet.funFact}</div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Quiz Section */}
        <section className="py-20 bg-gradient-to-b from-black to-gray-900">
          <div className="max-w-4xl mx-auto text-center px-4">
            <h2 className="text-4xl md:text-5xl font-black mb-6 text-white">
              Test Your Cosmic Knowledge
            </h2>
            <p className="text-gray-400 text-xl mb-8 max-w-2xl mx-auto">
              Challenge yourself with our solar system quiz and earn your space explorer badge!
            </p>
            <button
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-10 py-3 rounded-2xl font-bold text-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-green-500/40 transform hover:-translate-y-1"
              onClick={() => {
                setShowQuiz(true);
                setQIndex(0);
                setScore(0);
              }}
            >
              🚀 Start Planets Quiz
            </button>
          </div>
        </section>

        {/* Quiz Modal */}
        {showQuiz && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 px-4">
            <div className="bg-gray-800 rounded-2xl p-8 w-full max-w-md relative text-center border border-gray-600 shadow-2xl">
              <button
                className="absolute top-2 right-3 text-gray-400 hover:text-white"
                onClick={() => setShowQuiz(false)}
              >
                ✖
              </button>
              <h2 className="text-2xl font-bold mb-4">🪐 Quiz Time!</h2>
              <p className="text-lg mb-6">{quiz[qIndex].question}</p>
              <div className="grid grid-cols-1 gap-3">
                {quiz[qIndex].options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleAnswer(opt)}
                    className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                      selected === opt
                        ? opt === quiz[qIndex].correct
                          ? "bg-green-500 border-4 border-green-700"
                          : "bg-red-500 border-4 border-red-700"
                        : "bg-blue-500 hover:bg-blue-600"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Badge / Score Modals */}
        {showBadge && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
            <div className="bg-gray-900 text-white p-8 rounded-2xl text-center border border-green-600 shadow-lg max-w-md w-full mx-4">
              <h2 className="text-2xl font-bold mb-4">🎉 Congratulations!</h2>
              <p className="text-lg mb-4">
                You earned a badge for scoring {score}/{quiz.length} correct
                answers!
              </p>
              <button
                className="bg-green-500 hover:bg-green-600 px-6 py-2 rounded"
                onClick={() => setShowBadge(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}

        {showScore && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
            <div className="bg-gray-900 text-white p-8 rounded-2xl text-center border border-blue-600 shadow-lg max-w-md w-full mx-4">
              <h2 className="text-2xl font-bold mb-4">
                Your Score: {score}/{quiz.length}
              </h2>
              <p className="text-lg mb-4">Try again next time to earn a badge!</p>
              <button
                className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded"
                onClick={() => setShowScore(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}

        <Footer />
      </div>
    </div>
  );
}