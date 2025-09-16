// src/components/StarryBackground.jsx
import { useEffect, useRef } from "react";

const colors = [
  "#FFFFFF", // white
  "#FFD700", // yellow
  "#B0C4DE", // light blue
  "#ADD8E6", // blue
  "#FFA500", // orange
  "#F8F8FF", // ghost white
  "#E0FFFF", // light cyan
];

export default function StarryBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Handle resize
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Stars
    const stars = Array.from({ length: 200 }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.5,
      color: colors[Math.floor(Math.random() * colors.length)],
      speed: 0.15 + Math.random() * 0.2,
    }));

    // Comets
    const comets = Array.from({ length: 3 }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height * 0.5,
      length: 200,
      speed: 4 + Math.random() * 2,
      opacity: 0.6,
    }));

    function draw() {
      ctx.clearRect(0, 0, width, height);

      // Draw stars
      stars.forEach((star) => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.fill();

        // Twinkle effect
        star.radius += (Math.random() - 0.5) * 0.05;
        if (star.radius < 0.3) star.radius = 0.3;
        if (star.radius > 1.5) star.radius = 1.5;

        // Scroll effect
        star.y += star.speed;
        if (star.y > height) {
          star.y = 0;
          star.x = Math.random() * width;
        }
      });

      // Draw comets
      comets.forEach((comet) => {
        const grad = ctx.createLinearGradient(
          comet.x,
          comet.y,
          comet.x - comet.length,
          comet.y - comet.length
        );
        grad.addColorStop(0, `rgba(255,255,255,${comet.opacity})`);
        grad.addColorStop(1, "rgba(255,255,255,0)");

        ctx.beginPath();
        ctx.strokeStyle = grad;
        ctx.lineWidth = 2;
        ctx.moveTo(comet.x, comet.y);
        ctx.lineTo(comet.x - comet.length, comet.y - comet.length);
        ctx.stroke();

        comet.x += comet.speed;
        comet.y += comet.speed;
        if (comet.x > width + comet.length || comet.y > height + comet.length) {
          comet.x = Math.random() * width * 0.5;
          comet.y = -50;
        }
      });

      requestAnimationFrame(draw);
    }
    draw();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full -z-10 bg-black"
    />
  );
}
