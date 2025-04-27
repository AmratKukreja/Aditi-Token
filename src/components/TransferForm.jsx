import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { getContract } from '../utils/helpers';
import { motion } from "framer-motion";

export default function TransferForm({ userAddress }) {
  const [toAddress, setToAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("");
  const [balance, setBalance] = useState("Loading...");
  const [isLoading, setIsLoading] = useState(false);

  // Fetch the balance of the current user when the component mounts or userAddress changes
  useEffect(() => {
    const fetchBalance = async () => {
      try {
        if (!window.ethereum) {
          return alert("MetaMask not detected!");
        }

        const contract = await getContract();
        const userBalance = await contract.balanceOf(userAddress);
        const decimals = await contract.decimals();
        const formattedBalance = ethers.formatUnits(userBalance, decimals);
        setBalance(formattedBalance);
      } catch (error) {
        console.error(error);
        setBalance("❌ Error fetching balance");
      }
    };

    if (userAddress) {
      fetchBalance();
    }
  }, [userAddress]);

  const handleTransfer = async () => {
    try {
      if (!window.ethereum) {
        return alert("MetaMask not detected!");
      }

      setIsLoading(true);
      setStatus("Processing...");

      // Get the contract
      const contract = await getContract();
      console.log("Contract:", contract);

      // Validate recipient address
      if (!ethers.isAddress(toAddress)) {
        setIsLoading(false);
        return setStatus("❌ Invalid recipient address.");
      }

      // Validate amount
      if (!amount || amount <= 0) {
        setIsLoading(false);
        return setStatus("❌ Amount must be greater than 0.");
      }

      // Get current balance
      const currentBalance = await contract.balanceOf(userAddress);
      const decimals = await contract.decimals();
      const parsedAmount = ethers.parseUnits(amount, decimals);

      // Check if user has enough balance
      if (currentBalance < parsedAmount) {
        setIsLoading(false);
        return setStatus("❌ Insufficient balance.");
      }

      console.log("Parsed Amount:", parsedAmount.toString());

      // Transfer tokens
      const tx = await contract.transfer(toAddress, parsedAmount);
      setStatus("Transaction sent... waiting for confirmation.");

      await tx.wait();
      setStatus("✅ Transfer successful!");

      // After successful transfer, update the balance
      const userBalance = await contract.balanceOf(userAddress);
      const formattedBalance = ethers.formatUnits(userBalance, decimals);
      setBalance(formattedBalance);
    } catch (error) {
      console.error("Transfer error:", error);
      let errorMessage = "❌ Transfer failed: ";
      
      if (error.code === 'CALL_EXCEPTION') {
        errorMessage += "Transaction reverted. This could be due to insufficient balance or invalid parameters.";
      } else if (error.code === 'INSUFFICIENT_FUNDS') {
        errorMessage += "Insufficient funds for gas.";
      } else {
        errorMessage += error.message || "Unknown error occurred";
      }
      
      setStatus(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="card p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold text-white">Transfer Tokens</h3>
        <div className="bg-gray-700/50 px-4 py-2 rounded-lg">
          <span className="text-sm text-gray-400">Your Balance:</span>
          <span className="ml-2 text-white font-medium">{balance} ADITI</span>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm text-gray-400 mb-2">Recipient Address</label>
          <input
            type="text"
            placeholder="0x..."
            value={toAddress}
            onChange={(e) => setToAddress(e.target.value)}
            className="input-field"
            disabled={isLoading}
          />
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-2">Amount</label>
          <input
            type="number"
            placeholder="0.0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="input-field"
            disabled={isLoading}
          />
        </div>

        <button 
          onClick={handleTransfer}
          disabled={isLoading}
          className={`btn w-full button-glow ${
            isLoading 
              ? 'bg-gray-600 cursor-not-allowed' 
              : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700'
          } text-white font-medium py-3 rounded-lg transition-all duration-200`}
        >
          {isLoading ? (
            <motion.div 
              className="flex items-center justify-center"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <svg className="h-5 w-5 mr-3" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Processing...
            </motion.div>
          ) : (
            <motion.span
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Send Tokens
            </motion.span>
          )}
        </button>

        {status && (
          <div className={`p-4 rounded-lg ${
            status.includes('❌') 
              ? 'bg-red-900/20 text-red-400' 
              : status.includes('✅') 
                ? 'bg-green-900/20 text-green-400'
                : 'bg-blue-900/20 text-blue-400'
          }`}>
            {status}
          </div>
        )}
      </div>
    </div>
  );
}
