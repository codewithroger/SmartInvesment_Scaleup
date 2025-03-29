import React from "react";
import { Link } from "react-router-dom";
import starup from '../images/statup.webp'
import investor from '../images/investor.webp'

const Dashboard = () => {
    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
            <div className="text-center">
                <h1 className="text-5xl font-bold text-blue-400 mb-4">Welcome to FundRaise</h1>
                <p className="text-lg text-gray-300 mb-6">
                    Empowering startups by connecting them with investors worldwide.
                </p>

                {/* Hero Section with Investors and Startups */}
                <div className="flex gap-6 justify-center items-center">
                    <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
                        <img src={investor} alt="Investor" className="w-32 h-32 mx-auto rounded-full mb-3"/>
                        <h3 className="text-xl font-semibold text-green-400">Investors</h3>
                        <p className="text-gray-300">Discover promising startups to invest in.</p>
                        <Link to="/investor" className="mt-3 inline-block bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg">Start Investing</Link>
                    </div>
                    <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
                        <img src={starup} alt="Startup" className="w-32 h-32 mx-auto rounded-full mb-3"/>
                        <h3 className="text-xl font-semibold text-blue-400">Startups</h3>
                        <p className="text-gray-300">Raise funds for your innovative ideas.</p>
                        <Link to="/startup" className="mt-3 inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">Get Funded</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
