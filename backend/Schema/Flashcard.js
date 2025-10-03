import mongoose from "mongoose";
const flashcardSchema = new Schema({
  title: { type: String, required: true },
  courseId: { type: Schema.Types.ObjectId, ref: "Course" },
  subtopics: [
    {
      topic: String,
      question: String,
      answer: String
    }
  ],
  createdBy: { type: Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now }
});

const Flashcard=mongoose.modal("Flashcards",flashcardSchema);

export default Flashcard;