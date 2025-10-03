import mongoose from "mongoose";

const examSchema = new Schema({
  courseId: { type: Schema.Types.ObjectId, ref: "Course", required: true },
  title: { type: String, required: true },
  description: String,
  createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  questions: [{ type: Schema.Types.ObjectId, ref: "Question" }],
  createdAt: { type: Date, default: Date.now }
});


const Exam=mongoose.modal("Examinfo",examSchema);

export default Exam;