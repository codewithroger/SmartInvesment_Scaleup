import React, { useState } from "react";
import { ethers } from "ethers";
import { contractAddress } from "../Constant/contractAddress";
import contractABI from "../contractABI.json";

const InvestorPage = () => {
    const [startupAddress, setStartupAddress] = useState("");
    const [amount, setAmount] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    async function investInStartup() {
        if (!window.ethereum) {
            alert("MetaMask is required!");
            return;
        }

        if (!startupAddress || !amount) {
            alert("Please enter a valid startup address and amount.");
            return;
        }

        try {
            setIsLoading(true);
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const contract = new ethers.Contract(contractAddress, contractABI, signer);

            // Check if the investor has enough balance
            const balance = await provider.getBalance(await signer.getAddress());
            const investmentAmount = ethers.parseEther(amount);

            if (balance < investmentAmount) {
                alert("Insufficient funds in your wallet.");
                setIsLoading(false);
                return;
            }

            // Send transaction
            const tx = await contract.invest(startupAddress, { value: investmentAmount });
            await tx.wait();

            alert("Investment Successful!");
            setStartupAddress("");
            setAmount("");
        } catch (error) {
            console.error("Investment Error:", error);
            alert("Investment Failed! See console for details.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-3xl font-bold mb-6 text-center text-blue-400">Investor Dashboard</h1>

                <input
                    className="w-full p-3 mb-4 border border-gray-600 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                    type="text"
                    placeholder="Enter Startup Address"
                    value={startupAddress}
                    onChange={(e) => setStartupAddress(e.target.value)}
                />
                
                <input
                    className="w-full p-3 mb-4 border border-gray-600 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                    type="number"
                    placeholder="Investment Amount (ETH)"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />

                <button
                    onClick={investInStartup}
                    className={`w-full py-3 text-white font-semibold rounded-lg ${
                        isLoading ? "bg-gray-500 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                    }`}
                    disabled={isLoading}
                >
                    {isLoading ? "Processing..." : "Invest"}
                </button>
            </div>
        </div>
    );
};

export default InvestorPage;
