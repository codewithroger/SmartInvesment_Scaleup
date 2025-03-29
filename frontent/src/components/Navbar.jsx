import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="bg-gray-900 text-white shadow-lg">
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex justify-between items-center py-4">
                    {/* Logo */}
                    <Link to="/" className="text-2xl font-extrabold text-blue-400 hover:text-blue-300 transition duration-300">
                        ScaleUp 🚀
                    </Link>

                    {/* Navigation Links */}
                    <div className="hidden md:flex space-x-6">
                        <Link to="/home" className="text-lg hover:text-blue-400 transition duration-300">Home</Link>
                        <Link to="/investor" className="text-lg hover:text-green-400 transition duration-300">Investor</Link>
                        <Link to="/startup" className="text-lg hover:text-yellow-400 transition duration-300">Startup</Link>
                        <Link to="/about" className="text-lg hover:text-gray-400 transition duration-300">About</Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button className="md:hidden focus:outline-none">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"/>
                        </svg>
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
