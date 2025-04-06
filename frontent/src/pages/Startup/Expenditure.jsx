import React, { useEffect, useState } from "react";
import axios from "axios";

const Expenditure = () => {
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [startups, setStartups] = useState([]);
    const [message, setMessage] = useState("");

    const [newExpense, setNewExpense] = useState({
        description: "",
        amount: "",
        startup: "",
    });

    const fetchExpenses = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/expenditures");
            setExpenses(res.data);
        } catch (error) {
            console.error("Failed to fetch expenditures:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchStartups = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/startups");
            setStartups(res.data);
        } catch (err) {
            console.error("Failed to fetch startups:", err);
        }
    };

    useEffect(() => {
        fetchExpenses();
        fetchStartups();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewExpense((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await axios.post("http://localhost:5000/api/expenditures", newExpense);
            setExpenses((prev) => [...prev, res.data]);
            setNewExpense({ description: "", amount: "", startup: "" });
            setMessage("✅ Expenditure added successfully!");
            setTimeout(() => setMessage(""), 3000);
        } catch (err) {
            console.error("Failed to add expenditure:", err);
            setMessage("❌ Failed to add expenditure.");
            setTimeout(() => setMessage(""), 3000);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-gray-900 text-white p-8 rounded-xl shadow-lg w-full max-w-5xl mx-auto mt-10">
            <h2 className="text-3xl font-bold mb-6 text-center">Expenditures</h2>

            {/* Add Expense Form */}
            <form
                onSubmit={handleSubmit}
                className="mb-8 grid grid-cols-1 md:grid-cols-4 gap-4 items-end"
            >
                <input
                    type="text"
                    name="description"
                    placeholder="Description"
                    value={newExpense.description}
                    onChange={handleChange}
                    className="p-3 rounded-lg bg-gray-800 border border-gray-700 placeholder-gray-400"
                    required
                />
                <input
                    type="number"
                    name="amount"
                    placeholder="Amount (ETH)"
                    value={newExpense.amount}
                    onChange={handleChange}
                    className="p-3 rounded-lg bg-gray-800 border border-gray-700 placeholder-gray-400"
                    required
                />
                <select
                    name="startup"
                    value={newExpense.startup}
                    onChange={handleChange}
                    className="p-3 rounded-lg bg-gray-800 border border-gray-700 text-gray-300"
                    required
                >
                    <option value="">Select Startup</option>
                    {startups.map((startup) => (
                        <option key={startup._id} value={startup.address}>
                            {startup.name}
                        </option>
                    ))}
                </select>
                <button
                    type="submit"
                    className={`bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg px-4 py-3 transition duration-200 ${
                        loading ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    disabled={loading}
                >
                    {loading ? "Adding..." : "Add"}
                </button>
            </form>

            {/* Feedback Message */}
            {message && (
                <div className="text-center text-sm text-green-400 mb-4">
                    {message}
                </div>
            )}

            {/* Table */}
            {loading ? (
                <p className="text-center text-gray-300">Loading...</p>
            ) : expenses.length === 0 ? (
                <p className="text-center text-gray-400">No expenditures found.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-gray-800 rounded-xl shadow-sm overflow-hidden">
                        <thead className="bg-gray-700 text-gray-300">
                            <tr>
                                <th className="text-left px-6 py-3">Description</th>
                                <th className="text-left px-6 py-3">Amount (ETH)</th>
                                <th className="text-left px-6 py-3">Startup</th>
                                <th className="text-left px-6 py-3">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {expenses.map((item) => (
                                <tr
                                    key={item._id}
                                    className="border-t border-gray-700 hover:bg-gray-700 transition duration-150"
                                >
                                    <td className="px-6 py-3">{item.description}</td>
                                    <td className="px-6 py-3">{parseFloat(item.amount).toFixed(4)}</td>
                                    <td className="px-6 py-3">{item.startup}</td>
                                    <td className="px-6 py-3">
                                        {new Date(item.createdAt).toLocaleString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default Expenditure;
