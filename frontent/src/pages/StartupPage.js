import React, { useEffect, useState, useCallback } from "react";
import { ethers } from "ethers";
import { contractAddress } from "../Constant/contractAddress";
import contractABI from "../contractABI.json";

const StartupPage = () => {
    const [fundsReceived, setFundsReceived] = useState("0");
    const [loading, setLoading] = useState(false);

    const fetchReceivedFunds = useCallback(async () => {
        if (!window.ethereum) {
            alert("Please install MetaMask to continue.");
            return;
        }

        setLoading(true);
        try {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const contract = new ethers.Contract(contractAddress, contractABI, signer);

            const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });

            // Fetch funds using the getBalance function
            const balance = await contract.getBalance(accounts[0]);
            setFundsReceived(ethers.formatEther(balance));
        } catch (error) {
            console.error("Fetch Funds Error:", error);
            alert("Failed to fetch received funds.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchReceivedFunds();
    }, [fetchReceivedFunds]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
            <h1 className="text-3xl font-bold mb-6">Startup Page</h1>
            <p className="text-lg">Total Funds Received: {loading ? "Loading..." : `${fundsReceived} ETH`}</p>
            <button
                onClick={fetchReceivedFunds}
                className="mt-4 px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded disabled:opacity-50"
                disabled={loading}
            >
                {loading ? "Refreshing..." : "Refresh Funds"}
            </button>
        </div>
    );
};

export default StartupPage;
