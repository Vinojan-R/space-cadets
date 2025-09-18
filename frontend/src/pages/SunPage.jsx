// src/pages/SunPage.jsx
import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";

const sunFacts = [
  { name: "Sun", description: "The Sun is the star at the center of our solar system. It provides light and heat necessary for life on Earth." },
  { name: "Solar Energy", description: "The Sun's energy powers life on Earth and drives weather patterns." },
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

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);
    if (answer === sunQuizQuestions[currentQuestion].correct) {
      setScore(score + 1);
    }
    setTimeout(() => {
      if (currentQuestion < sunQuizQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
      } else {
        if (score + 1 >= 12) {
          setShowBadge(true);
        } else {
          setShowScore(true);
        }
        setShowQuiz(false);
      }
    }, 1000); // Delay to show feedback
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-yellow-200 to-orange-500">
      <Header activePage="sun" />
      <SearchBar data={sunFacts} />
      <main className="flex-grow flex flex-col justify-center items-center text-black">
        <h1 className="text-4xl font-bold mb-4">🌞 The Sun</h1>
        <p className="text-lg max-w-xl text-center">
          The Sun is the star at the center of our solar system. It provides the
          light and heat necessary for life on Earth. It is a massive ball of
          hot plasma, mostly hydrogen and helium, undergoing nuclear fusion.
        </p>
        <div className="mt-8 text-center">
          <button
            className="bg-yellow-500 px-6 py-2 rounded font-bold text-white hover:bg-yellow-600"
            onClick={() => setShowQuiz(true)}
          >
            Start Quiz
          </button>
        </div>
        {showQuiz && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <div className="bg-gray-800 text-white rounded-xl p-6 w-full max-w-md relative">
              <button
                className="absolute top-2 right-2 text-gray-400 hover:text-white"
                onClick={() => setShowQuiz(false)}
              >
                ✖
              </button>
              <h2 className="text-xl font-bold mb-4">Quiz Time!</h2>
              <p className="text-lg mb-4">{sunQuizQuestions[currentQuestion].question}</p>
              <div className="grid grid-cols-1 gap-4">
                {sunQuizQuestions[currentQuestion].options.map((option, idx) => (
                  <button
                    key={idx}
                    className={`px-4 py-2 rounded ${
                      selectedAnswer === option
                        ? option === sunQuizQuestions[currentQuestion].correct
                          ? "bg-green-500 border-4 border-green-700"
                          : "bg-red-500 border-4 border-red-700"
                        : "bg-yellow-500 hover:bg-yellow-600"
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
        {showBadge && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <div className="bg-gray-800 text-white rounded-xl p-6 w-full max-w-md text-center">
              <h2 className="text-xl font-bold mb-4">🎉 Congratulations!</h2>
              <p className="text-lg mb-4">You earned a badge for scoring {score}/15 correct answers!</p>
              <img
                src="/src/assets/logo.png"
                alt="Badge"
                className="w-32 h-32 object-cover rounded-full mx-auto mb-4"
              />
              <button
                className="bg-green-500 px-6 py-2 rounded font-bold text-white hover:bg-green-600"
                onClick={() => setShowBadge(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}
        {showScore && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <div className="bg-gray-800 text-white rounded-xl p-6 w-full max-w-md text-center">
              <h2 className="text-xl font-bold mb-4">Your Score: {score}/15</h2>
              <p className="text-lg mb-4">Try again next time to earn the badge!</p>
              <button
                className="bg-blue-500 px-6 py-2 rounded font-bold text-white hover:bg-blue-600"
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
  );
}
