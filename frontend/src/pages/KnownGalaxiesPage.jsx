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
			<>
			
	  <div className="flex flex-col md:flex-row items-center justify-between min-h-100 bg-transparent text-white px-10 overflow-hidden">
      {/* 🪐 Left Side - Cartoon Heading */}
      <div className="flex-1 text-left space-y-6">
        <h1
          className="text-5xl md:text-6xl font-[ComicNeue] text-blue-600 animate-bounce-text drop-shadow-blue-500"
        >
          🌀 𝐆𝐚𝐥𝐚𝐱𝐢𝐞𝐬 𝐚𝐧𝐝 𝐓𝐡𝐞𝐢𝐫 𝐀𝐦𝐚𝐳𝐢𝐧𝐠 𝐅𝐞𝐚𝐭𝐮𝐫𝐞𝐬
        </h1>
        <p className="text-lg text-gray-300 max-w-md leading-relaxed">
          Discover the beauty, mystery, and wonders of galaxies — the home of billions of stars, planets, and cosmic stories.
        </p>
      </div>

      {/* 🎥 Right Side - Auto Playing Video */}
      <div className="flex-1 mt-10 md:mt-0 md:ml-10">
        <video
          src="/src/assets/galaxy.mp4" 
          autoPlay
          muted
          loop
          playsInline
          className="rounded-3xl shadow-lg w-full h-auto object-cover"
        ></video>
      </div>

      

      {/* ✨ Animation Styles */}
      <style jsx>{`
        @keyframes bounce-text {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .animate-bounce-text {
          animation: bounce-text 2s ease-in-out infinite;
        }

        @keyframes twinkle {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 1;
          }
        }
        .animate-twinkle {
          animation: twinkle 2s infinite ease-in-out;
        }
      `}</style>
    </div>

	<div className="relative min-h-screen bg-transparant text-white p-8 overflow-hidden">

  {/* Star Background */}
  <div className="absolute inset-0">
    {Array.from({ length: 50 }).map((_, i) => (
      <div
        key={i}
        className="absolute bg-white rounded-full opacity-50 animate-pulse"
        style={{
          width: `${Math.random() * 3 + 1}px`,
          height: `${Math.random() * 3 + 1}px`,
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
        }}
      ></div>
    ))}
  </div>




  {/* Galaxy Notes */}
  <div className="relative z-10 space-y-12">
	  <h1 className="text-4xl font-extrabold text-blue-300 font-[Comic_Sans_MS] mb-12 text-center animate-glow drop-shadow-amber-300">
    🌀 Galaxies and Their Amazing Features
  </h1>

    {/* 1 Andromeda Galaxy */}
    <div className="flex flex-col md:flex-row-reverse items-center gap-8">
      <img src="/src/assets/g1.jpg" alt="Andromeda Galaxy"
        className="w-full md:w-1/4 h-auto  object-cover rounded-2xl shadow-lg hover:scale-105 transition-transform duration-700" />
      <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-md border border-white/20 md:w-1/2">
        <h2 className="text-2xl font-bold text-blue-200 font-[Comic_Sans_MS] mb-3">🌠 Andromeda Galaxy (M31)</h2>
        <p className="font-[Comic_Sans_MS]">The closest large galaxy to the Milky Way. It’s about 2.5 million light-years away. Scientists think the Milky Way and Andromeda will collide in about 4 billion years!</p>
      </div>
	  <img
    src="/src/assets/z1.png"
    alt="AI Robotics"
    className="w-40 h-40 object-contain animate-float"
  />
    </div>

    {/* 2 Black Eye Galaxy */}
    <div className="flex flex-col md:flex-row items-center gap-8">
      <img src="/src/assets/m64.jpg" alt="Black Eye Galaxy"
        className="w-full md:w-1/4 h-auto object-cover rounded-2xl shadow-lg hover:scale-105 transition-transform duration-700" />
      <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-md border border-white/20 md:w-1/2">
        <h2 className="text-2xl font-bold text-blue-200 font-[Comic_Sans_MS] mb-3">🌑 Black Eye Galaxy (M64)</h2>
        <p className="font-[Comic_Sans_MS]">Looks like it has a black eye because of a dark band of dust in front of its bright core. The dust is actually cold gas and stars blocking the light.</p>
      </div>
	  <img
    src="/src/assets/z2.png"
    alt="Solar Sail"
    className="w-40 h-40 object-contain animate-float-slow"
  />
    </div>

    {/* 3 Cigar Galaxy */}
    <div className="flex flex-col md:flex-row-reverse items-center gap-8">
      <img src="/src/assets/m82.webp" alt="Cigar Galaxy"
        className="w-full md:w-1/4 h-auto object-cover rounded-2xl shadow-lg hover:scale-105 transition-transform duration-700" />
      <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-md border border-white/20 md:w-1/2">
        <h2 className="text-2xl font-bold text-blue-200 font-[Comic_Sans_MS] mb-3">🌌 Cigar Galaxy (M82)</h2>
        <p className="font-[Comic_Sans_MS]">Long and thin — shaped like a cigar. Very active star formation happens inside it, making it a starburst galaxy.</p>
      </div>
	  <img
    src="/src/assets/z3.png"
    alt="AI Robotics"
    className="w-40 h-40 object-contain animate-float"
  />
    </div>

    {/* 4 Large Magellanic Cloud */}
    <div className="flex flex-col md:flex-row items-center gap-8">
      <img src="/src/assets/lmc.jpg" alt="Large Magellanic Cloud"
        className="w-full md:w-1/4 h-auto object-cover rounded-2xl shadow-lg hover:scale-105 transition-transform duration-700" />
      <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-md border border-white/20 md:w-1/2">
        <h2 className="text-2xl font-bold text-blue-200 font-[Comic_Sans_MS] mb-3">🌙 Large Magellanic Cloud (LMC)</h2>
        <p className="font-[Comic_Sans_MS]">A small galaxy orbiting the Milky Way. One of the closest galaxies to us and can be seen with the naked eye from the Southern Hemisphere.</p>
      </div>
	  <img
    src="/src/assets/z4.png"
    alt="Solar Sail"
    className="w-40 h-40 object-contain animate-float-slow"
  />
    </div>

    {/* 5 Cartwheel Galaxy */}
    <div className="flex flex-col md:flex-row-reverse items-center gap-8">
      <img src="/src/assets/cartwe.png" alt="Cartwheel Galaxy"
        className="w-full md:w-1/4 h-auto object-cover rounded-2xl shadow-lg hover:scale-105 transition-transform duration-700" />
      <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-md border border-white/20 md:w-1/2">
        <h2 className="text-2xl font-bold text-blue-200 font-[Comic_Sans_MS] mb-3">🌀 Cartwheel Galaxy</h2>
        <p className="font-[Comic_Sans_MS]">Looks like a wheel because of a huge ring of bright, young stars. The ring shape was caused by a smaller galaxy colliding with it long ago.</p>
      </div>
	  <img
    src="/src/assets/z5.png"
    alt="AI Robotics"
    className="w-40 h-40 object-contain animate-float"
  />
    </div>

    {/* 6 Milky Way Galaxy */}
    <div className="flex flex-col md:flex-row items-center gap-8">
      <img src="/src/assets/milky.jpg" alt="Milky Way Galaxy"
        className="w-full md:w-1/4 h-auto object-cover rounded-2xl shadow-lg hover:scale-105 transition-transform duration-700" />
      <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-md border border-white/20 md:w-1/2">
        <h2 className="text-2xl font-bold text-blue-200 font-[Comic_Sans_MS] mb-3">🌍 Milky Way Galaxy</h2>
        <p className="font-[Comic_Sans_MS]">Our home galaxy! A spiral galaxy with billions of stars, including our Sun. It has arms that spiral out from the center like a pinwheel.</p>
      </div>
	  <img
    src="/src/assets/z6.png"
    alt="Solar Sail"
    className="w-40 h-40 object-contain animate-float-slow"
  />
    </div>

    {/* 7 Hoag's Object */}
    <div className="flex flex-col md:flex-row-reverse items-center gap-8">
      <img src="/src/assets/hoag.jpg" alt="Hoag's Object"
        className="w-full md:w-1/4 h-auto object-cover rounded-2xl shadow-lg hover:scale-105 transition-transform duration-700" />
      <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-md border border-white/20 md:w-1/2">
        <h2 className="text-2xl font-bold text-blue-200 font-[Comic_Sans_MS] mb-3">🔵 Hoag's Object</h2>
        <p className="font-[Comic_Sans_MS]">A rare type of ring galaxy. It has a perfect circle of blue stars around a yellow core — looks like a cosmic doughnut! 🍩</p>
      </div>
	  <img
    src="/src/assets/z7.png"
    alt="AI Robotics"
    className="w-40 h-40 object-contain animate-float"
  />
    </div>

    {/* 8 Bode's Galaxy */}
    <div className="flex flex-col md:flex-row items-center gap-8">
      <img src="/src/assets/m81.jpg" alt="Bode's Galaxy"
        className="w-full md:w-1/4 h-auto object-cover rounded-2xl shadow-lg hover:scale-105 transition-transform duration-700" />
      <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-md border border-white/20 md:w-1/2">
        <h2 className="text-2xl font-bold text-blue-200 font-[Comic_Sans_MS] mb-3">🌟 Bode's Galaxy (M81)</h2>
        <p className="font-[Comic_Sans_MS]">A beautiful spiral galaxy close to the Cigar Galaxy. It has a bright center and well-defined spiral arms.</p>
      </div>
	  <img
    src="/src/assets/z8.png"
    alt="Solar Sail"
    className="w-40 h-40 object-contain animate-float-slow"
  />
    </div>

    {/* 9 Pinwheel Galaxy */}
    <div className="flex flex-col md:flex-row-reverse items-center gap-8">
      <img src="/src/assets/m101.jpg" alt="Pinwheel Galaxy"
        className="w-full md:w-1/4 h-auto object-cover rounded-2xl shadow-lg hover:scale-105 transition-transform duration-700" />
      <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-md border border-white/20 md:w-1/2">
        <h2 className="text-2xl font-bold text-blue-200 font-[Comic_Sans_MS] mb-3">🌪️ Pinwheel Galaxy (M101)</h2>
        <p className="font-[Comic_Sans_MS]">A large, face-on spiral galaxy. Its arms are filled with young, blue stars and pink clouds of gas where new stars are forming.</p>
      </div>
	  <img
    src="/src/assets/z9.png"
    alt="AI Robotics"
    className="w-40 h-40 object-contain animate-float"
  />
    </div>

    {/* 10 Sombrero Galaxy */}
    <div className="flex flex-col md:flex-row items-center gap-8">
      <img src="/src/assets/m104.jpg" alt="Sombrero Galaxy"
        className="w-full md:w-1/4 h-auto object-cover rounded-2xl shadow-lg hover:scale-105 transition-transform duration-700" />
      <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-md border border-white/20 md:w-1/2">
        <h2 className="text-2xl font-bold text-blue-200 font-[Comic_Sans_MS] mb-3">👒 Sombrero Galaxy (M104)</h2>
        <p className="font-[Comic_Sans_MS]">Looks like a Mexican hat (sombrero) because of its bright central bulge and dark ring of dust. Has a supermassive black hole in the center.</p>
      </div>
	  <img
    src="/src/assets/z10.png"
    alt="Solar Sail"
    className="w-40 h-40 object-contain animate-float-slow"
  />
    </div>

    {/* 11 Whirlpool Galaxy */}
    <div className="flex flex-col md:flex-row-reverse items-center gap-8">
      <img src="/src/assets/m51.webp" alt="Whirlpool Galaxy"
        className="w-full md:w-1/4 h-auto object-cover rounded-2xl shadow-lg hover:scale-105 transition-transform duration-700" />
      <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-md border border-white/20 md:w-1/2">
        <h2 className="text-2xl font-bold text-blue-200 font-[Comic_Sans_MS] mb-3">💫 Whirlpool Galaxy (M51)</h2>
        <p className="font-[Comic_Sans_MS]">Famous for its perfect spiral shape. Interacting with a smaller galaxy, which makes its spiral arms even clearer.</p>
      </div>
	  <img
    src="/src/assets/z11.png"
    alt="AI Robotics"
    className="w-40 h-40 object-contain animate-float"
  />
    </div>

    {/* 12 Comet Galaxy */}
    <div className="flex flex-col md:flex-row items-center gap-8">
      <img src="/src/assets/CometGalaxy.jpg" alt="Comet Galaxy"
        className="w-full md:w-1/4 h-auto object-cover rounded-2xl shadow-lg hover:scale-105 transition-transform duration-700" />
      <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-md border border-white/20 md:w-1/2">
        <h2 className="text-2xl font-bold text-blue-200 font-[Comic_Sans_MS] mb-3">☄️ Comet Galaxy</h2>
        <p className="font-[Comic_Sans_MS]">Shaped like a comet, with a long tail of stars and gas. The shape formed because it’s being pulled apart by a larger galaxy cluster.</p>
      </div>
	  <img
    src="/src/assets/z12.png"
    alt="Solar Sail"
    className="w-40 h-40 object-contain animate-float-slow"
  />
    </div>

    {/* 13 NGC 6872 */}
    <div className="flex flex-col md:flex-row-reverse items-center gap-8">
      <img src="/src/assets/NGC_6872.png" alt="NGC 6872 (Condor Galaxy)"
        className="w-full md:w-1/4 h-auto object-cover rounded-2xl shadow-lg hover:scale-105 transition-transform duration-700" />
      <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-md border border-white/20 md:w-1/2">
        <h2 className="text-2xl font-bold text-blue-200 font-[Comic_Sans_MS] mb-3">🌌 NGC 6872 (Condor Galaxy)</h2>
        <p className="font-[Comic_Sans_MS]">One of the largest spiral galaxies ever found. It’s over five times the size of the Milky Way!</p>
      </div>
	  <img
    src="/src/assets/z13.png"
    alt="AI Robotics"
    className="w-40 h-40 object-contain animate-float"
  />
    </div>

    {/* 14 CR7 */}
    <div className="flex flex-col md:flex-row items-center gap-8">
      <img src="/src/assets/cosmos.jpg" alt="Cosmos Redshift 7 (CR7)"
        className="w-full md:w-1/4 h-auto object-cover rounded-2xl shadow-lg hover:scale-105 transition-transform duration-700" />
      <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-md border border-white/20 md:w-1/2">
        <h2 className="text-2xl font-bold text-blue-200 font-[Comic_Sans_MS] mb-3">🔴 Cosmos Redshift 7 (CR7)</h2>
        <p className="font-[Comic_Sans_MS]">A very distant and ancient galaxy, formed when the universe was young. One of the brightest early galaxies ever discovered.</p>
      </div>
	  <img
    src="/src/assets/z14.png"
    alt="Solar Sail"
    className="w-40 h-40 object-contain animate-float-slow"
  />
    </div>

    {/* 15 Fireworks Galaxy */}
    <div className="flex flex-col md:flex-row-reverse items-center gap-8">
      <img src="/src/assets/Fireworks_Galaxy.jpg" alt="Fireworks Galaxy"
        className="w-full md:w-1/4 h-auto object-cover rounded-2xl shadow-lg hover:scale-105 transition-transform duration-700" />
      <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-md border border-white/20 md:w-1/2">
        <h2 className="text-2xl font-bold text-blue-200 font-[Comic_Sans_MS] mb-3">🎆 Fireworks Galaxy (NGC 6946)</h2>
        <p className="font-[Comic_Sans_MS]">Called the Fireworks Galaxy because it has many supernova explosions. Has had more than 10 supernovas in the last 100 years.</p>
      </div>
	  <img
    src="/src/assets/z15.png"
    alt="AI Robotics"
    className="w-40 h-40 object-contain animate-float"
  />
    </div>

    {/* 16 Antennae Galaxies */}
    <div className="flex flex-col md:flex-row items-center gap-8">
      <img src="/src/assets/anten.jpg" alt="Antennae Galaxies"
        className="w-full md:w-1/4 h-auto object-cover rounded-2xl shadow-lg hover:scale-105 transition-transform duration-700" />
      <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-md border border-white/20 md:w-1/2">
        <h2 className="text-2xl font-bold text-blue-200 font-[Comic_Sans_MS] mb-3">🦋 Antennae Galaxies</h2>
        <p className="font-[Comic_Sans_MS]">Two colliding galaxies that look like insect antennae. The collision causes massive star formation.</p>
      </div>
	  <img
    src="/src/assets/z16.png"
    alt="Small Satellite"
    className="w-40 h-40 object-contain animate-float-slow"
  />
    </div>

    {/* 17 Seyfert Galaxies */}
    <div className="flex flex-col md:flex-row-reverse items-center gap-8">
      <img src="/src/assets/setfert.png" alt="Seyfert Galaxies"
        className="w-full md:w-1/4 h-auto object-cover rounded-2xl shadow-lg hover:scale-105 transition-transform duration-700" />
      <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-md border border-white/20 md:w-1/2">
        <h2 className="text-2xl font-bold text-blue-200 font-[Comic_Sans_MS] mb-3">🔭 Seyfert Galaxies</h2>
        <p className="font-[Comic_Sans_MS]">Special type of spiral galaxy with a very bright center. The brightness comes from a supermassive black hole pulling in gas and dust.</p>
      </div>
	  
    <img
      src="/src/assets/z17.png"
      alt="Animated Galaxy"
      className="w-40 h-40 object-contain animate-float"
    />
	</div>
    
	  <style jsx>{`
    @keyframes float {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      50% { transform: translateY(-20px) rotate(5deg); }
    }
    @keyframes float-slow {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      50% { transform: translateY(-10px) rotate(-5deg); }
    }

    .animate-float {
      animation: float 3s ease-in-out infinite;
    }
    .animate-float-slow {
      animation: float-slow 4s ease-in-out infinite;
    }
  `}</style>

  </div>

  <style jsx>{`
    @keyframes pulse-star {
      0%,100% { transform: translateY(0); opacity: 0.5; }
      50% { transform: translateY(-10px); opacity: 1; }
    }
    .animate-pulse { animation: pulse-star 3s ease-in-out infinite; }
  `}</style>
</div>

{/* End Section */}
  <div className="text-center mt-16">
    <h2 className="text-3xl font-[Comic_Sans_MS] text-yellow-300 animate-bounce">✨ The Universe is Full of Wonders! ✨</h2>
  </div>



      
      
			
			
			</>
				<div className="mt-8 text-center">
					<button
						className="bg-green-500 px-6 py-2 rounded font-bold text-white hover:bg-green-600"
						onClick={() => setShowQuiz(true)}
					>
						🌀 Start Quiz
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