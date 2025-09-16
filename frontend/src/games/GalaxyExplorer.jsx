import { useState, useEffect } from "react";

// List of space-themed cards
const spaceCards = ["🌍", "🌙", "☀️", "⭐", "🪐", "🚀", "🛰️", "🌌"];

export default function SpaceMemoryGame() {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);

  // Shuffle and start game
  const startGame = () => {
    const shuffled = [...spaceCards, ...spaceCards]
      .sort(() => Math.random() - 0.5)
      .map((card, index) => ({ id: index, value: card }));
    setCards(shuffled);
    setFlipped([]);
    setMatched([]);
    setMoves(0);
  };

  useEffect(() => {
    startGame();
  }, []);

  // Handle card click
  const handleFlip = (id) => {
    if (flipped.length === 2 || flipped.includes(id) || matched.includes(id)) return;

    const newFlipped = [...flipped, id];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(moves + 1);
      const [first, second] = newFlipped.map(
        (flipId) => cards.find((c) => c.id === flipId)
      );

      if (first.value === second.value) {
        setMatched([...matched, first.id, second.id]);
      }

      setTimeout(() => setFlipped([]), 800);
    }
  };

  return (
    <div className="flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-4">🚀 Space Memory Game</h1>
      <p className="mb-4">Moves: {moves}</p>
      <div className="grid grid-cols-4 gap-4">
        {cards.map((card) => {
          const isFlipped = flipped.includes(card.id) || matched.includes(card.id);
          return (
            <div
              key={card.id}
              onClick={() => handleFlip(card.id)}
              className={`w-20 h-20 flex items-center justify-center text-3xl cursor-pointer rounded-xl shadow-md 
                ${isFlipped ? "bg-indigo-600 text-white" : "bg-gray-800 text-transparent"}
              `}
            >
              {isFlipped ? card.value : "?"}
            </div>
          );
        })}
      </div>
      <button
        onClick={startGame}
        className="mt-6 px-4 py-2 bg-green-600 text-white rounded-xl shadow hover:bg-green-700"
      >
        🔄 Restart Game
      </button>
    </div>
  );
}
