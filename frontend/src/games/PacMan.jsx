import React, { useEffect, useRef, useState } from "react";

/*
  Fixed Pac-Man clone:
  - uses refs (gridRef, pacRef, dirRef) so movement and ghost loops see latest state
  - robust BFS nextStep function
  - clears intervals on unmount
  - Close button provided (calls onClose prop)
*/

const TILE = {
  WALL: 1,
  PELLET: 0,
  EMPTY: 2,
  POWER: 3,
  PAC: "P",
};

const BASE_MAP = [
  // 21x11 compact-ish maze
  "111111111111111111111",
  "100000000100000000001",
  "101110111101110111101",
  "103000000000000000301",
  "101011101111011101101",
  "100000100P001000000001",
  "101011101111011101101",
  "103000000000000000301",
  "101110111101110111101",
  "100000000100000000001",
  "111111111111111111111",
];

function parseMap(raw) {
  return raw.map((row) =>
    row.split("").map((ch) => {
      if (ch === "1") return TILE.WALL;
      if (ch === "0") return TILE.PELLET;
      if (ch === "3") return TILE.POWER;
      if (ch === "P") return TILE.PAC;
      return TILE.EMPTY;
    })
  );
}
function cloneGrid(g) { return g.map(r => r.slice()); }

function findPos(grid, val) {
  for (let r = 0; r < grid.length; r++) for (let c = 0; c < grid[0].length; c++) if (grid[r][c] === val) return { r, c };
  return null;
}

function neighbors(grid, r, c) {
  const out = [];
  const dirs = [{ dr: -1, dc: 0 }, { dr: 1, dc: 0 }, { dr: 0, dc: -1 }, { dr: 0, dc: 1 }];
  for (const { dr, dc } of dirs) {
    const nr = r + dr, nc = c + dc;
    if (nr >= 0 && nr < grid.length && nc >= 0 && nc < grid[0].length && grid[nr][nc] !== TILE.WALL) out.push({ r: nr, c: nc });
  }
  return out;
}

// BFS returns next cell from 'from' toward 'to', or null
function nextStepBFS(grid, from, to) {
  if (!from || !to) return null;
  const R = grid.length, C = grid[0].length;
  const q = [];
  const seen = Array.from({ length: R }, () => Array(C).fill(false));
  const parent = Array.from({ length: R }, () => Array(C).fill(null));
  q.push(from);
  seen[from.r][from.c] = true;
  while (q.length) {
    const cur = q.shift();
    if (cur.r === to.r && cur.c === to.c) break;
    for (const nb of neighbors(grid, cur.r, cur.c)) {
      if (!seen[nb.r][nb.c]) {
        seen[nb.r][nb.c] = true;
        parent[nb.r][nb.c] = cur;
        q.push(nb);
      }
    }
  }
  if (!seen[to.r][to.c]) return null;
  // backtrack to find immediate neighbor from 'from'
  let cur = to;
  while (parent[cur.r][cur.c] && !(parent[cur.r][cur.c].r === from.r && parent[cur.r][cur.c].c === from.c)) {
    cur = parent[cur.r][cur.c];
  }
  // if parent is null and cur equals from, pick any neighbor leading to target (fallback)
  if (cur.r === from.r && cur.c === from.c) {
    for (const nb of neighbors(grid, from.r, from.c)) {
      const test = nextStepBFS_simple(grid, nb, to, 200);
      if (test) return nb;
    }
    return null;
  }
  return cur;
}

// very small helper to avoid recursion blow for fallback - limited depth
function nextStepBFS_simple(grid, from, to, limit = 200) {
  const R = grid.length, C = grid[0].length;
  const q = [];
  const seen = Array.from({ length: R }, () => Array(C).fill(false));
  q.push(from); seen[from.r][from.c] = true;
  let steps = 0;
  while (q.length && steps++ < limit) {
    const cur = q.shift();
    if (cur.r === to.r && cur.c === to.c) return true;
    for (const nb of neighbors(grid, cur.r, cur.c)) {
      if (!seen[nb.r][nb.c]) { seen[nb.r][nb.c] = true; q.push(nb); }
    }
  }
  return false;
}

