import io from 'socket.io-client';
import { useEffect, useState, useRef } from 'react';
import CryptoJS from 'crypto-js';
import './ChatRoom.css'; 

const socket = io('http://localhost:5000'); // ✅ Replace with ENV in production
const secret = 'your-secret-passphrase';   // ✅ Replace with env-safe variable

const ChatRoom = ({ roomId }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState("");
  const bottomRef = useRef(null);

  useEffect(() => {
    const name = prompt("Enter your name")?.trim();
    setUsername(name || `User${Math.floor(Math.random() * 1000)}`);
  }, []);

  useEffect(() => {
    if (!roomId) return;

    socket.emit('join_room', roomId);

    const receiveHandler = (data) => {
      const bytes = CryptoJS.AES.decrypt(data.message, secret);
      const decrypted = bytes.toString(CryptoJS.enc.Utf8);
      setMessages(prev => [...prev, { ...data, message: decrypted }]);
    };

    socket.on('receive_message', receiveHandler);

    return () => {
      socket.off('receive_message', receiveHandler);
      socket.emit('leave_room', roomId);
    };
  }, [roomId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = () => {
    if (message.trim() === "") return;

    const encryptedMessage = CryptoJS.AES.encrypt(message, secret).toString();
    const msgData = {
      room: roomId,
      message: encryptedMessage,
      sender: username,
      time: new Date().toLocaleTimeString(),
    };

    socket.emit('send_message', msgData);
    setMessages(prev => [...prev, { ...msgData, message }]);
    setMessage("");
  };

  return (
    <div className="chat-room-container">
      <h3>Private Chat Room: <span>{roomId}</span></h3>
      <div className="chat-box">
        {messages.map((m, i) => (
          <div key={i} className={`chat-message ${m.sender === username ? 'own' : ''}`}>
            <strong>{m.sender}</strong> <time>[{m.time}]</time><br />
            {m.message}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
      <div className="chat-input-section">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="chat-input"
        />
        <button onClick={sendMessage} className="chat-send-btn">Send</button>
      </div>
    </div>
  );
};

export default ChatRoom;
