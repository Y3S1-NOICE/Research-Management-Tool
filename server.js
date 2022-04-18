import express from "express";
import dotenv from "dotenv";
import connectDatabase from "./database/connection.js"
import { default as userRouter } from "./routes/userRoutes.js";
import { default as authRouter } from "./routes/authRoutes.js";
import { authenticate } from "./middleware/auth.js";

// Enable .env file
dotenv.config();
const PORT = process.env.PORT;
const DATABASE_URI = process.env.DATABASE_URI

// Create database connection 
connectDatabase(DATABASE_URI); 

const app = express();

// Let express know, to use Json for http requests and response.
app.use(express.json());
app.use(authenticate);

app.use('/login', authRouter);
app.use('/user', userRouter);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
