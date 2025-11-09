import { useEffect, useRef } from "react";

export default function ZodiacRing() {
  const ringRef = useRef(null);

  useEffect(() => {
    // Continuous rotation
    let angle = 0;
    const rotate = () => {
      angle += 0.05; // speed
      if (ringRef.current) {
        ringRef.current.style.transform = `rotate(${angle}deg)`;
      }
      requestAnimationFrame(rotate);
    };
    rotate();
  }, []);

  // Zodiac signs with placeholders (replace src with your own star/constellation images)
  const zodiacSigns = [
    "Aries", "Taurus", "Gemini", "Cancer",
    "Leo", "Virgo", "Libra", "Scorpius",
    "Sagittarius", "Capricorn", "Aquarius", "Pisces"
  ];

  return (
    <div className="relative flex items-center justify-center h-screen bg-black overflow-hidden">
      {/* Glowing Sun */}
      <div className="absolute w-32 h-32 rounded-full bg-yellow-400 shadow-[0_0_100px_40px_rgba(255,215,0,0.6)] z-10"></div>

      {/* Rotating ring */}
      <div
        ref={ringRef}
        className="absolute w-[600px] h-[600px] rounded-full flex items-center justify-center transition-transform duration-75"
      >
        {zodiacSigns.map((sign, i) => {
          const angle = (i / zodiacSigns.length) * 2 * Math.PI;
          const radius = 280;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;

          return (
            <div
              key={sign}
              className="absolute text-white text-sm font-semibold"
              style={{
                transform: `translate(${x}px, ${y}px) rotate(${-angle}rad)`
              }}
            >
              {/* Replace this text with <img src="/your-image.png" ... /> */}
              <div className="flex flex-col items-center">
                <img
                  src="/zodiac-icons/star.png"
                  alt={sign}
                  className="w-10 h-10 mb-1 opacity-80"
                />
                <span className="text-xs text-gray-300">{sign}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
