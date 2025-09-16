export default function GameModal({ onClose, children }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50">
      <div className="relative bg-gray-800 text-white rounded-xl shadow-lg p-6 w-full max-w-3xl">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-white"
        >
          ✖
        </button>
        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
}