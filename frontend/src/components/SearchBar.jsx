import { useState, useRef, useEffect } from "react";

export default function SearchBar({ data }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [results, setResults] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const wrapperRef = useRef(null);
  const recognitionRef = useRef(null);

  // Setup Web Speech API
  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setQuery(transcript);
      // run search automatically when result arrives
      handleResultSearch(transcript);
    };
    recognition.onend = () => {
      setIsListening(false);
    };
    recognition.onerror = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;
    return () => {
      if (recognitionRef.current) recognitionRef.current.onresult = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const handleResultSearch = (overrideQuery) => {
    const q = overrideQuery ?? query;
    const filteredResults = data.filter((item) =>
      item.name.toLowerCase().includes(q.toLowerCase())
    );
    setResults(filteredResults);
    setIsActive(true);
  };

  // Voice toggle
  const toggleListening = () => {
    const recognition = recognitionRef.current;
    if (!recognition) {
      alert("Voice search not supported in this browser.");
      return;
    }
    if (isListening) {
      recognition.stop();
      setIsListening(false);
    } else {
      try {
        recognition.start();
        setIsListening(true);
      } catch {
        // start can throw if called twice quickly
        setIsListening(false);
      }
    }
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
    <div className="relative w-full max-w-2xl mx-auto" ref={wrapperRef}>
      {/* Pill search bar (styled like the image) */}
      <div className="relative flex items-center bg-white/5 border border-white/20 rounded-full px-2 py-1 shadow-lg">
        <input
          type="text"
          className="flex-1 bg-transparent text-white placeholder-gray-400 px-4 py-3 rounded-full outline-none"
          placeholder="Search..."
          value={query}
          onChange={handleSearch}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleResultSearch();
            }
          }}
          aria-label="Search"
        />

        {/* Microphone button */}
        <button
          onClick={toggleListening}
          aria-label={
            isListening ? "Stop voice search" : "Start voice search"
          }
          className={`ml-2 mr-1 rounded-full w-12 h-10 flex items-center justify-center transition-shadow ${
            isListening
              ? "bg-red-600 shadow-lg animate-pulse"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {/* simple mic icon (SVG) */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 text-white"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 14a3 3 0 0 0 3-3V6a3 3 0 0 0-6 0v5a3 3 0 0 0 3 3z" />
            <path d="M19 11a1 1 0 0 0-2 0 5 5 0 0 1-10 0 1 1 0 0 0-2 0 7 7 0 0 0 6 6.92V22h-3a1 1 0 1 0 0 2h8a1 1 0 1 0 0-2h-3v-4.08A7 7 0 0 0 19 11z" />
          </svg>
        </button>

        {/* Search button (rightmost small) */}
        <button
          className="ml-1 mr-1 bg-blue-500 hover:bg-blue-600 text-white rounded-full px-4 py-2 font-medium"
          onClick={() => handleResultSearch()}
          aria-label="Search"
        >
          Search
        </button>
      </div>

      {/* Suggestions dropdown */}
      {isActive && suggestions.length > 0 && (
        <ul className="absolute top-full left-0 w-full bg-gray-900 rounded-md p-2 shadow-lg z-50 mt-2">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              className="cursor-pointer hover:bg-gray-700 p-2 rounded-md"
              onClick={() => {
                setQuery(suggestion);
                handleResultSearch(suggestion);
              }}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}

      {/* Results Overlay (keeps original behaviour) */}
      {isActive && results.length > 0 && (
        <div className="fixed top-24 left-1/2 transform -translate-x-1/2 w-full max-w-5xl p-4 bg-gray-900 rounded-lg shadow-2xl z-50 overflow-y-auto max-h-[70vh]">
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
