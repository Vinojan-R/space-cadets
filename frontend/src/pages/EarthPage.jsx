import { useState } from "react";
import SpaceBackground from "../components/SpaceBackground";
import Header from "../components/Header";
import Footer from "../components/Footer";

const facts = [
  {
    question: "🌍 What is Earth?",
    answer: "Earth is our home planet. It is the third planet from the Sun and the only one known to have life!"
  },
  {
    question: "🌏 How big is Earth?",
    answer: "Earth's diameter is about 12,742 km. That's really big—almost 8,000 miles!"
  },
  {
    question: "🌱 Why is Earth special?",
    answer: "Earth has water, air, and land. It has plants, animals, and people. No other planet is just like Earth!"
  },
  {
    question: "🌡️ What is Earth's weather like?",
    answer: "Earth has all kinds of weather: sunny, rainy, snowy, and windy. It even has storms and rainbows!"
  },
  {
    question: "🌎 What are continents?",
    answer: "Earth has 7 continents: Africa, Antarctica, Asia, Australia, Europe, North America, and South America."
  },
  {
    question: "🌊 What are oceans?",
    answer: "Earth has 5 oceans: Pacific, Atlantic, Indian, Southern, and Arctic. Oceans are huge and full of life!"
  },
  {
    question: "🌋 What is inside Earth?",
    answer: "Earth has layers: crust, mantle, outer core, and inner core. The core is super hot!"
  }
];

const quizQuestions = [
  { question: "How many continents are there on Earth?", options: ["5", "6", "7", "8"], correct: "7" },
  { question: "What is Earth's diameter?", options: ["12,742 km", "10,000 km", "15,000 km", "8,000 km"], correct: "12,742 km" },
  { question: "Which layer of Earth is the hottest?", options: ["Crust", "Mantle", "Outer Core", "Inner Core"], correct: "Inner Core" },
  { question: "How many oceans does Earth have?", options: ["3", "4", "5", "6"], correct: "5" },
  { question: "Which continent is the largest?", options: ["Asia", "Africa", "Europe", "Australia"], correct: "Asia" },
  { question: "What is Earth's weather like?", options: ["Sunny", "Rainy", "Snowy", "All of the above"], correct: "All of the above" },
  { question: "What makes Earth special?", options: ["Water", "Air", "Life", "All of the above"], correct: "All of the above" },
  { question: "What is Earth's position from the Sun?", options: ["1st", "2nd", "3rd", "4th"], correct: "3rd" },
  { question: "Which ocean is the largest?", options: ["Atlantic", "Indian", "Pacific", "Arctic"], correct: "Pacific" },
  { question: "What is Earth's shape?", options: ["Flat", "Round", "Oval", "Sphere"], correct: "Sphere" },
  { question: "Which continent is the smallest?", options: ["Australia", "Europe", "Antarctica", "South America"], correct: "Australia" },
  { question: "What is Earth's core made of?", options: ["Rock", "Metal", "Gas", "Liquid"], correct: "Metal" },
  { question: "Which continent is the coldest?", options: ["Asia", "Antarctica", "Europe", "North America"], correct: "Antarctica" },
  { question: "Which ocean is the coldest?", options: ["Atlantic", "Indian", "Arctic", "Pacific"], correct: "Arctic" },
  { question: "What is Earth's nickname?", options: ["Blue Planet", "Green Planet", "Red Planet", "Yellow Planet"], correct: "Blue Planet" }
];

export default function EarthPage() {
  const [selected, setSelected] = useState(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showBadge, setShowBadge] = useState(false);

  const handleAnswer = (answer) => {
    if (answer === quizQuestions[currentQuestion].correct) {
      setScore(score + 1);
    }
    if (currentQuestion < quizQuestions.length - 1) {
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
        <h1 className="text-4xl font-bold mb-4 text-green-300">Welcome to Planet Earth!</h1>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/9/97/The_Earth_seen_from_Apollo_17.jpg"
          alt="Earth"
          className="w-40 h-40 rounded-full shadow-lg mb-6 border-4 border-blue-400"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-3xl">
          {facts.map((fact, idx) => (
            <button
              key={idx}
              className={`bg-green-900/80 rounded-xl shadow-lg p-6 flex flex-col items-center justify-center hover:bg-green-700 transition-colors border-2 border-green-400 ${
                selected === idx ? "ring-4 ring-green-300" : ""
              }`}
              onClick={() => setSelected(selected === idx ? null : idx)}
            >
              <span className="text-xl font-bold mb-2">{fact.question}</span>
              {selected === idx && (
                <span className="text-lg mt-2 text-green-200">{fact.answer}</span>
              )}
            </button>
          ))}
        </div>
        <div className="mt-8 text-center">
          <h2 className="text-2xl font-bold text-blue-300 mb-2">🌱 Fun Activity!</h2>
          <p className="text-lg mb-4">Can you name all the continents and oceans on Earth?</p>
          <button
            className="bg-blue-500 px-6 py-2 rounded font-bold text-white hover:bg-blue-600"
            onClick={() => alert("Great job! Keep exploring Earth!")}
          >
            I Did It!
          </button>
        </div>
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
            <div className="bg-gray-800 text-white rounded-xl p-6 w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">Quiz Time!</h2>
              <p className="text-lg mb-4">{quizQuestions[currentQuestion].question}</p>
              <div className="grid grid-cols-1 gap-4">
                {quizQuestions[currentQuestion].options.map((option, idx) => (
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