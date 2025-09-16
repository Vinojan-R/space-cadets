import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <h1 className="text-4xl font-bold mb-4">🚀 Welcome to Space Cadets</h1>
      <p className="mb-6 text-lg text-gray-300">Learn about the universe in a fun way!</p>

      <div className="flex gap-4">
        <button
          onClick={() => navigate("/register")}
          className="px-6 py-2 bg-blue-600 rounded hover:bg-blue-700"
        >
          Get Started
        </button>
        <button
          onClick={() => navigate("/login")} 
          className="px-6 py-2 bg-gray-700 rounded hover:bg-gray-800"
        >
          Login
        </button>
      </div>
    </div>
  );
}
