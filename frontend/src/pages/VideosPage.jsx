import Header from "../components/Header";

export default function VideosPage() {
  const videos = [
    { title: "Exploring the Universe", url: "https://www.youtube.com/embed/xyz123" },
    { title: "The Solar System", url: "https://www.youtube.com/embed/abc456" },
    { title: "Life on Mars?", url: "https://www.youtube.com/embed/def789" },
  ];

  return (
    <div className="min-h-screen flex flex-col text-white bg-black">
      <Header activePage="videos" /> {/* Pass the activePage prop */}
      <main className="flex-grow p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video, idx) => (
          <div key={idx} className="bg-gray-800 rounded-lg shadow-lg p-4">
            <h3 className="text-xl font-bold mb-2">{video.title}</h3>
            <iframe
              src={video.url}
              title={video.title}
              className="w-full h-48 rounded-lg"
              allowFullScreen
            ></iframe>
          </div>
        ))}
      </main>
    </div>
  );
}