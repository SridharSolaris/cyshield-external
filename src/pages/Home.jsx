import React, { useEffect, useState } from "react";

const IP_SERVICES = [
  "https://api.ipify.org?format=json",
  "https://api64.ipify.org?format=json",
  "https://api.my-ip.io/ip.json",
  "https://ipapi.co/json/",
];

const fetchVisitorIP = async () => {
  for (const endpoint of IP_SERVICES) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);
      const response = await fetch(endpoint, { signal: controller.signal });
      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();
      const ip = data.ip || data.query || data.IPv4 || data.origin;
      if (ip && typeof ip === "string" && ip.length > 0) {
        return ip;
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn(`IP lookup failed via ${endpoint}:`, error.message);
    }
  }
  return null;
};

const Home = () => {
  const [ip, setIp] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const fetchIp = async () => {
      try {
        const detectedIp = await fetchVisitorIP();
        if (isMounted) {
          setIp(detectedIp || "Unavailable");
          setError(detectedIp ? "" : "Unable to detect IP address.");
        }
      } catch (err) {
        if (isMounted) {
          setError("Unable to detect IP address.");
          setIp("Unavailable");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchIp();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="max-w-2xl w-full bg-white shadow-lg rounded-lg p-8 text-center space-y-6">
        <div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Welcome to the Demo</h1>
          <p className="text-gray-600 text-lg">
            This app demonstrates how the CyShield SDK protects an external client application.
          </p>
        </div>

        <div className="rounded-lg border border-gray-200 bg-gray-50 p-6">
          <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
            Visitor IP Address
          </p>
          {loading ? (
            <p className="text-gray-700">Detecting your IP...</p>
          ) : (
            <p className="text-2xl font-semibold text-gray-900">{ip}</p>
          )}
          {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        </div>

        <p className="text-gray-500 text-sm">
          The displayed IP is the same value the SDK sends to the firewall service for validation and monitoring.
        </p>
      </div>
    </div>
  );
};

export default Home;
