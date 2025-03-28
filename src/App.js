import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("https://chocket-backend.onrender.com", {
  transports: ["websocket", "polling"],
});

const App = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Load chat history
    socket.on("chatHistory", (history) => {
      setMessages(history);
    });

    // Receive new messages
    socket.on("chatMessage", (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    // Clean up event listeners on unmount
    return () => {
      socket.off("chatHistory");
      socket.off("chatMessage");
    };
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit("chatMessage", { username: "User", message });
      setMessage(""); // Clear input after sending
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h2>Chat App</h2>
      <div
        style={{
          maxWidth: "400px",
          margin: "auto",
          border: "1px solid #ccc",
          borderRadius: "10px",
          padding: "10px",
        }}
      >
        <div
          style={{
            height: "300px",
            overflowY: "auto",
            borderBottom: "1px solid #ccc",
            padding: "10px",
          }}
        >
          {messages.map((msg, index) => (
            <p key={index}>
              <strong>{msg.username || "User"}:</strong> {msg.message}
            </p>
          ))}
        </div>
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{ width: "70%", padding: "8px", marginTop: "10px" }}
        />
        <button onClick={sendMessage} style={{ padding: "8px" }}>
          Send
        </button>
      </div>
    </div>
  );
};

export default App;
