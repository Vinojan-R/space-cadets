import React, { useEffect, useRef, useState } from "react";

export default function MeteorCatch({ onClose }) {
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [gameOver, setGameOver] = useState(false);
  const player = useRef({ x: 200, width: 60, height: 20, speed: 6 });
  const meteors = useRef([]);

  // Create new meteor
  function spawnMeteor() {
    const x = Math.random() * 380;
    meteors.current.push({ x, y: 0, size: 20, speed: 2 + Math.random() * 3 });
  }

  // Restart game
  function restart() {
    setScore(0);
    setLives(3);
    setGameOver(false);
    meteors.current = [];
  }

  // Game loop
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrame;
    let frame = 0;
    const keys = {};

    function draw() {
      ctx.fillStyle = "#0b1020";
      ctx.fillRect(0, 0, 400, 500);

      // Player
      ctx.fillStyle = "#60a5fa";
      ctx.fillRect(player.current.x, 470, player.current.width, player.current.height);

      // Meteors
      ctx.fillStyle = "#f97316";
      for (const m of meteors.current) {
        ctx.beginPath();
        ctx.arc(m.x, m.y, m.size, 0, Math.PI * 2);
        ctx.fill();
      }

      // Score & Lives
      ctx.fillStyle = "#fff";
      ctx.font = "16px Arial";
      ctx.fillText(`Score: ${score}`, 10, 20);
      ctx.fillText(`Lives: ${lives}`, 320, 20);

      // Game Over
      if (gameOver) {
        ctx.fillStyle = "rgba(0,0,0,0.6)";
        ctx.fillRect(0, 0, 400, 500);
        ctx.fillStyle = "#fff";
        ctx.font = "24px Arial";
        ctx.fillText("Game Over!", 130, 240);
        ctx.font = "16px Arial";
        ctx.fillText(`Final Score: ${score}`, 145, 270);
        ctx.fillText("Press R to Restart", 125, 300);
      }
    }

    function update() {
      if (gameOver) return;

      // Player movement
      if (keys["ArrowLeft"] && player.current.x > 0) player.current.x -= player.current.speed;
      if (keys["ArrowRight"] && player.current.x < 400 - player.current.width)
        player.current.x += player.current.speed;

      // Meteor spawn
      frame++;
      if (frame % 60 === 0) spawnMeteor();

      // Move meteors
      for (let i = meteors.current.length - 1; i >= 0; i--) {
        const m = meteors.current[i];
        m.y += m.speed;

        // Collision with player
        if (
          m.y + m.size > 470 &&
          m.x > player.current.x - m.size &&
          m.x < player.current.x + player.current.width + m.size
        ) {
          setScore((s) => s + 10);
          meteors.current.splice(i, 1);
          continue;
        }

        // Missed meteor
        if (m.y > 500) {
          meteors.current.splice(i, 1);
          setLives((l) => {
            const newLives = l - 1;
            if (newLives <= 0) setGameOver(true);
            return newLives;
          });
        }
      }
    }

    function loop() {
      update();
      draw();
      animationFrame = requestAnimationFrame(loop);
    }

    // Input listeners
    function handleKeyDown(e) {
      keys[e.code] = true;
      if (e.code === "KeyR" && gameOver) restart();
    }
    function handleKeyUp(e) {
      keys[e.code] = false;
    }

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    loop();

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      cancelAnimationFrame(animationFrame);
    };
  }, [score, lives, gameOver]);

  return (
    <div className="relative w-auto h-full">
      <div className="relative bg-[#111827] p-4 rounded-2xl shadow-lg ">
        <h2 className="text-white text-lg mb-2 text-center font-semibold">
          ☄️ Meteor Catch Mini-Game
        </h2>

        <canvas
          ref={canvasRef}
          width={400}
          height={500}
          className="rounded-md border border-slate-500 bg-[#0b1020]"
        />

        <p className="text-slate-400 text-sm mt-3 text-center">
          Move with ⬅️ ➡️ arrows. Catch meteors. Miss 3 and you’re out!
        </p>
      </div>
    </div>
  );
}
