import { useState, useEffect } from 'react';
import { getProvider, getContract } from '../utils/helpers';
import { ethers } from 'ethers';

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const provider = getProvider();
        const contract = await getContract();
        const signer = await provider.getSigner();
        const address = await signer.getAddress();

        // Get Transfer events
        const filter = contract.filters.Transfer();
        const events = await contract.queryFilter(filter);
        
        // Filter and format transactions
        const userTransactions = events
          .filter(event => 
            event.args.from.toLowerCase() === address.toLowerCase() || 
            event.args.to.toLowerCase() === address.toLowerCase()
          )
          .map(event => ({
            from: event.args.from,
            to: event.args.to,
            value: ethers.formatUnits(event.args.value, 18),
            timestamp: new Date(event.blockNumber * 1000).toLocaleString(),
            type: event.args.from.toLowerCase() === address.toLowerCase() ? 'Sent' : 'Received'
          }));

        setTransactions(userTransactions);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching transactions:', error);
        setError('Failed to load transaction history');
        setIsLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div className="bg-gray-800 rounded-xl shadow-xl overflow-hidden">
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-4">
        <h2 className="text-2xl font-bold text-white">Transaction History</h2>
      </div>

      <div className="p-6">
        {isLoading ? (
          <div className="space-y-4">
            <div className="animate-pulse space-y-4">
              <div className="h-20 bg-gray-700 rounded"></div>
              <div className="h-20 bg-gray-700 rounded"></div>
              <div className="h-20 bg-gray-700 rounded"></div>
            </div>
          </div>
        ) : error ? (
          <div className="text-red-400 bg-red-900/20 rounded-lg p-4">
            {error}
          </div>
        ) : transactions.length === 0 ? (
          <div className="text-gray-400 bg-gray-700/50 rounded-lg p-4 text-center">
            No transactions found
          </div>
        ) : (
          <div className="space-y-4">
            {transactions.map((tx, index) => (
              <div key={index} className="bg-gray-700/50 rounded-lg p-4 transition-all hover:bg-gray-700">
                <div className="flex justify-between items-center mb-3">
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    tx.type === 'Sent' 
                      ? 'bg-red-500/20 text-red-400' 
                      : 'bg-green-500/20 text-green-400'
                  }`}>
                    {tx.type}
                  </span>
                  <span className="text-sm text-gray-400">{tx.timestamp}</span>
                </div>
                <div className="space-y-2">
                  <div className="text-sm">
                    <span className="text-gray-400">From: </span>
                    <span className="text-white font-mono break-all">{tx.from}</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-gray-400">To: </span>
                    <span className="text-white font-mono break-all">{tx.to}</span>
                  </div>
                  <div className="text-lg font-bold text-white">
                    {tx.value} ADT
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionHistory; 