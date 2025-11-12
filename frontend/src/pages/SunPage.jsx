// src/pages/SunPage.jsx
import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";
import SpaceBackground from "../components/SpaceBackground"; 
import SunHero from "../assets/sun.jpg";
import yellow from "../assets/yellow.png";
import greensun from "../assets/greensun.png";
import smilingsun from "../assets/smilingsun.png";
import rotatesun from "../assets/rotatesun.mp4";
import sunheat from "../assets/sunheat.png";

const sunFacts = [
  {
    name: "Sun",
    description:
      "The Sun is the star at the center of our solar system. It provides light and heat necessary for life on Earth. It makes up 99.8% of the solar system's mass!",
  },
  {
    name: "Solar Energy",
    description:
      "The Sun's energy powers life on Earth, drives weather patterns, and supports photosynthesis in plants.",
  },
];

const sunQuizQuestions = [
  { question: "What is the Sun?", options: ["A planet", "A star", "A galaxy", "A moon"], correct: "A star" },
  { question: "What does the Sun provide?", options: ["Light and heat", "Water", "Air", "Gravity"], correct: "Light and heat" },
  { question: "What is the Sun made of?", options: ["Hydrogen and helium", "Oxygen and nitrogen", "Carbon and iron", "Water and air"], correct: "Hydrogen and helium" },
  { question: "What is the process happening in the Sun?", options: ["Nuclear fusion", "Combustion", "Evaporation", "Condensation"], correct: "Nuclear fusion" },
  { question: "What is the Sun's position in the solar system?", options: ["Center", "Edge", "Above Earth", "Below Earth"], correct: "Center" },
  { question: "How long does it take for sunlight to reach Earth?", options: ["8 minutes", "1 hour", "24 hours", "1 second"], correct: "8 minutes" },
  { question: "What is the Sun's surface temperature?", options: ["5,500°C", "1,000°C", "10,000°C", "100°C"], correct: "5,500°C" },
  { question: "What is the Sun's core temperature?", options: ["15 million°C", "1 million°C", "100,000°C", "10,000°C"], correct: "15 million°C" },
  { question: "What is the Sun's diameter?", options: ["1.39 million km", "100,000 km", "500,000 km", "10 million km"], correct: "1.39 million km" },
  { question: "What is the Sun's age?", options: ["4.6 billion years", "1 billion years", "10 billion years", "100 million years"], correct: "4.6 billion years" },
  { question: "What is the Sun's primary source of energy?", options: ["Nuclear fusion", "Combustion", "Solar wind", "Magnetism"], correct: "Nuclear fusion" },
  { question: "What is the Sun's outermost layer called?", options: ["Corona", "Photosphere", "Chromosphere", "Core"], correct: "Corona" },
  { question: "What are sunspots?", options: ["Cooler areas on the Sun", "Hotter areas on the Sun", "Storms on the Sun", "Magnetic fields"], correct: "Cooler areas on the Sun" },
  { question: "What is a solar flare?", options: ["A burst of energy from the Sun", "A sunspot", "A solar eclipse", "A magnetic storm"], correct: "A burst of energy from the Sun" },
  { question: "What is the Sun's gravitational pull responsible for?", options: ["Keeping planets in orbit", "Creating tides", "Causing eclipses", "All of the above"], correct: "Keeping planets in orbit" },
];

