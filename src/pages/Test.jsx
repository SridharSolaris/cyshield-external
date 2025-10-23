import React, { useState } from "react";
import axios from "axios";

const API_KEY = import.meta.env.VITE_APP_FIREWALL_API_KEY;
const APP_ID = import.meta.env.VITE_APP_FIREWALL_APP_ID;
const API_BASE_URL =
    import.meta.env.VITE_APP_FIREWALL_API_URL || "http://localhost:5000";

const Test = () => {
    const [ipAddress, setIpAddress] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [result, setResult] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const trimmedIp = ipAddress.trim();
        if (!trimmedIp) {
            setError("Enter an IP address to evaluate.");
            setResult(null);
            return;
        }

        setLoading(true);
        setError("");
        setResult(null);

        try {
            const { data } = await axios.post(
                `${API_BASE_URL}/api/apps/${APP_ID}/validate-ip`,
                { ip: trimmedIp },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "x-api-key": API_KEY,
                        "x-app-id": APP_ID,
                    },
                }
            );

            setResult(data);
        } catch (err) {
            const message =
                err.response?.data?.message || err.response?.data?.error || err.message;
            setError(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
            <div className="w-full max-w-xl bg-white shadow-lg rounded-lg p-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                    Demo: IP Risk Validation
                </h2>
                <p className="text-gray-600 mb-6">
                    Enter any IP address to simulate how CyShield validates and, if needed,
                    blocks risky traffic in real time.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="ip" className="block text-sm font-medium text-gray-700">
                            IP address
                        </label>
                        <input
                            id="ip"
                            name="ip"
                            type="text"
                            value={ipAddress}
                            onChange={(event) => setIpAddress(event.target.value)}
                            placeholder="e.g. 185.220.101.1"
                            className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-400"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded bg-green-600 py-2 text-white font-semibold hover:bg-green-700 transition disabled:opacity-60"
                    >
                        {loading ? "Checking..." : "Validate & Analyse IP"}
                    </button>
                </form>

                {error && (
                    <div className="mt-6 rounded border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                        {error}
                    </div>
                )}

                {result && (
                    <div className="mt-6 space-y-2 rounded border border-gray-200 bg-gray-50 p-4">
                        <p className="text-sm font-semibold text-gray-700">
                            {result.message || "Validation complete."}
                        </p>
                        <p className="text-sm text-gray-600">
                            Blocked: <span className="font-medium">{String(result.blocked)}</span>
                        </p>
                        {typeof result.riskScore !== "undefined" && (
                            <p className="text-sm text-gray-600">
                                Risk score: <span className="font-medium">{result.riskScore}</span>
                            </p>
                        )}
                        {result.riskLevel && (
                            <p className="text-sm text-gray-600">
                                Risk level: <span className="font-medium">{result.riskLevel}</span>
                            </p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Test;