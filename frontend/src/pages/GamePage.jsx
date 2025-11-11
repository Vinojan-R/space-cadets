import SpaceBackground from "../components/SpaceBackground";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import GameModal from "../components/GameModal";
import AstroQuiz from "../games/AstroQuiz";
import SpaceRacer from "../games/SpaceRacer"; // Import PlanetMatch
import MeteorCatch from "../games/MeteorCatch1"; // Import GalaxyExplorer
import RocketBuilder from "../games/RocketBuilder"; // Import RocketBuilder
import PacMan from "../games/PacMan";	
const games = [
	{
		name: "Astro Quiz",
		icon: "🧑‍🚀",
		path: "/games/astroquiz",
		description: "Test your space knowledge!",
		component: AstroQuiz,
	},
	{
		name: "Pacman",
		icon: "🌌",
		path: "/games/pacman",
		description: "Explore galaxies and collect stars!",
		component: PacMan,
	},
	{
		name: "Space Racer 3D",
		icon: "🚀",
		path: "/games/spaceracer",
		description: "Dodge asteroids in deep space!",
		component: SpaceRacer,
			},
	{
		name: "Meteor Catch",
		icon: "☄️",
		path: "/games/galaxyexplorer",
		description: "Explore galaxies and collect stars!",
		component: MeteorCatch,
	},
	{
		name: "Planet Shooter",
		icon: "🪐",
		path: "/games/rocketbuilder",
		description: "Shoot planets and have fun",
		component: RocketBuilder,
	},
];

export default function GamePage() {
	const [selectedGame, setSelectedGame] = useState(null);

	const openGame = (game) => {
		setSelectedGame(game);
	};

	const closeGame = () => {
		setSelectedGame(null);
	};

	return (
		<div className="min-h-screen flex flex-col text-white relative overflow-hidden">
			<SpaceBackground />
			<Header />
			<main className="flex-grow flex flex-col items-center justify-center p-4">
				<h1 className="text-4xl font-bold mb-8 text-purple-300 text-center">
					🎮 Space Cadets Game Console
				</h1>
				{/* Responsive floating cards */}
				<div className="relative w-full max-w-4xl h-96 flex items-center justify-center">
					{/* Desktop: floating cards, Mobile: grid */}
					<div className="hidden sm:block w-full h-full relative">
						{games.map((game, idx) => (
							<div
								key={game.name}
								className={`absolute animate-float${
									(idx % 2) + 1
								} bg-purple-900/80 rounded-xl shadow-lg p-6 flex flex-col items-center justify-center border-2 border-purple-400 cursor-pointer hover:scale-110 transition-transform`}
								style={{
									left: `${8 + idx * 18}%`,
									top: `${40 + (idx % 3) * 80}px`,
									width: "160px",
									height: "160px",
									zIndex: 10 - idx,
								}}
								onClick={() => openGame(game)}
							>
								<span className="text-5xl mb-3">{game.icon}</span>
								<span className="text-xl font-bold mb-1">{game.name}</span>
								<span className="text-sm text-purple-200 text-center">
									{game.description}
								</span>
							</div>
						))}
					</div>
					<div className="sm:hidden grid grid-cols-2 gap-4 w-full">
						{games.map((game, idx) => (
							<div
								key={game.name}
								className="bg-purple-900/80 rounded-xl shadow-lg p-4 flex flex-col items-center justify-center border-2 border-purple-400 cursor-pointer hover:scale-105 transition-transform"
								onClick={() => openGame(game)}
							>
								<span className="text-4xl mb-2">{game.icon}</span>
								<span className="text-lg font-bold mb-1">{game.name}</span>
								<span className="text-xs text-purple-200 text-center">
									{game.description}
								</span>
							</div>
						))}
					</div>
				</div>
				<p className="mt-10 text-lg text-purple-200 text-center">
					Tap a game to start your adventure!
				</p>
			</main>
			<Footer />
			{selectedGame && (
				<GameModal onClose={closeGame}>
					<selectedGame.component onClose={closeGame} />
				</GameModal>
			)}
			<style>
				{`
          @keyframes float1 {
            0% { transform: translateY(0) rotate(-2deg);}
            50% { transform: translateY(-30px) rotate(2deg);}
            100% { transform: translateY(0) rotate(-2deg);}
          }
          @keyframes float2 {
            0% { transform: translateY(0) rotate(2deg);}
            50% { transform: translateY(40px) rotate(-2deg);}
            100% { transform: translateY(0) rotate(2deg);}
          }
          .animate-float1 {
            animation: float1 4s ease-in-out infinite;
          }
          .animate-float2 {
            animation: float2 5s ease-in-out infinite;
          }
        `}
			</style>
		</div>
	);
}