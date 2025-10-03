import mongoose from "mongoose";

const { Schema, model } = mongoose;

const optionSchema = new Schema(
  {
    text: { type: String, required: true }, // Option text
  },
  { _id: false }
);

const questionSchema = new Schema(
  {
    questionText: { type: String, required: true },
    options: { type: [optionSchema], required: true },
    correctAnswer: { type: String, required: true },
    type: { 
      type: String, 
      enum: ["listening", "retention", "application", "grasping"], 
      required: true 
    }
  },
  { _id: false }
);

const examSchema = new Schema({
  examId: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, default: "" },
  questions: { type: [questionSchema], default: [] },
  createdAt: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: true },
});

const Exam = model("Exam", examSchema);

export default Exam;
