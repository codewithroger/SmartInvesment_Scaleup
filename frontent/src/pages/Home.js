import React, { useState, useEffect } from "react";
import { BrowserProvider, Contract, formatUnits } from "ethers";
import { contractAddress, contractAbi } from "../Constant/constant";

export default function Home() {
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [balance, setBalance] = useState("0");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    connectWallet();
  }, []);

  // ✅ Connect MetaMask and Load Contract
  const connectWallet = async () => {
    if (!window.ethereum) {
      setError("❌ MetaMask not detected. Please install MetaMask.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const provider = new BrowserProvider(window.ethereum);
      await window.ethereum.request({ method: "eth_requestAccounts" });

      const signer = await provider.getSigner();
      const userAddress = await signer.getAddress();
      setAccount(userAddress);

      const investmentContract = new Contract(contractAddress, contractAbi, signer);
      setContract(investmentContract);

      // Load Balance
      const userBalance = await investmentContract.getInvestment(userAddress);
      setBalance(formatUnits(userBalance, 18));
    } catch (error) {
      setError(`❌ Error connecting: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
      <div className="bg-white shadow-xl rounded-lg p-6 w-96 text-center text-gray-800">
        <h1 className="text-2xl font-bold mb-4 text-indigo-600">Smart Investment</h1>

        {account ? (
          <div className="p-4 bg-gray-100 rounded-lg">
            <p className="text-gray-700 font-semibold mb-2">Connected Wallet:</p>
            <p className="text-blue-500 font-mono">{account}</p>
            <p className="mt-4 text-gray-700 font-semibold">Your Investment:</p>
            <p className="text-green-600 font-bold text-xl">{balance} VT Tokens</p>
          </div>
        ) : (
          <button
            onClick={connectWallet}
            className="w-full py-2 px-4 mt-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition duration-300 ease-in-out"
            disabled={loading}
          >
            {loading ? "Connecting..." : "Connect Wallet"}
          </button>
        )}

        {error && <p className="text-red-500 mt-3 text-sm">{error}</p>}
      </div>
    </div>
  );
}
