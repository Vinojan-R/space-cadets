import { useState } from "react";

const questions = [
	{
		question: "What is the largest planet in our solar system?",
		options: ["Earth", "Mars", "Jupiter", "Saturn"],
		answer: "Jupiter",
	},
	{
		question: "What is the closest star to Earth?",
		options: ["Alpha Centauri", "Proxima Centauri", "The Sun", "Sirius"],
		answer: "The Sun",
	},
	{
		question: "How many planets are in our solar system?",
		options: ["7", "8", "9", "10"],
		answer: "8",
	},
	{
		question: "What galaxy do we live in?",
		options: ["Andromeda", "Milky Way", "Whirlpool", "Sombrero"],
		answer: "Milky Way",
	},
	{
		question: "Which planet is known as the Red Planet?",
		options: ["Venus", "Mars", "Mercury", "Jupiter"],
		answer: "Mars",
	},
];

export default function AstroQuiz() {
	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [score, setScore] = useState(0);
	const [showResult, setShowResult] = useState(false);

	const handleAnswer = (option) => {
		if (option === questions[currentQuestion].answer) {
			setScore((prevScore) => prevScore + 1);
		}

		if (currentQuestion < questions.length - 1) {
			setCurrentQuestion((prevQuestion) => prevQuestion + 1);
		} else {
			setShowResult(true);
		}
	};

	const restartQuiz = () => {
		setCurrentQuestion(0);
		setScore(0);
		setShowResult(false);
	};

	return (
		<div className="text-center">
			<h2 className="text-2xl font-bold mb-4">🧑‍🚀 Astro Quiz</h2>
			<p className="mb-6">Test your space knowledge with this fun quiz!</p>

			{showResult ? (
				<div>
					<h3 className="text-xl font-bold mb-4">
						Your Score: {score}/{questions.length}
					</h3>
					<p className="mb-4">
						{score === questions.length
							? "🌟 Amazing! You're a space genius!"
							: score > questions.length / 2
							? "🚀 Great job! Keep exploring the stars!"
							: "🌌 Keep learning! The universe is full of wonders!"}
					</p>
					<button
						className="bg-blue-500 px-6 py-2 rounded font-bold text-white hover:bg-blue-600"
						onClick={restartQuiz}
					>
						Play Again
					</button>
				</div>
			) : (
				<div>
					<h3 className="text-lg font-bold mb-4">
						Question {currentQuestion + 1}/{questions.length}
					</h3>
					<p className="mb-6">{questions[currentQuestion].question}</p>
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
						{questions[currentQuestion].options.map((option, idx) => (
							<button
								key={idx}
								className="bg-purple-500 px-4 py-2 rounded font-bold text-white hover:bg-purple-600"
								onClick={() => handleAnswer(option)}
							>
								{option}
							</button>
						))}
					</div>
				</div>
			)}
		</div>
	);
}