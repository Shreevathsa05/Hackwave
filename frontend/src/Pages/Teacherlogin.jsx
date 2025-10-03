import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { NavLink } from "react-router-dom";

export const TeacherLogin = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="w-full max-w-md bg-black/80 backdrop-blur-lg border border-white/20 rounded-2xl p-8 shadow-2xl">
        <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-center mb-6 animate-pulse">
          Sign In
        </h2>

        <form className="flex flex-col gap-5">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition"
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition pr-12"
            />
            <div
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold rounded-xl shadow-lg hover:scale-105 hover:shadow-2xl transition transform duration-300"
          >
           <NavLink to="/teacherdashboard" className="block w-full h-full text-center">
     Sign In
  </NavLink>
          </button>
        </form>

       
      </div>
    </div>
  );
};
