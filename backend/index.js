import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import {v2 as cloudinary} from "cloudinary";
dotenv.config();
const app=express();
import fileUpload from 'express-fileupload';
const PORT=process.env.PORT;
const MONGO_URL=process.env.MONGODB_ATLAS;
import userRoutes from './routes/userRoutes.js'
import blogRoutes from "./routes/blogRoutes.js"
import cookieParser from 'cookie-parser';
import cors from "cors"

app.use(fileUpload({
  useTempFiles: true,   
  tempFileDir: "/tmp/",  
}));

const allowedOrigins = [
  "http://localhost:5173",
  "https://myblogapp-y75v.onrender.com"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));



app.use(express.json());
app.use(cookieParser());
app.use("/api/user",userRoutes);
app.use("/api/blog",blogRoutes);








cloudinary.config({
  cloud_name:process.env.CLOUD_NAME,
  api_key:process.env.API_KEY,
  api_secret:process.env.API_SECRET,
})


const serverStart=async()=>{
  try{
  const conn=await mongoose.connect(MONGO_URL);
  console.log(`mongodb connected succesfully ${conn.connection.host}`);
  }catch(err){
    console.log(err);
  }
}

app.listen(PORT,()=>{
  serverStart();
  console.log(`server is running on ${PORT}`);
})
