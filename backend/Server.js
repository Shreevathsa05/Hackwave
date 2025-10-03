import express from "express";
import dotenv from "dotenv";
import dbConnect from "./Database/dbconnect.js";


dotenv.config();

const app = express();

app.use(express.json());


const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("all done");
});

await dbConnect();

app.listen(PORT, () => {
  console.log(`The server is running on port ${PORT}`);
});
