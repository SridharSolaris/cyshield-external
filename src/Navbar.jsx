import React from "react";
import { Outlet, Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-900 text-white shadow-lg">
      <div className="container mx-auto flex justify-between items-center px-4 py-3">
        <h1 className="text-xl font-bold tracking-wide">DEMO: External Web App Owned by Client</h1>
        <ul className="flex space-x-6">
          <li><Link to="/home" className="hover:text-green-400">Home</Link></li>
          <li><Link to="/login" className="hover:text-green-400">Login</Link></li>
          <li><Link to="/signup" className="hover:text-green-400">Signup</Link></li>
          <li><Link to="/test" className="hover:text-green-400">Risk Test</Link></li>

        </ul>
      </div>
    </nav>


  );
};

export default Navbar;