export default function SunPage() {
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showBadge, setShowBadge] = useState(false);
  const [showScore, setShowScore] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [tab, setTab] = useState("overview");
  const [stars, setStars] = useState([]);

  // Generate floating stars
  useEffect(() => {
    const starArray = Array.from({ length: 60 }).map(() => ({
      top: Math.random() * 100,
      left: Math.random() * 100,
      size: Math.random() * 2 + 1,
      duration: Math.random() * 10 + 5,
    }));
    setStars(starArray);
  }, []);

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);
    if (answer === sunQuizQuestions[currentQuestion].correct) {
      setScore((prev) => prev + 1);
    }
    setTimeout(() => {
      if (currentQuestion < sunQuizQuestions.length - 1) {
        setCurrentQuestion((prev) => prev + 1);
        setSelectedAnswer(null);
      } else {
        if (score + 1 >= 6) setShowBadge(true);
        else setShowScore(true);
        setShowQuiz(false);
      }
    }, 1000);
  };

  return (
    <div className="relative flex flex-col min-h-screen text-white overflow-hidden">
      {/* Floating Stars */}
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

      {/* Overlay for content */}
      <div className="relative z-10 bg-black/40 min-h-screen flex flex-col">
        <SpaceBackground />
        <Header activePage="sun" />
        <SearchBar data={sunFacts} />

        <main className="flex-grow flex flex-col items-center px-6 relative z-10">
          {/* 🌞 Hero Section with Background Image + Blend */}
          <section className="relative w-full">
            <div
              className="relative flex flex-col md:flex-row items-center justify-center gap-12 w-full max-w-6xl py-20 mx-auto
                bg-cover bg-center bg-no-repeat bg-blend-overlay bg-black/50"
              style={{ backgroundImage: `url(${SunHero})`}}
            >
              
              {/* Gradient fade to blend bottom into page */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black"></div>

              <div className="relative z-10 flex-1 text-center md:text-left px-6">
                <h1 className="text-5xl md:text-6xl font-extrabold text-yellow-400 mb-4 drop-shadow-lg">
                  ☀️ The Sun
                </h1>
                <p className="text-lg md:text-xl text-gray-200 drop-shadow">
                  The Sun is the star at the heart of our solar system. Its gravity holds the solar system together, keeping everything from the biggest planets to the smallest bits of debris in its orbit.
                </p>
              </div>
            </div>
          </section>

          {/* --- Info Section */}
          <section className="relative z-10 py-16 w-full max-w-6xl mx-auto px-6">
            {/* Header icons */}
            <div className="flex flex-wrap justify-center gap-8 mb-10 text-sm text-gray-300">
              <div className="flex items-center gap-3 max-w-[180px]">
                <span className="text-yellow-400 text-2xl">☀️</span>
                <p>The center of our system</p>
              </div>

              <div className="flex items-center gap-3 max-w-[180px]">
                <span className="text-yellow-400 text-2xl">🌌</span>
                <p>An important part of the cosmos</p>
              </div>

              <div className="flex items-center gap-3 max-w-[180px]">
                <span className="text-yellow-400 text-2xl">🔭</span>
                <p>Constantly being studied</p>
              </div>

              <div className="flex items-center gap-3 max-w-[180px]">
                <span className="text-yellow-400 text-2xl">🌦️</span>
                <p>Affects the weather</p>
              </div>
            </div>

            {/* Main content + stats side by side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20 items-center">
              {/* LEFT COLUMN - Main description with scroll */}
              <div className="text-gray-200 space-y-4 overflow-y-auto h-40 pr-4 rounded-lg scrollbar-thin scrollbar-thumb-blue-200 scrollbar-track-yellow-800">
                <h2 className="text-3xl font-bold text-yellow-400 tracking-widest uppercase top-0 bg-black/70 py-1">
                  THE MAIN
                </h2>
                <p>
                The Sun's gravity holds the solar system together, keeping everything from the biggest planets to the smallest particles of debris in its orbit. The connection and interactions between the Sun and Earth drive the seasons, ocean currents, weather, climate, radiation belts and auroras. Though it is special to us, there are billions of stars like our Sun scattered across the Milky Way galaxy.
                The Sun has many names in many cultures. The Latin word for Sun is “sol,” which is the main adjective for all things Sun-related:solar.
                The Sun has inspired us since ancient times. 
                </p>

                <p>It’s central to mythology and religion in cultures around the world, including the ancient Egyptians, the Aztecs of Mexico, Native American tribes of North and South America, the Chinese, and many others.
                Countless musicians have written songs about the Sun. The Beatles had a hit in 1969 with “Here Comes the Sun”.</p>
              
                <p>Other popular songs that reference the Sun include: "Walkin" on the Sun” by Smashmouth; “Ain’t No Sunshine” by Bill Withers; “Walking on Sunshine” by Katrina and the Waves; “Pocketful of Sunshine” by Natasha Bedingfield; and “Let the Sunshine In” by the Fifth Dimension.
                If you're Superman or a fellow Kryptonian of comic book fame, your powers are heightened by the yellow glow of our Sun. There are several science fiction films featuring the Sun in the storyline.
                </p>
              </div>

              {/* RIGHT COLUMN - Stats */}
              <div className="grid grid-cols-2 gap-8 text-center md:text-right">
                <div>
                  <h3 className="text-5xl font-bold text-yellow-400">4.6</h3>
                  <p className="text-gray-400 text-sm uppercase">Billion Years Old</p>
                </div>
                <div>
                  <h3 className="text-5xl font-bold text-yellow-400">250</h3>
                  <p className="text-gray-400 text-sm uppercase">Million Years (Revolution)</p>
                </div>
                <div>
                  <h3 className="text-5xl font-bold text-yellow-400">110×</h3>
                  <p className="text-gray-400 text-sm uppercase">Larger Than Earth</p>
                </div>
                <div>
                  <h3 className="text-5xl font-bold text-yellow-400">15</h3>
                  <p className="text-gray-400 text-sm uppercase">Million °C Core Temp</p>
                </div>
              </div>
            </div>

            {/* Important events */}
            <div>
              <h2 className="text-4xl font-bold text-yellow-400 mb-2">Sun Galleries</h2>
              <p className="text-gray-400 mb-10">
              Stay up-to-date with the latest content about the Sun from photojournal...
              </p>

              {/* Image cards grid */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white/10 rounded-xl overflow-hidden hover:scale-105 transition">
                  <img
                    src={yellow}
                    alt="NASA prepares Orion capsules"
                    className="w-full h-40 object-cover"
                  />
                </div>
                <div className="bg-white/10 rounded-xl overflow-hidden hover:scale-105 transition">
                  <img
                    src={greensun}
                    alt="Solar Orbiter"
                    className="w-full h-40 object-cover"
                  /> 
                </div>
                <div className="bg-white/10 rounded-xl overflow-hidden hover:scale-105 transition">
                  <img
                    src={smilingsun}
                    alt="Smiling Sun"
                    className="w-full h-40 object-cover"
                  />
                </div>
                <div className="bg-white/10 rounded-xl overflow-hidden hover:scale-105 transition">
                  <img
                    src={sunheat}
                    alt="Scientists research"
                    className="w-full h-40 object-cover"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* --- Relative to the Earth Section (Video Left, Text Right) --- */}
          <section className="relative z-10 py-20 w-full max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            
            {/* LEFT SIDE - Video & Data */}
            <div className="relative flex justify-center items-center order-1 md:order-1">
              {/* Background glow */}
              <div className="absolute w-110 h-110 bg-yellow-500/20 blur-3xl rounded-full"></div>

              {/* Video Player with solid background */}
              <div className="relative z-10 w-full max-w-md rounded-2xl overflow-hidden shadow-2xl bg-black border-2 border-yellow-500/30">
                <video 
                  autoPlay 
                  loop 
                  muted 
                  playsInline
                  className="w-full h-64 object-cover"
                >
                  <source src={rotatesun} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>

            {/* RIGHT SIDE - Text Content */}
            <div className="text-gray-200 space-y-5 order-2 md:order-2">
              <h2 className="text-3xl font-bold text-yellow-400 tracking-widest uppercase">
                Relative to the Earth
              </h2>
              <p className="text-lg leading-relaxed">
                According to the spectral classification, the Sun belongs to the 
                <span className="text-yellow-400 font-semibold"> G2V type (yellow dwarf)</span>.
              </p>
              <p className="text-lg leading-relaxed">
                The average density of the Sun is 
                <span className="text-yellow-400 font-semibold"> 1.4 g/cm³</span>, which is about 1.4 times that of water.
              </p>
              <p className="text-lg leading-relaxed">
                The effective surface temperature of the Sun is approximately 
                <span className="text-yellow-400 font-semibold"> 5780 Kelvin</span>, radiating immense energy that sustains life on Earth.
              </p>

              {/* Small icons info */}
              <div className="grid grid-cols-2 gap-4 pt-6 text-sm text-gray-300">
                <div className="flex items-start gap-3 p-3 rounded-xl bg-white/5 hover:bg-orange-400/10 transition-all duration-300 border border-white/10">
                  <span className="text-yellow-400 text-2xl">🌘</span>
                  <div>
                    <h3 className="text-yellow-400 font-semibold">Eclipses</h3>
                    <p className="leading-tight text-xs">Visible from Earth</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-white/5 hover:bg-orange-400/10 transition-all duration-300 border border-white/10">
                  <span className="text-yellow-400 text-2xl">🌐</span>
                  <div>
                    <h3 className="text-yellow-400 font-semibold">Solar System</h3>
                    <p className="leading-tight text-xs">Part of cosmic web</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-white/5 hover:bg-orange-400/10 transition-all duration-300 border border-white/10">
                  <span className="text-yellow-400 text-2xl">🛰️</span>
                  <div>
                    <h3 className="text-yellow-400 font-semibold">Satellites</h3>
                    <p className="leading-tight text-xs">Orbit and study the Sun</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-white/5 hover:bg-orange-400/10 transition-all duration-300 border border-white/10">
                  <span className="text-yellow-400 text-2xl">⚡</span>
                  <div>
                    <h3 className="text-yellow-400 font-semibold">Energy Source</h3>
                    <p className="leading-tight text-xs">Powers life and industry</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Quiz Section */}
          <div className="mt-12 text-center mb-16">
            <button
              className="bg-yellow-500 px-8 py-3 rounded-lg font-bold text-black hover:bg-yellow-600 transition-all duration-300 text-lg shadow-lg hover:shadow-xl"
              onClick={() => {
                setShowQuiz(true);
                setCurrentQuestion(0);
                setScore(0);
              }}
            >
              🎯 Start Sun Quiz
            </button>
          </div>

          {/* Quiz Modal */}
          {showQuiz && (
            <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
              <div className="bg-gray-900 text-white rounded-xl p-6 w-full max-w-md relative border border-yellow-500/30">
                <button
                  className="absolute top-3 right-3 text-gray-400 hover:text-white text-xl"
                  onClick={() => setShowQuiz(false)}
                >
                  ✖
                </button>
                <h2 className="text-2xl font-bold mb-4 text-yellow-400">Quiz Time!</h2>
                <p className="text-lg mb-6 bg-white/10 p-4 rounded-lg">{sunQuizQuestions[currentQuestion].question}</p>
                <div className="grid grid-cols-1 gap-3">
                  {sunQuizQuestions[currentQuestion].options.map((option, idx) => (
                    <button
                      key={idx}
                      className={`px-4 py-3 rounded-lg font-semibold transition-all duration-300 ${
                        selectedAnswer === option
                          ? option === sunQuizQuestions[currentQuestion].correct
                            ? "bg-green-600 border-2 border-green-400 text-white"
                            : "bg-red-600 border-2 border-red-400 text-white"
                          : "bg-yellow-500 hover:bg-yellow-600 text-black border-2 border-yellow-600"
                      }`}
                      onClick={() => handleAnswer(option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Badge and Score Modals */}
          {showBadge && (
            <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
              <div className="bg-gray-900 text-white rounded-xl p-8 w-full max-w-md text-center border border-yellow-500/30">
                <h2 className="text-2xl font-bold mb-4 text-yellow-400">🎉 Congratulations!</h2>
                <p className="text-lg mb-6">
                  You earned a badge for scoring {score}/{sunQuizQuestions.length} correct answers!
                </p>
                <button
                  className="bg-green-500 px-6 py-2 rounded font-bold text-white hover:bg-green-600 transition-all duration-300"
                  onClick={() => setShowBadge(false)}
                >
                  Close
                </button>
              </div>
            </div>
          )}

          {showScore && (
            <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
              <div className="bg-gray-900 text-white rounded-xl p-8 w-full max-w-md text-center border border-yellow-500/30">
                <h2 className="text-2xl font-bold mb-4">Your Score: {score}/{sunQuizQuestions.length}</h2>
                <p className="text-lg mb-6">Try again next time to earn the badge!</p>
                <button
                  className="bg-blue-500 px-6 py-2 rounded font-bold text-white hover:bg-blue-600 transition-all duration-300"
                  onClick={() => setShowScore(false)}
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </main>

        <Footer />
      </div>
    </div>
  );
}