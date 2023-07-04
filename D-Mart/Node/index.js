import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import indexRoute from "./Routes/indexRoutes.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import upload from "express-fileupload";
import verifyToken from "./Controller/Authentication/verifyToken.js";
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

try {
  mongoose.connect(process.env.Mongo_CONNECTION);
 
} catch (e) {
  console.log(e);
}
app.use(upload());
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use((req,res,next)=>{
req.body.user_id="647485d28ea925916e101d2d",
next();
})

app.use("/", indexRoute);
app.listen(port);
