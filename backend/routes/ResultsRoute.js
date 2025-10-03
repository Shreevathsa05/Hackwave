import express from "express";
import Result from "../Schema/Resultschema.js";

const ResultsRouter = express.Router();

// CREATE a result
ResultsRouter.post("/", async (req, res) => {
  try {
    const newResult = new Result(req.body);
    const savedResult = await newResult.save();
    res.status(201).json(savedResult);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ all results
ResultsRouter.get("/", async (req, res) => {
  try {
    const results = await Result.find()
      .populate("examId")
      .populate("studentId");
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ results by studentId
ResultsRouter.get("/student/:studentId", async (req, res) => {
  try {
    const results = await Result.find({ studentId: req.params.studentId })
      .populate("examId")
      .populate("studentId");

    if (!results || results.length === 0) {
      return res.status(404).json({ error: "No results found for this student" });
    }

    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ results by examId
ResultsRouter.get("/exam/:examId", async (req, res) => {
  try {
    const results = await Result.find({ examId: req.params.examId })
      .populate("examId")
      .populate("studentId");

    if (!results || results.length === 0) {
      return res.status(404).json({ error: "No results found for this exam" });
    }

    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE a result
ResultsRouter.put("/:id", async (req, res) => {
  try {
    const updatedResult = await Result.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!updatedResult) return res.status(404).json({ error: "Result not found" });
    res.status(200).json(updatedResult);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE a result
ResultsRouter.delete("/:id", async (req, res) => {
  try {
    const deletedResult = await Result.findByIdAndDelete(req.params.id);
    if (!deletedResult) return res.status(404).json({ error: "Result not found" });
    res.status(200).json({ message: "Result deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default ResultsRouter;
