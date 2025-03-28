import { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("https://chocket-backend.onrender.com", {
    transports: ["websocket"],
    reconnectionAttempts: 5,
    reconnectionDelay: 2000
});

function App() {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [isConnected, setIsConnected] = useState(socket.connected);

    useEffect(() => {
        socket.on("connect", () => setIsConnected(true));
        socket.on("disconnect", () => setIsConnected(false));

        socket.on("chatHistory", (history) => setMessages(history));
        socket.on("message", (newMessage) => {
            setMessages((prev) => [...prev, newMessage]);
        });

        return () => {
            socket.off("connect");
            socket.off("disconnect");
            socket.off("chatHistory");
            socket.off("message");
        };
    }, []);

    const sendMessage = () => {
        if (message.trim()) {
            const newMessage = { text: message, sender: "User" };
            socket.emit("message", newMessage);
            setMessage("");
        }
    };

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>Chocket Chat</h1>
            <p style={{ color: isConnected ? "green" : "red" }}>
                {isConnected ? "Connected to Server ✅" : "Disconnected ❌"}
            </p>
            <div style={{
                height: "300px",
                overflowY: "scroll",
                border: "1px solid black",
                padding: "10px",
                marginBottom: "10px"
            }}>
                {messages.length > 0 ? (
                    messages.map((msg, index) => (
                        <p key={index}><b>{msg.sender}:</b> {msg.text}</p>
                    ))
                ) : (
                    <p style={{ color: "gray" }}>No messages yet...</p>
                )}
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
