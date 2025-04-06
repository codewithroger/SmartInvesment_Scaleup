import React, { useEffect, useState } from "react";
import axios from "axios";

const FundTransactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/investments");
                setTransactions(res.data);
            } catch (error) {
                console.error("Failed to fetch fund transactions:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTransactions();
    }, []);

    return (
        <div className="bg-gray-900 text-white p-8 rounded-xl shadow-lg w-full max-w-5xl mx-auto mt-10">
            <h2 className="text-3xl font-bold mb-6 text-center">Fund Transactions</h2>

            {loading ? (
                <p className="text-center text-gray-300">Loading...</p>
            ) : transactions.length === 0 ? (
                <p className="text-center text-gray-400">No fund transactions found.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-gray-800 rounded-xl overflow-hidden shadow-md">
                        <thead className="bg-gray-700 text-gray-300">
                            <tr>
                                <th className="text-left px-6 py-3">Investor</th>
                                <th className="text-left px-6 py-3">Startup</th>
                                <th className="text-left px-6 py-3">Amount (ETH)</th>
                                <th className="text-left px-6 py-3">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map((tx) => (
                                <tr
                                    key={tx._id || tx.timestamp}
                                    className="border-t border-gray-700 hover:bg-gray-700 transition duration-150"
                                >
                                    <td className="px-6 py-3">{tx.investor}</td>
                                    <td className="px-6 py-3">{tx.startupName}</td>
                                    <td className="px-6 py-3">
                                        {parseFloat(tx.amount).toFixed(4)}
                                    </td>
                                    <td className="px-6 py-3">
                                        {tx.timestamp
                                            ? new Date(tx.timestamp).toLocaleString()
                                            : "N/A"}
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

export default FundTransactions;
