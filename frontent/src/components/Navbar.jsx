import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const navLinks = [
        { name: "Home", to: "/home", color: "text-blue-400" },
        { name: "Investor", to: "/investor", color: "text-green-400" },
        { name: "Startup", to: "/startup", color: "text-yellow-400" },
        { name: "About", to: "/about", color: "text-gray-400" },
    ];

    return (
        <nav className="bg-gray-900 text-white shadow-md">
            <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
                {/* Logo */}
                <Link
                    to="/"
                    className="text-2xl font-extrabold text-blue-400 hover:text-blue-300 transition duration-300"
                >
                    ScaleUp 🚀
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex space-x-6">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.to}
                            className={`text-lg hover:underline transition duration-300 ${
                                location.pathname === link.to
                                    ? `${link.color} font-semibold`
                                    : "text-white"
                            }`}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    onClick={toggleMenu}
                    className="md:hidden focus:outline-none"
                    aria-label="Toggle Menu"
                >
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16m-7 6h7"
                        />
                    </svg>
                </button>
            </div>

            {/* Mobile Navigation */}
            {isOpen && (
                <div className="md:hidden px-4 pb-4 space-y-2">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.to}
                            onClick={() => setIsOpen(false)}
                            className={`block text-base transition duration-300 ${
                                location.pathname === link.to
                                    ? `${link.color} font-semibold`
                                    : "text-white"
                            }`}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
