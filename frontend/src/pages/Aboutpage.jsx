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

       
      {/* 🔹 Page Content */}
      <div className="relative z-10 flex flex-col justify-center items-center h-screen text-center px-6">
        <h1 className="text-4xl md:text-5xl font-bold text-cyan-300 font-[Comic_Sans_MS] mb-6">
          👥 About Us
        </h1>

        {/* 🔸 Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-15 max-w-6xl">
          {/* Box 1 */}
          <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-md border border-white/20">
            <h2 className="text-2xl font-bold text-blue-300 font-[Comic_Sans_MS] mb-2">
              🪐 Who We Are
            </h2>
            <p className="text-gray-200 text-base font-[Comic_Sans_MS]">
             Space cadets is a university project promoting space knowledge and
              innovation among students and enthusiasts.
            </p>
          </div>

          {/* Box 2 */}
          <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-md border border-white/20">
            <h2 className="text-2xl font-bold text-blue-300 font-[Comic_Sans_MS] mb-2">
              🎯 Aim
            </h2>
            <p className="text-gray-200 text-base font-[Comic_Sans_MS]">
              To encourage curiosity and creative learning in the field of space
              science and technology.
            </p>
          </div>

          {/* Box 3 */}
          <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-md border border-white/20">
            <h2 className="text-2xl font-bold text-blue-300 font-[Comic_Sans_MS] mb-2">
              🌠 Mission
            </h2>
            <p className="text-gray-200 text-base font-[Comic_Sans_MS]">
             Our mission is to make space education fun and easy for space cadets through creative and engaging learning.
            </p>
          </div>

          {/* Box 4 */}
          <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-md border border-white/20">
            <h2 className="text-2xl font-bold text-blue-300 font-[Comic_Sans_MS] mb-2">
              🚀 Vision
            </h2>
            <p className="text-gray-200 text-base font-[Comic_Sans_MS]">
              Inspire students to explore and innovate in space science for a
              sustainable future.
            </p>
          </div>

          {/* Box 5 */}
          <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-md border border-white/20">
            <h2 className="text-2xl font-bold text-blue-300 font-[Comic_Sans_MS] mb-2">
              👩‍🚀 Our Team
            </h2>
            <p className="text-gray-200 text-base font-[Comic_Sans_MS]">
             • Fathima Nuha • Fathima Naja • Vinojan 
             • Pathushan • Josiya
            </p>
          </div>

          {/* Box 6 */}
          <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-md border border-white/20">
            <h2 className="text-2xl font-bold text-blue-300 font-[Comic_Sans_MS] mb-2">
              📬 Contact Us
            </h2>
            <p className="text-gray-200 text-base font-[Comic_Sans_MS]">
              📧 spacekitsuniversity@gmail.com <br />
              🌐 www.spacekitsuniversity.com <br />
              📍 Rajarata University of Sri Lanka
            </p>
          </div>
        </div>
      </div>
    

      </div>
    </>
  );
}