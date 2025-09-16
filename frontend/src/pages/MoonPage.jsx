import SpaceBackground from "../components/SpaceBackground";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useState } from "react";
import SearchBar from "../components/SearchBar"; // Import SearchBar component

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
];

export default function MoonPage() {
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
			<Header activePage="moon" />
			<SearchBar data={moonFacts} /> {/* Added SearchBar */}
			<main className="flex-grow flex flex-col items-center justify-center p-4">
				<h1 className="text-4xl font-bold mb-4 text-yellow-300">
					Welcome to the Moon!
				</h1>
				<img
					src="https://upload.wikimedia.org/wikipedia/commons/e/e1/FullMoon2010.jpg"
					alt="Moon"
					className="w-40 h-40 rounded-full shadow-lg mb-6 border-4 border-yellow-400"
				/>
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-3xl">
					{moonFacts.map((fact, idx) => (
						<button
							key={idx}
							className={`bg-yellow-900/80 rounded-xl shadow-lg p-6 flex flex-col items-center justify-center hover:bg-yellow-700 transition-colors border-2 border-yellow-400 ${
								selected === idx ? "ring-4 ring-yellow-300" : ""
							}`}
							onClick={() => setSelected(selected === idx ? null : idx)}
						>
							<span className="text-xl font-bold mb-2">{fact.name}</span>
							{selected === idx && (
								<span className="text-lg mt-2 text-yellow-200">
									{fact.description}
								</span>
							)}
						</button>
					))}
				</div>
				<div className="mt-8 text-center">
					<h2 className="text-2xl font-bold text-blue-300 mb-2">
						🌕 Fun Challenge!
					</h2>
					<p className="text-lg mb-4">
						Can you spot the Moon in the sky tonight?
					</p>
					<button
						className="bg-blue-500 px-6 py-2 rounded font-bold text-white hover:bg-blue-600"
						onClick={() => alert("Awesome! Keep looking up!")}
					>
						I Saw The Moon!
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
							<p className="text-lg mb-4">
								You earned a badge for scoring more than 12 correct answers!
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
			</main>
			<Footer />
		</div>
	);
}