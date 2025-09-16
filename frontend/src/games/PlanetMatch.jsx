// SpaceShooter.jsx
import React, { useState, useEffect, useRef } from "react";

const planetEmojis = ["🪐", "🌍", "☀️", "🌕", "⭐"];

export default function SpaceShooter() {
  const [grid, setGrid] = useState([]);
  const [current, setCurrent] = useState(null);
  const [shooterPos, setShooterPos] = useState(5); // shooter column
  const rows = 6;
  const cols = 9;

  // Initialize grid with random planets
  useEffect(() => {
    const initial = Array.from({ length: rows }, (_, r) =>
      Array.from({ length: cols }, (_, c) =>
        r < 3 ? planetEmojis[Math.floor(Math.random() * planetEmojis.length)] : null
      )
    );
    setGrid(initial);
    spawnNew();
  }, []);

  // Spawn a new planet to shoot
  const spawnNew = () => {
    const next = planetEmojis[Math.floor(Math.random() * planetEmojis.length)];
    setCurrent(next);
  };

  // Shoot the planet into the grid
  const shoot = () => {
    if (!current) return;
    // Place in the first empty cell in that column from bottom up
    const newGrid = [...grid.map(row => [...row])];
    for (let r = rows - 1; r >= 0; r--) {
      if (!newGrid[r][shooterPos]) {
        newGrid[r][shooterPos] = current;
        break;
      }
    }
    setGrid(newGrid);
    spawnNew();
  };

  // Move shooter left/right
  const moveLeft = () => setShooterPos((p) => Math.max(0, p - 1));
  const moveRight = () => setShooterPos((p) => Math.min(cols - 1, p + 1));

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-3xl font-bold mb-4">🚀 Space Bubble Shooter</h1>

      <div className="grid gap-1"
        style={{
          gridTemplateColumns: `repeat(${cols}, 40px)`
        }}
      >
        {grid.map((row, r) =>
          row.map((cell, c) => (
            <div
              key={`${r}-${c}`}
              className="w-10 h-10 flex items-center justify-center border border-gray-600 rounded bg-black text-2xl"
            >
              {cell || ""}
            </div>
          ))
        )}
      </div>

      {/* Shooter row */}
      <div className="grid gap-1 mt-2"
        style={{
          gridTemplateColumns: `repeat(${cols}, 40px)`
        }}
      >
        {Array.from({ length: cols }, (_, c) => (
          <div
            key={c}
            className={`w-10 h-10 flex items-center justify-center rounded 
              ${c === shooterPos ? "bg-yellow-600" : "bg-gray-800"}
            `}
          >
            {c === shooterPos && current ? current : ""}
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="flex gap-3 mt-4">
        <button onClick={moveLeft} className="px-4 py-2 bg-blue-600 text-white rounded-lg">⬅️</button>
        <button onClick={shoot} className="px-4 py-2 bg-green-600 text-white rounded-lg">🚀 Shoot</button>
        <button onClick={moveRight} className="px-4 py-2 bg-blue-600 text-white rounded-lg">➡️</button>
      </div>
    </div>
  );
}
