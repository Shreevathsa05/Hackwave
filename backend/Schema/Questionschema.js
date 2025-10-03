import mongoose from "mongoose";

const questionSchema = new Schema({
  examId: { type: Schema.Types.ObjectId, ref: "Exam" },
  text: { type: String, required: true },
  type: { type: String, enum: ["mcq", "short", "long", "application"], default: "short" },
  options: [String],
  answer: String,
  tags: [String], // listening, grasping, retention, application
  isPreAssessment: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

const Question=mongoose.model("Questions",questionSchema);

export default Question;