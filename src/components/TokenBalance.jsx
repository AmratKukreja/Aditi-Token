// src/components/TokenBalance.jsx
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { getContract } from '../utils/helpers';
import { FaCoins } from 'react-icons/fa';

export default function TokenBalance({ userAddress }) {
  const [balance, setBalance] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBalance = async () => {
      if (!userAddress) return;
      try {
        const contract = await getContract();
        const raw = await contract.balanceOf(userAddress);
        setBalance(ethers.formatUnits(raw, 18));
      } catch (err) {
        console.error('Error fetching balance:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBalance();
  }, [userAddress]);

  return (
    <div className="card p-6">
      <div className="flex items-center space-x-4">
        <div className="bg-purple-500/20 p-3 rounded-lg">
          <FaCoins className="w-6 h-6 text-purple-500" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">Token Balance</h2>
          <div className="flex items-center mt-2">
            {isLoading ? (
              <div className="animate-pulse bg-gray-700 h-8 w-32 rounded"></div>
            ) : (
              <>
                <span className="text-2xl font-bold text-purple-400">{balance}</span>
                <span className="ml-2 text-gray-400">ADITI</span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
