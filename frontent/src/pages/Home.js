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

  const connectWallet = async () => {
    if (!window.ethereum) {
      setError("MetaMask not detected. Please install MetaMask.");
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

      const userBalance = await investmentContract.getInvestment(userAddress);
      setBalance(formatUnits(userBalance, 18));
    } catch (error) {
      setError(`Connection failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-6 space-y-6">
        <h1 className="text-2xl font-semibold text-gray-800 text-center">
          Smart Investment
        </h1>

        {account ? (
          <div className="space-y-4 text-center">
            <div>
              <p className="text-sm text-gray-500">Connected Wallet</p>
              <p className="font-mono text-blue-600 break-words">{account}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Your Investment</p>
              <p className="text-xl font-bold text-emerald-600">{balance} VT Tokens</p>
            </div>
          </div>
        ) : (
          <button
            onClick={connectWallet}
            disabled={loading}
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition duration-200"
          >
            {loading ? "Connecting..." : "Connect Wallet"}
          </button>
        )}

        {error && <p className="text-sm text-red-500 text-center">{error}</p>}
      </div>
    </div>
  );
}
