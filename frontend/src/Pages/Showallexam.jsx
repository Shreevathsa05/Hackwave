import React, { useEffect, useState } from "react";
import { useSnackbar } from "notistack";

export const ShowAll = () => {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const { enqueueSnackbar } = useSnackbar();

  const fetchExams = () => {
    fetch("http://localhost:3000/exam")
      .then((res) => res.json())
      .then((data) => {
        // Remove _id and __v from each exam
        const filteredData = data.map(({ _id, __v, ...rest }) => rest);
        setExams(filteredData);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
        enqueueSnackbar("Failed to fetch exams", { variant: "error" });
      });
  };

  useEffect(() => {
    fetchExams();
  }, []);

  const handleDelete = async (examId) => {
    if (!window.confirm("Are you sure you want to delete this exam?")) return;
    try {
      const res = await fetch(`http://localhost:3000/exam/${examId}`, { method: "DELETE" });
      const data = await res.json();
      if (res.ok) {
        enqueueSnackbar("Exam deleted successfully", { variant: "success" });
        fetchExams();
      } else {
        enqueueSnackbar(data.error || "Failed to delete exam", { variant: "error" });
      }
    } catch (error) {
      console.error(error);
      enqueueSnackbar("Error deleting exam", { variant: "error" });
    }
  };

  const handleToggleActive = async (exam) => {
    try {
      const res = await fetch(`http://localhost:3000/exam/${exam.examId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...exam, isActive: !exam.isActive }),
      });
      const data = await res.json();
      if (res.ok) {
        enqueueSnackbar(`Exam ${data.isActive ? "activated" : "deactivated"}`, { variant: "success" });
        fetchExams();
      } else {
        enqueueSnackbar(data.error || "Failed to update exam", { variant: "error" });
      }
    } catch (error) {
      console.error(error);
      enqueueSnackbar("Error updating exam", { variant: "error" });
    }
  };

  if (loading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center text-white text-xl">
        Loading exams...
      </div>
    );
  }

  if (exams.length === 0) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center text-white text-xl">
        No exams available
      </div>
    );
  }

  return (
    <div className="p-4 sm:ml-3 mt-16 min-h-screen bg-black text-white">
      <h1 className="text-3xl font-bold mb-6 text-purple-400">All Exams</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {exams.map((exam) => (
          <div
            key={exam.examId}
            className="bg-gray-900 border border-purple-800 rounded-xl p-4 shadow-neon-glow flex flex-col justify-between hover:scale-105 transition-transform duration-200"
          >
            <div>
              <h2 className="text-xl font-semibold text-purple-300">{exam.title}</h2>
              <p className="text-gray-400 mb-2">{exam.description}</p>
              <p className="text-green-400 font-medium mb-2">
                Questions: {exam.questions.length}
              </p>
              <p className={`font-semibold ${exam.isActive ? "text-cyan-400" : "text-red-500"}`}>
                Status: {exam.isActive ? "Active" : "Inactive"}
              </p>

              {/* Questions Section */}
              <div className="mt-4">
                {exam.questions.map((q, idx) => (
                  <div
                    key={idx}
                    className="bg-gray-800 p-3 rounded-lg mb-3 border border-purple-700"
                  >
                    <p className="font-semibold text-purple-300">
                      Q{idx + 1}: {q.questionText}
                    </p>
                    <ul className="list-disc list-inside text-gray-300 mt-1">
                      {q.options.map((opt, i) => (
                        <li
                          key={i}
                          className={`${
                            opt.text === q.correctAnswer ? "text-green-400 font-semibold" : ""
                          }`}
                        >
                          {opt.text}
                        </li>
                      ))}
                    </ul>
                    <p className="text-sm mt-1 text-yellow-400">
                      Type: {q.type}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => handleToggleActive(exam)}
                className="flex-1 py-2 px-4 bg-purple-700 hover:bg-purple-600 rounded-lg text-white font-semibold transition-colors"
              >
                {exam.isActive ? "Deactivate" : "Activate"}
              </button>
              <button
                onClick={() => handleDelete(exam.examId)}
                className="flex-1 py-2 px-4 bg-red-600 hover:bg-red-500 rounded-lg text-white font-semibold transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
