import { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("https://chocket-backend.onrender.com");

function App() {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");

    useEffect(() => {
        // Fetch past messages from MongoDB
        fetch("https://chocket-backend.onrender.com/api/messages")
            .then(res => res.json())
            .then(data => setMessages(data))
            .catch(err => console.error("Error fetching messages:", err));

        // Listen for real-time messages
        socket.on("chatMessage", (newMessage) => {
            setMessages((prev) => [...prev, newMessage]);
        });

        return () => {
            socket.off("chatMessage");
        };
    }, []);

    const sendMessage = () => {
        if (message.trim()) {
            const newMessage = { text: message, sender: "User" };
            socket.emit("chatMessage", newMessage);
            setMessage("");
        }
    };

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>Chocket Chat</h1>
            <div style={{ height: "300px", overflowY: "scroll", border: "1px solid black", padding: "10px" }}>
                {messages.map((msg, index) => (
                    <p key={index}><b>{msg.sender}:</b> {msg.text}</p>
                ))}
            </div>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
                style={{ padding: "10px", width: "60%" }}
            />
            <button onClick={sendMessage} style={{ padding: "10px", marginLeft: "10px" }}>Send</button>
        </div>
    );
}

export default App;
