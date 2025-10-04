// src/pages/CreateExam.jsx
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useExam } from "../components/ExamContext";

export default function CreateExam() {
    const backendurl=`https://hackwave-2025.onrender.com`
    const { examId } = useParams();
    const navigate = useNavigate();
    const { setExamId, setSessionId } = useExam();

    const [file, setFile] = useState(null);
    const [sessionInput, setSessionInput] = useState("");
    const [apiType, setApiType] = useState("segregate");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!file || !sessionInput) return alert("Please provide file and session ID");

        const formData = new FormData();
        formData.append("file", file);

        try {
            setLoading(true);
            const res = await axios.post(`${backendurl}/ai/upload-mongo/${sessionInput}`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            setMessage(res.data.message);
            setSessionId(sessionInput);
        } catch (err) {
            console.error(err);
            setMessage("Upload failed");
        } finally {
            setLoading(false);
        }
    };

    const handleProcessExam = async () => {
        try {
            setLoading(true);
            await axios.post(`/ai/${apiType}/${examId}`);
            setExamId(examId);
            navigate(`${backendurl}/quiz/${examId}`);
        } catch (err) {
            console.error(err);
            alert("Error processing exam");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-2xl">
            <h1 className="text-2xl font-semibold mb-4 text-center">Create Exam</h1>

            <form onSubmit={handleUpload} className="space-y-4">
                <input
                    type="text"
                    placeholder="Enter Session ID"
                    value={sessionInput}
                    onChange={(e) => setSessionInput(e.target.value)}
                    className="w-full border p-2 rounded"
                />

                <input
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                    accept=".pdf,.docx,.pptx,.txt,.csv,.xlsx"
                    className="w-full border p-2 rounded"
                />

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                >
                    {loading ? "Uploading..." : "Upload"}
                </button>
            </form>

            {message && <p className="text-green-600 text-center mt-2">{message}</p>}

            <div className="mt-6">
                <label className="block mb-1">Select AI Operation</label>
                <select
                    value={apiType}
                    onChange={(e) => setApiType(e.target.value)}
                    className="w-full border p-2 rounded"
                >
                    <option value="segregate">Segregate Questions</option>
                    <option value="expand">Expand Questions</option>
                </select>

                <button
                    onClick={handleProcessExam}
                    disabled={loading}
                    className="w-full bg-green-500 text-white p-2 mt-3 rounded hover:bg-green-600"
                >
                    {loading ? "Processing..." : "Run AI"}
                </button>
            </div>
        </div>
    );
}
