import { useState } from "react";
import SpaceBackground from "../components/SpaceBackground";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";

const galaxies = [
	{
		name: "Milky Way",
		fact: "Our home galaxy! It looks like a giant spiral and has billions of stars.",
		img: "https://upload.wikimedia.org/wikipedia/commons/6/6a/Milky_Way_Galaxy.jpg",
	},
	{
		name: "Andromeda",
		fact: "The closest big galaxy to us. One day, it will merge with the Milky Way!",
		img: "https://upload.wikimedia.org/wikipedia/commons/9/99/Andromeda_Galaxy_%28with_h-alpha%29.jpg",
	},
	{
		name: "Triangulum",
		fact: "A small spiral galaxy near Andromeda. It has lots of young, bright stars.",
		img: "https://upload.wikimedia.org/wikipedia/commons/7/7d/Triangulum_Galaxy.jpg",
	},
	{
		name: "Sombrero Galaxy",
		fact: "It looks like a hat! This galaxy has a bright center and a dark ring.",
		img: "https://upload.wikimedia.org/wikipedia/commons/6/6d/Sombrero_Galaxy.jpg",
	},
	{
		name: "Whirlpool Galaxy",
		fact: "A beautiful spiral galaxy with swirling arms. It’s famous for its shape.",
		img: "https://upload.wikimedia.org/wikipedia/commons/0/08/Messier51_sRGB.jpg",
	},
];

const quizQuestions = [
	{
		question: "Which galaxy is our home?",
		options: ["Milky Way", "Andromeda", "Triangulum", "Sombrero"],
		correct: "Milky Way",
	},
	{
		question: "Which galaxy is closest to the Milky Way?",
		options: ["Triangulum", "Whirlpool", "Andromeda", "Sombrero"],
		correct: "Andromeda",
	},
	{
		question: "Which galaxy has lots of young, bright stars?",
		options: ["Milky Way", "Triangulum", "Whirlpool", "Sombrero"],
		correct: "Triangulum",
	},
	{
		question: "Which galaxy looks like a hat?",
		options: ["Sombrero", "Whirlpool", "Andromeda", "Milky Way"],
		correct: "Sombrero",
	},
	{
		question: "Which galaxy is famous for its swirling arms?",
		options: ["Whirlpool", "Triangulum", "Sombrero", "Milky Way"],
		correct: "Whirlpool",
	},
	{
		question: "What shape does the Milky Way galaxy have?",
		options: ["Spiral", "Elliptical", "Irregular", "Ring"],
		correct: "Spiral",
	},
	{
		question: "What is the main feature of the Sombrero Galaxy?",
		options: ["Bright center and dark ring", "Swirling arms", "Young stars", "Closest to Milky Way"],
		correct: "Bright center and dark ring",
	},
	{
		question: "Which galaxy will merge with the Milky Way in the future?",
		options: ["Andromeda", "Triangulum", "Whirlpool", "Sombrero"],
		correct: "Andromeda",
	},
	{
		question: "Which galaxy is small and near Andromeda?",
		options: ["Triangulum", "Whirlpool", "Milky Way", "Sombrero"],
		correct: "Triangulum",
	},
	{
		question: "What is the Milky Way made up of?",
		options: ["Billions of stars", "Planets", "Dust", "All of the above"],
		correct: "All of the above",
	},
	{
		question: "Which galaxy is famous for its shape?",
		options: ["Whirlpool", "Sombrero", "Triangulum", "Andromeda"],
		correct: "Whirlpool",
	},
	{
		question: "What type of galaxy is the Milky Way?",
		options: ["Spiral", "Elliptical", "Irregular", "Ring"],
		correct: "Spiral",
	},
	{
		question: "Which galaxy has a bright center?",
		options: ["Sombrero", "Whirlpool", "Milky Way", "Triangulum"],
		correct: "Sombrero",
	},
	{
		question: "Which galaxy is known for its young stars?",
		options: ["Triangulum", "Whirlpool", "Sombrero", "Andromeda"],
		correct: "Triangulum",
	},
	{
		question: "Which galaxy is the closest big galaxy to us?",
		options: ["Andromeda", "Milky Way", "Triangulum", "Whirlpool"],
		correct: "Andromeda",
	},
];

export default function KnownGalaxiesPage() {
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
			<Header activePage="knowngalaxies" />
			<SearchBar data={galaxies} />
			<main className="flex-grow flex flex-col items-center justify-center p-4">
				<h1 className="text-4xl font-bold mb-6 text-purple-300">Known Galaxies</h1>
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-5xl">
					{galaxies.map((galaxy, idx) => (
						<div
							key={idx}
							className="bg-purple-900/80 rounded-xl shadow-lg p-6 flex flex-col items-center hover:scale-105 transition-transform border-2 border-purple-400"
						>
							<img
								src={galaxy.img}
								alt={galaxy.name}
								className="w-32 h-32 object-cover rounded-full mb-4 border-4 border-purple-300"
							/>
							<span className="text-2xl font-bold mb-2">{galaxy.name}</span>
							<span className="text-lg text-purple-200">{galaxy.fact}</span>
						</div>
					))}
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
							<p className="text-lg mb-4">{quizQuestions[currentQuestion].question}</p>
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