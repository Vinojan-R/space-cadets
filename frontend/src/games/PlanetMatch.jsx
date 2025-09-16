import { useState } from "react";

const planets = [
	{
		name: "Mercury",
		img: "https://upload.wikimedia.org/wikipedia/commons/4/4a/Mercury_in_true_color.jpg",
	},
	{
		name: "Venus",
		img: "https://upload.wikimedia.org/wikipedia/commons/e/e5/Venus-real_color.jpg",
	},
	{
		name: "Earth",
		img: "https://upload.wikimedia.org/wikipedia/commons/9/97/The_Earth_seen_from_Apollo_17.jpg",
	},
	{
		name: "Mars",
		img: "https://upload.wikimedia.org/wikipedia/commons/0/02/OSIRIS_Mars_true_color.jpg",
	},
];

export default function PlanetMatch() {
	const [selectedName, setSelectedName] = useState(null);
	const [score, setScore] = useState(0);

	const handleMatch = (name) => {
		if (name === selectedName) {
			setScore((prevScore) => prevScore + 1);
			setSelectedName(null);
		} else {
			setSelectedName(name);
		}
	};

	return (
		<div className="text-center">
			<h2 className="text-2xl font-bold mb-4">🪐 Planet Match</h2>
			<p className="mb-4">Match the planet names with their images!</p>
			<div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
				{planets.map((planet, idx) => (
					<button
						key={idx}
						className="bg-blue-500 px-4 py-2 rounded font-bold text-white hover:bg-blue-600"
						onClick={() => handleMatch(planet.name)}
					>
						{planet.name}
					</button>
				))}
			</div>
			<div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
				{planets.map((planet, idx) => (
					<img
						key={idx}
						src={planet.img}
						alt={planet.name}
						className="w-32 h-32 object-cover rounded-lg cursor-pointer hover:scale-105 transition-transform"
						onClick={() => handleMatch(planet.name)}
					/>
				))}
			</div>
			<div className="mt-6">
				<h3 className="text-xl font-bold">Score: {score}</h3>
			</div>
		</div>
	);
}