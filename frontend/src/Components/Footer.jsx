import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";

export const Footer = () => {
  return (
    <footer className="relative bg-black text-gray-300 px-6 mt-2 py-4 overflow-hidden">
      {/* Subtle glowing gradient background */}
      <div className="absolute inset-0 bg-gradient-to-t from-purple-500/10 via-black to-black pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row items-center md:items-start justify-between gap-10 text-center md:text-left">
        
        {/* Brand / About */}
        <div className="flex-1">
          <h2 className="text-3xl font-extrabold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
            EduNova
          </h2>
          <p className="mt-3 text-gray-400 text-sm leading-relaxed max-w-sm">
            Revolutionizing personalized learning with adaptive education,
            real-time tracking, and seamless teacher-student collaboration.
          </p>
        </div>

        {/* Links Section */}
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-white mb-4">Explore</h3>
          <div className="flex flex-col space-y-3">
            <span className="cursor-pointer hover:text-purple-400 hover:translate-x-1 transition-transform duration-300">
              Home
            </span>
            <span className="cursor-pointer hover:text-purple-400 hover:translate-x-1 transition-transform duration-300">
              About
            </span>
            <span className="cursor-pointer hover:text-purple-400 hover:translate-x-1 transition-transform duration-300">
              FAQ
            </span>
            <span className="cursor-pointer hover:text-purple-400 hover:translate-x-1 transition-transform duration-300">
              Social Media
            </span>
          </div>
        </div>

        {/* Social Icons */}
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
          <div className="flex justify-center md:justify-start gap-4">
            <div className="p-3 rounded-full bg-white/10 hover:bg-purple-500 hover:scale-110 transition-all duration-300 cursor-pointer">
              <FaFacebookF />
            </div>
            <div className="p-3 rounded-full bg-white/10 hover:bg-purple-500 hover:scale-110 transition-all duration-300 cursor-pointer">
              <FaTwitter />
            </div>
            <div className="p-3 rounded-full bg-white/10 hover:bg-purple-500 hover:scale-110 transition-all duration-300 cursor-pointer">
              <FaLinkedinIn />
            </div>
            <div className="p-3 rounded-full bg-white/10 hover:bg-purple-500 hover:scale-110 transition-all duration-300 cursor-pointer">
              <FaInstagram />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative z-10 mt-10 pt-6 border-t border-gray-700 text-center text-gray-400 text-sm">
        © {new Date().getFullYear()} EduNova. All rights reserved.
      </div>
    </footer>
  );
};
