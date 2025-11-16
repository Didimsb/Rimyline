import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="bg-white shadow-sm fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <Link to="/" className="text-2xl font-bold tracking-tight">
          <span className="text-gray-900">Rimy</span>
          <span className="text-purple-600">Line</span>
        </Link>

        {/* Menu */}
        <div className="flex gap-6 text-gray-700 font-medium">
          <Link to="/" className="hover:text-purple-600 transition">Home</Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

