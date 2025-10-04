import React from "react";
import { FaUserGraduate, FaChartPie, FaLaptopCode, FaChalkboardTeacher, FaRobot } from "react-icons/fa";

export const UpcomingTeacher = () => {
  const upcomingFeatures = [
    {
      title: "AI-Generated Question Bank",
      description:
        "Create personalized quizzes and assignments instantly using AI-curated questions tailored to student learning levels.",
      icon: <FaRobot className="text-purple-400 text-3xl" />,
    },
    {
      title: "Smart Class Analytics",
      description:
        "Get real-time insights into student engagement, topic understanding, and overall class performance with interactive dashboards.",
      icon: <FaChartPie className="text-blue-400 text-3xl" />,
    },
    {
      title: "Virtual Classrooms",
      description:
        "Host interactive online sessions with live polls, instant feedback, and shared whiteboards — all within EduNova.",
      icon: <FaChalkboardTeacher className="text-green-400 text-3xl" />,
    },
    {
      title: "Automated Grading System",
      description:
        "AI evaluates assignments and quizzes instantly, giving teachers more time to focus on teaching, not checking.",
      icon: <FaLaptopCode className="text-pink-400 text-3xl" />,
    },
    {
      title: "Student Growth Tracker",
      description:
        "Monitor individual student progress with visual trends and AI-suggested interventions for better learning outcomes.",
      icon: <FaUserGraduate className="text-yellow-400 text-3xl" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white py-16 px-6">
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          🚀 Upcoming Teacher Features For Teachers on <span className="font-extrabold">EduVeda</span>
        </h1>
        <p className="text-gray-400 text-lg mb-12">
          Empowering educators with AI-driven tools to save time, enhance engagement, and personalize every learning experience.
        </p>
      </div>

      {/* Features List */}
      <ul className="max-w-3xl mx-auto flex flex-col gap-6">
        {upcomingFeatures.map((feature, index) => (
          <li
            key={index}
            className="flex items-start gap-4 p-6 bg-gray-800/50 rounded-2xl border border-gray-700 shadow-lg 
                       hover:shadow-blue-500/30 hover:scale-[1.02] transition-all duration-300 backdrop-blur-xl"
          >
            <div className="flex-shrink-0">{feature.icon}</div>
            <div>
              <h3 className="text-xl font-semibold text-blue-300 mb-1">
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
          ✨ Stay tuned! These powerful tools are being built to make teaching more efficient and impactful.
        </p>
      </div>
    </div>
  );
};
