import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SpaceBackground from "../components/SpaceBackground";

const universeQuizQuestions = [
  { question: "What is space?", options: ["A planet", "A star", "An infinite expanse", "A galaxy"], correct: "An infinite expanse" },
  { question: "What keeps planets in orbit?", options: ["Gravity", "Light", "Heat", "Wind"], correct: "Gravity" },
  { question: "What is the force that attracts objects toward each other?", options: ["Magnetism", "Gravity", "Electricity", "Friction"], correct: "Gravity" },
  { question: "What tool is used to observe distant stars?", options: ["Satellite", "Telescope", "Rocket", "Space Suit"], correct: "Telescope" },
  { question: "Which mission landed humans on the Moon?", options: ["Apollo 11", "Voyager", "Hubble", "Perseverance"], correct: "Apollo 11" },
  { question: "What is the largest type of celestial object in space?", options: ["Planet", "Star", "Galaxy", "Asteroid"], correct: "Galaxy" },
  { question: "What is the name of the force that keeps planets in orbit?", options: ["Gravity", "Magnetism", "Electricity", "Friction"], correct: "Gravity" },
  { question: "What is the name of the first mission to explore outer planets?", options: ["Voyager", "Apollo", "Hubble", "Perseverance"], correct: "Voyager" },
  { question: "What is the name of the galaxy we live in?", options: ["Andromeda", "Milky Way", "Triangulum", "Sombrero"], correct: "Milky Way" },
  { question: "What is the name of the telescope that looks deep into space?", options: ["Hubble", "Voyager", "Apollo", "Perseverance"], correct: "Hubble" },
  { question: "What is the shape of the Milky Way galaxy?", options: ["Spiral", "Oval", "Sphere", "Flat"], correct: "Spiral" },
  { question: "What is the name of the galaxy closest to the Milky Way?", options: ["Andromeda", "Triangulum", "Sombrero", "Whirlpool"], correct: "Andromeda" },
  { question: "What is the name of the galaxy famous for its swirling arms?", options: ["Whirlpool", "Sombrero", "Triangulum", "Milky Way"], correct: "Whirlpool" },
  { question: "What is the name of the galaxy that looks like a hat?", options: ["Sombrero", "Whirlpool", "Triangulum", "Milky Way"], correct: "Sombrero" },
  { question: "What is the name of the galaxy with lots of young, bright stars?", options: ["Triangulum", "Andromeda", "Sombrero", "Whirlpool"], correct: "Triangulum" }
];

export default function UniversePage() {
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showBadge, setShowBadge] = useState(false);

  const handleAnswer = (answer) => {
    if (answer === universeQuizQuestions[currentQuestion].correct) {
      setScore(score + 1);
    }
    if (currentQuestion < universeQuizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      if (score + 1 >= 12) {
        setShowBadge(true);
      }
      setShowQuiz(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col text-white relative">
      <SpaceBackground />
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center p-4">
        <h1 className="text-4xl font-bold mb-4 text-blue-300">Explore the Universe!</h1>
        <p className="text-lg mb-6 text-center">
          The universe is vast and mysterious, filled with galaxies, stars, planets, and more. Let's dive into the wonders of space!
        </p>
        <div className="mt-8 text-center">
          <button
            className="bg-blue-500 px-6 py-2 rounded font-bold text-white hover:bg-blue-600"
            onClick={() => setShowQuiz(true)}
          >
            Start Quiz
          </button>
        </div>
        {showQuiz && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <div className="bg-gray-800 text-white rounded-xl p-6 w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">Quiz Time!</h2>
              <p className="text-lg mb-4">{universeQuizQuestions[currentQuestion].question}</p>
              <div className="grid grid-cols-1 gap-4">
                {universeQuizQuestions[currentQuestion].options.map((option, idx) => (
                  <button
                    key={idx}
                    className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600"
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
              <p className="text-lg mb-4">You earned a badge for scoring more than 12 correct answers!</p>
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
      </main>
      <Footer />
    </div>
  );
}