import { useState, useEffect } from "react";

export default function MeteorCatch() {
  const [meteors, setMeteors] = useState([]);
  const [score, setScore] = useState(0);

  // Generate random meteors
  useEffect(() => {
    const interval = setInterval(() => {
      setMeteors((prevMeteors) => [
        ...prevMeteors,
        {
          id: Date.now(),
          x: Math.random() * 90 + 5, // Random position (5% to 95%)
          y: Math.random() * 80 + 10, // Random position (10% to 90%)
        },
      ]);
    }, 1000); // Add a new meteor every second

    return () => clearInterval(interval);
  }, []);

  // Remove a meteor when clicked
  const catchMeteor = (id) => {
    setMeteors((prevMeteors) => prevMeteors.filter((meteor) => meteor.id !== id));
    setScore((prevScore) => prevScore + 1);
  };

  return (
    <div className="relative w-full h-full text-center">
      <h2 className="text-2xl font-bold mb-4">☄️ Meteor Catch</h2>
      <p className="mb-4">Catch the meteors before they hit the ground!</p>
      <div className="relative w-full h-96 bg-black rounded-lg overflow-hidden border-4 border-red-500">
        {meteors.map((meteor) => (
          <div
            key={meteor.id}
            className="absolute w-6 h-6 bg-red-400 rounded-full shadow-lg cursor-pointer hover:scale-125 transition-transform"
            style={{
              left: `${meteor.x}%`,
              top: `${meteor.y}%`,
            }}
            onClick={() => catchMeteor(meteor.id)}
          ></div>
        ))}
      </div>
      <div className="mt-4">
        <h3 className="text-xl font-bold">Score: {score}</h3>
      </div>
    </div>
  );
}