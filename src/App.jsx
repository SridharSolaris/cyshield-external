import React, { useEffect } from "react";
import { setConfig, ProtectedPage, setupAxiosInterceptors } from "firewalljk31-sdk"; // Ensure correct import path
import Hello from "./components/Hello";
import Navbar from "./Navbar";
import Login from './pages/Login';
import Signup from './pages/Signup';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import axios from "axios"; // Use the default Axios instance

// Retrieve firewall configurations
const API_KEY = import.meta.env.VITE_APP_FIREWALL_API_KEY;
const APP_ID = import.meta.env.VITE_APP_FIREWALL_APP_ID;

if (!API_KEY || !APP_ID) {
  console.error("❌ Firewall API Key or App ID is missing in .env file!");
}

function App() {
  useEffect(() => {
    setConfig({
      API_KEY,
      APP_ID,
      CUSTOM_HEADERS: { "x-source": "external-web-app" },
      REALTIME_MONITORING: true, // Set to true if real-time monitoring is required
    });

    // Set up interceptors on the default Axios instance
    setupAxiosInterceptors(axios);
  }, [APP_ID, API_KEY]);

  // Function to make an API request
  const fetchData = async () => {
    try {
      const response = await axios.post(
        `http://localhost:4000/api/apps/${APP_ID}/validate-ip`,
        { ip: "127.0.0.1" },
        {
          headers: {
            "Content-Type": "application/json",
            "x-api-key": API_KEY,
            "x-app-id": APP_ID,
            "x-sdk-request": "true",
          }
        }
      );

      // Handle response data
      console.log("Data fetched:", response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="App">
      <BrowserRouter> {/* Ensure BrowserRouter wraps the entire application */}
        <ProtectedPage>
          <Navbar />
          <div className="container mx-auto mt-8">
            <Routes>
              <Route path="/home" element={<Hello />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="*" element={<Login />} />
            </Routes>
            <h1>Protected Content</h1>
            <p>This content is protected by the firewall SDK.</p>
            <button onClick={fetchData} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
              Fetch Data
            </button>
          </div>
        </ProtectedPage>
      </BrowserRouter>
    </div>
  );
}

export default App;