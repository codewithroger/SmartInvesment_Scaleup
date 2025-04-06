import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const AddStartupForm = () => {
    const [startup, setStartup] = useState({
        name: "",
        founder: "",
        description: "",
        industry: "",
        address: "",
        hasPatent: "", // new dropdown field
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setStartup({ ...startup, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        if (startup.hasPatent !== "yes") {
            setMessage("❌ Only startups with a patent can be registered.");
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post("http://localhost:5000/api/startups", startup);
            if (response.status === 201) {
                setMessage("✅ Startup added successfully!");
                setStartup({
                    name: "",
                    founder: "",
                    description: "",
                    industry: "",
                    address: "",
                    hasPatent: "",
                });
            } else {
                setMessage("⚠️ Failed to add startup.");
            }
        } catch (error) {
            console.error("Error adding startup:", error);
            setMessage("❌ Server error.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            className="max-w-xl mx-auto bg-gray-800 p-8 rounded-lg shadow-lg"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <h2 className="text-2xl font-bold mb-6 text-white">Add New Startup</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Startup Name */}
                <div>
                    <label className="block mb-1 text-sm text-gray-300">Startup Name</label>
                    <input
                        type="text"
                        name="name"
                        value={startup.name}
                        onChange={handleChange}
                        placeholder="e.g. TechNova"
                        className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600"
                        required
                    />
                </div>

                {/* Founder Name */}
                <div>
                    <label className="block mb-1 text-sm text-gray-300">Founder Name</label>
                    <input
                        type="text"
                        name="founder"
                        value={startup.founder}
                        onChange={handleChange}
                        placeholder="e.g. Jane Doe"
                        className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600"
                        required
                    />
                </div>

                {/* Industry */}
                <div>
                    <label className="block mb-1 text-sm text-gray-300">Industry</label>
                    <input
                        type="text"
                        name="industry"
                        value={startup.industry}
                        onChange={handleChange}
                        placeholder="e.g. Fintech, Healthcare"
                        className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600"
                        required
                    />
                </div>

                {/* Description */}
                <div>
                    <label className="block mb-1 text-sm text-gray-300">Description</label>
                    <textarea
                        name="description"
                        value={startup.description}
                        onChange={handleChange}
                        placeholder="Describe your startup's mission and goals..."
                        className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600"
                        rows={4}
                        required
                    ></textarea>
                </div>

                {/* Wallet Address */}
                <div>
                    <label className="block mb-1 text-sm text-gray-300">Wallet Address</label>
                    <input
                        type="text"
                        name="address"
                        value={startup.address}
                        onChange={handleChange}
                        placeholder="0xABC123..."
                        className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600"
                        required
                    />
                    <p className="text-xs text-gray-400 mt-1">Make sure this is a valid Ethereum address.</p>
                </div>

                {/* Patent Dropdown */}
                <div>
                    <label className="block mb-1 text-sm text-gray-300">Do you have a patent?</label>
                    <select
                        name="hasPatent"
                        value={startup.hasPatent}
                        onChange={handleChange}
                        className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600"
                        required
                    >
                        <option value="">-- Select an option --</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </select>
                    <p className="text-xs text-gray-400 mt-1">
                        Only startups with a patent are eligible.
                    </p>
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-2 px-4 rounded text-white transition ${
                        loading ? "bg-gray-600 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                    }`}
                >
                    {loading ? "Adding..." : "Add Startup"}
                </button>
            </form>

            {/* Message */}
            {message && (
                <div
                    className={`mt-4 text-center font-medium ${
                        message.includes("✅")
                            ? "text-green-400"
                            : message.includes("❌")
                            ? "text-red-400"
                            : "text-yellow-400"
                    }`}
                >
                    {message}
                </div>
            )}
        </motion.div>
    );
};

export default AddStartupForm;
