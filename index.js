import express from "express";
import dotenv from "dotenv";
import indexRoute from "./Routes/indexRoutes.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import upload from "express-fileupload";
import dbConnect from "./Controller/dbConnection/dbConnection.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// db connection
dbConnect();


app.use(
  cors({
    credentials: true,
    origin: [
      "http://localhost:3000",
      "http://192.168.102.78:3000",
      "http://192.168.102.29:3000",
      "*"
    ],
  })
);

app.use(upload());
app.use(express.json());
app.use(cookieParser());

// routes
app.use("/", indexRoute);

app.listen(port);
