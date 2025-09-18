import { useState } from "react";
import SpaceBackground from "../components/SpaceBackground";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";

const planets = [
  {
    name: "Mercury",
    fact: "Mercury is the closest planet to the Sun. It’s very hot during the day and freezing at night!",
    img: "https://upload.wikimedia.org/wikipedia/commons/4/4a/Mercury_in_true_color.jpg",
  },
  {
    name: "Venus",
    fact: "Venus is covered in thick clouds and is the hottest planet in our solar system.",
    img: "https://upload.wikimedia.org/wikipedia/commons/e/e5/Venus-real_color.jpg",
  },
  {
    name: "Earth",
    fact: "Earth is our home planet. It has water, air, and life!",
    img: "https://upload.wikimedia.org/wikipedia/commons/9/97/The_Earth_seen_from_Apollo_17.jpg",
  },
  {
    name: "Mars",
    fact: "Mars is called the Red Planet because of its rusty soil. It has the tallest volcano in the solar system!",
    img: "https://upload.wikimedia.org/wikipedia/commons/0/02/OSIRIS_Mars_true_color.jpg",
  },
  {
    name: "Jupiter",
    fact: "Jupiter is the largest planet. It has a giant storm called the Great Red Spot.",
    img: "https://upload.wikimedia.org/wikipedia/commons/e/e2/Jupiter.jpg",
  },
  {
    name: "Saturn",
    fact: "Saturn is famous for its beautiful rings made of ice and rock.",
    img: "https://upload.wikimedia.org/wikipedia/commons/c/c7/Saturn_during_Equinox.jpg",
  },
  {
    name: "Uranus",
    fact: "Uranus spins on its side and has faint blue rings.",
    img: "https://upload.wikimedia.org/wikipedia/commons/3/3d/Uranus2.jpg",
  },
  {
    name: "Neptune",
    fact: "Neptune is a windy blue planet far from the Sun. It has the strongest winds in the solar system!",
    img: "https://upload.wikimedia.org/wikipedia/commons/5/56/Neptune_Full.jpg",
  },
];

const otherPlanetsQuizQuestions = [
  { question: "Which planet is closest to the Sun?", options: ["Mercury", "Venus", "Earth", "Mars"], correct: "Mercury" },
  { question: "Which planet is the hottest?", options: ["Venus", "Mercury", "Earth", "Mars"], correct: "Venus" },
  { question: "Which planet is our home?", options: ["Earth", "Mars", "Venus", "Mercury"], correct: "Earth" },
  { question: "Which planet is called the Red Planet?", options: ["Mars", "Earth", "Venus", "Mercury"], correct: "Mars" },
  { question: "Which planet is the largest?", options: ["Jupiter", "Saturn", "Uranus", "Neptune"], correct: "Jupiter" },
  { question: "Which planet has rings?", options: ["Saturn", "Jupiter", "Uranus", "Neptune"], correct: "Saturn" },
  { question: "Which planet spins on its side?", options: ["Uranus", "Saturn", "Jupiter", "Neptune"], correct: "Uranus" },
  { question: "Which planet is the windiest?", options: ["Neptune", "Uranus", "Saturn", "Jupiter"], correct: "Neptune" },
  { question: "Which planet has the tallest volcano?", options: ["Mars", "Earth", "Venus", "Mercury"], correct: "Mars" },
  { question: "Which planet has the Great Red Spot?", options: ["Jupiter", "Saturn", "Uranus", "Neptune"], correct: "Jupiter" },
  { question: "Which planet is the smallest?", options: ["Mercury", "Mars", "Venus", "Earth"], correct: "Mercury" },
  { question: "Which planet is the farthest from the Sun?", options: ["Neptune", "Uranus", "Saturn", "Jupiter"], correct: "Neptune" },
  { question: "Which planet has the strongest winds?", options: ["Neptune", "Uranus", "Saturn", "Jupiter"], correct: "Neptune" },
  { question: "Which planet has the faintest rings?", options: ["Uranus", "Saturn", "Jupiter", "Neptune"], correct: "Uranus" },
  { question: "Which planet is the second largest?", options: ["Saturn", "Jupiter", "Uranus", "Neptune"], correct: "Saturn" }
];

export default function OtherPlanetsPage() {
  const [selectedPlanet, setSelectedPlanet] = useState(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showBadge, setShowBadge] = useState(false);
  const [showScore, setShowScore] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);
    if (answer === otherPlanetsQuizQuestions[currentQuestion].correct) {
      setScore(score + 1);
    }
    setTimeout(() => {
      if (currentQuestion < otherPlanetsQuizQuestions.length - 1) {
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
    <div className="min-h-screen flex flex-col text-white relative">
      <SpaceBackground />
      <Header activePage="otherplanets" />
      <SearchBar data={planets} />
      <main className="flex-grow flex flex-col items-center justify-center p-6">
        <h1 className="text-4xl font-bold mb-6 text-yellow-300">Planets</h1>
        <div className="relative w-full h-[500px] flex items-center justify-center">
          {/* Sun */}
          <div className="absolute w-32 h-32 bg-yellow-500 rounded-full flex items-center justify-center shadow-lg">
            <span className="text-4xl">☀️</span>
          </div>

          {/* Planets positioned in a circle around the Sun */}
          {planets.map((planet, idx) => {
            const angle = (idx / planets.length) * 360; // Calculate angle for circular positioning
            const radius = 200; // Distance from the Sun
            const x = radius * Math.cos((angle * Math.PI) / 180); // X-coordinate
            const y = radius * Math.sin((angle * Math.PI) / 180); // Y-coordinate

            return (
              <div
                key={planet.name}
                className="absolute w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:scale-110 transition-transform"
                style={{
                  transform: `translate(${x}px, ${y}px)`,
                }}
                onClick={() => setSelectedPlanet(planet)}
              >
                <img
                  src={planet.img}
                  alt={planet.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
              </div>
            );
          })}
        </div>

        {/* Planet Details Modal */}
        {selectedPlanet && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50">
            <div className="bg-purple-900 p-6 rounded-lg shadow-lg max-w-3xl text-center relative">
              <button
                className="absolute top-2 right-2 text-white text-xl hover:text-red-500"
                onClick={() => setSelectedPlanet(null)}
              >
                ✖
              </button>
              <h2 className="text-3xl font-bold mb-4">{selectedPlanet.name}</h2>
              <p className="text-lg text-purple-200">{selectedPlanet.fact}</p>
            </div>
          </div>
        )}

        {/* Quiz Section */}
        <div className="mt-8 text-center">
          <button
            className="bg-green-500 px-6 py-2 rounded font-bold text-white hover:bg-green-600"
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
              <p className="text-lg mb-4">{otherPlanetsQuizQuestions[currentQuestion].question}</p>
              <div className="grid grid-cols-1 gap-4">
                {otherPlanetsQuizQuestions[currentQuestion].options.map((option, idx) => (
                  <button
                    key={idx}
                    className={`px-4 py-2 rounded ${
                      selectedAnswer === option
                        ? option === otherPlanetsQuizQuestions[currentQuestion].correct
                          ? "bg-green-500 border-4 border-green-700"
                          : "bg-red-500 border-4 border-red-700"
                        : "bg-blue-500 hover:bg-blue-600"
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