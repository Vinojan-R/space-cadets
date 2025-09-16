import Header from "../components/Header";
import SearchBar from "../components/SearchBar";

const videos = [
  { name: "Exploring the Universe", img: "/src/assets/logo.png", description: "Learn about galaxies, stars, and planets.", url: "https://www.youtube.com/embed/xyz123" },
  { name: "The Solar System", img: "/src/assets/logo.png", description: "Discover the planets in our solar system.", url: "https://www.youtube.com/embed/abc456" },
  { name: "Life on Mars?", img: "/src/assets/logo.png", description: "Explore the possibilities of life on Mars.", url: "https://www.youtube.com/embed/def789" },
];

export default function VideosPage() {
  return (
    <div className="min-h-screen flex flex-col text-white bg-black">
      <Header activePage="videos" />
      <SearchBar data={videos} />
      <main className="flex-grow p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video, idx) => (
          <div key={idx} className="bg-gray-800 rounded-lg shadow-lg p-4">
            <h3 className="text-xl font-bold mb-2">{video.name}</h3>
            <iframe
              src={video.url}
              title={video.name}
              className="w-full h-48 rounded-lg"
              allowFullScreen
            ></iframe>
          </div>
        ))}
      </main>
    </div>
  );
}