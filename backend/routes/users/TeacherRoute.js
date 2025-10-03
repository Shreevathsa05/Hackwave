import express from "express"

const TeacherRouter=express.Router();


TeacherRouter.post("/login",(req,res)=>{
    res.send("here teacher login logic will come")
});








export default TeacherRouter;