import React from "react";
import { FaRobot, FaBrain, FaChalkboardTeacher, FaChartLine, FaBookOpen } from "react-icons/fa";

export const UpcomingStudent = () => {
  const upcomingFeatures = [
    {
      title: "AI-Powered Learning Assistant",
      description:
        "Personalized study paths and real-time support based on your strengths and weak areas.",
      icon: <FaRobot className="text-purple-400 text-3xl" />,
    },
    {
      title: "Smart Analytics Dashboard",
      description:
        "Visualize your progress, topic mastery, and performance trends through interactive charts.",
      icon: <FaChartLine className="text-blue-400 text-3xl" />,
    },
    {
      title: "Collaborative Learning Rooms",
      description:
        "Study with classmates, share notes, and solve quizzes together in real time.",
      icon: <FaChalkboardTeacher className="text-green-400 text-3xl" />,
    },
    {
      title: "Gamified Learning",
      description:
        "Earn badges, climb leaderboards, and unlock achievements as you complete tasks.",
      icon: <FaBrain className="text-pink-400 text-3xl" />,
    },
    {
      title: "Interactive Notes & Flashcards",
      description:
        "AI-curated notes, summaries, and flashcards to revise smarter, not harder.",
      icon: <FaBookOpen className="text-yellow-400 text-3xl" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white py-16 px-6">
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-purple-400 via-pink-500 to-blue-400 bg-clip-text text-transparent">
          🚀 Upcoming Features For Students on <span className="font-extrabold">EduVeda</span>
        </h1>
        <p className="text-gray-400 text-lg mb-12">
          We're constantly innovating to make your learning journey smarter, more personalized, and more fun!
        </p>
      </div>

      {/* Features List */}
      <ul className="max-w-3xl mx-auto flex flex-col gap-6">
        {upcomingFeatures.map((feature, index) => (
          <li
            key={index}
            className="flex items-start gap-4 p-6 bg-gray-800/50 rounded-2xl border border-gray-700 shadow-lg 
                       hover:shadow-purple-500/30 hover:scale-[1.02] transition-all duration-300 backdrop-blur-xl"
          >
            <div className="flex-shrink-0">{feature.icon}</div>
            <div>
              <h3 className="text-xl font-semibold text-purple-300 mb-1">
                {feature.title}
              </h3>
              <p className="text-gray-400 text-sm">{feature.description}</p>
            </div>
          </li>
        ))}
      </ul>

      {/* Footer note */}
      <div className="text-center mt-16">
        <p className="text-gray-500 italic">
          ✨ Stay tuned! These innovations are being built to redefine learning with AI and engagement.
        </p>
      </div>
    </div>
  );
};
