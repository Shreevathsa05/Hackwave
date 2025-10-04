import React, { useEffect, useState } from "react";
import { useSnackbar } from "notistack";

export const StudentData = ({ studentId }) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const { enqueueSnackbar } = useSnackbar();

  // Fetch student results
  const fetchResults = async () => {
    try {
      setLoading(true);
      const res = await fetch(`http://localhost:3000/results/student/${studentId}`);
      const data = await res.json();

      if (!res.ok) {
        enqueueSnackbar(data.error || "Failed to fetch results", { variant: "error" });
        setResults([]);
      } else {
        setResults(data);
      }
      setLoading(false);
    } catch (err) {
      console.error(err);
      enqueueSnackbar("Error fetching results", { variant: "error" });
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResults();
  }, [studentId]);

  if (loading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center text-white text-xl">
        Loading results...
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center text-white text-xl">
        No results found
      </div>
    );
  }

  return (
    <div className="p-4 sm:ml-64 mt-16 min-h-screen bg-black text-white">
      <h1 className="text-3xl font-bold mb-6 text-purple-400">My Exam Results</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {results.map((result) => (
          <div
            key={result._id}
            className="bg-gray-900 border border-purple-800 rounded-xl p-4 shadow-neon-glow flex flex-col justify-between hover:scale-105 transition-transform duration-200"
          >
            <div>
              <h2 className="text-xl font-semibold text-purple-300">
                {result.examId.title || "Exam Title"}
              </h2>
              <p className="text-gray-400 mb-2">{result.examId.description}</p>
              <p className="text-green-400 font-medium mb-2">
                Total Questions: {result.examId.questions.length}
              </p>
              <p className="text-yellow-400 font-medium mb-2">
                Score: {result.score} / {result.examId.questions.length}
              </p>
              <p className={`font-semibold ${result.passed ? "text-cyan-400" : "text-red-500"}`}>
                Status: {result.passed ? "Passed" : "Failed"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
