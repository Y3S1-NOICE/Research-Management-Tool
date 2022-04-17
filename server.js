import express from "express";
import dotenv from "dotenv";
import connectDatabase from "./database/connection.js"
import { default as userRouter } from "./routes/userRoutes.js";
import { default as studentGroupRouter } from "./routes/studentGroupRoutes.js";

// Enable .env file
dotenv.config();
const PORT = process.env.PORT;
const DATABASE_URI = process.env.DATABASE_URI

// Create database connection 
connectDatabase(DATABASE_URI); 

const app = express();

// Let express know, to use Json for http requests and response.
app.use(express.json());

app.use('/user', userRouter);
app.use('/group', studentGroupRouter);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
