import React from "react";
import { Outlet, Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div>
        <h1>Firewall Dashboard</h1>

        {/* Links Section */}
        <ul className="flex space-x-4 text-white">
          <li>
            <Link to="/hello" className="hover:underline">Home</Link>
          </li>
          <li>
            <Link to="/login" className="hover:underline">Login</Link>
          </li>
          <li>
            <Link to="/signup" className="hover:underline">Signup</Link>
          </li>
          <li>
            <Link to="/test-api" className="hover:underline">Test Api</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
