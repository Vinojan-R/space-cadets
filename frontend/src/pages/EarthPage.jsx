import { useState } from "react";
import SpaceBackground from "../components/SpaceBackground";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar"; // Import SearchBar component

const facts = [
	{
		question: "🌍 What is Earth?",
		answer:
			"Earth is our home planet. It is the third planet from the Sun and the only one known to have life!",
	},
	{
		question: "🌏 How big is Earth?",
		answer:
			"Earth's diameter is about 12,742 km. That's really big—almost 8,000 miles!",
	},
	{
		question: "🌱 Why is Earth special?",
		answer:
			"Earth has water, air, and land. It has plants, animals, and people. No other planet is just like Earth!",
	},
	{
		question: "🌡️ What is Earth's weather like?",
		answer:
			"Earth has all kinds of weather: sunny, rainy, snowy, and windy. It even has storms and rainbows!",
	},
	{
		question: "🌎 What are continents?",
		answer:
			"Earth has 7 continents: Africa, Antarctica, Asia, Australia, Europe, North America, and South America.",
	},
	{
		question: "🌊 What are oceans?",
		answer:
			"Earth has 5 oceans: Pacific, Atlantic, Indian, Southern, and Arctic. Oceans are huge and full of life!",
	},
	{
		question: "🌋 What is inside Earth?",
		answer: "Earth has layers: crust, mantle, outer core, and inner core. The core is super hot!",
	},
];

const quizQuestions = [
	{
		question: "How many continents are there on Earth?",
		options: ["5", "6", "7", "8"],
		correct: "7",
	},
	{
		question: "What is Earth's diameter?",
		options: ["12,742 km", "10,000 km", "15,000 km", "8,000 km"],
		correct: "12,742 km",
	},
	{
		question: "Which layer of Earth is the hottest?",
		options: ["Crust", "Mantle", "Outer Core", "Inner Core"],
		correct: "Inner Core",
	},
	{
		question: "How many oceans does Earth have?",
		options: ["3", "4", "5", "6"],
		correct: "5",
	},
	{
		question: "Which continent is the largest?",
		options: ["Asia", "Africa", "Europe", "Australia"],
		correct: "Asia",
	},
	{
		question: "What is Earth's weather like?",
		options: ["Sunny", "Rainy", "Snowy", "All of the above"],
		correct: "All of the above",
	},
	{
		question: "What makes Earth special?",
		options: ["Water", "Air", "Life", "All of the above"],
		correct: "All of the above",
	},
	{
		question: "What is Earth's position from the Sun?",
		options: ["1st", "2nd", "3rd", "4th"],
		correct: "3rd",
	},
	{
		question: "Which ocean is the largest?",
		options: ["Atlantic", "Indian", "Pacific", "Arctic"],
		correct: "Pacific",
	},
	{
		question: "What is Earth's shape?",
		options: ["Flat", "Round", "Oval", "Sphere"],
		correct: "Sphere",
	},
	{
		question: "Which continent is the smallest?",
		options: ["Australia", "Europe", "Antarctica", "South America"],
		correct: "Australia",
	},
	{
		question: "What is Earth's core made of?",
		options: ["Rock", "Metal", "Gas", "Liquid"],
		correct: "Metal",
	},
	{
		question: "Which continent is the coldest?",
		options: ["Asia", "Antarctica", "Europe", "North America"],
		correct: "Antarctica",
	},
	{
		question: "Which ocean is the coldest?",
		options: ["Atlantic", "Indian", "Arctic", "Pacific"],
		correct: "Arctic",
	},
	{
		question: "What is Earth's nickname?",
		options: ["Blue Planet", "Green Planet", "Red Planet", "Yellow Planet"],
		correct: "Blue Planet",
	},
];

export default function EarthPage() {
	const [selectedAnswer, setSelectedAnswer] = useState(null);
	const [showQuiz, setShowQuiz] = useState(false);
	const [score, setScore] = useState(0);
	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [showBadge, setShowBadge] = useState(false);
	const [showScore, setShowScore] = useState(false);

	const handleAnswer = (answer) => {
		setSelectedAnswer(answer);
		if (answer === quizQuestions[currentQuestion].correct) {
			setScore(score + 1);
		}
		setTimeout(() => {
			if (currentQuestion < quizQuestions.length - 1) {
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
			<Header />
			<SearchBar data={facts} />
			<main className="flex-grow flex flex-col items-center justify-center p-4">
				<h1 className="text-4xl font-bold mb-4 text-green-300">
					Welcome to Planet Earth!
				</h1>
				<img
					src="https://upload.wikimedia.org/wikipedia/commons/9/97/The_Earth_seen_from_Apollo_17.jpg"
					alt="Earth"
					className="w-40 h-40 rounded-full shadow-lg mb-6 border-4 border-blue-400"
				/>
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
							<p className="text-lg mb-4">
								{quizQuestions[currentQuestion].question}
							</p>
							<div className="grid grid-cols-1 gap-4">
								{quizQuestions[currentQuestion].options.map((option, idx) => (
									<button
										key={idx}
										className={`px-4 py-2 rounded ${
											selectedAnswer === option
												? option === quizQuestions[currentQuestion].correct
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
							<h2 className="text-xl font-bold mb-4">
								Your Score: {score}/15
							</h2>
							<p className="text-lg mb-4">
								Try again next time to earn the badge!
							</p>
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