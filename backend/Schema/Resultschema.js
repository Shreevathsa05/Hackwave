import mongoose from "mongoose";

const resultSchema = new Schema({
  examId: { type: Schema.Types.ObjectId, ref: "Exam", required: true },
  studentId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  scores: {
    listening: Number,
    application: Number,
    grasping: Number,
    retention: Number
  },
  feedback: String,
  createdAt: { type: Date, default: Date.now }
});

const Result=mongoose.modal("Results",resultSchema);

export default Result;