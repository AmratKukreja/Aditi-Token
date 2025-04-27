// src/components/WalletConnect.jsx
import { useState } from 'react';
import { FaWallet } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function WalletConnect({ onConnect }) {
  const [address, setAddress] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        setIsConnecting(true);
        const [account] = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });
        setAddress(account);
        onConnect(account);
      } catch (err) {
        console.error('Wallet connection error:', err);
      } finally {
        setIsConnecting(false);
      }
    } else {
      alert('Please install MetaMask!');
    }
  };

  return (
    <motion.button
      onClick={connectWallet}
      disabled={isConnecting}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 button-glow ${
        address
          ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
          : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white'
      }`}
    >
      <motion.div
        animate={{ rotate: isConnecting ? 360 : 0 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      >
        <FaWallet className={`w-5 h-5 ${isConnecting ? 'animate-pulse' : ''}`} />
      </motion.div>
      <span>
        {isConnecting
          ? 'Connecting...'
          : address
          ? `${address.slice(0, 6)}...${address.slice(-4)}`
          : 'Connect Wallet'}
      </span>
    </motion.button>
  );
}
