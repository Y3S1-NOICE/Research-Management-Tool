import express from "express";
import dotenv from "dotenv";
import connectDatabase from "./database/connection.js"
import { authenticate } from "./middleware/auth.js";
import { default as userRouter } from "./routes/userRoutes.js";
import { default as authRouter } from "./routes/authRoutes.js";
import { default as studentGroupRouter } from "./routes/studentGroupRoutes.js";
import { default as panelRouter } from "./routes/panelRoutes.js";
import { default as chatRouter } from "./routes/chatRoutes.js";
import { default as messageRouter } from "./routes/messageRoutes.js";
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

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
app.use("/chat", chatRouter);
app.use("/message", messageRouter);

const server = app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


const io = require("socket.io")(server, {
    pingTimeout: 60000,
    cors: {
      origin: "http://localhost:5000",
      // credentials: true,
    },
  });
  
  io.on("connection", (socket) => {
    console.log("Connected to socket.io");
    socket.on("setup", (userData) => {
      socket.join(userData._id);
      socket.emit("connected");
    });
  
    socket.on("join chat", (room) => {
      socket.join(room);
      console.log("User Joined Room: " + room);
    });
    socket.on("typing", (room) => socket.in(room).emit("typing"));
    socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));
  
    socket.on("new message", (newMessageRecieved) => {
      var chat = newMessageRecieved.chat;
  
      if (!chat.users) return console.log("chat.users not defined");
  
      chat.users.forEach((user) => {
        if (user._id == newMessageRecieved.sender._id) return;
  
        socket.in(user._id).emit("message recieved", newMessageRecieved);
      });
    });
  
    socket.off("setup", () => {
      console.log("USER DISCONNECTED");
      socket.leave(userData._id);
    });
  });
