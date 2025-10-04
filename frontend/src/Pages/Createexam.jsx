import React, { useState } from "react";
import { useSnackbar } from "notistack";

export const CreateExam = () => {
  const { enqueueSnackbar } = useSnackbar(); // notistack hook

  const [exam, setExam] = useState({
    examId: "",
    title: "",
    description: "",
    isActive: true,
    questions: [
      { questionText: "", type: "application", correctAnswer: "", options: [{ text: "" }, { text: "" }] }
    ]
  });

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
        enqueueSnackbar(data.error || "Failed to create exam", { variant: "error" });
      }
    } catch (err) {
      enqueueSnackbar(err.message, { variant: "error" });
    }
  };

  return (
    <div className="p-6 space-y-6 min-h-screen bg-black text-white">
      <h2 className="text-3xl font-bold text-purple-400 drop-shadow-lg">Create Exam</h2>

      <div className="space-y-4">
        <input
          type="text"
          name="examId"
          placeholder="Exam ID"
          value={exam.examId}
          onChange={handleExamChange}
          className="w-full p-3 rounded-lg border border-purple-700 bg-black text-white focus:outline-none focus:border-pink-500"
        />
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={exam.title}
          onChange={handleExamChange}
          className="w-full p-3 rounded-lg border border-purple-700 bg-black text-white focus:outline-none focus:border-pink-500"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={exam.description}
          onChange={handleExamChange}
          className="w-full p-3 rounded-lg border border-purple-700 bg-black text-white focus:outline-none focus:border-pink-500"
        />
      </div>

      {exam.questions.map((q, qIndex) => (
        <div key={qIndex} className="border border-purple-800 p-4 rounded-lg space-y-3 bg-gray-900 shadow-neon-glow">
          <input
            type="text"
            placeholder="Question Text"
            value={q.questionText}
            onChange={(e) => handleQuestionChange(qIndex, "questionText", e.target.value)}
            className="w-full p-2 rounded border border-purple-700 bg-black text-white focus:outline-none focus:border-pink-500"
          />
          <select
            value={q.type}
            onChange={(e) => handleQuestionChange(qIndex, "type", e.target.value)}
            className="w-full p-2 rounded border border-purple-700 bg-black text-white focus:outline-none focus:border-pink-500"
          >
            <option value="listening">Listening</option>
            <option value="retention">Retention</option>
            <option value="application">Application</option>
            <option value="grasping">Grasping</option>
          </select>
          <input
            type="text"
            placeholder="Correct Answer"
            value={q.correctAnswer}
            onChange={(e) => handleQuestionChange(qIndex, "correctAnswer", e.target.value)}
            className="w-full p-2 rounded border border-purple-700 bg-black text-white focus:outline-none focus:border-pink-500"
          />
          <div className="space-y-2">
            {q.options.map((opt, oIndex) => (
              <input
                key={oIndex}
                type="text"
                placeholder={`Option ${oIndex + 1}`}
                value={opt.text}
                onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
                className="w-full p-2 rounded border border-purple-700 bg-black text-white focus:outline-none focus:border-pink-500"
              />
            ))}
            <button
              type="button"
              onClick={() => addOption(qIndex)}
              className="text-pink-500 underline mt-1"
            >
              + Add Option
            </button>
          </div>
        </div>
      ))}

      <div className="flex space-x-4">
        <button
          type="button"
          onClick={addQuestion}
          className="bg-purple-700 text-white px-4 py-2 rounded hover:bg-purple-600"
        >
          + Add Question
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-500"
        >
          Create Exam
        </button>
      </div>
    </div>
  );
};
