import React, { useEffect, useRef, useState } from "react";

export default function Stars({ signs: signsProp } = {}) {
  const defaultSigns = [
    {
      id: "aries",
      name: "Aries",
      image: "/src/assets/signs/aries.png",
      cardImage: "/src/assets/signs/card-aries.png",
      colors: ["#ffb49a", "#ff7a7a"],
      date: "21 Mar – 19 Apr",
      leftText:
        "Aries is one of the oldest constellations in the night sky. Its brightest stars, Hamal and Sheratan, form the ram’s head — easy to spot on clear autumn evenings as a small, V-shaped group.",
      leftDate: "21.03.2023",
      rightText:
        "In Greek myth Aries represents the golden ram whose fleece became the prize of the Argonauts. Astronomers used Aries to mark the vernal point in antiquity.",
      rightDate: "20.03.2024"
    },
    {
      id: "taurus",
      name: "Taurus",
      image: "/src/assets/signs/taurus.png",
      cardImage: "/src/assets/signs/card-taurus.png",
      colors: ["#ffd7a8", "#ffb86b"],
      date: "20 Apr – 20 May",
      leftText:
        "Taurus is a large, prominent constellation featuring the bright red star Aldebaran and the Pleiades cluster. It’s visible in northern skies during winter months and marks the eye of the bull.",
      leftDate: "21.03.2023",
      rightText:
        "Mythically, Taurus is often associated with Zeus transformed into a white bull. The Pleiades within Taurus were important navigation markers for ancient sailors.",
      rightDate: "20.03.2024"
    },
    {
      id: "gemini",
      name: "Gemini",
      image: "/src/assets/signs/gemini.png",
      cardImage: "/src/assets/signs/card-gemini.png",
      colors: ["#d3c6ff", "#9b8cff"],
      date: "21 May – 20 Jun",
      leftText:
        "Gemini is known for its two bright twin stars, Castor and Pollux, which mark the heads of the twins. The constellation stretches across the winter sky and is easy to find near Orion.",
      leftDate: "21.03.2023",
      rightText:
        "In mythology, Castor and Pollux were twin brothers — one mortal, one immortal — who shared great loyalty. Gemini’s twin motif made it a symbol of partnership and duality.",
      rightDate: "20.03.2024"
    },
    {
      id: "cancer",
      name: "Cancer",
      image: "/src/assets/signs/cancer.png",
      cardImage: "/src/assets/signs/card-cancer.png",
      colors: ["#a8f0ff", "#6fe0ff"],
      date: "21 Jun – 22 Jul",
      leftText:
        "Cancer is a faint constellation best known for the open cluster Praesepe (the Beehive). It sits between Gemini and Leo and is a subtle, compact group for telescopic observation.",
      leftDate: "21.03.2023",
      rightText:
        "In Greek stories Cancer was the crab crushed by Hercules during his labors. Though faint, the Beehive cluster in Cancer was one of the first objects observed by early telescopes.",
      rightDate: "20.03.2024"
    },
    {
      id: "leo",
      name: "Leo",
      image: "/src/assets/signs/leo.png",
      cardImage: "/src/assets/signs/card-leo.png",
      colors: ["#ffd3a8", "#ffb86b"],
      date: "23 Jul – 22 Aug",
      leftText:
        "Leo is a bright, easily recognized constellation shaped like a crouching lion. The star Regulus marks the lion’s heart and dominates the spring sky for northern observers.",
      leftDate: "21.03.2023",
      rightText:
        "Leo represents the Nemean Lion from Greek myth, defeated by Hercules. Its bright pattern made it a key seasonal marker for many ancient cultures.",
      rightDate: "20.03.2024"
    },
    {
      id: "virgo",
      name: "Virgo",
      image: "/src/assets/signs/virgo.png",
      cardImage: "/src/assets/signs/card-virgo.png",
      colors: ["#cbe6a8", "#8fd66b"],
      date: "23 Aug – 22 Sep",
      leftText:
        "Virgo is a large constellation with the bright star Spica. It lies along the ecliptic and contains many galaxies visible through small telescopes in spring skies.",
      leftDate: "21.03.2023",
      rightText:
        "Often pictured as a maiden, Virgo has agricultural associations — Spica was thought to represent an ear of grain. It has been important for seasonal calendars.",
      rightDate: "20.03.2024"
    },
    {
      id: "libra",
      name: "Libra",
      image: "/src/assets/signs/libra.png",
      cardImage: "/src/assets/signs/card-libra.png",
      colors: ["#ffd0ff", "#d99bff"],
      date: "23 Sep – 22 Oct",
      leftText:
        "Libra is a small, subtle constellation representing scales or balance. It sits between Virgo and Scorpius and is best seen during autumn evenings.",
      leftDate: "21.03.2023",
      rightText:
        "Libra’s scales symbolize balance and justice in many traditions. Though modest in brightness, its position along the celestial equator made it useful in ancient astronomy.",
      rightDate: "20.03.2024"
    },
    {
      id: "scorpio",
      name: "Scorpio",
      image: "/src/assets/signs/scorpio.png",
      cardImage: "/src/assets/signs/card-scorio.png",
      colors: ["#d0cfff", "#9b7aff"],
      date: "23 Oct – 21 Nov",
      leftText:
        "Scorpius is a striking constellation with a long curved tail and the red supergiant Antares at its heart. It dominates summer skies in the southern and mid-northern latitudes.",
      leftDate: "21.03.2023",
      rightText:
        "In myth Scorpius represents the scorpion that slew Orion, and the two constellations are placed opposite one another in the sky. Antares is often called the rival of Mars for its color.",
      rightDate: "20.03.2024"
    },
    {
      id: "sagittarius",
      name: "Sagittarius",
      image: "/src/assets/signs/sagittarris.png",
      cardImage: "/src/assets/signs/card-sagittaruis.png",
      colors: ["#ffc9a2", "#ff9a5c"],
      date: "22 Nov – 21 Dec",
      leftText:
        "Sagittarius is rich in deep-sky objects because the constellation points toward the center of the Milky Way. The characteristic teapot asterism helps you locate dense star fields.",
      leftDate: "21.03.2023",
      rightText:
        "Often depicted as an archer or centaur, Sagittarius connects to myths about archers and hunters. Look there for star clusters and nebulae with a small telescope.",
      rightDate: "20.03.2024"
    },
    {
      id: "capricorn",
      name: "Capricorn",
      image: "/src/assets/signs/capricon.png",
      cardImage: "/src/assets/signs/card-capricorn.png",
      colors: ["#bfe0ff", "#78b8ff"],
      date: "22 Dec – 19 Jan",
      leftText:
        "Capricornus is a faint constellation shaped like a sea-goat. It’s most visible in late summer and autumn and contains a few interesting star clusters and variable stars.",
      leftDate: "21.03.2023",
      rightText:
        "Capricorn’s imagery blends goat and fish elements from ancient myths. Though subtle, it has featured in maritime star charts and seasonal lore.",
      rightDate: "20.03.2024"
    },
    {
      id: "aquarius",
      name: "Aquarius",
      image: "/src/assets/signs/aquarius.png",
      cardImage: "/src/assets/signs/card-aquarius.png",
      colors: ["#a8fff0", "#6be6d0"],
      date: "20 Jan – 18 Feb",
      leftText:
        "Aquarius is a large, diffuse constellation associated with water and rivers. It contains several notable star clusters and faint nebulae best viewed from dark sites.",
      leftDate: "21.03.2023",
      rightText:
        "In mythology Aquarius is the water-bearer, sometimes linked to flood myths and rivers that sustain life. Its stars form a distinctive, spread-out pattern.",
      rightDate: "20.03.2024"
    },
    {
      id: "pisces",
      name: "Pisces",
      image: "/src/assets/signs/pisces.png",
      cardImage: "/src/assets/signs/card-pisces.png",
      colors: ["#cfe0ff", "#9ab8ff"],
      date: "19 Feb – 20 Mar",
      leftText:
        "Pisces is formed by two fish tied by a cord and is best seen in late winter to spring. It’s a large but faint constellation with a few small star clusters and galaxies.",
      leftDate: "21.03.2023",
      rightText:
        "The Pisces story often ties to romantic and rescue myths where fish help transport deities. Its gentle shape and placement near the ecliptic made it important in ancient stargazing.",
      rightDate: "20.03.2024"
    }
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
  const leftText = selected?.leftText ?? "Short intro text abt the constellation. Replace with your uploaded content for each sign.";
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

      {/* Grid of sign cards (background images + overlay text) */}
      <div className="mt-10 grid grid-cols-3 sm:grid-cols-3 md:grid-cols-6 gap-4">
        {signs.map((s, i) => {
          const isActive = i === selectedIndex;
          const bg = s.cardImage || s.image;
          return (
            <button
              key={s.id || s.name || i}
              onClick={() => onSelectCard(i)}
              className={`relative rounded-2xl text-white shadow-lg transform transition-all duration-300 focus:outline-none
                ${isActive ? "ring-4 ring-indigo-400/50 scale-105" : "hover:scale-105 hover:shadow-2xl"}`}
              style={{ minHeight: '250px', padding: 0, border: 'none', background: 'transparent' }}
            >
              {/* inner visual card keeps overflow-hidden so the rounded corners and image crop correctly */}
              <div
                className="absolute inset-0 overflow-hidden"
                style={{
                  backgroundImage: `url(${bg})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  /* chamfered / clipped corners to produce the angled edge look */
                  WebkitClipPath:
                    "polygon(8% 0, 92% 0, 100% 8%, 100% 92%, 92% 100%, 8% 100%, 0 92%, 0 8%)",
                  clipPath:
                    "polygon(8% 0, 92% 0, 100% 8%, 100% 92%, 92% 100%, 8% 100%, 0 92%, 0 8%)"
                }}
              >
                

                {/* optional decorative gradient if you want more contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none"></div>

              </div>

              {isActive && (
                <div className="absolute top-3 right-3 bg-indigo-500 text-white text-xs px-2 py-1 rounded-full shadow-sm z-30">
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