// src/components/Header.jsx
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { createPortal } from "react-dom";
import logo from "../assets/logo.png";
import AccountModal from "./AccountModal";

export default function Header({ onNotificationClick, activePage }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showAccountModal, setShowAccountModal] = useState(false);

  // Fetch the username from local storage or backend
  const username = localStorage.getItem("username") || "Guest"; // Replace with actual logic

  return (
    <header className="flex justify-between items-center bg-transparant backdrop-blur-md text-white p-4 relative">
      {/* Logo + Title */}
      <div className="flex items-center gap-2">
        <img src={logo} alt="Space Cadets Logo" className="w-15 h-auto" />
        <span className="font-bold text-xl">Space Cadets</span>
      </div>

      {/* Notification always visible */}
      <div className="flex items-center gap-4 md:hidden">
        <button onClick={onNotificationClick}>🔔</button>
        {/* Hamburger button */}
        <button
          className="flex flex-col gap-1"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span
            className={`h-1 w-6 bg-white rounded transition-transform duration-300 ${
              menuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          ></span>
          <span
            className={`h-1 w-6 bg-white rounded transition-opacity duration-300 ${
              menuOpen ? "opacity-0" : "opacity-100"
            }`}
          ></span>
          <span
            className={`h-1 w-6 bg-white rounded transition-transform duration-300 ${
              menuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          ></span>
        </button>
      </div>

      {/* Desktop Nav */}
      <nav className="hidden md:flex gap-6">
        <NavLink to="/home" className={({ isActive }) => (isActive ? "underline" : "")}>
          Home
        </NavLink>
        <NavLink to="/about" className={({ isActive }) => (isActive ? "underline" : "")}>
          About Us
        </NavLink>
        <NavLink to="/videos" className={({ isActive }) => (isActive ? "underline" : "")}>
          Videos
        </NavLink>
        <NavLink to="/games" className={({ isActive }) => (isActive ? "underline" : "")}>
          Games
        </NavLink>
        <button onClick={() => setShowAccountModal(true)}>⚙️ My Account</button>
        <button onClick={onNotificationClick}>🔔</button>
      </nav>

      {/* Mobile Dropdown Menu (rendered in a portal to ensure it sits above everything) */}
      {menuOpen &&
        createPortal(
          <div className="fixed top-16 right-4 bg-gray-800 rounded-lg shadow-lg p-4 flex flex-col gap-4 md:hidden animate-slideDown z-[99999]">
            <NavLink to="/home" className={({ isActive }) => (isActive ? "underline" : "")} onClick={() => setMenuOpen(false)}>
              Home
            </NavLink>
            <NavLink to="/about" className={({ isActive }) => (isActive ? "underline" : "")} onClick={() => setMenuOpen(false)}>
              About Us
            </NavLink>
            <NavLink to="/videos" className={({ isActive }) => (isActive ? "underline" : "")} onClick={() => setMenuOpen(false)}>
              Videos
            </NavLink>
            <NavLink to="/games" className={({ isActive }) => (isActive ? "underline" : "")} onClick={() => setMenuOpen(false)}>
              Games
            </NavLink>
            <button
              onClick={() => {
                setMenuOpen(false);
                setShowAccountModal(true);
              }}
            >
              ⚙️ My Account
            </button>
          </div>,
          document.body
        )}

      {/* Account Modal */}
      {showAccountModal && (
        <AccountModal
          username={username} // Pass the actual username
          userId={localStorage.getItem("userId")} // Pass the user ID if needed
          onClose={() => setShowAccountModal(false)}
          onLogout={() => {
            localStorage.clear();
            window.location.href = "/";
          }}
        />
      )}
    </header>
  );
}
