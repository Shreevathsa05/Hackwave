// src/pages/CreateExam.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

export const CreateExam = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const [exam, setExam] = useState({
    examId: "",
    title: "",
    description: "",
    isActive: true,
    questions: [
      { questionText: "", type: "application", correctAnswer: "", options: [{ text: "" }, { text: "" }] }
    ]
  });

  const [showAI, setShowAI] = useState(false);
  const [aiFile, setAiFile] = useState(null);
  const [loadingAI, setLoadingAI] = useState(false);
  const [message, setMessage] = useState("");

  // MANUAL EXAM HANDLERS
  const handleExamChange = (e) => {
    const { name, value } = e.target;
    setExam({ ...exam, [name]: value });
  };

  const handleQuestionChange = (qIndex, field, value) => {
    const newQuestions = [...exam.questions];
    newQuestions[qIndex][field] = value;
    setExam({ ...exam, questions: newQuestions });
  };

  const handleOptionChange = (qIndex, oIndex, value) => {
    const newQuestions = [...exam.questions];
    newQuestions[qIndex].options[oIndex].text = value;
    setExam({ ...exam, questions: newQuestions });
  };

  const addQuestion = () => {
    setExam({
      ...exam,
      questions: [...exam.questions, { questionText: "", type: "application", correctAnswer: "", options: [{ text: "" }, { text: "" }] }]
    });
  };

  const addOption = (qIndex) => {
    const newQuestions = [...exam.questions];
    newQuestions[qIndex].options.push({ text: "" });
    setExam({ ...exam, questions: newQuestions });
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch("http://localhost:3000/exam", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(exam)
      });
      const data = await res.json();
      if (res.ok) {
        enqueueSnackbar("Exam created successfully!", { variant: "success" });
        setExam({
          examId: "",
          title: "",
          description: "",
          isActive: true,
          questions: [{ questionText: "", type: "application", correctAnswer: "", options: [{ text: "" }, { text: "" }] }]
        });
      } else {
        enqueueSnackbar(data.error, { variant: "error" });
      }
    } catch (err) {
      enqueueSnackbar("Error: " + err.message, { variant: "error" });
    }
  };

  // AI EXAM HANDLERS
  const handleAiFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) setAiFile(e.target.files[0]);
  };

  const handleAiSubmit = async () => {
    if (!aiFile) {
      enqueueSnackbar("Please select a file", { variant: "warning" });
      return;
    }

    const formData = new FormData();
    formData.append("file", aiFile);

    // MANUAL SESSION ID
    const sessionId = "SESSION123";

    try {
      setLoadingAI(true);
      const res = await fetch(`http://localhost:3000/ai/upload-mongo/${sessionId}`, {
        method: "POST",
        body: formData
      });
      const data = await res.json();
      enqueueSnackbar(data.message || "AI Exam created successfully!", { variant: "success" });
      setShowAI(false);
      setAiFile(null);

      // Optional redirect after AI creation
      if (data.examId) navigate(`/quiz/${data.examId}`);
    } catch (err) {
      enqueueSnackbar("AI upload failed: " + err.message, { variant: "error" });
    } finally {
      setLoadingAI(false);
    }
  };

  return (
    <div className="p-6 space-y-6 min-h-screen bg-black text-white">
      <h2 className="text-3xl font-bold text-purple-400 drop-shadow-lg">Create Exam</h2>

      {/* MANUAL EXAM */}
      <div className="space-y-4">
        <input type="text" name="examId" placeholder="Exam ID" value={exam.examId} onChange={handleExamChange}
          className="w-full p-3 rounded-lg border border-purple-700 bg-black text-white focus:outline-none focus:border-pink-500" />
        <input type="text" name="title" placeholder="Title" value={exam.title} onChange={handleExamChange}
          className="w-full p-3 rounded-lg border border-purple-700 bg-black text-white focus:outline-none focus:border-pink-500" />
        <textarea name="description" placeholder="Description" value={exam.description} onChange={handleExamChange}
          className="w-full p-3 rounded-lg border border-purple-700 bg-black text-white focus:outline-none focus:border-pink-500" />
      </div>

      {exam.questions.map((q, qIndex) => (
        <div key={qIndex} className="border border-purple-800 p-4 rounded-lg space-y-3 bg-gray-900 shadow-neon-glow">
          <input type="text" placeholder="Question Text" value={q.questionText}
            onChange={(e) => handleQuestionChange(qIndex, "questionText", e.target.value)}
            className="w-full p-2 rounded border border-purple-700 bg-black text-white focus:outline-none focus:border-pink-500" />
          <select value={q.type} onChange={(e) => handleQuestionChange(qIndex, "type", e.target.value)}
            className="w-full p-2 rounded border border-purple-700 bg-black text-white focus:outline-none focus:border-pink-500">
            <option value="listening">Listening</option>
            <option value="retention">Retention</option>
            <option value="application">Application</option>
            <option value="grasping">Grasping</option>
          </select>
          <input type="text" placeholder="Correct Answer" value={q.correctAnswer}
            onChange={(e) => handleQuestionChange(qIndex, "correctAnswer", e.target.value)}
            className="w-full p-2 rounded border border-purple-700 bg-black text-white focus:outline-none focus:border-pink-500" />
          <div className="space-y-2">
            {q.options.map((opt, oIndex) => (
              <input key={oIndex} type="text" placeholder={`Option ${oIndex + 1}`} value={opt.text}
                onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
                className="w-full p-2 rounded border border-purple-700 bg-black text-white focus:outline-none focus:border-pink-500" />
            ))}
            <button type="button" onClick={() => addOption(qIndex)} className="text-pink-500 underline mt-1">+ Add Option</button>
          </div>
        </div>
      ))}

      <div className="flex space-x-4">
        <button type="button" onClick={addQuestion} className="bg-purple-700 text-white px-4 py-2 rounded hover:bg-purple-600">+ Add Question</button>
        <button type="button" onClick={handleSubmit} className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-500">Create Exam</button>
        <button type="button" onClick={() => setShowAI(true)} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500">Create with AI</button>
      </div>

      {/* AI POPUP MODAL */}
      {showAI && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="bg-gray-900 p-6 rounded-2xl w-full max-w-md space-y-4">
            <h3 className="text-xl font-bold text-purple-400">AI Exam Creation</h3>
            <p className="text-gray-300">Session ID: SESSION123</p>
            <input type="file" accept=".pdf,.docx,.txt,.pptx,.csv,.xlsx" onChange={handleAiFileChange}
              className="w-full p-2 rounded border border-purple-700 bg-black text-white" />
            {aiFile && <p className="text-gray-300 mt-1">Selected file: {aiFile.name}</p>}
            <div className="flex space-x-2 mt-2">
              <button onClick={handleAiSubmit} disabled={loadingAI} className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600">
                {loadingAI ? "Processing..." : "Upload & Create"}
              </button>
              <button onClick={() => setShowAI(false)} className="bg-gray-700 px-4 py-2 rounded hover:bg-gray-600">Cancel</button>
            </div>
            {message && <p className="text-green-400 mt-2">{message}</p>}
          </div>
        </div>
      )}
    </div>
  );
};
