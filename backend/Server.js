import express from "express";
import dotenv from "dotenv";
import cors from "cors";          
import dbConnect from "./Database/dbconnect.js";
import TeacherRouter from "./routes/TeacherRoute.js";
import StudentRouter from "./routes/StudentRoute.js";

dotenv.config();

const app = express();


app.use(cors());


app.use(express.json());

const PORT = process.env.PORT || 5000;


app.use("/teacher", TeacherRouter);
app.use("/student", StudentRouter);


await dbConnect();

// Start server
app.listen(PORT, () => {
  console.log(`The server is running on port ${PORT}`);
});
