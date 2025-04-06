import React, { useState } from "react";
import AddStartupForm from "../pages/Startup/AddStartup.jsx";
import FundTransactions from "../pages/Startup/FundTransactions.jsx";
import Expenditure from "../pages/Startup/Expenditure.jsx";
import { motion } from "framer-motion";

const tabs = [
    { id: "addStartup", label: "➕ Add Startup" },
    { id: "fundTransactions", label: "💰 Fund Transactions" },
    { id: "expenditure", label: "📊 Expenditure" },
];

const StartupPage = () => {
    const [activeTab, setActiveTab] = useState("addStartup");

    const renderContent = () => {
        switch (activeTab) {
            case "addStartup":
                return <AddStartupForm />;
            case "fundTransactions":
                return <FundTransactions />;
            case "expenditure":
                return <Expenditure />;
            default:
                return <AddStartupForm />;
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-900 text-white">
            {/* Sidebar */}
            <aside className="w-64 bg-gray-800 p-6 border-r border-gray-700">
                <h2 className="text-2xl font-bold text-blue-400 mb-8">Startup Dashboard</h2>
                <nav className="flex flex-col space-y-3">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`text-left px-4 py-2 rounded-lg transition-colors duration-200 ${
                                activeTab === tab.id
                                    ? "bg-blue-600 text-white"
                                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 overflow-y-auto">
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    {renderContent()}
                </motion.div>
            </main>
        </div>
    );
};

export default StartupPage;
