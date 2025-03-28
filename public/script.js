const API_URL = "https://chocket-backend.onrender.com/api/auth"; 

document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("loginForm")) {
        document.getElementById("loginForm").addEventListener("submit", async (e) => {
            e.preventDefault();
            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;

            const response = await fetch(`${API_URL}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();
            if (data.success) {
                localStorage.setItem("token", data.token);
                window.location.href = "chat.html";
            } else {
                alert("Login failed: " + data.message);
            }
        });
    }

    if (document.getElementById("registerForm")) {
        document.getElementById("registerForm").addEventListener("submit", async (e) => {
            e.preventDefault();
            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;

            const response = await fetch(`${API_URL}/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();
            if (data.success) {
                alert("Registration successful! Please login.");
                window.location.href = "login.html";
            } else {
                alert("Registration failed: " + data.message);
            }
        });
    }
});

function sendMessage() {
    if (!localStorage.getItem("token")) {
        alert("You must be logged in!");
        window.location.href = "login.html";
        return;
    }

    const socket = io("https://chocket-backend.onrender.com");
    const message = document.getElementById("message").value;
    socket.emit("chatMessage", message);
}

