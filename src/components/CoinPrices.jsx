import { useState, useEffect } from 'react';
import { motion as Motion } from 'framer-motion';

const CoinPrices = () => {
  const [prices, setPrices] = useState({
    aditi: { usd: 0, change24h: 0 },
    ethereum: { usd: 0, change24h: 0 },
    binancecoin: { usd: 0, change24h: 0 }
  });
  const [loading, setLoading] = useState(true);

  const fetchPrices = async () => {
    try {
      const response = await fetch(
        'https://api.coingecko.com/api/v3/simple/price?ids=aditi,ethereum,binancecoin&vs_currencies=usd&include_24hr_change=true'
      );
      const data = await response.json();
      setPrices({
        aditi: {
          usd: data.aditi?.usd || 0,
          change24h: data.aditi?.usd_24h_change || 0
        },
        ethereum: {
          usd: data.ethereum?.usd || 0,
          change24h: data.ethereum?.usd_24h_change || 0
        },
        binancecoin: {
          usd: data.binancecoin?.usd || 0,
          change24h: data.binancecoin?.usd_24h_change || 0
        }
      });
      setLoading(false);
    } catch (error) {
      console.error('Error fetching prices:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrices();
    const interval = setInterval(fetchPrices, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const formatChange = (change) => {
    const isPositive = change >= 0;
    return (
      <span className={`${isPositive ? 'text-green-500' : 'text-red-500'}`}>
        {isPositive ? '+' : ''}{change.toFixed(2)}%
      </span>
    );
  };

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-32 bg-gray-800/50 rounded-xl"></div>
      </div>
    );
  }

  return (
    <Motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-800/50 rounded-xl p-6 shadow-lg"
    >
      <h2 className="text-xl font-bold text-white mb-4">Market Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-900/50 p-4 rounded-lg">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-white">ADITI</h3>
            <span className="text-gray-400">ADT</span>
          </div>
          <div className="mt-2">
            <p className="text-2xl font-bold text-white">${prices.aditi.usd.toFixed(4)}</p>
            <p className="text-sm mt-1">24h Change: {formatChange(prices.aditi.change24h)}</p>
          </div>
        </div>

        <div className="bg-gray-900/50 p-4 rounded-lg">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-white">Ethereum</h3>
            <span className="text-gray-400">ETH</span>
          </div>
          <div className="mt-2">
            <p className="text-2xl font-bold text-white">${prices.ethereum.usd.toFixed(2)}</p>
            <p className="text-sm mt-1">24h Change: {formatChange(prices.ethereum.change24h)}</p>
          </div>
        </div>

        <div className="bg-gray-900/50 p-4 rounded-lg">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-white">Binance Coin</h3>
            <span className="text-gray-400">BNB</span>
          </div>
          <div className="mt-2">
            <p className="text-2xl font-bold text-white">${prices.binancecoin.usd.toFixed(2)}</p>
            <p className="text-sm mt-1">24h Change: {formatChange(prices.binancecoin.change24h)}</p>
          </div>
        </div>
      </div>
    </Motion.div>
  );
};

export default CoinPrices; 