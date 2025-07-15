import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import videoroutes from './Routes/video.js';
import userroutes from "./Routes/User.js";
import commentroutes from './Routes/comment.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { createServer } from 'http';
import { Server } from 'socket.io';

dotenv.config();

const app = express();
const server = createServer(app);  

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/user', userroutes);
app.use('/video', videoroutes);
app.use('/comment', commentroutes);

app.get('/', (req, res) => {
  res.send("Your tube is working");
});

// MongoDB Connection
const DB_URL = process.env.DB_URL;
mongoose.connect(DB_URL)
  .then(() => console.log("✅ MongoDB Database connected"))
  .catch((error) => console.log("❌ DB connection error:", error));

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

// ✅ Setup Socket.IO
const io = new Server(server, {
  cors: {
    origin: "*", 
    methods: ["GET", "POST"],
  },
});

io.on('connection', (socket) => {
  console.log(`🟢 User connected: ${socket.id}`);

  socket.on('join_room', (room) => {
    socket.join(room);
    console.log(`🔵 ${socket.id} joined room: ${room}`);
  });

  socket.on('send_message', (data) => {
    socket.to(data.room).emit('receive_message', data);
  });

  socket.on('leave_room', (room) => {
    socket.leave(room);
    console.log(`🟡 ${socket.id} left room: ${room}`);
  });

  socket.on('disconnect', () => {
    console.log(`🔴 User disconnected: ${socket.id}`);
  });
});
