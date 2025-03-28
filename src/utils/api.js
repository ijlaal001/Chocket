const API_URL = process.env.REACT_APP_API_URL || "https://chocket-backend.onrender.com/api/auth";

export const signup = async (userData) => {
    const res = await fetch(`${API_URL}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
    });
    return res.json();
};

export const login = async (userData) => {
    const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
    });
    return res.json();
};
