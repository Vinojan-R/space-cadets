import { useState } from "react";
import SpaceBackground from "../components/SpaceBackground";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Stars from "../components/stars";
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
  { question: "What is the smallest constellation?", options: ["Crux", "Leo", "Scorpio", "Pisces"], correct: "Crux" },
];

export default function StarConstellationPage() {
  const [selectedIndex, setSelectedIndex] = useState(null);
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

  const handleNext = () => {
    setSelectedIndex((prevIndex) => (prevIndex + 1) % constellations.length);
  };

  const handlePrevious = () => {
    setSelectedIndex((prevIndex) =>
      prevIndex === 0 ? constellations.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="min-h-screen flex flex-col text-white relative">
      <SpaceBackground />
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center">
        <>
          <section className="w-full py-12 bg-gradient-to-br from-indigo-500/20 to-pink-500/20">
            <div className="max-w-5xl mx-auto px-4">
              <h1 className="text-4xl md:text-6xl font-bold mb-8 text-center">The Star Constellation</h1>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                {/* Left card (mobile first) */}
                <div className="flex justify-center md:justify-end">
                  <div className="w-full max-w-md">
                    <div className="inline-block px-4 py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-white text-base sm:text-lg text-center">
                      Explore the Cosmos Within You
                    </div>

                    <div className="mt-4 backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-4 sm:p-6 w-full text-center text-white shadow-lg">
                      <p className="text-sm sm:text-base leading-relaxed">
                        Welcome to The Star Constellation! Since ancient times, humanity has looked to the night sky, finding meaning and wonder in the patterns of stars. These celestial maps, or zodiac signs, are said to influence personality, creativity, and destiny. Dive in and discover the unique blend of characteristics shaped by your personal constellation.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Center image */}
                <div className="flex items-center justify-center bg-green/200 ">
                  <img
                    src="/src/assets/ring.jpg"
                    alt="Star Constellation"
                    className="rounded-full w-auto h-64 md:w-full md:h-auto lg:w-[420px] lg:h-[420px] rounded-full object-contain transition-transform duration-500 animate-slow-spin hover:scale-105"
                  />
                </div>

                {/* Right card */}
                <div className="flex justify-center md:justify-start">
                  <div className="w-full max-w-md">
                    <div className="inline-block px-4 py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-white text-base sm:text-lg text-center">
                      A Fun Forecast
                    </div>

                    <div className="mt-4 backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-4 sm:p-6 w-full text-center text-white shadow-lg">
                      <p className="text-sm sm:text-base leading-relaxed">
                        We believe in the power of positive motivation and good vibes! The insights you'll find here are designed specifically for creative minds and free spirits. Take them as playful nudges and inspiration to spark your next great idea. It’s all about fun and lifting your mood—let the stars guide your imagination!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Stars />
          </section>
        </>
        {/* Quiz Button */}
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
              <p className="text-lg mb-4">{starConstellationQuizQuestions[currentQuestion].question}</p>
              <div className="grid grid-cols-1 gap-4">
                {starConstellationQuizQuestions[currentQuestion].options.map((option, idx) => (
                  <button
                    key={idx}
                    className={`px-4 py-2 rounded ${
                      selectedAnswer === option
                        ? option === starConstellationQuizQuestions[currentQuestion].correct
                          ? "bg-green-500 border-4 border-green-700"
                          : "bg-red-500 border-4 border-red-700"
                        : "bg-indigo-500 hover:bg-indigo-600"
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