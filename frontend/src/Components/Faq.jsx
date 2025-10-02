import React, { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

export const Faq = () => {
  const faqs = [
    {
      question: "What is EduNova?",
      answer:
        "EduNova is a personalized learning platform that adapts to each student's pace and style.",
    },
    {
      question: "How does adaptive learning work?",
      answer:
        "Our system tracks your strengths and weaknesses and suggests content accordingly.",
    },
    {
      question: "Can teachers monitor progress?",
      answer:
        "Yes, teachers get a dashboard to track student performance and assign custom tasks.",
    },
    {
      question: "Is collaboration possible?",
      answer:
        "Students can participate in group projects and learn together seamlessly.",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFaq = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="w-full bg-black py-12">
      <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-center mb-12">
        Frequently Asked Questions
      </h2>

      <div className="w-full max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 px-4 md:px-0">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-gray-800/70 border border-gray-700 rounded-2xl p-5 cursor-pointer transition-all duration-300 hover:bg-gray-800/90"
            onClick={() => toggleFaq(index)}
          >
            <div className="flex justify-between items-center">
              <h3 className="text-lg md:text-xl font-semibold text-white">
                {faq.question}
              </h3>
              <span className="text-white text-2xl">
                {activeIndex === index ? <FiChevronUp /> : <FiChevronDown />}
              </span>
            </div>
            {activeIndex === index && (
              <p className="mt-3 text-gray-300 text-base md:text-lg transition-all duration-300">
                {faq.answer}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};
