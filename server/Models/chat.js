const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema({
  room: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  sender: {
    type: String,
    default: "Anonymous"
  }
}, { timestamps: true });

module.exports = mongoose.model("Chat", ChatSchema);
