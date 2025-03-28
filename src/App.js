import React, { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("https://chocket-backend.onrender.com/api/data")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div>
      <h1>Welcome to Chocket</h1>
      {data ? <p>Data from backend: {JSON.stringify(data)}</p> : <p>Loading...</p>}
    </div>
  );
}

export default App;
