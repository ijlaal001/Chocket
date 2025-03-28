import { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("https://chocket-backend.onrender.com"); // Update this with your backend URL

function App() {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");

    useEffect(() => {
        socket.on("message", (newMessage) => { // ✅ Fix: Now listening for "message"
            setMessages((prev) => [...prev, newMessage]);
        });

        return () => {
            socket.off("message");
        };
    }, []);

    const sendMessage = () => {
        if (message.trim()) {
            const newMessage = { text: message, sender: "User" };
            socket.emit("message", newMessage); // ✅ Fix: Now emitting "message"
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
