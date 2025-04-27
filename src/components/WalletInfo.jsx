import { useState, useEffect } from 'react';
import { motion as Motion } from 'framer-motion';
import { getProvider, getSigner } from '../utils/helpers';
import { ethers } from 'ethers';
import { FaWallet, FaNetworkWired, FaEthereum } from 'react-icons/fa';

const WalletInfo = () => {
  const [walletAddress, setWalletAddress] = useState('');
  const [networkName, setNetworkName] = useState('');
  const [ethBalance, setEthBalance] = useState('0');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchWalletInfo = async () => {
      try {
        const provider = getProvider();
        const signer = await getSigner();
        const address = await signer.getAddress();
        const network = await provider.getNetwork();
        const balance = await provider.getBalance(address);

        setWalletAddress(address);
        setNetworkName(network.name);
        setEthBalance(ethers.formatEther(balance));
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching wallet info:', error);
        setIsLoading(false);
      }
    };

    fetchWalletInfo();
  }, []);

  return (
    <Motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-800 rounded-xl shadow-xl overflow-hidden hover-scale card-shadow"
    >
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-4">
        <h2 className="text-2xl font-bold text-white">Wallet Information</h2>
      </div>
      
      {isLoading ? (
        <div className="p-6 space-y-4">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-700 rounded w-3/4"></div>
            <div className="h-4 bg-gray-700 rounded w-1/2"></div>
            <div className="h-4 bg-gray-700 rounded w-2/3"></div>
          </div>
        </div>
      ) : (
        <div className="p-6 space-y-6">
          <Motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="flex items-center space-x-4"
          >
            <div className="bg-purple-500/20 p-3 rounded-lg">
              <FaWallet className="w-6 h-6 text-purple-500" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-400 mb-1">Wallet Address</p>
              <p className="font-mono text-white break-all bg-gray-700/50 rounded-lg p-2">
                {walletAddress}
              </p>
            </div>
          </Motion.div>
          
          <Motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center space-x-4"
          >
            <div className="bg-blue-500/20 p-3 rounded-lg">
              <FaNetworkWired className="w-6 h-6 text-blue-500" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-400 mb-1">Network</p>
              <p className="text-white bg-gray-700/50 rounded-lg p-2 capitalize">
                {networkName}
              </p>
            </div>
          </Motion.div>
          
          <Motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="flex items-center space-x-4"
          >
            <div className="bg-green-500/20 p-3 rounded-lg">
              <FaEthereum className="w-6 h-6 text-green-500" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-400 mb-1">ETH Balance</p>
              <p className="text-white bg-gray-700/50 rounded-lg p-2">
                {ethBalance} ETH
              </p>
            </div>
          </Motion.div>
        </div>
      )}
    </Motion.div>
  );
};

export default WalletInfo; 