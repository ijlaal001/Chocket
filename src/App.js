import { useEffect, useState } from "react";
import io from "socket.io-client";

// Debugging: Attach `io` and `socket` to `window`
window.io = io;
const socket = io("https://chocket-backend.onrender.com");
window.socket = socket;

function App() {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");

    useEffect(() => {
        console.log("Connecting to WebSocket...");

        socket.on("connect", () => {
            console.log("✅ Connected to WebSocket!");
        });

        socket.on("chatHistory", (history) => {
            console.log("Chat History Received:", history);
            setMessages(history);
        });

        socket.on("message", (newMessage) => {
            console.log("New Message:", newMessage);
            setMessages((prev) => [...prev, newMessage]);
        });

        return () => {
            socket.off("chatHistory");
            socket.off("message");
        };
    }, []);

    const sendMessage = () => {
        if (message.trim()) {
            const newMessage = { text: message, sender: "User" };
            console.log("Sending Message:", newMessage);
            socket.emit("message", newMessage);
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
