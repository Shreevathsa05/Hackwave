import express from "express";
import dotenv from "dotenv";
import cors from "cors";          
import dbConnect from "./Database/dbconnect.js";
import ExamRoute from "./routes/ExamRoute.js";
import ResultsRoute from "./routes/ResultsRoute.js"
import AiRouter from "./routes/AiRoute.js"

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
await dbConnect();
app.get('/', (req, res) => {
  res.json({ message: "Welcome to the base Route!" });
});

// app.use("/teacher", TeacherRouter);
// app.use("/student", StudentRouter);
app.use('/exam',ExamRoute)
app.use('/results', ResultsRoute)
app.use('/ai', AiRouter)

import './ai-models/ResultAnalyzer.js'



// Start server
app.listen(PORT, () => {
  console.log(`The server is running on port http://localhost:${PORT}`);
});
