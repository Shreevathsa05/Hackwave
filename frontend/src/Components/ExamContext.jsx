// src/context/ExamContext.jsx
import { createContext, useState, useContext } from "react";

const ExamContext = createContext();

export const ExamProvider = ({ children }) => {
    const [examId, setExamId] = useState(null);
    const [sessionId, setSessionId] = useState(null);
    const [answers, setAnswers] = useState([]);

    return (
        <ExamContext.Provider
            value={{
                examId,
                setExamId,
                sessionId,
                setSessionId,
                answers,
                setAnswers,
            }}
        >
            {children}
        </ExamContext.Provider>
    );
};

export const useExam = () => useContext(ExamContext);
