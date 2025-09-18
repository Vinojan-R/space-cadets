import SpaceBackground from "../components/SpaceBackground";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useState } from "react";
import SearchBar from "../components/SearchBar";

const moonFacts = [
	{
		name: "What is the Moon?",
		description:
			"The Moon is Earth's only natural satellite. It orbits our planet and shines at night!",
	},
	{
		name: "Who was the first person on the Moon?",
		description: "Neil Armstrong was the first person to walk on the Moon in 1969.",
	},
	{
		name: "Why does the Moon change shape?",
		description:
			"The Moon looks different each night because of its phases: new moon, crescent, half, and full moon.",
	},
	{
		name: "How far is the Moon from Earth?",
		description: "The Moon is about 384,400 km (238,855 miles) away from Earth.",
	},
	{
		name: "What are moon craters?",
		description:
			"Craters are holes on the Moon's surface made by space rocks hitting it.",
	},
	{
		name: "Why does the Moon shine?",
		description: "The Moon shines because it reflects light from the Sun.",
	},
];

const quizQuestions = [
	{
		question: "What is the Moon?",
		options: ["A planet", "A star", "A satellite", "A galaxy"],
		correct: "A satellite",
	},
	{
		question: "Who was the first person to walk on the Moon?",
		options: [
			"Buzz Aldrin",
			"Neil Armstrong",
			"Yuri Gagarin",
			"John Glenn",
		],
		correct: "Neil Armstrong",
	},
	{
		question: "Why does the Moon change shape?",
		options: [
			"It rotates",
			"It reflects sunlight",
			"Its phases",
			"It moves closer",
		],
		correct: "Its phases",
	},
	{
		question: "How far is the Moon from Earth?",
		options: ["384,400 km", "500,000 km", "100,000 km", "1 million km"],
		correct: "384,400 km",
	},
	{
		question: "What are moon craters?",
		options: ["Volcanoes", "Holes made by space rocks", "Mountains", "Lakes"],
		correct: "Holes made by space rocks",
	},
	{
		question: "Why does the Moon shine?",
		options: [
			"It emits light",
			"It reflects sunlight",
			"It absorbs light",
			"It glows",
		],
		correct: "It reflects sunlight",
	},
	{
		question: "What is the Moon's surface made of?",
		options: ["Water", "Rock and dust", "Gas", "Metal"],
		correct: "Rock and dust",
	},
	{
		question: "What is the Moon's gravity compared to Earth?",
		options: ["Same", "Higher", "Lower", "None"],
		correct: "Lower",
	},
	{
		question: "What is the Moon's nickname?",
		options: ["Blue Moon", "Silver Moon", "Earth's Satellite", "Night Light"],
		correct: "Earth's Satellite",
	},
	{
		question: "What causes tides on Earth?",
		options: ["The Sun", "The Moon", "Earth's rotation", "Wind"],
		correct: "The Moon",
	},
	{
		question: "What is the Moon's diameter?",
		options: ["3,474 km", "5,000 km", "1,000 km", "10,000 km"],
		correct: "3,474 km",
	},
	{
		question: "What is the Moon's temperature during the day?",
		options: ["100°C", "200°C", "127°C", "50°C"],
		correct: "127°C",
	},
	{
		question: "What is the Moon's temperature at night?",
		options: ["-100°C", "-200°C", "-173°C", "-50°C"],
		correct: "-173°C",
	},
	{
		question: "How long does it take for the Moon to orbit Earth?",
		options: ["27.3 days", "30 days", "15 days", "10 days"],
		correct: "27.3 days",
	},
	{
		question: "What is the Moon's core made of?",
		options: ["Iron", "Rock", "Gas", "Water"],
		correct: "Iron",
	},
];

export default function MoonPage() {
	const [showQuiz, setShowQuiz] = useState(false);
	const [score, setScore] = useState(0);
	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [showBadge, setShowBadge] = useState(false);
	const [showScore, setShowScore] = useState(false);
	const [selectedAnswer, setSelectedAnswer] = useState(null);

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
				if (score >= 12) {
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
			<Header activePage="moon" />
			<SearchBar data={moonFacts} />
			<main className="flex-grow flex flex-col items-center justify-center p-4">
				<h1 className="text-4xl font-bold mb-4 text-yellow-300">
					Welcome to the Moon!
				</h1>
				<img
					src="https://upload.wikimedia.org/wikipedia/commons/e/e1/FullMoon2010.jpg"
					alt="Moon"
					className="w-40 h-40 rounded-full shadow-lg mb-6 border-4 border-yellow-400"
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