import express from "express";
import multer from "multer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { loadDocument, loadFullDocumentMongo } from "../ai-models/prerequisites/Uploader.js";
import {segregateExamQuestions, expandExamQuestions} from "../ai-models/QuestionSegregator.js"
import { evaluateExamResults } from "../ai-models/ResultAnalyzer.js";
import { generateNextQuizQuestion } from "../ai-models/NextQuestionGenerator.js";

const AiRouter = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let filetoDel = null;

// Ensure the upload directory exists
const uploadDir = path.join(__dirname, "files/upload");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const randomNum = Math.floor(Math.random() * 1e6);
    const ext = path.extname(file.originalname);
    const base = path.basename(file.originalname, ext).replace(/\s+/g, "_");
    cb(null, `${base}_${timestamp}_${randomNum}${ext}`);
  }
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedExts = [".pdf", ".docx", ".doc", ".pptx", ".txt", ".csv", ".xlsx"];
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowedExts.includes(ext)) cb(null, true);
    else cb(new Error(`Unsupported file type: ${ext}`));
  }
});

// Welcome route
AiRouter.get("/", (req, res) => {
  res.json({ message: "Welcome to the AI route!" });
});

// Upload + Process route
AiRouter.post("/upload/:sessionid", upload.single("file"), async (req, res) => {
  try {
    const filename = req.file.filename;
    const filePath = path.join(uploadDir, filename);

    console.log("File stored at:", filePath);
    filetoDel = filePath;

    // process file -> load into vector DB
    await loadDocument(filePath, req.params.sessionid);

    // delete file after processing
    fs.unlinkSync(filePath);
    console.log(`${filename} deleted after storing in vector DB.`);

    res.json({ message: `${filename} uploaded, processed, and stored successfully.` });
  } catch (error) {
    console.error("Upload failed:", error);
    if (filetoDel && fs.existsSync(filetoDel)) {
      fs.unlinkSync(filetoDel);
      console.log(`${filetoDel} deleted after failed processing.`);
    }
    res.status(500).send("File upload failed. Unsupported type or internal error.");
  }
});

AiRouter.post("/upload-mongo/:sessionid", upload.single("file"), async (req, res) => {
  try {
    const filename = req.file.filename;
    const filePath = path.join(uploadDir, filename);

    console.log("File stored at:", filePath);
    filetoDel = filePath;

    // process file -> load into vector DB
    await loadFullDocumentMongo(filePath, req.params.sessionid);

    // delete file after processing
    fs.unlinkSync(filePath);
    console.log(`${filename} deleted after storing in vector DB.`);

    res.json({ message: `${filename} uploaded, processed, and stored successfully.` });
  } catch (error) {
    console.error("Upload failed:", error);
    if (filetoDel && fs.existsSync(filetoDel)) {
      fs.unlinkSync(filetoDel);
      console.log(`${filetoDel} deleted after failed processing.`);
    }
    res.status(500).send("File upload failed. Unsupported type or internal error.");
  }
});


/**
 * POST /ai/segregate/:examId
 * Classify existing questions of an exam into categories
 */
AiRouter.post("/segregate/:examId", async (req, res) => {
  try {
    const { examId } = req.params;
    const questions = await segregateExamQuestions(examId);
    res.status(200).json({ success: true, questions });
  } catch (err) {
    console.error("Error in segregate endpoint:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * POST /ai/expand/:examId
 * Generate new questions similar to an exam’s existing ones
 */
AiRouter.post("/expand/:examId", async (req, res) => {
  try {
    const { examId } = req.params;
    const questions = await expandExamQuestions(examId);
    res.status(200).json({ success: true, questions });
  } catch (err) {
    console.error("Error in expand endpoint:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

AiRouter.post("/result-analysis", async(req,res)=>{
  const{examId, studentId, answers}=req.body
  return await evaluateExamResults(examId,studentId,answers)
})

/**
 * Generate the next quiz question dynamically
 */
AiRouter.post("/next-question", async (req, res) => {
  try {
    const { examId, previousQnA } = req.body;

    const nextQuestion = await generateNextQuizQuestion(examId, previousQnA);

    res.status(200).json({
      success: true,
      message: "Next question generated",
      data: nextQuestion,
    });
  } catch (error) {
    console.error("Error in /next-question:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});


export default AiRouter;
