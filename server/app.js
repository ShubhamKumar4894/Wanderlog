import express from "express";
import bodyParser from "body-parser";
import placeRouter from "./routes/places-routes.js";
import userRouter from "./routes/user-routes.js";
import connectDB from "./db/index.js";
import dotenv from 'dotenv'
import cors from "cors"
import fs from "fs";
import path from "path";
const app=express();
app.use(bodyParser.json())
app.use('/uploads/images', express.static(path.join('uploads', 'images')));
app.use(
  cors({
      origin: '*',
      credentials:true
  })
)

app.use('/api/places',placeRouter);
app.use('/api/users',userRouter);
app.use((error, req, res, next) => {
  if(req.file && req.file.path) {
    fs.unlink(req.file.path, (err) => {
      if (err) {
        console.error("Failed to delete file:", err);
      }
    });
  }
    if (res.headersSent) {
      return next(error); 
    }
    res.status(error.code || 500);
    res.json({ message: error.message || "An unknown error occurred!" });
  });
  
dotenv.config();
connectDB()
.then(()=>{
    app.listen(5000,()=>{
        console.log(`server is listening on port ${5000}`);
    })
})
.catch((error)=>{
    console.log(`mongoDb connection error`,error);
})