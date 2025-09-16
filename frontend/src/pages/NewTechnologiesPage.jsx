import { useState } from "react";
import SpaceBackground from "../components/SpaceBackground";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar"; // Import SearchBar component

const technologies = [
	{
		name: "Mars Rover",
		description:
			"Robots like Perseverance explore Mars, take pictures, and search for signs of life!",
		img: "https://mars.nasa.gov/system/news_items/main_images/10010_PIA25681-FigureA-web.jpg",
	},
	{
		name: "Space Telescopes",
		description:
			"Telescopes like Hubble and James Webb look deep into space and help us discover new planets and stars.",
		img: "https://www.nasa.gov/sites/default/files/thumbnails/image/jwst_telescope.png",
	},
	{
		name: "Reusable Rockets",
		description:
			"Companies like SpaceX build rockets that can land and be used again, making space travel cheaper!",
		img: "https://upload.wikimedia.org/wikipedia/commons/9/99/Falcon_9_Flight_20_Landing_%28cropped%29.jpg",
	},
	{
		name: "Space Suits",
		description:
			"Astronauts wear special suits to stay safe and comfortable in space.",
		img: "https://upload.wikimedia.org/wikipedia/commons/4/4e/NASA_Space_Suit.jpg",
	},
	{
		name: "International Space Station",
		description:
			"Astronauts from all over the world live and work together in space!",
		img: "https://upload.wikimedia.org/wikipedia/commons/d/dc/STS-132_International_Space_Station_after_undocking.jpg",
	},
];

const newTechnologiesQuizQuestions = [
	{
	question: "What does the Mars Rover do?",
	options: [
		"Explore Mars",
		"Explore the Moon",
		"Explore Earth",
		"Explore Jupiter",
	],
	correct: "Explore Mars",
	},
	{
	question: "What does the Hubble Telescope do?",
	options: [
		"Look deep into space",
		"Explore Mars",
		"Explore the Moon",
		"Explore Earth",
	],
	correct: "Look deep into space",
	},
	{
	question: "What does SpaceX build?",
	options: ["Reusable rockets", "Satellites", "Space suits", "Telescopes"],
	correct: "Reusable rockets",
	},
	{
	question: "What do astronauts wear?",
	options: ["Space suits", "Telescopes", "Satellites", "Rockets"],
	correct: "Space suits",
	},
	{
	question: "What is the ISS?",
	options: [
		"International Space Station",
		"Mars Rover",
		"Hubble Telescope",
		"Reusable Rocket",
	],
	correct: "International Space Station",
	},
	{
	question: "What does the James Webb Telescope do?",
	options: [
		"Look deep into space",
		"Explore Mars",
		"Explore the Moon",
		"Explore Earth",
	],
	correct: "Look deep into space",
	},
	{
	question: "What is the purpose of reusable rockets?",
	options: [
		"Make space travel cheaper",
		"Explore Mars",
		"Explore the Moon",
		"Explore Earth",
	],
	correct: "Make space travel cheaper",
	},
	{
	question: "What do astronauts do on the ISS?",
	options: ["Live and work", "Explore Mars", "Explore the Moon", "Explore Earth"],
	correct: "Live and work",
	},
	{
	question: "What is the purpose of satellites?",
	options: [
		"Study Earth and space",
		"Explore Mars",
		"Explore the Moon",
		"Explore Jupiter",
	],
	correct: "Study Earth and space",
	},
	{
	question: "What is the purpose of telescopes?",
	options: [
		"Observe distant stars",
		"Explore Mars",
		"Explore the Moon",
		"Explore Earth",
	],
	correct: "Observe distant stars",
	},
	{
	question: "What is the purpose of space suits?",
	options: [
		"Stay safe in space",
		"Explore Mars",
		"Explore the Moon",
		"Explore Earth",
	],
	correct: "Stay safe in space",
	},
	{
	question: "What is the purpose of the ISS?",
	options: [
		"Live and work in space",
		"Explore Mars",
		"Explore the Moon",
		"Explore Earth",
	],
	correct: "Live and work in space",
	},
	{
	question: "What is the purpose of the Mars Rover?",
	options: [
		"Search for signs of life",
		"Explore the Moon",
		"Explore Earth",
		"Explore Jupiter",
	],
	correct: "Search for signs of life",
	},
	{
	question: "What is the purpose of reusable rockets?",
	options: [
		"Land and be reused",
		"Explore Mars",
		"Explore the Moon",
		"Explore Earth",
	],
	correct: "Land and be reused",
	},
	{
	question: "What is the purpose of the James Webb Telescope?",
	options: [
		"Discover new planets",
		"Explore Mars",
		"Explore the Moon",
		"Explore Earth",
	],
	correct: "Discover new planets",
	},
];

export default function NewTechnologiesPage() {
	const [selected, setSelected] = useState(null);

	return (
		<div className="min-h-screen flex flex-col text-white relative">
			<SpaceBackground />
			<Header activePage="newtechnologies" />
			<SearchBar data={technologies} /> {/* Added SearchBar */}
			<main className="flex-grow flex flex-col items-center justify-center p-4">
				<h1 className="text-4xl font-bold mb-6 text-blue-300 text-center">
					🚀 New Space Technologies!
				</h1>
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-5xl">
					{technologies.map((tech, idx) => (
						<button
							key={idx}
							className={`bg-blue-900/80 rounded-xl shadow-lg p-6 flex flex-col items-center hover:bg-blue-700 transition-transform border-2 border-blue-400 ${
								selected === idx ? "ring-4 ring-blue-300" : ""
							}`}
							onClick={() =>
								setSelected(selected === idx ? null : idx)
							}
						>
							<img
								src={tech.img}
								alt={tech.name}
								className="w-32 h-32 object-cover rounded-full mb-4 border-4 border-blue-300"
							/>
							<span className="text-2xl font-bold mb-2">
								{tech.name}
							</span>
							{selected === idx && (
								<span className="text-lg mt-2 text-blue-200">
									{tech.description}
								</span>
							)}
						</button>
					))}
				</div>
				<div className="mt-8 text-center">
					<h2 className="text-2xl font-bold text-green-300 mb-2">
						🛰️ Try This!
					</h2>
					<p className="text-lg mb-4">
						Imagine you are an astronaut! What technology would you invent
						for space?
					</p>
					<button
						className="bg-green-500 px-6 py-2 rounded font-bold text-white hover:bg-green-600"
						onClick={() =>
							alert(
								"Great idea! Maybe one day you'll invent it!"
							)
						}
					>
						I Have An Idea!
					</button>
				</div>
			</main>
			<Footer />
		</div>
	);
}