import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import Result from "../Schema/Resultschema.js";

dotenv.config();

const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

/**
 * Evaluates student answers and stores results with feedback.
 * 
 * @param {string} examId - The unique exam identifier
 * @param {string} studentId - The unique student identifier
 * @param {Array} answers - Array of student answers (must include {questionText, correctAnswer, givenAnswer, type})
 * @returns {Object} - Result object with scores and feedback
 */
export async function evaluateExamResults(examId, studentId, answers) {
  // Send answers to Gemini for analysis
  const contents = [
    {
      role: "user",
      parts: [
        {
          text: `You are an exam evaluator. 
The exam has four categories: "listening", "retention", "application", "grasping".

You will receive an array of answered questions with:
- questionText
- type (one of listening, retention, application, grasping)
- correctAnswer
- givenAnswer

Your job:
1. Calculate scores (count correct answers) for each category.
2. Give clear and constructive feedback to help the student improve.

Return JSON with this format:
{
  "scores": {
    "listening": Number,
    "retention": Number,
    "application": Number,
    "grasping": Number
  },
  "feedback": "string with improvement suggestions"
}

Answers:
${JSON.stringify(answers, null, 2)}`
        }
      ]
    }
  ];

  const response = await genAI.models.generateContent({
    model: "gemini-2.0-flash",
    contents,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: "object",
        properties: {
          scores: {
            type: "object",
            properties: {
              listening: { type: "number" },
              retention: { type: "number" },
              application: { type: "number" },
              grasping: { type: "number" }
            },
            required: ["listening", "retention", "application", "grasping"]
          },
          feedback: { type: "string" }
        },
        required: ["scores", "feedback"]
      }
    }
  });

  const evaluation = response.candidates[0].content.parts[0].jsonValue;

  // Save into Results collection
  const resultDoc = new Result({
    examId,
    studentId,
    scores: evaluation.scores,
    feedback: evaluation.feedback
  });

  await resultDoc.save();

  return evaluation;
}
