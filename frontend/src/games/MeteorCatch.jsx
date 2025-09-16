// MergeGalaxy.jsx

import React, { useState, useEffect } from 'react';

const planetLevels = [
  { level: 1, emoji: "🌑", value: 1 },
  { level: 2, emoji: "🌓", value: 2 },
  { level: 3, emoji: "🌔", value: 4 },
  { level: 4, emoji: "🌕", value: 8 },
  { level: 5, emoji: "🌖", value: 16 },
  { level: 6, emoji: "🌗", value: 32 },
  { level: 7, emoji: "🌘", value: 64 },
  // Add more levels as desired
];

function MergeGalaxy() {
  const [board, setBoard] = useState([]); // each cell: { id, planetLevel }
  const [selectedId, setSelectedId] = useState(null);

  const boardSize = 9; // 3x3 board

  // initialize board with random level 1 or empty
  const initializeBoard = () => {
    const newBoard = Array.from({ length: boardSize }, (_, idx) => ({
      id: idx,
      planetLevel: Math.random() < 0.6 ? 1 : null,
    }));
    setBoard(newBoard);
    setSelectedId(null);
  };

  useEffect(() => {
    initializeBoard();
  }, []);

  const findPlanetLevel = (level) => {
    return planetLevels.find(p => p.level === level);
  };

  const handleCellClick = (id) => {
    if (selectedId === null) {
      setSelectedId(id);
      return;
    }
    if (selectedId === id) {
      // clicked same cell, deselect
      setSelectedId(null);
      return;
    }
    const cell1 = board.find(c => c.id === selectedId);
    const cell2 = board.find(c => c.id === id);

    // Only merge if same non-null level
    if (
      cell1.planetLevel !== null &&
      cell1.planetLevel === cell2.planetLevel
    ) {
      const newLevel = cell1.planetLevel + 1; // go up one level
      const newBoard = board.map(c => {
        if (c.id === selectedId || c.id === id) {
          return { ...c, planetLevel: c.id === id ? newLevel : null };
        }
        return c;
      });
      setBoard(newBoard);
    }

    setSelectedId(null);
  };

  const isGameOver = () => {
    // For example: no two adjacent same levels, all non-null maybe
    // Simple version: no empty cells
    return board.every(c => c.planetLevel !== null);
  };

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-3xl font-bold mb-4">Merge Galaxy Lite</h1>
      <div className="grid grid-cols-3 gap-4">
        {board.map(cell => {
          const planet = cell.planetLevel ? findPlanetLevel(cell.planetLevel) : null;
          const isSelected = cell.id === selectedId;
          return (
            <div
              key={cell.id}
              onClick={() => handleCellClick(cell.id)}
              className={`w-24 h-24 flex items-center justify-center border-2 rounded-lg cursor-pointer 
                ${isSelected ? 'border-yellow-500' : 'border-gray-600'}
                ${planet ? 'bg-blue-200' : 'bg-gray-800'}
              `}
            >
              {planet ? (
                <span className="text-4xl">{planet.emoji}</span>
              ) : (
                <span className="text-transparent">.</span>
              )}
            </div>
          );
        })}
      </div>
      <div className="mt-4">
        {isGameOver() ? (
          <div className="text-xl font-semibold text-green-500">
            🎉 Game Over – Board Full
          </div>
        ) : null}
      </div>
      <button
        onClick={initializeBoard}
        className="mt-6 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
      >
        Restart
      </button>
    </div>
  );
}

export default MergeGalaxy;
