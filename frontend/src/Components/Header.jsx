import React from "react";
import { NavLink } from "react-router-dom";

export const Header = () => {
  return (
    <header className="w-full z-50 flex flex-col md:flex-row items-center justify-between bg-black/80 px-10 py-4 backdrop-blur-lg border-b border-white/20 shadow-[0_0_20px_rgba(255,0,255,0.4)] fixed top-0 left-0">
      {/* Logo */}
      <div className="flex items-center justify-center mb-3 md:mb-0">
        <div className="px-6 py-3 rounded-xl bg-white/10 border border-white/20 shadow-[0_0_15px_rgba(255,0,255,0.5)]">
          <h1
            className="text-3xl md:text-4xl font-extrabold tracking-widest 
            bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 
            bg-clip-text text-transparent animate-pulse drop-shadow-[0_0_10px_rgba(255,0,255,0.8)]"
          >
            ⚡ EduNova
          </h1>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex items-center gap-6 text-white text-lg font-semibold">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `hover:text-pink-400 transition ${
              isActive ? "text-pink-500 underline underline-offset-4" : ""
            }`
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/studentsignup"
          className={({ isActive }) =>
            `hover:text-cyan-400 transition ${
              isActive ? "text-cyan-500 underline underline-offset-4" : ""
            }`
          }
        >
          Student Login
        </NavLink>

        <NavLink
          to="/teacherlogin"
          className={({ isActive }) =>
            `hover:text-purple-400 transition ${
              isActive ? "text-purple-500 underline underline-offset-4" : ""
            }`
          }
        >
          Teacher Login
        </NavLink>

        <NavLink
          to="/studentdashboard"
          className={({ isActive }) =>
            `hover:text-yellow-400 transition ${
              isActive ? "text-yellow-500 underline underline-offset-4" : ""
            }`
          }
        >
          Dashboard
        </NavLink>
      </nav>
    </header>
  );
};
