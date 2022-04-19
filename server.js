import express from "express";
import dotenv from "dotenv";
import connectDatabase from "./database/connection.js"
import { authenticate } from "./middleware/auth.js";
import { default as userRouter } from "./routes/userRoutes.js";
import { default as authRouter } from "./routes/authRoutes.js";
import { default as studentGroupRouter } from "./routes/studentGroupRoutes.js";
import { default as panelRouter } from "./routes/panelRoutes.js";

// Enable .env file
dotenv.config();
const PORT = process.env.PORT;
const DATABASE_URI = process.env.DATABASE_URI

// Create database connection 
connectDatabase(DATABASE_URI); 

const app = express();

// Let express know, to use Json for http requests and response.
app.use(express.json());

app.use('/login', authRouter);

// This line(line 27) will authenticate every route/request below this line.
//If you do not want to authenticate your request/route, add your route above this line as in line 23
app.use(authenticate);

app.use('/user', userRouter);
app.use('/groups', studentGroupRouter);
app.use('/panel', panelRouter);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});