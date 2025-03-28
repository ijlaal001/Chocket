import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("https://chocket-backend.onrender.com", {
    transports: ["websocket", "polling"]
});

function App() {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        socket.on("message", (data) => {
            setMessages((prevMessages) => [...prevMessages, data]);
        });

        return () => {
            socket.off("message");
        };
    }, []);

    const sendMessage = () => {
        if (message.trim()) {
            socket.emit("message", message);
            setMessage("");
        }
    };

    return (
        <div>
            <h1>Chocket Chat</h1>
            <div>
                {messages.map((msg, index) => (
                    <p key={index}>{msg}</p>
                ))}
            </div>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
}

export default App;
