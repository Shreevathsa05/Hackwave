import React, { useState } from "react";
import { Outlet, NavLink, Link, useNavigate } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import { AiFillStar } from "react-icons/ai"; // import star icon

export const TeacherDash = ({ routes }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <>
      {/* Navbar */}
      <nav className="fixed top-0 z-50 w-full bg-black/95 backdrop-blur-md flex justify-between items-center px-4 py-3 shadow-lg border-b border-purple-800">
        <div className="flex items-center">
          <button
            className="sm:hidden mr-3 text-purple-400 hover:text-purple-600"
            onClick={toggleSidebar}
          >
            {sidebarOpen ? <HiX size={28} /> : <HiMenu size={28} />}
          </button>
          <Link to="/" className="flex items-center">
            <span className="text-2xl md:text-4xl font-bold text-purple-400 hover:text-purple-500 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-pulse drop-shadow-[0_0_15px_rgba(255,0,255,0.8)]">
              EduNova
            </span>
          </Link>
        </div>

        <div className="flex items-center">
          <img
            className="w-10 h-10 rounded-full border-2 border-purple-400 shadow-glow"
            src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
            alt="user"
          />
        </div>
      </nav>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 bg-black/95 border-r border-purple-800 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 sm:translate-x-0 shadow-glow`}
      >
        <div className="h-full flex flex-col justify-between px-3 pb-4 overflow-y-auto">
          {/* Menu Items */}
          <ul className="space-y-2 font-medium">
            {routes.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  end
                  className={({ isActive }) =>
                    `flex items-center p-2 text-purple-400 rounded-lg hover:text-pink-400 hover:scale-105 transition-transform duration-200 ${
                      isActive ? "bg-purple-900/40 shadow-neon" : ""
                    }`
                  }
                  onClick={() => setSidebarOpen(false)}
                >
                  <span className="ml-3 font-semibold">{item.name}</span>
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Back to Home button */}
          <div className="mt-4">
            <button
              onClick={() => {
                setSidebarOpen(false);
                navigate("/");
              }}
              className="w-full flex items-center p-2 bg-purple-700 hover:bg-purple-600 text-white rounded-lg transition-colors duration-200"
            >
              <span className="ml-3 font-semibold">Back to Home</span>
            </button>
          </div>
        </div>
      </aside>

   
      <div className="p-4 sm:ml-64 mt-16 min-h-screen bg-black text-white">
        <div className="p-6 border-2 border-purple-800 border-dashed rounded-lg min-h-[80vh] shadow-neon-glow flex flex-col items-center justify-center space-y-4">
         
          
          <Outlet />
        </div>
      </div>
    </>
  );
};
