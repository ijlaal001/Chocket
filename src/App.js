import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";

const App = () => {
    const isAuthenticated = !!localStorage.getItem("token");

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />} />
                <Route path="/signup" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Signup />} />
                <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
            </Routes>
        </Router>
    );
};

export default App;
