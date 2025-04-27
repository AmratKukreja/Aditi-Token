import { useState, useEffect } from 'react';

const PriceTicker = () => {
  const [prices, setPrices] = useState({
    aditi: 0,
    ethereum: 0,
    binancecoin: 0
  });
  const [loading, setLoading] = useState(true);

  const fetchPrices = async () => {
    try {
      const response = await fetch(
        'https://api.coingecko.com/api/v3/simple/price?ids=aditi,ethereum,binancecoin&vs_currencies=usd'
      );
      const data = await response.json();
      setPrices({
        aditi: data.aditi?.usd || 0,
        ethereum: data.ethereum?.usd || 0,
        binancecoin: data.binancecoin?.usd || 0
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

  if (loading) {
    return (
      <div className="flex items-center space-x-4 text-sm">
        <div className="animate-pulse">Loading prices...</div>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-4 text-sm">
      <div className="flex items-center">
        <span className="font-semibold">ADITI:</span>
        <span className="ml-1">${prices.aditi.toFixed(4)}</span>
      </div>
      <div className="flex items-center">
        <span className="font-semibold">ETH:</span>
        <span className="ml-1">${prices.ethereum.toFixed(2)}</span>
      </div>
      <div className="flex items-center">
        <span className="font-semibold">BNB:</span>
        <span className="ml-1">${prices.binancecoin.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default PriceTicker; 