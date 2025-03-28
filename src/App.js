import React, { useState } from "react";

const BACKEND_URL = "https://chocket-backend.onrender.com"; // Replace with your actual backend URL

function App() 
{
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    const fetchData = async () => 
    {
        try 
        {
            const response = await fetch(`${BACKEND_URL}/api/data`);
            if (!response.ok) 
            {
                throw new Error("Failed to fetch data");
            }
            const result = await response.json();
            setData(result);
            setError(null);
        } 
        catch (err) 
        {
            setError(err.message);
            setData(null);
        }
    };

    return (
        <div>
            <h1>Welcome to Chocket</h1>
            <button onClick={fetchData}>Fetch Data</button>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
        </div>
    );
}

export default App;
