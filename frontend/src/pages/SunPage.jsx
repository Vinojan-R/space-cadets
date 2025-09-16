// src/pages/SunPage.jsx
import Header from "../components/Header";
import Footer from "../components/Footer";

const sunQuizQuestions = [
  { question: "What is the Sun?", options: ["A planet", "A star", "A galaxy", "A moon"], correct: "A star" },
  { question: "What does the Sun provide?", options: ["Light and heat", "Water", "Air", "Gravity"], correct: "Light and heat" },
  { question: "What is the Sun made of?", options: ["Hydrogen and helium", "Oxygen and nitrogen", "Carbon and iron", "Water and air"], correct: "Hydrogen and helium" },
  { question: "What is the process happening in the Sun?", options: ["Nuclear fusion", "Combustion", "Evaporation", "Condensation"], correct: "Nuclear fusion" },
  { question: "What is the Sun's position in the solar system?", options: ["Center", "Edge", "Above Earth", "Below Earth"], correct: "Center" },
  { question: "What is the Sun's diameter?", options: ["1.39 million km", "10,000 km", "100,000 km", "1 million km"], correct: "1.39 million km" },
  { question: "What is the Sun's surface temperature?", options: ["5,500°C", "1,000°C", "10,000°C", "100°C"], correct: "5,500°C" },
  { question: "What is the Sun's core temperature?", options: ["15 million°C", "1 million°C", "10,000°C", "100°C"], correct: "15 million°C" },
  { question: "What is the Sun's age?", options: ["4.6 billion years", "1 billion years", "10 billion years", "100 million years"], correct: "4.6 billion years" },
  { question: "What is the Sun's energy source?", options: ["Nuclear fusion", "Combustion", "Evaporation", "Condensation"], correct: "Nuclear fusion" },
  { question: "What is the Sun's gravitational pull?", options: ["Strong", "Weak", "None", "Medium"], correct: "Strong" },
  { question: "What is the Sun's light travel time to Earth?", options: ["8 minutes", "1 minute", "10 minutes", "100 minutes"], correct: "8 minutes" },
  { question: "What is the Sun's mass?", options: ["99.8% of the solar system", "50% of the solar system", "10% of the solar system", "1% of the solar system"], correct: "99.8% of the solar system" },
  { question: "What is the Sun's magnetic field?", options: ["Strong", "Weak", "None", "Medium"], correct: "Strong" },
  { question: "What is the Sun's rotation period?", options: ["25 days", "10 days", "50 days", "100 days"], correct: "25 days" }
];

export default function SunPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-yellow-200 to-orange-500">
      <Header />
      <main className="flex-grow flex flex-col justify-center items-center text-black">
        <h1 className="text-4xl font-bold mb-4">🌞 The Sun</h1>
        <p className="text-lg max-w-xl text-center">
          The Sun is the star at the center of our solar system. It provides the
          light and heat necessary for life on Earth. It is a massive ball of
          hot plasma, mostly hydrogen and helium, undergoing nuclear fusion.
        </p>
      </main>
      <Footer />
    </div>
  );
}
