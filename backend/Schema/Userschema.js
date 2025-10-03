import mongoose from "mongoose";
const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ["student", "teacher"], required: true },
  school: String,
  courses: [{ type: Schema.Types.ObjectId, ref: "Course" }],
  createdAt: { type: Date, default: Date.now }
});


 const User = mongoose.model("Userinfo", userSchema);

 export default User;