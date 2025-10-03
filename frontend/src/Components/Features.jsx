import React from "react";
import { FaChalkboardTeacher, FaLaptopCode, FaChartLine, FaUsers } from "react-icons/fa";

export const Feature = () => {
  const features = [
    {
      icon: <FaChalkboardTeacher className="text-4xl md:text-5xl text-purple-400 animate-pulse" />,
      title: "Expert Teachers",
      description: "Learn from experienced educators with proven teaching methods."
    },
    {
      icon: <FaLaptopCode className="text-4xl md:text-5xl text-green-400 animate-pulse" />,
      title: "Interactive Learning",
      description: "Hands-on exercises, coding simulations, and adaptive lessons."
    },
    {
      icon: <FaChartLine className="text-4xl md:text-5xl text-pink-400 animate-pulse" />,
      title: "Progress Tracking",
      description: "Real-time performance insights to help students improve continuously."
    },
    {
      icon: <FaUsers className="text-4xl md:text-5xl text-cyan-400 animate-pulse" />,
      title: "Collaborative Platform",
      description: "Group discussions, peer reviews, and teacher-student interaction."
    }
  ];

  return (
    <section className="relative w-full py-16 px-6 bg-black text-white flex flex-col items-center">
      <div className="max-w-7xl w-full text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
          Why Choose EduNova?
        </h2>
        <p className="mt-4 text-gray-300 text-lg md:text-xl max-w-2xl mx-auto">
          Experience a next-generation learning platform built for students and teachers alike.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 w-full max-w-7xl">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center p-6 bg-black/30 backdrop-blur-md rounded-2xl border border-white/20 shadow-lg hover:scale-105 hover:shadow-2xl transition-transform duration-300"
          >
            <div className="mb-4">{feature.icon}</div>
            <h3 className="text-xl md:text-2xl font-bold mb-2">{feature.title}</h3>
            <p className="text-gray-300 text-sm md:text-base">{feature.description}</p>
          </div>
        ))}
      </div>

     
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <svg
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="2" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>
      </div>
    </section>
  );
};
