import mongoose from "mongoose";

const courseSchema = new Schema({
  title: { type: String, required: true },
  description: String,
  teacherId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  school: String,
  studentAccess: [{ type: Schema.Types.ObjectId, ref: "User" }],
  modules: [String],
  createdAt: { type: Date, default: Date.now }
});

const Course=mongoose.model("Courses",courseSchema);

export default Course;