import { useState } from "react";
import SpaceBackground from "../components/SpaceBackground";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";

const constellations = [
  {
    name: "Aries",
    fact: "Aries is a constellation representing a ram. It is visible in the night sky from April to May.",
    img: "/src/assets/aries.png",
  },
  {
    name: "Pisces",
    fact: "Pisces represents two fish swimming in opposite directions. It is visible from February to March.",
    img: "/src/assets/pisces.png",
  },
  {
    name: "Leo",
    fact: "Leo is a constellation representing a lion. It is visible in the night sky from July to August.",
    img: "/src/assets/leo.png",
  },
  {
    name: "Scorpio",
    fact: "Scorpio represents a scorpion and is visible in the night sky from October to November.",
    img: "/src/assets/scorpio.png",
  },
  {
    name: "Capricorn",
    fact: "Capricorn represents a sea goat and is visible in the night sky from December to January.",
    img: "/src/assets/capricon.png",
  },
  {
    name: "Aquarius",
    fact: "Aquarius represents the water bearer and is visible in the night sky from January to February.",
    img: "/src/assets/aquaris.png",
  },
  {
    name: "Cancer",
    fact: "Cancer represents a crab and is visible in the night sky from June to July.",
    img: "/src/assets/cancer.png",
  },
  {
    name: "Gemini",
    fact: "Gemini represents twins and is visible in the night sky from May to June.",
    img: "/src/assets/gemini.png",
  },
  {
    name: "Libra",
    fact: "Libra represents scales and is visible in the night sky from September to October.",
    img: "/src/assets/libra.png",
  },
  {
    name: "Sagittarius",
    fact: "Sagittarius represents an archer and is visible in the night sky from November to December.",
    img: "/src/assets/sagittarius.png",
  },
  {
    name: "Taurus",
    fact: "Taurus represents a bull and is visible in the night sky from April to May.",
    img: "/src/assets/taurus.png",
  },
  {
    name: "Virgo",
    fact: "Virgo represents a maiden and is visible in the night sky from August to September.",
    img: "/src/assets/virgo.png",
  },
];

const starConstellationQuizQuestions = [
  { question: "What does Aries represent?", options: ["A ram", "A lion", "A fish", "A scorpion"], correct: "A ram" },
  { question: "What does Pisces represent?", options: ["Two fish", "A lion", "A ram", "A scorpion"], correct: "Two fish" },
  { question: "What does Leo represent?", options: ["A lion", "A ram", "A fish", "A scorpion"], correct: "A lion" },
  { question: "What does Scorpio represent?", options: ["A scorpion", "A lion", "A ram", "A fish"], correct: "A scorpion" },
  { question: "What does Capricorn represent?", options: ["A sea goat", "A lion", "A ram", "A fish"], correct: "A sea goat" },
  { question: "What does Aquarius represent?", options: ["The water bearer", "A lion", "A ram", "A fish"], correct: "The water bearer" },
  { question: "What does Cancer represent?", options: ["A crab", "A lion", "A ram", "A fish"], correct: "A crab" },
  { question: "What does Gemini represent?", options: ["Twins", "A lion", "A ram", "A fish"], correct: "Twins" },
  { question: "What does Libra represent?", options: ["Scales", "A lion", "A ram", "A fish"], correct: "Scales" },
  { question: "What does Sagittarius represent?", options: ["An archer", "A lion", "A ram", "A fish"], correct: "An archer" },
  { question: "What does Taurus represent?", options: ["A bull", "A lion", "A ram", "A fish"], correct: "A bull" },
  { question: "What does Virgo represent?", options: ["A maiden", "A lion", "A ram", "A fish"], correct: "A maiden" },
  { question: "What is the brightest constellation?", options: ["Orion", "Leo", "Scorpio", "Pisces"], correct: "Orion" },
  { question: "What is the largest constellation?", options: ["Hydra", "Leo", "Scorpio", "Pisces"], correct: "Hydra" },
  { question: "What is the smallest constellation?", options: ["Crux", "Leo", "Scorpio", "Pisces"], correct: "Crux" }
];

export default function StarConstellationPage() {
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showBadge, setShowBadge] = useState(false);
  const [showScore, setShowScore] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);
    if (answer === starConstellationQuizQuestions[currentQuestion].correct) {
      setScore(score + 1);
    }
    setTimeout(() => {
      if (currentQuestion < starConstellationQuizQuestions.length - 1) {
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
      <Header activePage="starconstellation" />
      <SearchBar data={constellations} />
      <main className="flex-grow flex flex-col items-center justify-center p-4">
        <h1 className="text-4xl font-bold mb-6 text-indigo-300 text-center">
          ✨ Star Constellations!
        </h1>
        <div className="mt-8 text-center">
          <button
            className="bg-indigo-500 px-6 py-2 rounded font-bold text-white hover:bg-indigo-600"
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
              <p className="text-lg mb-4">
                {starConstellationQuizQuestions[currentQuestion].question}
              </p>
              <div className="grid grid-cols-1 gap-4">
                {starConstellationQuizQuestions[currentQuestion].options.map(
                  (option, idx) => (
                    <button
                      key={idx}
                      className={`px-4 py-2 rounded ${
                        selectedAnswer === option
                          ? option ===
                            starConstellationQuizQuestions[currentQuestion]
                              .correct
                            ? "bg-green-500 border-4 border-green-700"
                            : "bg-red-500 border-4 border-red-700"
                          : "bg-indigo-500 hover:bg-indigo-600"
                      }`}
                      onClick={() => handleAnswer(option)}
                    >
                      {option}
                    </button>
                  )
                )}
              </div>
            </div>
          </div>
        )}
        {showBadge && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <div className="bg-gray-800 text-white rounded-xl p-6 w-full max-w-md text-center">
              <h2 className="text-xl font-bold mb-4">🎉 Congratulations!</h2>
              <p className="text-lg mb-4">
                You earned a badge for scoring {score}/15 correct answers!
              </p>
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
              <p className="text-lg mb-4">
                Try again next time to earn the badge!
              </p>
              <button
                className="bg-indigo-500 px-6 py-2 rounded font-bold text-white hover:bg-indigo-600"
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