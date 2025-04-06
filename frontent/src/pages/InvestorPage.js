import React, { useEffect, useState } from "react";
import axios from "axios";
import { ethers } from "ethers";
import { contractAddress } from "../Constant/contractAddress";
import contractABI from "../contractABI.json";

const InvestorPage = () => {
    const [startups, setStartups] = useState([]);
    const [selectedStartup, setSelectedStartup] = useState("");
    const [amount, setAmount] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [investments, setInvestments] = useState([]);

    useEffect(() => {
        const fetchStartups = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/startups");
                setStartups(res.data);
            } catch (err) {
                console.error("Error fetching startups:", err);
            }
        };

        fetchStartups();
    }, []);

    useEffect(() => {
        const fetchInvestments = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/investments");
                setInvestments(res.data);
            } catch (err) {
                console.error("Error fetching investments:", err);
            }
        };

        fetchInvestments();
    }, []);

    const investInStartup = async () => {
        if (!window.ethereum) return alert("MetaMask is required!");
        if (!selectedStartup || !amount) return alert("Please select a startup and enter an amount.");

        const startup = startups.find((s) => s._id === selectedStartup);
        if (!startup || !startup.address) return alert("Invalid startup address.");

        try {
            setIsLoading(true);

            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const contract = new ethers.Contract(contractAddress, contractABI, signer);

            const investmentAmount = ethers.parseEther(amount);
            const signerAddress = await signer.getAddress();
            const balance = await provider.getBalance(signerAddress);

            if (balance < investmentAmount) return alert("Insufficient funds.");

            const tx = await contract.invest(startup.address, {
                value: investmentAmount,
            });
            await tx.wait();

            await axios.post("http://localhost:5000/api/investments", {
                investor: signerAddress,
                startupId: startup._id,
                startupName: startup.name,
                startupAddress: startup.address,
                amount: parseFloat(amount),
            });

            alert("Investment Successful!");
            setSelectedStartup("");
            setAmount("");

            const res = await axios.get("http://localhost:5000/api/investments");
            setInvestments(res.data);
        } catch (error) {
            console.error("Investment Error:", error);
            alert("Investment Failed! Check console for details.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-900 text-white">
            {/* Sidebar */}
            <aside className="w-64 bg-gray-800 p-6">
                <h2 className="text-3xl font-bold text-blue-400 mb-10">Investor Panel</h2>
                <nav className="space-y-4">
                    <a href="#invest" className="block hover:text-blue-400">📈 Invest</a>
                    <a href="#history" className="block hover:text-blue-400">🧾 Transaction History</a>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-10 space-y-16">
                {/* Invest Section */}
                <section id="invest">
                    <h1 className="text-4xl font-extrabold mb-6 text-blue-400">Invest in a Startup</h1>
                    <div className="bg-gray-800 p-6 rounded-2xl shadow-xl w-full max-w-lg">
                        <label className="block mb-3 text-sm font-semibold">Select Startup</label>
                        <select
                            className="w-full p-3 mb-5 border border-gray-700 rounded bg-gray-700 text-white"
                            value={selectedStartup}
                            onChange={(e) => setSelectedStartup(e.target.value)}
                        >
                            <option value="">-- Choose Startup --</option>
                            {startups.map((startup) => (
                                <option key={startup._id} value={startup._id}>
                                    {startup.name}
                                </option>
                            ))}
                        </select>

                        <label className="block mb-3 text-sm font-semibold">Investment Amount (ETH)</label>
                        <input
                            type="number"
                            className="w-full p-3 mb-5 border border-gray-700 rounded bg-gray-700 text-white"
                            placeholder="e.g. 0.5"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                        />

                        <button
                            onClick={investInStartup}
                            disabled={isLoading}
                            className={`w-full py-3 font-bold rounded-lg transition ${
                                isLoading ? "bg-gray-600 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                            }`}
                        >
                            {isLoading ? "Processing..." : "Invest Now"}
                        </button>
                    </div>
                </section>

                {/* Transaction History Section */}
                <section id="history">
                    <h2 className="text-3xl font-bold mb-6 text-blue-400">Your Investment History</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse bg-gray-800 rounded-xl">
                            <thead>
                                <tr className="bg-gray-700 text-blue-300">
                                    <th className="p-4">Startup</th>
                                    <th className="p-4">Wallet Address</th>
                                    <th className="p-4">Amount (ETH)</th>
                                    <th className="p-4">Investor</th>
                                </tr>
                            </thead>
                            <tbody>
                                {investments.length === 0 ? (
                                    <tr>
                                        <td colSpan="4" className="text-center py-6 text-gray-400">
                                            No investments made yet.
                                        </td>
                                    </tr>
                                ) : (
                                    investments.map((inv) => (
                                        <tr key={inv._id} className="border-b border-gray-700 hover:bg-gray-700">
                                            <td className="p-4">{inv.startupName}</td>
                                            <td className="p-4 break-all text-sm">{inv.startupAddress}</td>
                                            <td className="p-4">{inv.amount}</td>
                                            <td className="p-4 break-all text-sm">{inv.investor}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default InvestorPage;
