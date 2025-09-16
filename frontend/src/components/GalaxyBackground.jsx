export default function GalaxyBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden z-0">
      {/* Stars */}
      <div className="absolute inset-0">
        {Array.from({ length: 200 }).map((_, index) => (
          <div
            key={index}
            className="absolute bg-white rounded-full"
            style={{
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `twinkle ${Math.random() * 5 + 5}s infinite alternate`,
            }}
          ></div>
        ))}
      </div>

      {/* Planets */}
      <div className="absolute top-10 left-10 w-40 h-40 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-2xl animate-spin-slow"></div>
      <div className="absolute bottom-20 right-20 w-64 h-64 bg-gradient-to-r from-blue-500 to-green-500 rounded-full shadow-2xl animate-pulse"></div>
      <div className="absolute top-1/3 left-1/2 w-32 h-32 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full shadow-lg animate-spin"></div>
      <div className="absolute top-1/4 right-1/4 w-48 h-48 bg-gradient-to-r from-red-500 to-yellow-500 rounded-full shadow-lg animate-spin-slow"></div>

      {/* Shooting Stars */}
      {Array.from({ length: 10 }).map((_, index) => (
        <div
          key={index}
          className="absolute bg-white h-0.5 rounded-full"
          style={{
            width: `${Math.random() * 100 + 50}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animation: `shooting-star ${Math.random() * 5 + 5}s infinite`,
          }}
        ></div>
      ))}

      {/* Cartoon Characters */}
      <img
        src="https://i.ibb.co/9VjHZRw/astronaut.png" // Sample astronaut image
        alt="Cartoon Astronaut floating in space"
        className="absolute bottom-10 left-10 w-32 animate-float"
      />
      <img
        src="https://i.ibb.co/4YfYj1r/cartoon-planet.png" // Sample cartoon planet
        alt="Cartoon Planet with rings"
        className="absolute top-20 right-20 w-40 animate-bounce"
      />
      <img
        src="https://i.ibb.co/3h8h9qk/cartoon-alien.png" // Sample cartoon alien
        alt="Cartoon Alien waving"
        className="absolute bottom-20 right-1/3 w-28 animate-float"
      />
      <img
        src="https://via.placeholder.com/100x100.png?text=UFO" // Placeholder UFO image
        alt="Cartoon UFO flying across the screen"
        className="absolute top-1/2 left-1/4 w-24 animate-float"
      />
      <img
        src="https://via.placeholder.com/100x100.png?text=Rocket" // Placeholder Rocket image
        alt="Cartoon Rocket flying upwards"
        className="absolute bottom-1/4 left-1/2 w-28 animate-bounce"
      />

      {/* TailwindCSS Animations */}
      <style>
        {`
          @keyframes twinkle {
            0% {
              opacity: 0.5;
            }
            100% {
              opacity: 1;
            }
          }

          @keyframes shooting-star {
            0% {
              transform: translateX(0) translateY(0);
              opacity: 1;
            }
            100% {
              transform: translateX(200px) translateY(-200px);
              opacity: 0;
            }
          }

          @keyframes float {
            0% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-10px);
            }
            100% {
              transform: translateY(0);
            }
          }

          @keyframes spin-slow {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
        `}
      </style>
    </div>
  );
}