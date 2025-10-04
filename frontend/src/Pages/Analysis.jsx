// src/pages/Analysis.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useExam } from "../Components/ExamContext";

export default function Analysis() {
    const backendurl=`https://hackwave-2025.onrender.com`
    const { examId } = useParams();
    const { answers } = useExam();
    const [result, setResult] = useState(null);

    useEffect(() => {
        const analyze = async () => {
            try {
                const res = await axios.post(`${backendurl}/ai/result-analysis`, {
                    examId,
                    studentId: "student001", // dynamic in future
                    answers,
                });
                setResult(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        analyze();
    }, [examId]);

    if (!result)
        return <p className="text-center mt-20">Analyzing your performance...</p>;

    const { scores, feedback } = result;

    return (
        <div className="max-w-xl mx-auto p-6 bg-white rounded-2xl shadow-md space-y-4">
            <h2 className="text-2xl font-semibold text-center">Result Analysis</h2>
            <div className="space-y-2">
                {Object.entries(scores).map(([category, value]) => (
                    <div
                        key={category}
                        className="flex justify-between border-b pb-1 text-gray-700"
                    >
                        <span className="capitalize">{category}</span>
                        <span className="font-semibold">{value}</span>
                    </div>
                ))}
            </div>

            <div className="mt-4 bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-1">AI Feedback</h3>
                <p className="text-gray-700">{feedback}</p>
            </div>
        </div>
    );
}
