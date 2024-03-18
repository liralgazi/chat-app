import express from 'express';
import cors from 'cors';
//import dotenv from 'dotenv';
import { api } from './api';

const app = express()
app.use(api)
//dotenv.config();
app.use(cors());
app.use(express.json());
//app.use("/api/auth", userRouter);

const server = app.listen(3002,()=>{
    console.log("Server Started on port 3002" )
})

