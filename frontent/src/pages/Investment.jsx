import React, { useState } from "react";
import { ethers } from "ethers";
import { vtTokenAddress, vtTokenAbi, contractAddress, contractAbi } from "../Constant/constant";

export default function Investment({ account }) {
  const [investmentAmount, setInvestmentAmount] = useState("");
  const [transactionStatus, setTransactionStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInvestment = async () => {
    if (!ethers.isAddress(account)) {
      setTransactionStatus("❌ Invalid wallet address.");
      return;
    }

    if (!investmentAmount || isNaN(investmentAmount) || parseFloat(investmentAmount) <= 0) {
      setTransactionStatus("❌ Enter a valid investment amount.");
      return;
    }

    try {
      if (!window.ethereum) {
        alert("MetaMask not found. Please install MetaMask.");
        return;
      }

      setLoading(true);
      setTransactionStatus("⏳ Processing transaction...");

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const userAddress = await signer.getAddress();

      const vtTokenContract = new ethers.Contract(vtTokenAddress, vtTokenAbi, signer);
      const balance = await vtTokenContract.balanceOf(userAddress);

      if (balance.lt(ethers.parseUnits(investmentAmount, 18))) {
        setTransactionStatus("❌ Insufficient VT token balance.");
        setLoading(false);
        return;
      }

      const allowance = await vtTokenContract.allowance(userAddress, contractAddress);
      if (allowance.lt(ethers.parseUnits(investmentAmount, 18))) {
        setTransactionStatus("⚠️ Approve the contract to spend your VT tokens.");
        setLoading(false);
        return;
      }

      const investmentContract = new ethers.Contract(contractAddress, contractAbi, signer);
      const tx = await investmentContract.invest(ethers.parseUnits(investmentAmount, 18), {
        gasLimit: 500000,
      });

      await tx.wait();
      setTransactionStatus("✅ Investment successful!");
    } catch (error) {
      console.error("Error in investment:", error);
      setTransactionStatus(`❌ Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white shadow-lg rounded-lg p-6 w-96">
        <h2 className="text-xl font-semibold text-gray-700 text-center mb-4">Invest in VT Tokens</h2>

        <input
          type="number"
          placeholder="Amount in VT Tokens"
          value={investmentAmount}
          onChange={(e) => setInvestmentAmount(e.target.value)}
          className="w-full p-2 border rounded mb-3 text-gray-700"
          min="0"
          step="0.01"
        />

        <button
          onClick={handleInvestment}
          className={`w-full py-2 text-white font-semibold rounded ${
            loading ? "bg-gray-500 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
          }`}
          disabled={loading}
        >
          {loading ? "Investing..." : "Invest"}
        </button>

        {transactionStatus && (
          <p
            className={`mt-3 text-center ${
              transactionStatus.includes("❌") ? "text-red-600" : "text-green-600"
            }`}
          >
            {transactionStatus}
          </p>
        )}
      </div>
    </div>
  );
}
