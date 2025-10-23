import React, { useEffect } from "react";
import { setConfig, ProtectedPage } from "cyshield-sdk"; // Ensure correct import path
import Navbar from "./Navbar";
import Login from './pages/Login';
import Signup from './pages/Signup';
import Test from "./pages/Test";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import axios from "axios"; // Use the default Axios instance
import Home from "./pages/Home";

// Retrieve firewall configurations
const API_KEY = import.meta.env.VITE_APP_FIREWALL_API_KEY;
const APP_ID = import.meta.env.VITE_APP_FIREWALL_APP_ID;

if (!API_KEY || !APP_ID) {
  console.error("❌ Firewall API Key or App ID is missing in .env file!");
}

function App() {
  useEffect(() => {
    setConfig({
      FIREWALL_API_URL: import.meta.env.VITE_FIREWALL_API_URL,
      API_KEY,
      APP_ID,
      DEBUG: true,
      CUSTOM_HEADERS: { "x-source": "external-web-app" },
      REALTIME_MONITORING: true, // Set to true if real-time monitoring is required
    });
  }, [APP_ID, API_KEY]);



  return (
    <div className="App">
      <BrowserRouter> {/* Ensure BrowserRouter wraps the entire application */}
        <ProtectedPage>
          <Navbar />
          <div className="container mx-auto mt-8">
            <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/test" element={<Test />} />
              <Route path="*" element={<Home />} />
            </Routes>

          </div>
        </ProtectedPage>
      </BrowserRouter>
    </div>
  );
}

export default App;
