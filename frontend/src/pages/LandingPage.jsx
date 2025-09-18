// src/pages/LandingPage.jsx
import { Rocket, Gamepad2, HelpCircle, User, LogIn, UserPlus } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; // For navigation
import GalaxyBackground from "../components/GalaxyBackground"; // Import the GalaxyBackground component

export default function LandingPage() {
  const navigate = useNavigate(); // Initialize navigate

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-950 text-white font-sans overflow-hidden">
      {/* Galaxy Background */}
      <GalaxyBackground />

      {/* Navbar */}
      <header className="flex justify-between items-center px-8 py-4 backdrop-blur-sm bg-black/30 sticky top-0 z-50 border-b border-white/10">
        <div className="flex items-center gap-2 text-xl font-bold tracking-widest">
          <Rocket className="text-blue-400" /> SpaceCadets
        </div>
        <nav className="flex gap-6">
          <a href="#home" className="hover:text-blue-400">Home</a>
          <a href="#about" className="hover:text-blue-400">About Us</a>
          <a href="#contact" className="hover:text-blue-400">Contact</a>
        </nav>
        <div className="flex gap-4">
          {/* Register Button */}
          <button
            className="flex items-center gap-2 bg-green-500 hover:bg-green-600 px-4 py-2 rounded-xl transition"
            onClick={() => navigate("/register")} // Navigate to Register Page
          >
            <UserPlus size={18} /> Register
          </button>
          {/* Login Button */}
          <button
            className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-xl transition"
            onClick={() => navigate("/login")} // Navigate to Login Page
          >
            <LogIn size={18} /> Login
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 px-8 py-16 space-y-24 max-w-4xl mx-auto">
        {/* Welcome Section */}
        <motion.section
          id="home"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-black/40 p-8 rounded-2xl shadow-lg border border-white/10"
        >
          <h2 className="text-3xl font-bold mb-4">🚀 Welcome to SpaceCadets</h2>
          <p className="text-gray-300 mb-4">
            Embark on an interstellar journey of learning and fun.
          </p>
          <button
            className="bg-blue-500 hover:bg-blue-600 hover:scale-105 transition-transform duration-200 px-5 py-2 rounded-xl"
            onClick={() => navigate("/register")}
          >
            Continue
          </button>
        </motion.section>

        {/* Game Section */}
        <motion.section
          id="game"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-black/40 p-8 rounded-2xl shadow-lg border border-white/10"
        >
          <h2 className="text-3xl font-bold mb-4 flex items-center gap-2">
            <Gamepad2 className="text-purple-400" /> Game
          </h2>
          <p className="text-gray-300 mb-4">
            Play our space-themed games and boost your knowledge.
          </p>
          <button
            className="bg-purple-500 hover:bg-purple-600 hover:scale-105 transition-transform duration-200 px-5 py-2 rounded-xl"
            onClick={() => navigate("/register")}
          >
            Continue
          </button>
        </motion.section>

        {/* Quiz Section */}
        <motion.section
          id="quiz"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-black/40 p-8 rounded-2xl shadow-lg border border-white/10"
        >
          <h2 className="text-3xl font-bold mb-4 flex items-center gap-2">
            <HelpCircle className="text-green-400" /> Quiz
          </h2>
          <p className="text-gray-300 mb-4">
            Test your skills with cosmic quizzes.
          </p>
          <button
            className="bg-green-500 hover:bg-green-600 hover:scale-105 transition-transform duration-200 px-5 py-2 rounded-xl"
            onClick={() => navigate("/register")}
          >
            Continue
          </button>
        </motion.section>

        {/* Why Us Section */}
        <motion.section
          id="why"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-black/40 p-8 rounded-2xl shadow-lg border border-white/10"
        >
          <h2 className="text-3xl font-bold mb-4">🌌 Why SpaceCadets?</h2>
          <p className="text-gray-300 mb-4">
            Because learning should be adventurous and limitless — like the universe!
          </p>
          <button
            className="bg-indigo-500 hover:bg-indigo-600 hover:scale-105 transition-transform duration-200 px-5 py-2 rounded-xl"
            onClick={() => navigate("/register")}
          >
            Continue
          </button>
        </motion.section>
      </main>

      {/* Astronaut Image */}
      <motion.img
        src="https://i.ibb.co/9VjHZRw/astronaut.png"
        alt="Astronaut"
        className="absolute bottom-0 right-10 w-64 opacity-80 pointer-events-none"
        animate={{ y: [0, -20, 0] }}
        transition={{ repeat: Infinity, duration: 4 }}
      />
    </div>
  );
}