export default function PacMan({ onClose }) {
  const initialGrid = useRef(parseMap(BASE_MAP));
  const [grid, setGrid] = useState(cloneGrid(initialGrid.current));
  const gridRef = useRef(grid);
  gridRef.current = grid;

  const startPac = findPos(initialGrid.current, TILE.PAC) || { r: 5, c: 10 };
  const [pac, setPac] = useState(startPac);
  const pacRef = useRef(pac);
  pacRef.current = pac;

  const [dir, setDir] = useState(null);
  const dirRef = useRef(dir);
  dirRef.current = dir;

  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [pelletsRemaining, setPelletsRemaining] = useState(() =>
    initialGrid.current.flat().filter(v => v === TILE.PELLET || v === TILE.POWER).length
  );

  const [msg, setMsg] = useState("");
  const [ghosts, setGhosts] = useState([
    { id: "blinky", r: 5, c: 9, color: "red", vulnerable: false },
    { id: "pinky", r: 5, c: 11, color: "pink", vulnerable: false },
    { id: "inky", r: 4, c: 10, color: "cyan", vulnerable: false },
    { id: "clyde", r: 6, c: 10, color: "orange", vulnerable: false },
  ]);
  const ghostsRef = useRef(ghosts);
  ghostsRef.current = ghosts;

  const [pacSpeed, setPacSpeed] = useState(180);
  const [ghostSpeed, setGhostSpeed] = useState(480);

  const vulnerableUntilRef = useRef(0);
  const moveIntervalRef = useRef(null);
  const ghostIntervalRef = useRef(null);

  // keyboard
  useEffect(() => {
    const onKey = (e) => {
      const m = { ArrowUp: "up", w: "up", ArrowDown: "down", s: "down", ArrowLeft: "left", a: "left", ArrowRight: "right", d: "right" };
      const d = m[e.key];
      if (d) {
        setDir(d);
        dirRef.current = d;
      }
      if (e.key === "Escape" && typeof onClose === "function") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  // Pac movement loop (uses refs for latest positions)
  useEffect(() => {
    function stepPac() {
      const cur = pacRef.current;
      const d = dirRef.current;
      if (!d) return;
      const deltas = { up: [-1, 0], down: [1, 0], left: [0, -1], right: [0, 1] };
      const [dr, dc] = deltas[d] || [0, 0];
      const nr = cur.r + dr, nc = cur.c + dc;
      const g = cloneGrid(gridRef.current);
      if (!g[nr] || g[nr][nc] === TILE.WALL) return;
      // collect
      if (g[nr][nc] === TILE.PELLET) { setScore(s => s + 10); setPelletsRemaining(p => p - 1); g[nr][nc] = TILE.EMPTY; }
      else if (g[nr][nc] === TILE.POWER) { setScore(s => s + 50); setPelletsRemaining(p => p - 1); g[nr][nc] = TILE.EMPTY;
        vulnerableUntilRef.current = Date.now() + 8000; setGhosts(gs => gs.map(x => ({ ...x, vulnerable: true }))); ghostsRef.current = ghostsRef.current.map(x => ({ ...x, vulnerable: true }));
      }
      setGrid(g); gridRef.current = g;
      const newPac = { r: nr, c: nc };
      setPac(newPac); pacRef.current = newPac;
    }

    if (moveIntervalRef.current) clearInterval(moveIntervalRef.current);
    moveIntervalRef.current = setInterval(stepPac, pacSpeed);
    return () => clearInterval(moveIntervalRef.current);
  }, [pacSpeed]);

  // Ghost movement loop
  useEffect(() => {
    function stepGhosts() {
      const gNow = gridRef.current;
      let gs = ghostsRef.current.slice();
      // vulnerable expiration
      if (vulnerableUntilRef.current && Date.now() > vulnerableUntilRef.current) {
        vulnerableUntilRef.current = 0;
        gs = gs.map(x => ({ ...x, vulnerable: false }));
        setGhosts(gs); ghostsRef.current = gs;
      }
      const pacPos = pacRef.current;
      const blinky = gs.find(x => x.id === "blinky");

      const newGs = gs.map(ghost => {
        let target = pacPos;
        if (ghost.id === "blinky") target = pacPos;
        else if (ghost.id === "pinky") {
          const delta = dirToDelta(dirRef.current);
          target = { r: pacPos.r + delta.dr * 4, c: pacPos.c + delta.dc * 4 };
        } else if (ghost.id === "inky") {
          const delta = dirToDelta(dirRef.current);
          const twoAhead = { r: pacPos.r + delta.dr * 2, c: pacPos.c + delta.dc * 2 };
          if (blinky) target = { r: twoAhead.r + (twoAhead.r - blinky.r), c: twoAhead.c + (twoAhead.c - blinky.c) };
          else target = twoAhead;
        } else if (ghost.id === "clyde") {
          const dist = Math.hypot(pacPos.r - ghost.r, pacPos.c - ghost.c);
          target = dist > 6 ? pacPos : { r: gNow.length - 2, c: 1 };
        }
        if (ghost.vulnerable) target = { r: 1, c: 1 };
        const step = nextStepBFS(gNow, { r: ghost.r, c: ghost.c }, target);
        if (step) return { ...ghost, r: step.r, c: step.c };
        const nbs = neighbors(gNow, ghost.r, ghost.c);
        if (nbs.length) return { ...ghost, ...nbs[Math.floor(Math.random() * nbs.length)] };
        return ghost;
      });

      setGhosts(newGs);
      ghostsRef.current = newGs;
    }

    if (ghostIntervalRef.current) clearInterval(ghostIntervalRef.current);
    ghostIntervalRef.current = setInterval(stepGhosts, Math.max(120, ghostSpeed - level * 10));
    return () => clearInterval(ghostIntervalRef.current);
  }, [ghostSpeed, level]);

  // collisions
  useEffect(() => {
    const g = ghostsRef.current;
    for (const gh of g) {
      if (gh.r === pacRef.current.r && gh.c === pacRef.current.c) {
        if (gh.vulnerable) {
          setScore(s => s + 200);
          setGhosts(gs => gs.map(g => g.id === gh.id ? { ...g, r: 5, c: 10, vulnerable: false } : g));
          ghostsRef.current = ghostsRef.current.map(g => g.id === gh.id ? { ...g, r: 5, c: 10, vulnerable: false } : g);
        } else {
          setMsg("Caught! Resetting level...");
          const newGrid = cloneGrid(initialGrid.current);
          setGrid(newGrid); gridRef.current = newGrid;
          const start = findPos(initialGrid.current, TILE.PAC) || { r: 5, c: 10 };
          setPac(start); pacRef.current = start;
          setGhosts([
            { id: "blinky", r: 5, c: 9, color: "red", vulnerable: false },
            { id: "pinky", r: 5, c: 11, color: "pink", vulnerable: false },
            { id: "inky", r: 4, c: 10, color: "cyan", vulnerable: false },
            { id: "clyde", r: 6, c: 10, color: "orange", vulnerable: false },
          ]);
          ghostsRef.current = ghostsRef.current;
        }
        break;
      }
    }
  }, [pac]); // run when pac changes

  // pellets count update when grid changes
  useEffect(() => {
    const cnt = grid.flat().filter(v => v === TILE.PELLET || v === TILE.POWER).length;
    setPelletsRemaining(cnt);
    if (cnt === 0) {
      setMsg("Level cleared!");
      // prepare next level
      const newGrid = cloneGrid(initialGrid.current);
      setGrid(newGrid); gridRef.current = newGrid;
      const start = findPos(initialGrid.current, TILE.PAC) || { r: 5, c: 10 };
      setPac(start); pacRef.current = start;
      setGhosts(gs => gs.map(g => ({ ...g, r: 5, c: 10, vulnerable: false })));
      ghostsRef.current = ghostsRef.current.map(g => ({ ...g, r: 5, c: 10, vulnerable: false }));
      setLevel(l => l + 1);
      setGhostSpeed(s => Math.max(180, s - 30));
      setPacSpeed(s => Math.max(120, s - 10));
      setTimeout(() => setMsg(""), 1200);
    }
  }, [grid]);

  // cleanup on unmount
  useEffect(() => {
    return () => {
      if (moveIntervalRef.current) clearInterval(moveIntervalRef.current);
      if (ghostIntervalRef.current) clearInterval(ghostIntervalRef.current);
    };
  }, []);

  function dirToDelta(d) {
    if (!d) return { dr: 0, dc: 0 };
    if (d === "up") return { dr: -1, dc: 0 };
    if (d === "down") return { dr: 1, dc: 0 };
    if (d === "left") return { dr: 0, dc: -1 };
    if (d === "right") return { dr: 0, dc: 1 };
    return { dr: 0, dc: 0 };
  }

  const rows = grid.length;
  const cols = grid[0].length;
  const tileSize = Math.max(12, Math.min(20, Math.floor(420 / cols)));

  return (
    <div className="w-full min-h-[56vh] flex flex-col items-center justify-start p-4 bg-gradient-to-b from-slate-900 to-black text-white">
      <div className="w-full max-w-2xl relative">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-4">
            <div className="text-lg font-semibold">Pac-Man — Level {level}</div>
            <div className="text-sm text-gray-300">Score: {score}</div>
            <div className="text-sm text-gray-300">Pellets: {pelletsRemaining}</div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => {
              const g = cloneGrid(initialGrid.current);
              setGrid(g); gridRef.current = g;
              const start = findPos(initialGrid.current, TILE.PAC) || { r: 5, c: 10 };
              setPac(start); pacRef.current = start;
              setGhosts([
                { id: "blinky", r: 5, c: 9, color: "red", vulnerable: false },
                { id: "pinky", r: 5, c: 11, color: "pink", vulnerable: false },
                { id: "inky", r: 4, c: 10, color: "cyan", vulnerable: false },
                { id: "clyde", r: 6, c: 10, color: "orange", vulnerable: false },
              ]); ghostsRef.current = ghostsRef.current;
              setScore(0); setLevel(1); setMsg("");
            }} className="px-3 py-1 bg-sky-600 hover:bg-sky-500 rounded">Reset</button>

            <button onClick={() => typeof onClose === "function" && onClose()} className="px-3 py-1 bg-red-600 hover:bg-red-500 rounded">Close</button>
          </div>
        </div>

        <div className="mx-auto rounded-md" style={{ width: cols * (tileSize + 2), background: "#071427", padding: 8, borderRadius: 8 }}>
          <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, ${tileSize}px)`, gap: 2 }}>
            {grid.map((row, r) =>
              row.map((cell, c) => {
                const ghostHere = ghosts.find(g => g.r === r && g.c === c);
                const pacHere = pac.r === r && pac.c === c;
                return (
                  <div key={`${r}-${c}`} style={{
                    width: tileSize, height: tileSize, display: "flex", alignItems: "center", justifyContent: "center",
                    borderRadius: 4,
                    background: cell === TILE.WALL ? "linear-gradient(180deg,#0b3740,#08202a)" : "transparent",
                    boxShadow: cell === TILE.WALL ? "inset 0 0 6px rgba(0,0,0,0.6)" : "none"
                  }}>
                    {cell === TILE.PELLET && <div style={{ width: tileSize * 0.18, height: tileSize * 0.18, borderRadius: 999, background: "#f3c623" }} />}
                    {cell === TILE.POWER && <div style={{ width: tileSize * 0.42, height: tileSize * 0.42, borderRadius: 999, background: "#f97316" }} />}
                    {pacHere && <div style={{ width: tileSize * 0.7, height: tileSize * 0.7, borderRadius: 999, background: "radial-gradient(circle at 30% 30%, #fff176,#f59e0b)" }} />}
                    {ghostHere && <div title={ghostHere.id} style={{
                      width: tileSize * 0.75, height: tileSize * 0.75, borderRadius: 6, background: ghostHere.vulnerable ? "#6ee7b7" : ghostHere.color,
                      display: "flex", alignItems: "flex-end", justifyContent: "center", boxShadow: "0 2px 6px rgba(0,0,0,0.6)"
                    }}>
                      <div style={{ width: tileSize * 0.22, height: tileSize * 0.22, background: "#fff", borderRadius: 999, marginBottom: 3 }} />
                    </div>}
                  </div>
                );
              })
            )}
          </div>
        </div>

        {msg && <div className="mt-3 text-sm text-yellow-300">{msg}</div>}
      </div>
    </div>
  );
}