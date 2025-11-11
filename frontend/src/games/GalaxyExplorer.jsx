import { useState, useEffect } from "react";

export default function SpaceColonyBuilder() {
  const [energy, setEnergy] = useState(0);
  const [buildings, setBuildings] = useState([]);
  const [message, setMessage] = useState("Welcome Commander! 🌌");
  const [autoEnergy, setAutoEnergy] = useState(0);

  // Energy auto-generation from buildings
  useEffect(() => {
    const interval = setInterval(() => {
      setEnergy((prev) => prev + autoEnergy);
    }, 1000);
    return () => clearInterval(interval);
  }, [autoEnergy]);

  // Building data
  const buildingTypes = [
    { name: "Habitat", cost: 10, energyBoost: 0, img: "/images/habitat.png" },
    { name: "Solar Panel", cost: 20, energyBoost: 1, img: "/images/solar_panel.png" },
    { name: "Research Lab", cost: 50, energyBoost: 3, img: "/images/lab.png" },
  ];

  const handleCollect = () => {
    setEnergy((prev) => prev + 1);
  };

  const buildStructure = (type) => {
    if (energy >= type.cost) {
      setEnergy((prev) => prev - type.cost);
      setBuildings((prev) => [...prev, type]);
      setAutoEnergy((prev) => prev + type.energyBoost);
      setMessage(`Built a new ${type.name}! 🚀`);
    } else {
      setMessage(`Not enough energy to build ${type.name}! ⚡`);
    }
  };

  return (
    <div
      className="relative w-full h-screen flex flex-col items-center justify-center bg-cover bg-center text-white"
      style={{
        backgroundImage: "url('/images/planet_bg.png')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Game UI */}
      <div className="relative z-10 flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-4">🪐 Space Colony Builder</h1>

        {/* Astronaut */}
        <img
          src="/images/astronaut.png"
          alt="Astronaut"
          className="w-32 h-32 animate-bounce mb-4"
        />

        <p className="text-lg mb-4">{message}</p>

        <div className="flex items-center gap-6 mb-6">
          <button
            onClick={handleCollect}
            className="bg-yellow-500 px-6 py-3 rounded-xl text-lg shadow-lg hover:bg-yellow-600"
          >
            ⚡ Collect Energy
          </button>
          <p className="text-xl">Energy: {energy}</p>
        </div>

        <div className="grid grid-cols-3 gap-6 mb-6">
          {buildingTypes.map((b, i) => (
            <button
              key={i}
              onClick={() => buildStructure(b)}
              className="bg-indigo-600 hover:bg-indigo-700 p-4 rounded-xl shadow-lg flex flex-col items-center"
            >
              <img src={b.img} alt={b.name} className="w-16 h-16 mb-2" />
              <p className="font-semibold">{b.name}</p>
              <p className="text-sm">Cost: {b.cost}</p>
            </button>
          ))}
        </div>

        {/* Colony Display */}
        <div className="flex flex-wrap justify-center gap-4 mt-4 max-w-3xl">
          {buildings.map((b, index) => (
            <img
              key={index}
              src={b.img}
              alt={b.name}
              className="w-20 h-20 drop-shadow-lg transition-transform hover:scale-110"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
