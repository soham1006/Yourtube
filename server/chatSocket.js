const express = require('express');
const http = require('http');
const cors = require('cors');
const mongoose = require('mongoose');
const { Server } = require('socket.io');
const CryptoJS = require('crypto-js');
const Chat = require('./Models/chat'); // <- create this model
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB connected"))
.catch(err => console.error("❌ MongoDB connection error:", err));

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

// Encryption key (set this securely in .env file in production)
const SECRET_KEY = process.env.CHAT_SECRET || 'mychatsecret';

io.on('connection', (socket) => {
  console.log(`🟢 User connected: ${socket.id}`);

  socket.on('join_room', async (room) => {
    socket.join(room);
    console.log(`🔵 ${socket.id} joined room: ${room}`);

    // Send previous messages
    const history = await Chat.find({ room });
    socket.emit('chat_history', history);
  });

  socket.on('send_message', async (data) => {
    console.log(`💬 ${socket.id} to room ${data.room}: ${data.message}`);

    // Encrypt message
    const encryptedMessage = CryptoJS.AES.encrypt(data.message, SECRET_KEY).toString();

    const chatEntry = new Chat({
      room: data.room,
      message: encryptedMessage,
      time: data.time,
      sender: data.sender || 'Anonymous'
    });

    await chatEntry.save();

    // Send encrypted message
    socket.to(data.room).emit('receive_message', {
      ...data,
      message: encryptedMessage
    });
  });

  socket.on('leave_room', (room) => {
    socket.leave(room);
    console.log(`🟡 ${socket.id} left room: ${room}`);
  });

  socket.on('disconnect', () => {
    console.log(`🔴 User disconnected: ${socket.id}`);
  });
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
