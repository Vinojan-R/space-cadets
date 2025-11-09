import React, { useEffect, useRef, useState } from "react";

export default function Stars({ signs: signsProp } = {}) {
  const defaultSigns = [
    { id: "aries", name: "Aries", image: "/src/assets/signs/aries.png", colors: ["#ffb49a", "#ff7a7a"], date: "21 Mar – 19 Apr", leftText: "Это шутливый гороскоп с предсказаниями на 2023 год для творческих людей. Все прогнозы разработаны с целью поднятия настроения и позитивной мотивации", leftDate: "21.03.2023", rightText: "Выбирай свой знак зодиака или подсмотри, что ждёт твоих друзей. Обязательно сбудется, если поделиться предсказанием в соцсетях :)", rightDate: "20.03.2024" },
    { id: "taurus", name: "Taurus", image: "/src/assets/signs/taurus.png", colors: ["#ffd7a8", "#ffb86b"], date: "20 Apr – 20 May" },
    { id: "gemini", name: "Gemini", image: "/src/assets/signs/gemini.png", colors: ["#d3c6ff", "#9b8cff"], date: "21 May – 20 Jun" },
    { id: "cancer", name: "Cancer", image: "/src/assets/signs/cancer.png", colors: ["#a8f0ff", "#6fe0ff"], date: "21 Jun – 22 Jul" },
    { id: "leo", name: "Leo", image: "/src/assets/signs/leo.png", colors: ["#ffd3a8", "#ffb86b"], date: "23 Jul – 22 Aug" },
    { id: "virgo", name: "Virgo", image: "/src/assets/signs/virgo.png", colors: ["#cbe6a8", "#8fd66b"], date: "23 Aug – 22 Sep" },
    { id: "libra", name: "Libra", image: "/src/assets/signs/libra.png", colors: ["#ffd0ff", "#d99bff"], date: "23 Sep – 22 Oct" },
    { id: "scorpio", name: "Scorpio", image: "/src/assets/signs/scorpio.png", colors: ["#d0cfff", "#9b7aff"], date: "23 Oct – 21 Nov" },
    { id: "sagittarius", name: "sagittarius", image: "/src/assets/signs/sagittarris.png", colors: ["#ffc9a2", "#ff9a5c"], date: "22 Nov – 21 Dec" },
    { id: "capricorn", name: "Capricorn", image: "/src/assets/signs/capricon.png", colors: ["#bfe0ff", "#78b8ff"], date: "22 Dec – 19 Jan" },
    { id: "aquarius", name: "aquarius", image: "/src/assets/signs/aquarius.png", colors: ["#a8fff0", "#6be6d0"], date: "20 Jan – 18 Feb" },
    { id: "pisces", name: "pisces", image: "/src/assets/signs/pisces.png", colors: ["#cfe0ff", "#9ab8ff"], date: "19 Feb – 20 Mar" }
  ];

  const signs = Array.isArray(signsProp) && signsProp.length ? signsProp : defaultSigns;

  const [selectedIndex, setSelectedIndex] = useState(0);
  const topRef = useRef(null);

  useEffect(() => {
    // ensure selectedIndex never exceeds available signs
    if (selectedIndex >= signs.length) setSelectedIndex(0);
  }, [signs.length, selectedIndex]);

  const prev = () => {
    setSelectedIndex((s) => (s - 1 + signs.length) % signs.length);
    scrollToTop();
  };
  const next = () => {
    setSelectedIndex((s) => (s + 1) % signs.length);
    scrollToTop();
  };

  const onSelectCard = (index) => {
    setSelectedIndex(index);
    scrollToTop();
  };

  const scrollToTop = () => {
    if (topRef.current) topRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const selected = signs[selectedIndex];

  // Fallback panel text if sign doesn't include left/right details
  const leftText = selected?.leftText ?? "Short intro text about the constellation. Replace with your uploaded content for each sign.";
  const leftDate = selected?.leftDate ?? selected?.date ?? "";
  const rightText = selected?.rightText ?? "Choose your zodiac sign or peek what awaits your friends. Share predictions to social media for fun!";
  const rightDate = selected?.rightDate ?? "";

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-10">
      {/* top grid: left panel / image / right panel */}
      <div ref={topRef} className="grid grid-cols-1 md:grid-cols-3 items-center gap-6 md:gap-8">
        {/* LEFT PANEL */}
        <div className="order-1 md:order-1 flex justify-center md:justify-end px-2">
          <div className="w-full max-w-lg md:max-w-md text-white">
            <div className="backdrop-blur-md bg-white/6 border border-white/8 rounded-2xl p-4 md:p-6 text-center md:text-left">
              <p className="text-sm md:text-base leading-relaxed">{leftText}</p>
            </div>
            {leftDate && (
              <div className="mt-4 flex justify-center md:justify-start">
                <div className="px-4 py-2 rounded-full bg-white/5 border border-white/8 text-sm text-white/80">
                  {leftDate}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* CENTER IMAGE + controls */}
        <div className="order-2 md:order-2 flex items-center justify-center relative">
          <button
            aria-label="Previous"
            onClick={prev}
            className="hidden md:flex absolute left-[-12px] top-1/2 -translate-y-1/2 z-20 rounded-full bg-white/8 hover:bg-white/16 text-white p-3 shadow-lg"
          >
            ‹
          </button>

          {/* force a square that scales with viewport, then crop to circle */}
          <div
            className="rounded-full overflow-hidden shadow-2xl bg-black"
            style={{
              // use vmin based sizing so circle scales on small screens but stays capped on desktop
              width: "min(60vmin, 460px)",
              height: "min(60vmin, 460px)"
            }}
          >
            <img
              src={selected?.image}
              alt={selected?.name}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>

          <button
            aria-label="Next"
            onClick={next}
            className="hidden md:flex absolute right-[-12px] top-1/2 -translate-y-1/2 z-20 rounded-full bg-white/8 hover:bg-white/16 text-white p-3 shadow-lg"
          >
            ›
          </button>

          {/* caption for mobile under image */}
          <div className="md:hidden mt-4 text-center w-full px-2">
            <div className="inline-block px-5 py-2 rounded-full bg-white/10 border border-white/10 text-white font-semibold">
              {selected?.name}
            </div>
            {selected?.date && <div className="mt-2 text-sm text-white/70">{selected.date}</div>}
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="order-3 md:order-3 flex justify-center md:justify-start px-2">
          <div className="w-full max-w-lg md:max-w-md text-white">
            <div className="backdrop-blur-md bg-white/6 border border-white/8 rounded-2xl p-4 md:p-6 text-center md:text-right">
              <p className="text-sm md:text-base leading-relaxed">{rightText}</p>
            </div>
            {rightDate && (
              <div className="mt-4 flex justify-center md:justify-end">
                <div className="px-4 py-2 rounded-full bg-white/5 border border-white/8 text-sm text-white/80">
                  {rightDate}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* name/date (desktop) */}
      <div className="hidden md:flex items-center justify-center mt-6">
        <div className="text-center">
          <div className="inline-block px-6 py-2 rounded-full bg-white/10 border border-white/10 text-white font-semibold">
            {selected?.name}
          </div>
          {selected?.date && <div className="mt-2 text-sm text-white/70">{selected.date}</div>}
        </div>
      </div>

      {/* Grid of sign cards */}
      <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
        {signs.map((s, i) => {
          const isActive = i === selectedIndex;
          const from = s.colors?.[0] ?? "#2b2b2b";
          const to = s.colors?.[1] ?? "#4b4b4b";
          return (
            <button
              key={s.id || s.name || i}
              onClick={() => onSelectCard(i)}
              className={`relative rounded-2xl p-4 text-center text-white shadow-lg transform transition-all duration-300 focus:outline-none
                ${isActive ? "ring-4 ring-indigo-400/50 scale-105" : "hover:scale-105 hover:shadow-2xl"}`}
              style={{
                background: `linear-gradient(135deg, ${from}, ${to})`,
                minHeight: 120
              }}
            >
              <div className="text-sm font-medium mb-2">{s.name}</div>

              <div className="mx-auto w-16 h-16 rounded-full overflow-hidden border border-white/10 mb-2">
                <img src={s.image} alt={s.name} className="w-full h-full object-cover" />
              </div>

              <div className="text-xs text-white/90">{s.date}</div>

              {isActive && (
                <div className="absolute -top-3 right-3 bg-indigo-500 text-white text-xs px-2 py-1 rounded-full shadow-sm">
                  Selected
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}