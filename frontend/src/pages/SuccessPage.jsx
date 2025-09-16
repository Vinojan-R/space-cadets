import { useNavigate } from "react-router-dom";

export default function SuccessPage() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center h-screen bg-black text-white">
      <div className="bg-gray-900 p-6 rounded-lg shadow-lg text-center w-96">
        <h2 className="text-2xl font-bold mb-4">🎉 Account Created Successfully!</h2>
        <p className="text-lg mb-6">Your account has been created. You can now explore Space Cadets!</p>
        <button
          className="bg-green-500 hover:bg-green-600 px-6 py-2 rounded font-bold text-white"
          onClick={() => navigate("/home")}
        >
          Continue to Home
        </button>
      </div>
    </div>
  );
}