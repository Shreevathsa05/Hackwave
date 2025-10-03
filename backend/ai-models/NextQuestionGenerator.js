import { GoogleGenAI, Type } from "@google/genai";
import Exam from "../Schema/examschema.js";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function generateNextQuizQuestion(examId, previousQnA) {
  try {
    // Fetch exam with questions
    const exam = await Exam.findOne({ examId });
    if (!exam) throw new Error("Exam not found");

    const questions = exam.questions || [];

    // Prepare prompt
    const prompt = `
You are a quiz master. Your task is to generate the NEXT question for the student.

Context:
- Use the following Question and Answer Bank to ensure relevance:
  ${JSON.stringify(questions)}

- Review the Previous Questions and Answers to avoid repetition:
  ${JSON.stringify(previousQnA)}

Rules:
1. Do not repeat any previous questions.
2. Ensure the new question is contextually relevant to the topic.
3. Adapt the next question based on the student's performance:
   - If the student answered correctly, slightly increase the difficulty or move to a higher-order question type.
   - If the student answered incorrectly, lower the difficulty or shift to a simpler question type to reinforce understanding.

Return output strictly in the defined JSON schema.
    `;

    // Force JSON response with schema validation
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            question: { type: Type.STRING },
            options: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            answer: { type: Type.STRING },
            difficulty: {
              type: Type.STRING,
              enum: ["easy", "medium", "hard"],
            },
            question_type: {
              type: Type.STRING,
              enum: ["listening", "grasping", "retention", "application"],
            },
          },
          required: ["question", "options", "answer", "difficulty", "question_type"],
        },
      },
    });

    // Safely extract structured JSON
    return response.candidates[0].content.parts[0].jsonValue;
  } catch (error) {
    console.error("Error generating next quiz question:", error);
    throw new Error("Failed to generate next question");
  }
}
