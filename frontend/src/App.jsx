import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import SunPage from "./pages/SunPage";
import EarthPage from "./pages/EarthPage";
import OtherPlanetsPage from "./pages/OtherPlanetsPage";
import UniversePage from "./pages/UniversePage";
import MoonPage from "./pages/MoonPage";
import StarConstellationPage from "./pages/StarConstellationPage";
import NewTechnologiesPage from "./pages/NewTechnologiesPage";
import KnownGalaxiesPage from "./pages/KnownGalaxiesPage";
import GamePage from "./pages/GamePage";
import VideosPage from "./pages/VideosPage"; // Add this import
import SuccessPage from "./pages/SuccessPage"; // Import the SuccessPage component

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hasAccount, setHasAccount] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    const user = localStorage.getItem("user");

    setIsLoggedIn(loggedIn === "true");
    setHasAccount(!!user);
  }, []);

  return (
    <Router>
      <Routes>
        {/* Landing Page logic */}
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <Navigate to="/home" />
            ) : hasAccount ? (
              <LoginPage />
            ) : (
              <LandingPage />
            )
          }
        />

        {/* Register page (only accessible if no account) */}
        <Route
          path="/register"
          element={
            isLoggedIn ? <Navigate to="/home" /> : <RegisterPage />
          }
        />

        {/* Home page */}
        <Route path="/home" element={isLoggedIn ? <HomePage /> : <Navigate to="/" />} />

        {/* Sun page */}
        <Route path="/sun" element={<SunPage />} />

        {/* Earth page */}
        <Route path="/earth" element={<EarthPage />} />

        {/* Other Planets page */}
        <Route path="/otherplanets" element={<OtherPlanetsPage />} />

        {/* Universe page */}
        <Route path="/universe" element={<UniversePage />} />

        {/* Moon page */}
        <Route path="/moon" element={<MoonPage />} />

        {/* Star Constellation page */}
        <Route path="/starconstellation" element={<StarConstellationPage />} />

        {/* New Technologies page */}
        <Route path="/newtechnologies" element={<NewTechnologiesPage />} />

        {/* Known Galaxies page */}
        <Route path="/knowngalaxies" element={<KnownGalaxiesPage />} />

        {/* Game page */}
        <Route path="/games" element={<GamePage />} />

        {/* Videos page */}
        <Route path="/videos" element={<VideosPage />} /> {/* Add this route */}

        {/* Success page */}
        <Route path="/success" element={<SuccessPage />} /> {/* Add this route */}

        {/* Login page */}
        <Route path="/login" element={<LoginPage />} /> {/* Ensure this route exists */}
      </Routes>
    </Router>
  );
}

export default App;


