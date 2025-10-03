import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import Exam from "../Schema/examschema.js";

dotenv.config();

const genAI = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

/**
 * Segregates given exam questions into categories.
 * 
 * @param {string} examId - The unique exam identifier
 * @returns {Array} - Array of categorized questions
 */
export async function segregateExamQuestions(examId) {
  const baseQuestions = await Exam.find({ examId });

  const contents = [
    {
      role: "user",
      parts: [
        {
          text: `You are an assistant that classifies exam questions into one of these categories:
"listening", "retention", "application", "grasping".

Classify the given questions.  

Questions:
${JSON.stringify(baseQuestions)}`
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
        type: "array",
        items: {
          type: "object",
          properties: {
            questionText: { type: "string" },
            options: {
              type: "array",
              items: {
                type: "object",
                properties: { text: { type: "string" } },
                required: ["text"]
              }
            },
            correctAnswer: { type: "string" },
            type: {
              type: "string",
              enum: ["listening", "retention", "application", "grasping"]
            }
          },
          required: ["questionText", "options", "correctAnswer", "type"]
        }
      }
    }
  });

  const questions = response.candidates[0].content.parts[0].jsonValue;

  // Create a new exam entry directly
  const exam = new Exam({
    examId,
    questions
  });

  await exam.save();
  return questions;
}

/**
 * Expands exam questions by generating new similar ones.
 * 
 * @param {string} examId - The unique exam identifier
 * @returns {Array} - Array of new generated questions
 */
export async function expandExamQuestions(examId) {
  const baseQuestions = await Exam.find({ examId });

  const contents = [
    {
      role: "user",
      parts: [
        {
          text: `Generate NEW exam questions similar to the given examples. 
Ensure variety across "listening", "retention", "application", "grasping".

Examples:
${JSON.stringify(baseQuestions)}

Output only JSON array of new questions.`
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
        type: "array",
        items: {
          type: "object",
          properties: {
            questionText: { type: "string" },
            options: {
              type: "array",
              items: {
                type: "object",
                properties: { text: { type: "string" } },
                required: ["text"]
              }
            },
            correctAnswer: { type: "string" },
            type: {
              type: "string",
              enum: ["listening", "retention", "application", "grasping"]
            }
          },
          required: ["questionText", "options", "correctAnswer", "type"]
        }
      }
    }
  });

  const newQuestions = response.candidates[0].content.parts[0].jsonValue;

  // Create a new exam entry directly
  const exam = new Exam({
    examId,
    questions: newQuestions
  });

  await exam.save();
  return newQuestions;
}
