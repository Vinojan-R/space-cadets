import SpaceBackground from "../components/SpaceBackground";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useState, useEffect } from "react";


const moonFacts = [
	{
		question: "🌙 What is the Moon?",
		answer: "The Moon is Earth's only natural satellite. It orbits our planet and shines at night!",
	},
	{
		question: "🧑‍🚀 Who was the first person on the Moon?",
		answer: "Neil Armstrong was the first person to walk on the Moon in 1969.",
	},
	{
		question: "🌑 Why does the Moon change shape?",
		answer: "The Moon looks different each night because of its phases: new moon, crescent, half, and full moon.",
	},
	{
		question: "🌕 How far is the Moon from Earth?",
		answer: "The Moon is about 384,400 km (238,855 miles) away from Earth.",
	},
	{
		question: "🦶 What are moon craters?",
		answer: "Craters are holes on the Moon's surface made by space rocks hitting it.",
	},
	{
		question: "🌔 Why does the Moon shine?",
		answer: "The Moon shines because it reflects light from the Sun.",
	},
];

export default function MoonPage() {
	const [selected, setSelected] = useState(null);

	return (
		<div className="min-h-screen flex flex-col text-white relative">
			<SpaceBackground />
			<Header />
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
							<span className="text-xl font-bold mb-2">{fact.question}</span>
							{selected === idx && (
								<span className="text-lg mt-2 text-yellow-200">
									{fact.answer}
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
			</main>
			<Footer />
		</div>
	);
}