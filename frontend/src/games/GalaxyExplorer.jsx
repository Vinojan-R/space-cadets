import React, { useEffect, useRef, useState } from "react";
import SpaceBackground from "../components/SpaceBackground";

/**
 * GalaxyExplorer game adapted for site:
 * - Responsive container (no full-screen takeover)
 * - SpaceBackground is rendered behind the game so it matches site visuals
 * - Exported as default GalaxyExplorer to be used on GamePage / games list
 *
 * Note: keeps original game logic (dots, walls, ghosts) but sizes are scaled to fit parent.
 */

export default function GalaxyExplorer({ tileSize = 22 }) {
  const COLS = 21;
  const ROWS = 15;
  const SPEED = 140;

  const rawMap = [
    "111111111111111111111",
    "100000100000000100001",
    "101110101111110101101",
    "101000100000010100101",
    "101011101011110101101",
    "100010001000000100001",
    "111011101011101110111",
    "0000000002P0000000000",
    "111011101011101110111",
    "100010001000000100001",
    "101011101011110101101",
    "101000100000010100101",
    "101110101111110101101",
    "100000100000000100001",
    "111111111111111111111",
  ];

  const initialGrid = rawMap.map((row) =>
    row.split("").map((ch) => {
      if (ch === "1") return 1;
      if (ch === "2") return 2;
      if (ch === "P") return 0;
      return 0;
    })
  );

  const findPlayerStart = () => {
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        if (rawMap[r][c] === "P") return { r, c };
      }
    }
    return { r: 7, c: Math.floor(COLS / 2) };
  };

  const initialGhosts = [
    { r: 3, c: 10, color: "bg-red-500", dir: "left" },
    { r: 3, c: 11, color: "bg-pink-400", dir: "right" },
    { r: 10, c: 9, color: "bg-green-400", dir: "left" },
  ];

  const [grid, setGrid] = useState(initialGrid);
  const [player, setPlayer] = useState(() => findPlayerStart());
  const [dir, setDir] = useState(null);
  const [ghosts, setGhosts] = useState(initialGhosts);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [running, setRunning] = useState(false);
  const [message, setMessage] = useState("Press Start to play");
  const [tick, setTick] = useState(0);

  const dirRef = useRef(null);
  const playerRef = useRef(player);
  const gridRef = useRef(grid);
  const ghostsRef = useRef(ghosts);
  const runningRef = useRef(running);

  useEffect(() => (playerRef.current = player), [player]);
  useEffect(() => (gridRef.current = grid), [grid]);
  useEffect(() => (ghostsRef.current = ghosts), [ghosts]);
  useEffect(() => (runningRef.current = running), [running]);
  useEffect(() => (dirRef.current = dir), [dir]);

  useEffect(() => {
    const handleKey = (e) => {
      if (!runningRef.current && e.key === "Enter") startGame();
      const keyMap = {
        ArrowUp: "up",
        ArrowDown: "down",
        ArrowLeft: "left",
        ArrowRight: "right",
        w: "up",
        s: "down",
        a: "left",
        d: "right",
      };
      const d = keyMap[e.key];
      if (d) setDir(d);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const startGame = () => {
    setGrid(initialGrid.map((r) => r.slice()));
    setPlayer(findPlayerStart());
    setDir(null);
    setGhosts(initialGhosts.map((g) => ({ ...g })));
    setScore(0);
    setLives(3);
    setMessage("Good luck, pilot!");
    setRunning(true);
  };

  const endRound = (lostLife = true) => {
    if (lostLife) {
      const newLives = lives - 1;
      setLives(newLives);
      setMessage(newLives > 0 ? "You lost a life!" : "Game Over");
      setRunning(newLives > 0);
      if (newLives > 0) {
        setPlayer(findPlayerStart());
        setDir(null);
        setGhosts(initialGhosts.map((g) => ({ ...g })));
      }
    } else {
      setRunning(false);
    }
  };

  const wallAt = (r, c) => {
    if (r < 0 || r >= ROWS || c < 0 || c >= COLS) return true;
    return gridRef.current[r][c] === 1;
  };

  const nextGhostDir = (ghost) => {
    const choices = [];
    const dirs = [
      { d: "up", dr: -1, dc: 0 },
      { d: "down", dr: 1, dc: 0 },
      { d: "left", dr: 0, dc: -1 },
      { d: "right", dr: 0, dc: 1 },
    ];
    for (const { d, dr, dc } of dirs) {
      const nr = ghost.r + dr;
      const nc = ghost.c + dc;
      if (!wallAt(nr, nc)) choices.push(d);
    }
    if (choices.length === 0) return "left";
    if (choices.includes(ghost.dir) && Math.random() > 0.3) return ghost.dir;
    return choices[Math.floor(Math.random() * choices.length)];
  };

  useEffect(() => {
    let id;
    if (running) {
      id = setInterval(() => {
        gameTick();
        setTick((t) => t + 1);
      }, SPEED);
    }
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running]);

  const dirToDelta = (d) => {
    if (!d) return { dr: 0, dc: 0 };
    if (d === "up") return { dr: -1, dc: 0 };
    if (d === "down") return { dr: 1, dc: 0 };
    if (d === "left") return { dr: 0, dc: -1 };
    if (d === "right") return { dr: 0, dc: 1 };
    return { dr: 0, dc: 0 };
  };

  const gameTick = () => {
    const cur = playerRef.current;
    let requested = dirRef.current;
    let moved = false;

    if (requested) {
      const { dr, dc } = dirToDelta(requested);
      const nr = cur.r + dr;
      const nc = cur.c + dc;
      if (!wallAt(nr, nc)) {
        setPlayer({ r: nr, c: nc });
        moved = true;
      }
    }

    const newGrid = gridRef.current.map((r) => r.slice());
    const afterPlayer = moved ? playerRef.current : cur;
    if (newGrid[afterPlayer.r][afterPlayer.c] === 0) {
      newGrid[afterPlayer.r][afterPlayer.c] = 2;
      setScore((s) => s + 10);
      setGrid(newGrid);
    }

    const newGhosts = ghostsRef.current.map((g) => ({ ...g }));
    for (let i = 0; i < newGhosts.length; i++) {
      const g = newGhosts[i];
      if (Math.random() > 0.6) g.dir = nextGhostDir(g);
      const { dr, dc } = dirToDelta(g.dir);
      const nr = g.r + dr;
      const nc = g.c + dc;
      if (!wallAt(nr, nc)) {
        g.r = nr;
        g.c = nc;
      } else {
        g.dir = nextGhostDir(g);
      }
    }
    setGhosts(newGhosts);

    const p = moved ? playerRef.current : cur;
    for (const g of newGhosts) {
      if (g.r === p.r && g.c === p.c) {
        endRound(true);
        return;
      }
    }

    let remaining = 0;
    for (let r = 0; r < ROWS; r++)
      for (let c = 0; c < COLS; c++)
        if (newGrid[r][c] === 0) remaining++;
    if (remaining === 0) {
      setMessage("You cleared the sector!");
      setRunning(false);
    }
  };

  const Starfield = () => (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="w-full h-full animate-pulse opacity-30 mix-blend-screen">
        <div className="absolute" style={{ top: "6%", left: "12%", width: 2, height: 2, background: "white", borderRadius: "50%" }} />
        <div className="absolute" style={{ top: "28%", left: "78%", width: 3, height: 3, background: "#fff", borderRadius: "50%" }} />
        <div className="absolute" style={{ top: "68%", left: "42%", width: 2, height: 2, background: "#fff", borderRadius: "50%" }} />
      </div>
    </div>
  );

  const renderTile = (val, r, c, size) => {
    const key = `${r}-${c}`;
    if (val === 1) {
      return (
        <div key={key} style={{ width: size, height: size }} className="flex items-center justify-center">
          <div className="w-full h-full rounded-sm shadow-inner" style={{ background: "linear-gradient(135deg,#071427,#162033)" }} />
        </div>
      );
    }
    const isPlayer = player.r === r && player.c === c;
    const ghostHere = ghosts.some((g) => g.r === r && g.c === c);
    return (
      <div key={key} style={{ width: size, height: size }} className="flex items-center justify-center">
        {val === 0 && <div style={{ width: Math.max(2, size * 0.12), height: Math.max(2, size * 0.12) }} className="rounded-full bg-amber-300" />}
        {val === 2 && <div style={{ width: 1, height: 1 }} />}
        {isPlayer && <div style={{ width: Math.max(8, size * 0.6), height: Math.max(8, size * 0.6), background: "radial-gradient(circle at 30% 30%, #fff176, #f59e0b)" }} className="rounded-full shadow-md" />}
        {ghostHere && (
          <div style={{ width: Math.max(8, size * 0.6), height: Math.max(8, size * 0.6) }} className="rounded-full flex items-center justify-center shadow" >
            <div style={{ width: Math.max(4, size * 0.3), height: Math.max(4, size * 0.3), background: "#fff" }} className="rounded-full" />
          </div>
        )}
      </div>
    );
  };

  // compute tile size with given prop but keep it responsive on small screens
  const effectiveTile = Math.max(16, Math.min(28, tileSize));

  return (
    <div className="relative w-full">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <SpaceBackground />
      </div>

      <div className="mx-auto p-4">
        <div className="relative p-4 rounded-2xl bg-gradient-to-br from-slate-900/60 to-black/60 shadow-xl border border-slate-800 max-w-full">
          <Starfield />

          <div className="flex flex-col md:flex-row gap-6 relative z-10">
            <div className="flex-1">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-semibold">Galaxy Explorer</h2>
                <div className="text-sm text-slate-400">Score: {score} • Lives: {lives}</div>
              </div>

              <div className="rounded-lg bg-[#071227] p-3 inline-block" style={{ width: COLS * (effectiveTile + 2) }}>
                <div style={{ display: "grid", gridTemplateColumns: `repeat(${COLS}, ${effectiveTile}px)`, gap: 2 }}>
                  {grid.map((row, r) => row.map((val, c) => renderTile(val, r, c, effectiveTile)))}
                </div>
              </div>

              <div className="mt-3 flex gap-2">
                <button onClick={() => (running ? setRunning(false) : startGame())} className="px-3 py-2 rounded bg-indigo-600 hover:bg-indigo-500">
                  {running ? "Pause" : "Start"}
                </button>
                <button
                  onClick={() => {
                    setRunning(false);
                    setGrid(initialGrid.map((r) => r.slice()));
                    setPlayer(findPlayerStart());
                    setGhosts(initialGhosts.map((g) => ({ ...g })));
                    setScore(0);
                    setLives(3);
                    setMessage("Ready");
                  }}
                  className="px-3 py-2 rounded bg-slate-700 hover:bg-slate-600"
                >
                  Reset
                </button>
                <button onClick={() => setMessage("Tip: Arrow keys or WASD to move")} className="px-3 py-2 rounded bg-slate-700 hover:bg-slate-600">
                  Help
                </button>
              </div>
            </div>

            <div className="w-64 p-3 rounded-lg bg-black/40 border border-slate-800">
              <h3 className="font-medium">Pilot Console</h3>
              <p className="text-sm text-slate-400 mb-3">Navigate the labyrinth, collect chips and avoid phantoms.</p>

              <div className="text-xs text-slate-400">Status</div>
              <div className="font-semibold mb-2">{running ? "ENGAGED" : "IDLE"}</div>
              <div className="text-sm text-amber-300 mb-3">{message}</div>

              <div className="text-xs text-slate-400">Controls</div>
              <div className="text-sm">Arrow keys or WASD to move. Enter to start.</div>
            </div>
          </div>

          <div className="absolute left-4 bottom-3 text-xs text-slate-500">GalaxyExplorer • Embedded Game</div>
        </div>
      </div>
    </div>
  );
}
