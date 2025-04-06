import React from "react";
import { Link } from "react-router-dom";
import startup from "../images/statup.webp";
import investor from "../images/investor.webp";

const Dashboard = () => {
    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center px-4 py-10">
            <div className="text-center mb-10">
                <h1 className="text-5xl font-bold text-blue-400 mb-4">Welcome to FundRaise</h1>
                <p className="text-lg text-gray-300 max-w-xl mx-auto">
                    Empowering startups by connecting them with investors worldwide.
                </p>
            </div>

            {/* Hero Section */}
            <div className="flex flex-col md:flex-row gap-8 justify-center items-center w-full max-w-5xl">
                {/* Investor Card */}
                <div className="bg-gray-800 p-6 rounded-xl shadow-lg text-center transform transition duration-300 hover:scale-105">
                    <img
                        src={investor}
                        alt="Investor"
                        className="w-32 h-32 mx-auto rounded-full mb-4 object-cover"
                    />
                    <h3 className="text-xl font-semibold text-green-400">Investors</h3>
                    <p className="text-gray-300 mb-4">
                        Discover promising startups to invest in.
                    </p>
                    <Link
                        to="/investor"
                        className="inline-block bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg transition"
                    >
                        Start Investing
                    </Link>
                </div>

                {/* Startup Card */}
                <div className="bg-gray-800 p-6 rounded-xl shadow-lg text-center transform transition duration-300 hover:scale-105">
                    <img
                        src={startup}
                        alt="Startup"
                        className="w-32 h-32 mx-auto rounded-full mb-4 object-cover"
                    />
                    <h3 className="text-xl font-semibold text-blue-400">Startups</h3>
                    <p className="text-gray-300 mb-4">
                        Raise funds for your innovative ideas.
                    </p>
                    <Link
                        to="/startup"
                        className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition"
                    >
                        Get Funded
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
