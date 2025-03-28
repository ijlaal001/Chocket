import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    };

    return (
        <div>
            <h2>Welcome, {user?.username}!</h2>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Dashboard;
