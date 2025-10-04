import express from "express";
import Exam from "../Schema/examschema.js";

const ExamRoute = express.Router();

/*
Create new exam
*/
ExamRoute.post("/", async (req, res) => {
  try {
    const { examId, title, description, questions, isActive } = req.body;

    // Check if examId already exists
    const existingExam = await Exam.findOne({ examId });
    if (existingExam) {
      return res.status(400).json({ error: "Exam with this examId already exists" });
    }

    // Validate questions format
    if (
      questions &&
      !questions.every(
        (q) =>
          q.questionText &&
          Array.isArray(q.options) &&
          q.options.length >= 2 &&
          q.correctAnswer &&
          ["listening", "retention", "application", "grasping"].includes(q.type)
      )
    ) {
      return res.status(400).json({
        error:
          "Invalid question format. Each question must have questionText, at least 2 options, a correctAnswer, and a valid type (listening, retention, application, grasping).",
      });
    }

    const newExam = new Exam({ examId, title, description, questions, isActive });
    await newExam.save();
    console.log(newExam);

    res.status(201).json(newExam);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/*
Get all exams
*/
ExamRoute.get("/", async (req, res) => {
  try {
    const exams = await Exam.find();
    console.log(exams);
    res.json(exams);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/*
Get exam by examId
*/
ExamRoute.get("/:examId", async (req, res) => {
  try {
    console.log("Requested examId:", req.params.examId);
    const exam = await Exam.findOne({ examId: req.params.examId });
  
    if (!exam) return res.status(404).json({ error: "Exam not found" });
    res.json(exam);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/*
Update exam by examId
*/
ExamRoute.put("/:examId", async (req, res) => {
  try {
    const { questions } = req.body;

    // Validate updated questions if provided
    if (
      questions &&
      !questions.every(
        (q) =>
          q.questionText &&
          Array.isArray(q.options) &&
          q.options.length >= 2 &&
          q.correctAnswer &&
          ["listening", "retention", "application", "grasping"].includes(q.type)
      )
    ) {
      return res.status(400).json({
        error:
          "Invalid question format. Each question must have questionText, at least 2 options, a correctAnswer, and a valid type (listening, retention, application, grasping).",
      });
    }

    const updatedExam = await Exam.findOneAndUpdate(
      { examId: req.params.examId },
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedExam) return res.status(404).json({ error: "Exam not found" });
    res.json(updatedExam);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/*
Delete exam by examId
*/
ExamRoute.delete("/:examId", async (req, res) => {
  try {
    const deletedExam = await Exam.findOneAndDelete({ examId: req.params.examId });
    if (!deletedExam) return res.status(404).json({ error: "Exam not found" });
    res.json({ message: "Exam deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default ExamRoute;
