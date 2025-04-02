import React from 'react'
import axios from "axios";
const API_KEY = import.meta.env.VITE_APP_FIREWALL_API_KEY;
const APP_ID = import.meta.env.VITE_APP_FIREWALL_APP_ID;

const Test = () => {

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
        <div>
            <button onClick={fetchData} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
                Fetch Data
            </button>
        </div>
    )
}

export default Test