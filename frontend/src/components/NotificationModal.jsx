// src/components/NotificationModal.jsx
export default function NotificationModal({ onClose, inactive }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md bg-black/50 z-50">
      <div className="bg-gray-800 text-white p-6 rounded-xl w-96 shadow-xl">
        <h2 className="text-xl font-bold mb-4">🔔 Notifications</h2>
        {inactive ? (
          <p>You haven’t visited us in a while 🚀 Come back and explore the universe!</p>
        ) : (
          <p>No new notifications 🌌</p>
        )}
        <button
          onClick={onClose}
          className="mt-4 bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
        >
          Close
        </button>
      </div>
    </div>
  );
}
