import React from "react";
import Header from "../components/Header";
import SpaceBackground from "../components/SpaceBackground";

export default function Aboutpage() {
  return (
    <>
      <Header activePage="about" onNotificationClick={() => {}} />
      <div className="relative min-h-screen">
        {/* background layer */}
        <div className="absolute inset-0 -z-10">
          <SpaceBackground />
        </div>

        {/* content */}
        <main className="min-h-screen bg-transparent text-gray-100 py-12 px-4">
          <div className="max-w-4xl mx-auto bg-gradient-to-b from-slate-800/60 to-slate-900/60 rounded-2xl shadow-lg p-8 backdrop-blur">
            <header className="mb-6">
              <h1 className="text-3xl font-bold">About Space Cadets</h1>
              <p className="mt-2 text-sm text-gray-300">
                Space Cadets is a lightweight learning and exploration app that blends astronomy,
                interactivity and friendly gamification to help users discover constellations, track
                progress and compete on a leaderboard.
              </p>
            </header>

            <section className="mb-6">
              <h2 className="text-xl font-semibold">Our mission</h2>
              <p className="mt-2 text-gray-300">
                Make stargazing and basic astronomy approachable for everyone. We focus on clear
                explanations, quick drills, and visual tools so you can learn constellations and
                astronomical stories in small, repeatable steps.
              </p>
            </section>

            <section className="mb-6">
              <h2 className="text-xl font-semibold">What you'll find here</h2>
              <ul className="mt-2 list-disc list-inside text-gray-300 space-y-1">
                <li>Interactive constellation cards with descriptions and imagery.</li>
                <li>Daily learning reminders and a simple streak system to keep you motivated.</li>
                <li>A leaderboard to compare progress with friends.</li>
                <li>User settings for profile, avatar and basic account management.</li>
              </ul>
            </section>

            <section className="mb-6">
              <h2 className="text-xl font-semibold">Tech stack</h2>
              <p className="mt-2 text-gray-300">
                Frontend: React + Tailwind. Backend: Node.js + Express + MongoDB. The app uses a small
                REST API for search, settings and leaderboard features.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold">Get in touch</h2>
              <p className="mt-2 text-gray-300">
                Found a bug or have a suggestion? Open an issue in the project repository or contact
                the maintainer via the project README. Contributions and feedback are welcome.
              </p>
            </section>
          </div>
        </main>
      </div>
    </>
  );
}