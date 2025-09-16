import React, { useRef, useEffect, useState } from "react";

/**
 * VoidScrappersClone.jsx
 * Single-file simple arcade shooter inspired by "void scrappers".
 * - Canvas-based
 * - Player can move, aim with mouse, shoot bullets
 * - Enemies spawn and move downwards towards player
 * - Collisions, score, basic UI
 *
 * Drop into a Vite+React project and render <VoidScrappersClone />
 */

export default function VoidScrappersClone() {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const lastTimeRef = useRef(0);
  const [isRunning, setIsRunning] = useState(true);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  // Game state stored in refs for performance
  const stateRef = useRef({
    width: 800,
    height: 600,
    player: {
      x: 400,
      y: 520,
      radius: 18,
      speed: 260,
      angle: -Math.PI / 2,
      cooldown: 0,
      cooldownMax: 0.18,
      color: "#60a5fa",
    },
    keys: {},
    mouse: { x: 400, y: 300, down: false },
    bullets: [],
    enemies: [],
    enemyTimer: 0,
    enemyInterval: 1.0,
    difficultyTimer: 0,
  });

  // Helpers
  function rand(min, max) {
    return Math.random() * (max - min) + min;
  }
  function dist(a, b) {
    const dx = a.x - b.x;
    const dy = a.y - b.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  // Input handlers
  useEffect(() => {
    const onKeyDown = (e) => {
      stateRef.current.keys[e.code] = true;
      if (e.code === "Space") {
        e.preventDefault();
      }
      if (e.code === "KeyR" && gameOver) restart();
    };
    const onKeyUp = (e) => {
      stateRef.current.keys[e.code] = false;
    };
    const onMouseMove = (e) => {
      const rect = canvasRef.current.getBoundingClientRect();
      stateRef.current.mouse.x = (e.clientX - rect.left) * (stateRef.current.width / rect.width);
      stateRef.current.mouse.y = (e.clientY - rect.top) * (stateRef.current.height / rect.height);
    };
    const onMouseDown = () => {
      stateRef.current.mouse.down = true;
    };
    const onMouseUp = () => {
      stateRef.current.mouse.down = false;
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameOver]);

  // Restart
  function restart() {
    stateRef.current.bullets = [];
    stateRef.current.enemies = [];
    stateRef.current.enemyTimer = 0;
    stateRef.current.enemyInterval = 1.0;
    stateRef.current.difficultyTimer = 0;
    const pl = stateRef.current.player;
    pl.x = stateRef.current.width / 2;
    pl.y = stateRef.current.height - 80;
    pl.cooldown = 0;
    setScore(0);
    setGameOver(false);
    setIsRunning(true);
    lastTimeRef.current = 0;
    animRef.current = requestAnimationFrame(loop);
  }

  // Shooting
  function shoot(x, y, angle, speed = 560) {
    stateRef.current.bullets.push({
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      radius: 4,
      life: 2.5,
      color: "#ffd166",
    });
  }

  // Spawn enemy
  function spawnEnemy() {
    const w = stateRef.current.width;
    const type = Math.random() < 0.12 ? "big" : Math.random() < 0.2 ? "fast" : "normal";
    const enemy = {
      x: rand(40, w - 40),
      y: -40,
      radius: type === "big" ? 28 : type === "fast" ? 14 : 18,
      hp: type === "big" ? 4 : type === "fast" ? 1 : 2,
      speed: type === "fast" ? rand(180, 260) : type === "big" ? rand(40, 70) : rand(80, 120),
      color: type === "big" ? "#ef4444" : type === "fast" ? "#f59e0b" : "#34d399",
      type,
    };
    stateRef.current.enemies.push(enemy);
  }

  // Main loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    // size canvas to device pixel ratio
    function resize() {
      const parent = canvas.parentElement;
      const rect = parent.getBoundingClientRect();
      // keep fixed aspect ratio
      const w = Math.min(1000, Math.max(480, rect.width - 20));
      const h = Math.round((w * 3) / 4);
      stateRef.current.width = w;
      stateRef.current.height = h;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    const onResize = () => resize();
    window.addEventListener("resize", onResize);

    function update(dt) {
      if (gameOver || !isRunning) return;

      const s = stateRef.current;
      const pl = s.player;

      // Player movement
      let dx = 0,
        dy = 0;
      if (s.keys["ArrowLeft"] || s.keys["KeyA"]) dx -= 1;
      if (s.keys["ArrowRight"] || s.keys["KeyD"]) dx += 1;
      if (s.keys["ArrowUp"] || s.keys["KeyW"]) dy -= 1;
      if (s.keys["ArrowDown"] || s.keys["KeyS"]) dy += 1;
      const len = Math.hypot(dx, dy);
      if (len > 0) {
        dx /= len;
        dy /= len;
      }
      pl.x += dx * pl.speed * dt;
      pl.y += dy * pl.speed * dt;

      // clamp
      pl.x = Math.max(pl.radius, Math.min(s.width - pl.radius, pl.x));
      pl.y = Math.max(pl.radius, Math.min(s.height - pl.radius, pl.y));

      // aim towards mouse
      const aimAngle = Math.atan2(s.mouse.y - pl.y, s.mouse.x - pl.x);
      pl.angle = aimAngle;

      // shooting cooldown and input
      pl.cooldown -= dt;
      const shooting = s.mouse.down || s.keys["Space"];
      if (shooting && pl.cooldown <= 0) {
        // burst of 1-3 bullets
        shoot(pl.x + Math.cos(aimAngle) * (pl.radius + 6), pl.y + Math.sin(aimAngle) * (pl.radius + 6), aimAngle);
        pl.cooldown = pl.cooldownMax;
      }

      // bullets update
      for (let i = s.bullets.length - 1; i >= 0; i--) {
        const b = s.bullets[i];
        b.x += b.vx * dt;
        b.y += b.vy * dt;
        b.life -= dt;
        if (b.life <= 0 || b.x < -20 || b.x > s.width + 20 || b.y < -20 || b.y > s.height + 20) {
          s.bullets.splice(i, 1);
        }
      }

      // enemy spawning & difficulty
      s.enemyTimer += dt;
      s.difficultyTimer += dt;
      if (s.enemyTimer >= s.enemyInterval) {
        spawnEnemy();
        s.enemyTimer = 0;
        // slowly decrease interval but never below 0.35
        s.enemyInterval = Math.max(0.35, s.enemyInterval - 0.02);
      }
      // every 12s, slightly increase difficulty (speed)
      if (s.difficultyTimer > 12) {
        s.difficultyTimer = 0;
        s.enemies.forEach((e) => (e.speed *= 1.05));
      }

      // enemies update & collisions
      for (let i = s.enemies.length - 1; i >= 0; i--) {
        const en = s.enemies[i];
        // move towards bottom, with slight tracking to player
        const angleToPlayer = Math.atan2(pl.y - en.y, pl.x - en.x);
        en.x += Math.cos(angleToPlayer) * (en.speed * 0.25) * dt;
        en.y += en.speed * dt;

        // collide with bullets
        for (let j = s.bullets.length - 1; j >= 0; j--) {
          const b = s.bullets[j];
          if (dist(en, b) < en.radius + b.radius) {
            en.hp -= 1;
            s.bullets.splice(j, 1);
            if (en.hp <= 0) {
              // explosion: increase score
              setScore((prev) => prev + (en.type === "big" ? 50 : en.type === "fast" ? 12 : 25));
              s.enemies.splice(i, 1);
              break;
            } else {
              setScore((prev) => prev + 8);
            }
          }
        }

        // collide with player
        if (dist(en, pl) < en.radius + pl.radius) {
          // player hit -> game over
          setGameOver(true);
          setIsRunning(false);
          break;
        }

        // remove if off screen bottom
        if (en.y > s.height + 50) s.enemies.splice(i, 1);
      }
    }

    function draw() {
      const s = stateRef.current;
      // background
      ctx.fillStyle = "#0b1020";
      ctx.fillRect(0, 0, s.width, s.height);

      // starfield
      const stars = 60;
      for (let i = 0; i < stars; i++) {
        const x = (i * 37) % s.width;
        const y = ((i * 61) % s.height) + ((Date.now() / 200) % 4);
        ctx.fillStyle = "rgba(255,255,255,0.06)";
        ctx.fillRect((x + (i % 3) * 2) % s.width, y, 1, 1);
      }

      // bullets
      for (const b of stateRef.current.bullets) {
        ctx.beginPath();
        ctx.fillStyle = b.color;
        ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // enemies
      for (const en of stateRef.current.enemies) {
        ctx.beginPath();
        ctx.fillStyle = en.color;
        ctx.arc(en.x, en.y, en.radius, 0, Math.PI * 2);
        ctx.fill();
        // little highlight
        ctx.beginPath();
        ctx.fillStyle = "rgba(255,255,255,0.12)";
        ctx.arc(en.x - en.radius * 0.4, en.y - en.radius * 0.4, Math.max(2, en.radius * 0.5), 0, Math.PI * 2);
        ctx.fill();
      }

      // player
      const pl = stateRef.current.player;
      ctx.save();
      ctx.translate(pl.x, pl.y);
      ctx.rotate(pl.angle);
      // hull
      ctx.beginPath();
      ctx.moveTo(22, 0);
      ctx.lineTo(-12, -12);
      ctx.lineTo(-6, 0);
      ctx.lineTo(-12, 12);
      ctx.closePath();
      // gradient
      const g = ctx.createLinearGradient(-12, -12, 22, 12);
      g.addColorStop(0, "#0ea5e9");
      g.addColorStop(1, pl.color);
      ctx.fillStyle = g;
      ctx.fill();
      // cockpit
      ctx.beginPath();
      ctx.arc(6, 0, 6, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255,255,255,0.12)";
      ctx.fill();
      ctx.restore();

      // UI
      ctx.fillStyle = "rgba(255,255,255,0.9)";
      ctx.font = "16px system-ui, Arial";
      ctx.fillText(`Score: ${score}`, 12, 22);
      ctx.fillStyle = "rgba(255,255,255,0.45)";
      ctx.fillText(`Enemies: ${stateRef.current.enemies.length}`, 12, 44);

      // crosshair
      ctx.beginPath();
      ctx.strokeStyle = "rgba(255,255,255,0.25)";
      ctx.lineWidth = 1;
      ctx.arc(stateRef.current.mouse.x, stateRef.current.mouse.y, 10, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(stateRef.current.mouse.x - 14, stateRef.current.mouse.y);
      ctx.lineTo(stateRef.current.mouse.x + 14, stateRef.current.mouse.y);
      ctx.moveTo(stateRef.current.mouse.x, stateRef.current.mouse.y - 14);
      ctx.lineTo(stateRef.current.mouse.x, stateRef.current.mouse.y + 14);
      ctx.stroke();

      // Game over overlay
      if (gameOver) {
        ctx.fillStyle = "rgba(0,0,0,0.6)";
        ctx.fillRect(0, 0, stateRef.current.width, stateRef.current.height);
        ctx.fillStyle = "#fff";
        ctx.font = "bold 32px system-ui, Arial";
        ctx.textAlign = "center";
        ctx.fillText("Game Over", stateRef.current.width / 2, stateRef.current.height / 2 - 10);
        ctx.font = "16px system-ui, Arial";
        ctx.fillText(`Final Score: ${score}`, stateRef.current.width / 2, stateRef.current.height / 2 + 22);
        ctx.fillText("Press R to restart", stateRef.current.width / 2, stateRef.current.height / 2 + 56);
        ctx.textAlign = "start";
      }
    }

    function loop(ts) {
      if (!lastTimeRef.current) lastTimeRef.current = ts;
      const dt = Math.min(0.05, (ts - lastTimeRef.current) / 1000);
      lastTimeRef.current = ts;

      update(dt);
      draw();

      if (!gameOver && isRunning) {
        animRef.current = requestAnimationFrame(loop);
      }
    }

    // start loop
    animRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(animRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameOver, isRunning]);

  // Pause/resume toggles
  useEffect(() => {
    const onVisibility = () => {
      if (document.hidden) {
        setIsRunning(false);
        cancelAnimationFrame(animRef.current);
      } else if (!gameOver) {
        setIsRunning(true);
        lastTimeRef.current = 0;
        animRef.current = requestAnimationFrame((t) => {
          lastTimeRef.current = t;
          animRef.current = requestAnimationFrame(function internalLoop(ts) {
            const dt = Math.min(0.05, (ts - lastTimeRef.current) / 1000);
            lastTimeRef.current = ts;
            // force a small update by calling update via the animation frame loop above
            animRef.current = requestAnimationFrame(internalLoop);
          });
        });
      }
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, [gameOver]);

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-white text-xl">Void — Mini Clone</h2>
        <div className="flex items-center gap-3">
          <div className="text-white">Score: {score}</div>
          <button
            onClick={() => {
              if (gameOver) restart();
              else {
                setIsRunning((r) => {
                  if (!r) {
                    lastTimeRef.current = 0;
                    animRef.current = requestAnimationFrame(loop);
                  } else {
                    cancelAnimationFrame(animRef.current);
                  }
                  return !r;
                });
              }
            }}
            className="px-3 py-1 rounded bg-slate-700 text-white"
          >
            {gameOver ? "Restart" : isRunning ? "Pause" : "Resume"}
          </button>
        </div>
      </div>

      <div
        style={{
          borderRadius: 8,
          overflow: "hidden",
          background: "#081026",
          display: "inline-block",
        }}
      >
        <canvas
          ref={canvasRef}
          style={{
            display: "block",
            background: "#0b1020",
            width: "100%",
            height: "auto",
            cursor: "crosshair",
          }}
        />
      </div>

      <div className="mt-3 text-sm text-slate-400">
        Controls: Move with <b>WASD</b> / arrow keys. Aim with mouse. Click or press <b>Space</b> to
        shoot. Press <b>R</b> to restart after game over.
      </div>
    </div>
  );
}
