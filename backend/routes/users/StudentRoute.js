import express from "express"

const StudentRouter=express.Router();


StudentRouter.post("/register",(req,res)=>{
    res.send("Register will come here");
})
StudentRouter.post("/login",(req,res)=>{
    res.send("Register will come here");
})


export default StudentRouter;