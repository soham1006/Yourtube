import React, { useState } from 'react';
import ChatRoom from '../../Component/ChatRoom'; 

const PrivateRoom = () => {
  const [roomId, setRoomId] = useState('');
  const [joined, setJoined] = useState(false);

  const handleJoin = () => {
    if (roomId.trim()) {
      setJoined(true);
    }
  };

  return (
    <div style={{ padding: "20px", color: "#fff" }}>
      {!joined ? (
        <div>
          <h2 style={{ marginBottom: "10px" }}>Create or Join Private Room</h2>
          <input
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            placeholder="Enter Room Name or ID"
            style={{
              padding: "10px",
              borderRadius: "5px",
              width: "250px",
              border: "1px solid #555",
              background: "#111",
              color: "#fff"
            }}
          />
          <button
            onClick={handleJoin}
            style={{
              padding: "10px 15px",
              marginLeft: "10px",
              background: "#0f0f0f",
              color: "#fff",
              border: "1px solid #333",
              borderRadius: "5px",
              cursor: "pointer"
            }}
          >
            Enter
          </button>
        </div>
      ) : (
        <ChatRoom roomId={roomId} />
      )}
    </div>
  );
};

export default PrivateRoom;
