import { useState } from "react";
import SpaceBackground from "../components/SpaceBackground";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";


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
	const [showQuiz, setShowQuiz] = useState(false);
	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [score, setScore] = useState(0);
	const [showBadge, setShowBadge] = useState(false);
	const [showScore, setShowScore] = useState(false);
	const [selectedAnswer, setSelectedAnswer] = useState(null);

	const handleAnswer = (answer) => {
		setSelectedAnswer(answer);
		if (answer === newTechnologiesQuizQuestions[currentQuestion].correct) {
			setScore(score + 1);
		}
		setTimeout(() => {
			if (currentQuestion < newTechnologiesQuizQuestions.length - 1) {
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
		}, 1000); // Delay to show feedback test
	};

	return (
		<div className="min-h-screen flex flex-col text-white relative">
			<SpaceBackground />
			<Header activePage="newtechnologies" />
			<SearchBar data={technologies} />
			<main className="flex-grow flex flex-col items-center justify-center p-4">
				{/* Edit */}


  <div className="flex flex-col items-center justify-center  text-white p-8">
  {/* Animated Title */}
  <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-glow text-center">
    🚀 New Space Technology
  </h1>

  {/* Animated Subtitle */}
  <p className="text-xl md:text-2xl text-gray-300 text-center max-w-2xl animate-fadeIn">
    Discover the latest innovations in space travel, satellites, AI robotics, and futuristic exploration.
  </p>

 
  <style jsx>{`
    /* Glow effect for title */
    @keyframes glow {
      0%, 100% {
        text-shadow: 0 0 10px #00ffff, 0 0 20px #00ffff, 0 0 30px #00ffff;
      }
      50% {
        text-shadow: 0 0 20px #00ffff, 0 0 40px #00ffff, 0 0 60px #00ffff;
      }
    }
    .animate-glow {
      animation: glow 2s ease-in-out infinite;
    }

    /* Fade in for subtitle */
    @keyframes fadeIn {
      0% { opacity: 0; transform: translateY(20px); }
      100% { opacity: 1; transform: translateY(0); }
    }
    .animate-fadeIn {
      animation: fadeIn 2s ease forwards;
    }
  `}</style>
</div>

<div className="relative bg-transparent flex flex-wrap gap-18 justify-center items-start p-8">
  {/* Example images */}
  <img
    src="/src/assets/xx.png"
    alt="Reusable Rocket"
    className="w-40 h-40 object-contain animate-float"
  />
  <img
    src="/src/assets/tt.png"
    alt="Small Satellite"
    className="w-40 h-40 object-contain animate-float-slow"
  />
  <img
    src="/src/assets/rr.png"
    alt="AI Robotics"
    className="w-40 h-40 object-contain animate-float"
  />
  <img
    src="/src/assets/ii.png"
    alt="Solar Sail"
    className="w-40 h-40 object-contain animate-float-slow"
  />

  {/* Animation styles */}
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
			

 <div className="flex flex-col items-center justify-center min-h-screen  text-white overflow-hidden">
  {/* Glass Transparent Box */}
  <div className="relative bg-transparant backdrop-blur border border-white/20 rounded-2xl p-8 max-w-lg text-center shadow-lg animate-fadeIn">
    <h1 className="text-3xl font-bold mb-4">🪐 What is New Space Technology?</h1>
    <p className="text-lg leading-relaxed">
      New space technology means new machines and tools that help people go to space,
      study planets, and live in space more easily and safely.
    </p>

    {/* Cartoon Rocket Animation */}
    <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2">
      {/* Rocket */}
      <div className="relative text-6xl animate-rocket">
        🚀
        {/* Smoke / Stars Trail */}
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2">
          {[...Array(5)].map((_, i) => (
            <span
              key={i}
              className="block w-1 h-1 bg-white rounded-full opacity-70 animate-trail"
              style={{ animationDelay: `${i * 0.2}s` }}
            ></span>
          ))}
        </div>
      </div>
    </div>
  </div>

  {/* Inline Animation Styles */}
  <style jsx>{`
    @keyframes fadeIn {
      0% { opacity: 0; transform: translateY(20px); }
      100% { opacity: 1; transform: translateY(0); }
    }

    @keyframes rocketFly {
      0% { transform: translateX(-50%) translateY(0) rotate(0deg); }
      25% { transform: translateX(-50%) translateY(-40px) rotate(10deg); }
      50% { transform: translateX(-50%) translateY(-60px) rotate(-10deg); }
      75% { transform: translateX(-50%) translateY(-40px) rotate(5deg); }
      100% { transform: translateX(-50%) translateY(0) rotate(0deg); }
    }

    @keyframes trail {
      0% { opacity: 0.8; transform: translateY(0) scale(1); }
      50% { opacity: 0.4; transform: translateY(10px) scale(0.8); }
      100% { opacity: 0; transform: translateY(20px) scale(0.6); }
    }

    .animate-fadeIn { animation: fadeIn 1s ease-out forwards; }
    .animate-rocket { animation: rocketFly 3s ease-in-out infinite; }
    .animate-trail { animation: trail 1s ease-in-out infinite; }
  `}</style>
</div>



	 <div className="relative min-h-screen bg-gradient-to-b from-black via-blue-900 to-black text-white  p-8 overflow-hidden">
      {/* Stars */}
      <div className="absolute top-10 left-20 w-1 h-1 bg-white rounded-full opacity-70 animate-pulse"></div>
      <div className="absolute top-1/3 left-1/2 w-1 h-1 bg-white rounded-full opacity-70 animate-ping"></div>
      <div className="absolute top-2/3 left-1/3 w-1 h-1 bg-white rounded-full opacity-70 animate-pulse"></div>
      <div className="absolute top-1/4 left-3/4 w-1 h-1 bg-white rounded-full opacity-70 animate-ping"></div>

      {/* Flying Rocket */}
      <img
        src="https://cdn-icons-png.flaticon.com/512/3212/3212608.png"
        alt="Rocket"
        className="w-20 absolute animate-rocket"
      />

      {/* Title */}
      <h1 className="text-4xl font-bold text-white mb-8 text-center">
        🚀 New Space Technologies
      </h1>

      {/* Grid of Technologies */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
        {/* 1. Reusable Rockets */}
        <div className="glass p-5 rounded-2xl">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3212/3212608.png"
            alt="Rocket"
            className="w-16 mb-3 animate-spin-slow"
          />
          <h2 className="text-xl font-semibold">1. Reusable Rockets</h2>
          <p>Rockets that can land safely and be used again. Example: SpaceX’s Falcon 9.</p>
          <p className="text-sm text-gray-300">💡 Saves money and makes space travel faster and cheaper.</p>
        </div>

        {/* 2. Small Satellites */}
        <div className="glass p-5 rounded-2xl">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3043/3043936.png"
            alt="Satellite"
            className="w-16 mb-3 animate-pulse"
          />
          <h2 className="text-xl font-semibold">2. Small Satellites (CubeSats)</h2>
          <p>Mini satellites used for studying Earth and communication.</p>
          <p className="text-sm text-gray-300">🛰️ Low cost and can be launched in large numbers.</p>
        </div>

        {/* 3. AI and Robotics */}
        <div className="glass p-5 rounded-2xl">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4712/4712105.png"
            alt="Robot"
            className="w-16 mb-3 animate-bounce"
          />
          <h2 className="text-xl font-semibold">3. AI and Robotics in Space</h2>
          <p>AI helps spacecraft decide; robots explore and collect samples.</p>
          <p className="text-sm text-gray-300">🤖 Example: NASA’s Perseverance rover and Ingenuity drone.</p>
        </div>

        {/* 4. Solar Sail */}
        <div className="glass p-5 rounded-2xl">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2974/2974857.png"
            alt="Sun"
            className="w-16 mb-3 animate-pulse"
          />
          <h2 className="text-xl font-semibold">4. Solar Sail Technology</h2>
          <p>Uses sunlight to move spacecraft — no fuel needed.</p>
          <p className="text-sm text-gray-300">☀️ Eco-friendly way to travel long distances.</p>
        </div>

        {/* 5. 3D Printing */}
        <div className="glass p-5 rounded-2xl">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2721/2721290.png"
            alt="3D Printer"
            className="w-16 mb-3 animate-bounce"
          />
          <h2 className="text-xl font-semibold">5. 3D Printing in Space</h2>
          <p>Astronauts can print tools and parts in space.</p>
          <p className="text-sm text-gray-300">🧪 Reduces need to carry everything from Earth.</p>
        </div>

        {/* 6. Lunar & Mars Bases */}
        <div className="glass p-5 rounded-2xl">
          <img
            src="https://cdn-icons-png.flaticon.com/512/706/706164.png"
            alt="Base"
            className="w-16 mb-3 animate-pulse"
          />
          <h2 className="text-xl font-semibold">6. Lunar & Mars Bases</h2>
          <p>Building homes using Moon or Mars soil.</p>
          <p className="text-sm text-gray-300">🌑 Supports long-term human living beyond Earth.</p>
        </div>

        {/* 7. Space Internet (Starlink) */}
        <div className="glass p-5 rounded-2xl">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2972/2972156.png"
            alt="Internet Satellite"
            className="w-16 mb-3 animate-spin-slow"
          />
          <h2 className="text-xl font-semibold">7. Space Internet (Starlink)</h2>
          <p>A network of thousands of satellites giving internet to all areas.</p>
          <p>Created by: SpaceX.</p>
          <p className="text-sm text-gray-300">
            📡 Brings internet to rural and remote parts of the world.
          </p>
        </div>

        {/* 8. Space Mining */}
        <div className="glass p-5 rounded-2xl">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3829/3829437.png"
            alt="Mining"
            className="w-16 mb-3 animate-bounce"
          />
          <h2 className="text-xl font-semibold">8. Space Mining</h2>
          <p>Getting metals and minerals from asteroids or the Moon.</p>
          <p className="text-sm text-gray-300">
            🧬 Could give materials for fuel, construction, and electronics.
          </p>
        </div>

        <div className="glass p-5 rounded-2xl">
  <img
    src="https://cdn-icons-png.flaticon.com/512/3236/3236372.png" // ✅ reliable icon
    alt="Quantum Communication"
    className="w-16 mb-3 animate-spin-slow"
  />
  <h2 className="text-xl font-semibold">9. Quantum Communication</h2>
  <p>Super-secure communication using quantum technology.</p>
  <p className="text-sm text-gray-300">
    🧠 Prevents hacking and keeps data 100% safe.
  </p>
</div>

        {/* 10. Hypersonic & Nuclear Propulsion */}
        <div className="glass p-5 rounded-2xl">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2907/2907616.png"
            alt="Propulsion"
            className="w-16 mb-3 animate-bounce"
          />
          <h2 className="text-xl font-semibold">10. Hypersonic & Nuclear Propulsion</h2>
          <p>Hypersonic engines travel 5x faster than sound.</p>
          <p>Nuclear propulsion uses nuclear energy for deep-space travel.</p>
          <p className="text-sm text-gray-300">
            🚀 Cuts travel time to Mars from months to weeks.
          </p>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes rocket {
          0% {
            transform: translate(-10%, 100%) rotate(20deg);
            opacity: 0;
          }
          30% {
            opacity: 1;
          }
          60% {
            transform: translate(60vw, 30vh) rotate(10deg);
          }
          100% {
            transform: translate(110vw, -20vh) rotate(15deg);
            opacity: 0;
          }
        }

        .animate-rocket {
          animation: rocket 10s linear infinite;
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .animate-spin-slow {
          animation: spin-slow 10s linear infinite;
        }

        .glass {
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          transition: transform 0.4s ease, box-shadow 0.4s ease;
        }

        .glass:hover {
          transform: translateY(-6px) scale(1.03);
          box-shadow: 0 10px 25px rgba(255, 255, 255, 0.25);
        }
      `}</style>
    </div>
			
			 {/* Common Heading */}
  <h1 className="text-4xl md:text-3xl font-bold mb-8 animate-glow mt-8">
    🚀 New Space Technology Images
  </h1>
			
 
		<div className="flex flex-wrap gap-6 p-8 text-white justify-center">
			
  {/* 1. Reusable Rockets */}
  <div className="flex flex-col bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-2xl w-60 animate-slideInLeft delay-0">
    <img src="/src/assets/1. Reusable Rockets.jpg" alt="Reusable Rockets" className="w-50 mb-3" />
    <h2 className="text-xl font-semibold mb-2">1. Reusable Rockets</h2>
  </div>

  {/* 2. Small Satellites */}
  <div className="flex flex-col bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-2xl w-60 animate-slideInRight delay-100">
    <img src="/src/assets/small.webp" alt="Small Satellites" className="w-50 mb-3 " />
    <h2 className="text-xl font-semibold mb-2">2. Small Satellites</h2>
  </div>

  {/* 3. AI and Robotics */}
  <div className="flex flex-col bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-2xl w-60 animate-slideInLeft delay-200">
    <img src="/src/assets/AI and Robotics in Space.webp" alt="AI Robotics" className="w-50 mb-3 " />
    <h2 className="text-xl font-semibold mb-2">3. AI and Robotics in Space</h2>
  </div>

  {/* 4. Solar Sail */}
  <div className="flex flex-col bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-2xl w-60 animate-slideInRight delay-300">
    <img src="/src/assets/Solar Sail Technology.jpg" alt="Solar Sail" className="w-50 mb-3 " />
    <h2 className="text-xl font-semibold mb-2">4. Solar Sail Technology</h2>
  </div>

  {/* 5. 3D Printing */}
  <div className="flex flex-col bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-2xl w-60 animate-slideInLeft delay-400">
    <img src="/src/assets/3D Printing in Space.jpg" alt="3D Printing" className="w-50 mb-3 " />
    <h2 className="text-xl font-semibold mb-2">5. 3D Printing in Space</h2>
  </div>

  {/* 6. Lunar & Mars Bases */}
  <div className="flex flex-col bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-2xl w-60 animate-slideInRight delay-500">
    <img src="/src/assets/Lunar and Mars Bases.webp" alt="Lunar Mars Bases" className="w-50 mb-3 " />
    <h2 className="text-xl font-semibold mb-2">6. Lunar & Mars Bases</h2>
  </div>

  {/* 7. Space Internet */}
  <div className="flex flex-col bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-2xl w-60 animate-slideInLeft delay-600">
    <img src="/src/assets/Space Internet (Starlink).webp" alt="Space Internet" className="w-50 mb-3 " />
    <h2 className="text-xl font-semibold mb-2">7. Space Internet (Starlink)</h2>
  </div>

  {/* 8. Space Mining */}
  <div className="flex flex-col bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-2xl w-60 animate-slideInRight delay-700">
    <img src="/src/assets/Space Mining.jpg" alt="Space Mining" className="w-50 mb-3 " />
    <h2 className="text-xl font-semibold mb-2">8. Space Mining</h2>
  </div>

  {/* 9. Quantum Communication */}
  <div className="flex flex-col bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-2xl w-60 animate-slideInLeft delay-800">
    <img src="/src/assets/Quantum Communication.jpg" alt="Quantum Communication" className="w-50 mb-3 " />
    <h2 className="text-xl font-semibold mb-2">9. Quantum Communication</h2>
  </div>

  {/* 10. Hypersonic & Nuclear Propulsion */}
  <div className="flex flex-col bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-2xl w-60 animate-slideInRight delay-900">
    <img src="/src/assets/Hypersonic and Nuclear Propulsion.webp" alt="Hypersonic Nuclear Propulsion" className="w-50 mb-3" />
    <h2 className="text-xl font-semibold mb-2">10. Hypersonic & Nuclear Propulsion</h2>
  </div>

</div>

<div className="relative bg-transparent flex flex-wrap gap-28 justify-center items-start p-0.5">
  {/* Example images */}
  <img
    src="/src/assets/aa.png"
    alt="Reusable Rocket"
    className="w-40 h-40 object-contain animate-float"
  />
  <img
    src="/src/assets/qq.png"
    alt="Small Satellite"
    className="w-40 h-40 object-contain animate-float-slow"
  />
  <img
    src="/src/assets/cc.png"
    alt="AI Robotics"
    className="w-40 h-40 object-contain animate-float"
  />
  <img
    src="/src/assets/dd.png"
    alt="Solar Sail"
    className="w-40 h-40 object-contain animate-float-slow"
  />

  {/* Animation styles */}
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
			
			
			
			
				<div className="mt-8 text-center">
					<button
						className="bg-green-500 px-6 py-2 rounded font-bold text-white hover:bg-green-400"
						onClick={() => setShowQuiz(true)}
					>
						🚀 Start Quiz
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
								{
									newTechnologiesQuizQuestions[currentQuestion]
										.question
								}
							</p>
							<div className="grid grid-cols-1 gap-4">
								{newTechnologiesQuizQuestions[
									currentQuestion
								].options.map((option, idx) => (
									<button
										key={idx}
										className={`px-4 py-2 rounded ${
											selectedAnswer === option
												? option ===
												  newTechnologiesQuizQuestions[
														currentQuestion
												  ].correct
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
								You earned a badge for scoring{" "}
								{score}/15 correct answers!
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
							<h2 className="text-xl font-bold mb-4">
								Your Score: {score}/15
							</h2>
							<p className="text-lg mb-4">
								Try again next time to earn the badge!
							</p>
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