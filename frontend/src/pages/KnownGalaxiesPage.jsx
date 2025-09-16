import SpaceBackground from "../components/SpaceBackground";
import Header from "../components/Header";
import Footer from "../components/Footer";

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

export default function KnownGalaxiesPage() {
	return (
		<div className="min-h-screen flex flex-col text-white relative">
			<SpaceBackground />
			<Header />
			<main className="flex-grow flex flex-col items-center justify-center p-4">
				<h1 className="text-4xl font-bold mb-6 text-purple-300">
					Known Galaxies
				</h1>
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
					<h2 className="text-2xl font-bold text-yellow-300 mb-2">
						✨ Did You Know?
					</h2>
					<p className="text-lg mb-4">
						There are billions of galaxies in the universe, each with its own stars
						and mysteries!
					</p>
				</div>
			</main>
			<Footer />
		</div>
	);
}