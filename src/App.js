import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("https://chocket-backend.onrender.com"); // Your backend URL

const App = () => {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");

    useEffect(() => {
        // Receive chat history
        socket.on("chatHistory", (history) => {
            setMessages(history);
        });

        // Receive new messages
        socket.on("chatMessage", (msg) => {
            setMessages((prevMessages) => [...prevMessages, msg]);
        });

        return () => {
            socket.off("chatHistory");
            socket.off("chatMessage");
        };
    }, []);

    const sendMessage = () => {
        if (message.trim()) {
            socket.emit("chatMessage", { username: "User", message });
            setMessage("");
        }
    };

    return (
        <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
            <h2>Chat App</h2>
            <div id="messages" style={{ border: "1px solid #ccc", height: "300px", overflowY: "auto", padding: "10px" }}>
                {messages.map((msg, index) => (
                    <p key={index}><strong>{msg.username}:</strong> {msg.message}</p>
                ))}
            </div>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
                style={{ width: "80%", padding: "10px", marginTop: "10px" }}
            />
            <button onClick={sendMessage} style={{ padding: "10px", marginLeft: "10px" }}>Send</button>
        </div>
    );
};

export default App;
