import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SpaceBackground from "../components/SpaceBackground";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";

const facts = [
	{ question: "🌍 What is Earth?", answer: "Earth is our home planet. It is the third planet from the Sun and the only one known to have life!" },
	{ question: "🌏 How big is Earth?", answer: "Earth's diameter is about 12,742 km. That's really big—almost 8,000 miles!" },
	{ question: "🌱 Why is Earth special?", answer: "Earth has water, air, and land. It has plants, animals, and people. No other planet is just like Earth!" },
	{ question: "🌡️ What is Earth's weather like?", answer: "Earth has all kinds of weather: sunny, rainy, snowy, and windy. It even has storms and rainbows!" },
	{ question: "🌎 What are continents?", answer: "Earth has 7 continents: Africa, Antarctica, Asia, Australia, Europe, North America, and South America." },
	{ question: "🌊 What are oceans?", answer: "Earth has 5 oceans: Pacific, Atlantic, Indian, Southern, and Arctic. Oceans are huge and full of life!" },
	{ question: "🌋 What is inside Earth?", answer: "Earth has layers: crust, mantle, outer core, and inner core. The core is super hot!" },
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
	{ question: "What is Earth's nickname?", options: ["Blue Planet", "Green Planet", "Red Planet", "Yellow Planet"], correct: "Blue Planet" },
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
		}, 800);
	};

	const closeQuiz = () => {
		setShowQuiz(false);
		setCurrentQuestion(0);
		setScore(0);
		setSelectedAnswer(null);
	};

	return (
		<div className="min-h-screen flex flex-col text-white relative overflow-hidden">
			<SpaceBackground />
			<Header />
			<SearchBar data={facts} />

			{/* 🌍 Main Content */}
			<main className="flex-grow flex flex-col items-center justify-center p-6 text-center space-y-10">
				{/* Hero Section with Earth image on right and text on left */}
				<section className="w-full max-w-6xl flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
					{/* Text on left */}
					<div className="flex-1 text-left space-y-6">
						<h1 className="text-6xl font-extrabold mb-6 bg-gradient-to-r from-green-300 via-blue-400 to-purple-500 bg-clip-text text-transparent drop-shadow-lg animate-pulse">
							🌍 Welcome to Planet Earth!
						</h1>
						
						<div className="max-w-3xl bg-gradient-to-br from-blue-900/50 to-green-900/50 rounded-2xl p-8 shadow-2xl border border-cyan-400/30">
							<p className="text-xl text-gray-200 leading-relaxed">
								Earth is our amazing home in space! It's the <span className="text-green-400 font-bold">third planet</span> from the Sun and the only one known to have life.
								It gives us everything we need  <span className="text-yellow-300 font-bold">air, water, food</span> and a warm place to live! 🌞
							</p>
						</div>
						
						{/* Colorful quick facts */}
						<div className="grid grid-cols-2 gap-4 mt-6">
							<div className="bg-gradient-to-r from-purple-600 to-pink-600 p-4 rounded-xl shadow-lg transform hover:scale-105 transition duration-300">
								<p className="font-bold">🌡️ Perfect Temperature</p>
							</div>
							<div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-4 rounded-xl shadow-lg transform hover:scale-105 transition duration-300">
								<p className="font-bold">💧 71% Water</p>
							</div>
							<div className="bg-gradient-to-r from-green-600 to-emerald-600 p-4 rounded-xl shadow-lg transform hover:scale-105 transition duration-300">
								<p className="font-bold">🌱 Full of Life</p>
							</div>
							<div className="bg-gradient-to-r from-orange-600 to-red-600 p-4 rounded-xl shadow-lg transform hover:scale-105 transition duration-300">
								<p className="font-bold">🌋 Active Geology</p>
							</div>
						</div>
					</div>
					
					{/* Earth image on right - Modified */}
					<div className="flex-1 flex justify-center items-end mt-16">
						<div className="relative">
							<img
								src="https://upload.wikimedia.org/wikipedia/commons/9/97/The_Earth_seen_from_Apollo_17.jpg"
								alt="Earth"
								className="w-96 h-96 rounded-full shadow-2xl mb-6 animate-spin-slow transition-all duration-1000 hover:scale-110"
							/>
							<div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-green-500 rounded-full blur-2xl opacity-20 animate-pulse"></div>
						</div>
					</div>
				</section>

				{/* 🌱 Why Earth is Special */}
				<section className="max-w-6xl w-full">
					<h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">🌱 Why is Earth Special?</h2>
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
						<div className="bg-gradient-to-br from-green-600/50 to-emerald-700/50 p-6 rounded-2xl shadow-lg border border-green-400/30 transform hover:scale-105 transition duration-300">
							<p className="text-lg font-semibold">💧 It has water to drink and oceans full of life.</p>
						</div>
						<div className="bg-gradient-to-br from-blue-600/50 to-cyan-700/50 p-6 rounded-2xl shadow-lg border border-blue-400/30 transform hover:scale-105 transition duration-300">
							<p className="text-lg font-semibold">🌬️ It has air for us to breathe.</p>
						</div>
						<div className="bg-gradient-to-br from-yellow-600/50 to-orange-600/50 p-6 rounded-2xl shadow-lg border border-yellow-400/30 transform hover:scale-105 transition duration-300">
							<p className="text-lg font-semibold">🌞 It gets just the right amount of sunlight.</p>
						</div>
						<div className="bg-gradient-to-br from-purple-600/50 to-pink-600/50 p-6 rounded-2xl shadow-lg border border-purple-400/30 transform hover:scale-105 transition duration-300">
							<p className="text-lg font-semibold">🌿 It grows plants, trees, and flowers everywhere.</p>
						</div>
						<div className="bg-gradient-to-br from-pink-600/50 to-red-600/50 p-6 rounded-2xl shadow-lg border border-pink-400/30 transform hover:scale-105 transition duration-300">
							<p className="text-lg font-semibold">🐾 It's home to animals and humans alike.</p>
						</div>
						<div className="bg-gradient-to-br from-indigo-600/50 to-purple-700/50 p-6 rounded-2xl shadow-lg border border-indigo-400/30 transform hover:scale-105 transition duration-300">
							<p className="text-lg font-semibold">🌈 It has colorful weather — from rainbows to snow!</p>
						</div>
					</div>
				</section>

				{/* 🗺️ Continents & Oceans */}
				<section className="max-w-6xl w-full">
					<h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">🗺️ Continents & Oceans</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
						<div className="bg-gradient-to-br from-blue-800/50 to-indigo-900/50 p-8 rounded-2xl shadow-xl border border-blue-400/40">
							<h3 className="text-3xl font-bold text-blue-300 mb-4">🌍 7 Continents</h3>
							<div className="grid grid-cols-2 gap-3 text-left">
								{["Africa", "Antarctica", "Asia", "Australia", "Europe", "North America", "South America"].map((continent, index) => (
									<div key={index} className="bg-blue-700/30 p-3 rounded-lg border border-blue-500/30">
										<p className="font-semibold">{continent}</p>
									</div>
								))}
							</div>
						</div>
						<div className="bg-gradient-to-br from-cyan-800/50 to-teal-900/50 p-8 rounded-2xl shadow-xl border border-cyan-400/40">
							<h3 className="text-3xl font-bold text-cyan-300 mb-4">🌊 5 Oceans</h3>
							<div className="space-y-3">
								{["Pacific", "Atlantic", "Indian", "Southern", "Arctic"].map((ocean, index) => (
									<div key={index} className="bg-cyan-700/30 p-3 rounded-lg border border-cyan-500/30">
										<p className="font-semibold text-lg">{ocean} Ocean</p>
									</div>
								))}
							</div>
						</div>
					</div>
				</section>

				{/* 🌕 Moon & Space Fun */}
				<section className="max-w-4xl bg-gradient-to-br from-gray-800/70 to-purple-900/50 rounded-2xl p-8 shadow-2xl border border-purple-400/30">
					<h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">🌕 The Moon and Space</h2>
					<p className="text-gray-200 text-xl leading-relaxed">
						The <span className="text-yellow-300 font-bold">Moon</span> is Earth's closest friend in space! 🌙  
						It goes around Earth once every 27 days and makes the night sky glow.  
						The Moon helps control ocean tides 🌊 and makes our nights beautiful.  
						Look up at night  you might even see a <span className="text-pink-300 font-bold">Full Moon!</span> 🌕
					</p>
				</section>

				{/* ♻️ Protect the Earth */}
				<section className="max-w-4xl bg-gradient-to-br from-green-900/60 to-emerald-900/50 rounded-2xl p-8 shadow-2xl border border-green-400/40">
					<h2 className="text-4xl font-bold mb-6 text-green-300">♻️ How Can We Protect Earth?</h2>
					<ul className="text-left grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-200 text-lg">
						<li className="bg-green-700/40 p-4 rounded-xl border border-green-500/30">🌳 Plant more trees — they clean the air.</li>
						<li className="bg-green-700/40 p-4 rounded-xl border border-green-500/30">🚯 Don't throw trash on the ground — keep our planet clean.</li>
						<li className="bg-green-700/40 p-4 rounded-xl border border-green-500/30">💧 Save water — every drop counts!</li>
						<li className="bg-green-700/40 p-4 rounded-xl border border-green-500/30">🔌 Turn off lights when you're not using them.</li>
						<li className="bg-green-700/40 p-4 rounded-xl border border-green-500/30">🚲 Walk or ride a bicycle to reduce pollution.</li>
						<li className="bg-green-700/40 p-4 rounded-xl border border-green-500/30">🌱 Support renewable energy sources.</li>
					</ul>
				</section>

				{/* 🌦️ Weather Section with Larger Images */}
				<section className="max-w-4xl bg-gradient-to-br from-gray-800/60 to-blue-900/50 rounded-2xl p-8 shadow-xl border border-cyan-400/30">
					<h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-yellow-400 to-cyan-400 bg-clip-text text-transparent">🌦️ Earth's Amazing Weather</h2>
					
					{/* Weather Images Grid - Larger Images */}
					<div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
						{/* Sunny */}
						<div className="bg-gradient-to-br from-yellow-500/40 to-orange-500/40 rounded-2xl p-4 shadow-lg border border-yellow-400/30 transform hover:scale-105 transition duration-300">
							<img
								src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=200&h=150&fit=crop"
								alt="Sunny weather"
								className="w-full h-32 object-cover rounded-xl mb-3 shadow-md"
							/>
							<p className="text-lg font-bold text-yellow-300">☀️ Sunny</p>
						</div>

						{/* Rainy */}
						<div className="bg-gradient-to-br from-blue-500/40 to-cyan-500/40 rounded-2xl p-4 shadow-lg border border-blue-400/30 transform hover:scale-105 transition duration-300">
							<img
								src="https://images.unsplash.com/photo-1519692933481-e162a57d6721?w=200&h=150&fit=crop"
								alt="Rainy weather"
								className="w-full h-32 object-cover rounded-xl mb-3 shadow-md"
							/>
							<p className="text-lg font-bold text-blue-300">🌧️ Rainy</p>
						</div>

						{/* Snowy */}
						<div className="bg-gradient-to-br from-cyan-500/40 to-blue-500/40 rounded-2xl p-4 shadow-lg border border-cyan-400/30 transform hover:scale-105 transition duration-300">
							<img
								src="https://images.unsplash.com/photo-1548777123-e216912df7d8?w=200&h=150&fit=crop"
								alt="Snowy weather"
								className="w-full h-32 object-cover rounded-xl mb-3 shadow-md"
							/>
							<p className="text-lg font-bold text-cyan-300">❄️ Snowy</p>
						</div>

						{/* Windy */}
						<div className="bg-gradient-to-br from-gray-500/40 to-blue-400/40 rounded-2xl p-4 shadow-lg border border-gray-400/30 transform hover:scale-105 transition duration-300">
							<img
								src="https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=200&h=150&fit=crop"
								alt="Windy weather"
								className="w-full h-32 object-cover rounded-xl mb-3 shadow-md"
							/>
							<p className="text-lg font-bold text-gray-300">🌬️ Windy</p>
						</div>
					</div>
					
					<p className="text-gray-200 text-xl mt-4">Sometimes we even see beautiful rainbows 🌈 after the rain!</p>
				</section>

				{/* Final Call to Action */}
				<section className="max-w-2xl text-lg text-gray-200 bg-gradient-to-r from-purple-900/40 to-blue-900/40 p-8 rounded-2xl border border-purple-400/30">
					<p className="text-2xl">
						Earth is a <span className="text-blue-300 font-bold">beautiful blue planet</span> that we must take care of.
						Let's learn more about it with a fun quiz below! 💫
					</p>
				</section>

				{/* 🚀 Start Quiz Button */}
				<div className="mt-8">
					<motion.button
						className="bg-gradient-to-r from-green-500 to-emerald-600 px-10 py-4 rounded-full font-bold text-white text-xl hover:from-green-600 hover:to-emerald-700 transition transform hover:scale-105 shadow-2xl"
						whileTap={{ scale: 0.9 }}
						onClick={() => setShowQuiz(true)}
					>
						Start Earth Quiz 🚀
					</motion.button>
				</div>
			</main>

			{/* Quiz Modal */}
			<AnimatePresence>
				{showQuiz && (
					<motion.div
						className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
					>
						<motion.div
							className="bg-gradient-to-br from-blue-900 to-purple-900 rounded-3xl p-8 max-w-2xl w-full border-2 border-cyan-400 shadow-2xl relative"
							initial={{ scale: 0.5, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							exit={{ scale: 0.5, opacity: 0 }}
						>
							{/* Close Button */}
							<button
								onClick={closeQuiz}
								className="absolute top-4 right-4 text-white hover:text-red-400 transition-colors duration-200 bg-red-500/20 hover:bg-red-500/40 w-8 h-8 rounded-full flex items-center justify-center"
							>
								✕
							</button>
							
							<h3 className="text-3xl font-bold text-center mb-6 text-white">Earth Quiz</h3>
							<div className="mb-6">
								<p className="text-xl text-center mb-4 text-cyan-200">{quizQuestions[currentQuestion].question}</p>
								<div className="grid grid-cols-1 gap-4">
									{quizQuestions[currentQuestion].options.map((option, index) => (
										<motion.button
											key={index}
											className={`p-4 rounded-xl text-lg font-semibold transition-all ${
												selectedAnswer === option
													? option === quizQuestions[currentQuestion].correct
														? "bg-green-500 text-white"
														: "bg-red-500 text-white"
													: "bg-white/10 hover:bg-white/20 text-white"
											}`}
											whileHover={{ scale: 1.05 }}
											whileTap={{ scale: 0.95 }}
											onClick={() => handleAnswer(option)}
											disabled={selectedAnswer !== null}
										>
											{option}
										</motion.button>
									))}
								</div>
							</div>
							<div className="flex justify-between items-center text-white">
								<span>Question {currentQuestion + 1} of {quizQuestions.length}</span>
								<span>Score: {score}</span>
							</div>
							
							{/* Exit Quiz Button */}
							<div className="mt-6 flex justify-center">
								<motion.button
									onClick={closeQuiz}
									className="bg-red-500 hover:bg-red-600 px-6 py-2 rounded-full font-semibold text-white transition-colors duration-200"
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
								>
									Exit Quiz
								</motion.button>
							</div>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>

			{/* Badge Modal */}
			<AnimatePresence>
				{showBadge && (
					<motion.div
						className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
					>
						<motion.div
							className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-3xl p-12 text-center border-4 border-yellow-300 shadow-2xl"
							initial={{ scale: 0, rotate: -180 }}
							animate={{ scale: 1, rotate: 0 }}
							exit={{ scale: 0, rotate: 180 }}
						>
							<h3 className="text-5xl font-bold mb-6 text-white">🏆 Earth Expert! 🏆</h3>
							<p className="text-2xl mb-6 text-white">Congratulations! You scored {score}/{quizQuestions.length}</p>
							<p className="text-xl mb-8 text-white">You're a true Earth expert! 🌍✨</p>
							<motion.button
								className="bg-white text-orange-500 px-8 py-3 rounded-full font-bold text-lg"
								whileHover={{ scale: 1.1 }}
								whileTap={{ scale: 0.9 }}
								onClick={() => setShowBadge(false)}
							>
								Awesome! 🎉
							</motion.button>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>

			{/* Score Modal */}
			<AnimatePresence>
				{showScore && (
					<motion.div
						className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
					>
						<motion.div
							className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl p-12 text-center border-4 border-cyan-300 shadow-2xl"
							initial={{ scale: 0 }}
							animate={{ scale: 1 }}
							exit={{ scale: 0 }}
						>
							<h3 className="text-4xl font-bold mb-6 text-white">Quiz Complete! 🎯</h3>
							<p className="text-3xl mb-6 text-white">Your score: {score}/{quizQuestions.length}</p>
							<p className="text-xl mb-8 text-white">Great job learning about our amazing planet! 🌍</p>
							<motion.button
								className="bg-white text-blue-600 px-8 py-3 rounded-full font-bold text-lg"
								whileHover={{ scale: 1.1 }}
								whileTap={{ scale: 0.9 }}
								onClick={() => setShowScore(false)}
							>
								Continue Exploring 🌟
							</motion.button>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>

			<Footer />
		</div>
	);
}