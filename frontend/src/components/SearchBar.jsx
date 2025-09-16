import { useState, useRef, useEffect } from "react";

export default function SearchBar({ data }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [results, setResults] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const wrapperRef = useRef(null);

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim()) {
      const filteredSuggestions = data
        .filter((item) =>
          item.name.toLowerCase().includes(value.toLowerCase())
        )
        .map((item) => item.name);
      setSuggestions(filteredSuggestions.slice(0, 5));
      setIsActive(true);
    } else {
      setSuggestions([]);
      setIsActive(false);
    }
  };

  const handleResultSearch = () => {
    const filteredResults = data.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
    setResults(filteredResults);
    setIsActive(true);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsActive(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full max-w-md mx-auto" ref={wrapperRef}>
      {/* Search Box */}
      <input
        type="text"
        className="w-full p-3 pr-28 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg"
        placeholder="Search here..."
        value={query}
        onChange={handleSearch}
      />
      <button
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-500 px-4 py-2 rounded-md text-white hover:bg-blue-600 transition"
        onClick={handleResultSearch}
      >
        Search
      </button>

      {/* Suggestions */}
      {isActive && suggestions.length > 0 && (
        <ul className="absolute top-full left-0 w-full bg-gray-900 rounded-md p-2 shadow-lg z-50 mt-1">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              className="cursor-pointer hover:bg-gray-700 p-2 rounded-md"
              onClick={() => {
                setQuery(suggestion);
                handleResultSearch();
              }}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}

      {/* Results Overlay */}
      {isActive && results.length > 0 && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 w-full max-w-5xl p-4 bg-gray-900 rounded-lg shadow-2xl z-50 overflow-y-auto max-h-[70vh]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((result, index) => (
              <div
                key={index}
                className="bg-gray-800 p-4 rounded-lg shadow-lg flex flex-col items-center transition hover:scale-105"
              >
                <img
                  src={result.img}
                  alt={result.name}
                  className="w-28 h-28 object-cover rounded-full mb-4"
                />
                <h3 className="text-lg font-semibold">{result.name}</h3>
                <p className="text-sm text-gray-400 text-center">
                  {result.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
