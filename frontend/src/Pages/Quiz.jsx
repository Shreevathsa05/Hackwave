// src/pages/Quiz.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useExam } from "../components/ExamContext";

export default function Quiz() {
    const backendurl=`https://hackwave-2025.onrender.com`
    const { examId } = useParams();
    const navigate = useNavigate();
    const { answers, setAnswers } = useExam();

    const [question, setQuestion] = useState(null);
    const [selected, setSelected] = useState("");
    const [loading, setLoading] = useState(false);

    const fetchNextQuestion = async () => {
        try {
            setLoading(true);
            const res = await axios.post(`${backendurl}/ai/next-question`, {
                examId,
                previousQnA: answers,
            });
            setQuestion(res.data.data);
        } catch (err) {
            console.error("Error fetching question:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (answers.length < 10) fetchNextQuestion();
        else navigate(`${backendurl}/analysis/${examId}`);
    }, [answers]);

    const handleSubmit = () => {
        if (!selected) return alert("Please select an answer");

        const newAnswer = {
            questionText: question.question,
            options: question.options,
            correctAnswer: question.answer,
            givenAnswer: selected,
            type: question.question_type,
        };

        setAnswers((prev) => [...prev, newAnswer]);
        setSelected("");
        setQuestion(null);
    };

    if (loading || !question)
        return <p className="text-center mt-20">Loading next question...</p>;

    return (
        <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-lg p-6 space-y-4">
            <h3 className="text-xl font-semibold">{question.question}</h3>
            <div className="space-y-2">
                {question.options.map((opt, i) => (
                    <label key={i} className="block border rounded p-2 cursor-pointer">
                        <input
                            type="radio"
                            name="option"
                            value={opt}
                            checked={selected === opt}
                            onChange={() => setSelected(opt)}
                            className="mr-2"
                        />
                        {opt}
                    </label>
                ))}
            </div>

            <button
                onClick={handleSubmit}
                className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
                Submit Answer
            </button>

            <p className="text-center text-gray-600 mt-3">
                Question {answers.length + 1} / 10
            </p>
        </div>
    );
}
