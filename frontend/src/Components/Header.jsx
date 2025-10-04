import React from "react";

export const Header = () => {
  return (
    <header className="w-full z-50 fixed top-0 left-0 bg-black backdrop-blur-lg border-b border-white/20 shadow-[0_0_20px_rgba(255,0,255,0.4)] px-10 py-4 flex items-center justify-center mb-10">
      {/* Logo */}
      <div className="flex items-center justify-center">
        <div className="px-6 py-3 rounded-xl bg-white/10 border border-white/20 shadow-[0_0_15px_rgba(255,0,255,0.5)]">
          <h1
            className="text-3xl md:text-4xl font-extrabold tracking-widest 
            bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 
            bg-clip-text text-transparent animate-pulse 
            drop-shadow-[0_0_10px_rgba(255,0,255,0.8)]"
          >
            ⚡ EduVeda
          </h1>
        </div>
      </div>
    </header>
  );
};
