const registerUser = async (username, password) => {
    const response = await fetch("https://chocket-backend.onrender.com/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    });
    const data = await response.json();
    alert(data.message);
};

const loginUser = async (username, password) => {
    const response = await fetch("https://chocket-backend.onrender.com/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    });
    const data = await response.json();
    if (data.token) {
        localStorage.setItem("token", data.token);
        alert("Login successful!");
    } else {
        alert(data.error);
    }
};
