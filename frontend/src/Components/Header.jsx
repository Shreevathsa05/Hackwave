import React from "react";

export const Header = () => {
  return (
    <header className="w-full z-50 flex items-center justify-center  bg-black py-6">
      <div className="px-10 py-4 rounded-2xl backdrop-blur-lg bg-white/10 border border-white/20 shadow-[0_0_20px_rgba(255,0,255,0.6)]">
        <h1
          className="text-4xl md:text-5xl font-extrabold tracking-widest 
          bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 
          bg-clip-text text-transparent 
          animate-pulse drop-shadow-[0_0_15px_rgba(255,0,255,0.8)]"
        >
          ⚡ EduNova
        </h1>
      </div>
    </header>
  );
};
