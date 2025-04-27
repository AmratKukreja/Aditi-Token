import React from 'react';
import { motion } from 'framer-motion';
import { FaRocket, FaChartLine, FaShieldAlt, FaUsers } from 'react-icons/fa';

const TokenInfo = () => {
  const features = [
    {
      icon: <FaRocket className="w-8 h-8" />,
      title: 'Fast Transactions',
      description: 'Lightning-fast token transfers with minimal gas fees'
    },
    {
      icon: <FaChartLine className="w-8 h-8" />,
      title: 'Growth Potential',
      description: 'Designed for long-term value appreciation'
    },
    {
      icon: <FaShieldAlt className="w-8 h-8" />,
      title: 'Secure & Audited',
      description: 'Smart contract security is our top priority'
    },
    {
      icon: <FaUsers className="w-8 h-8" />,
      title: 'Community Driven',
      description: 'Governed by our active community members'
    }
  ];

  return (
    <div className="py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl font-bold text-white mb-4">About ADITI Token (ADT)</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          ADITI Token is designed to revolutionize decentralized finance with its innovative features and strong community focus.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-gray-800 rounded-xl p-6 hover-scale card-shadow"
          >
            <div className="text-purple-500 mb-4">{feature.icon}</div>
            <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
            <p className="text-gray-400">{feature.description}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-12 bg-gray-800 rounded-xl p-8 card-shadow"
      >
        <h3 className="text-2xl font-bold text-white mb-6">Tokenomics</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-500 mb-2">1M</div>
            <div className="text-gray-400">Total Supply</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-500 mb-2">2%</div>
            <div className="text-gray-400">Transaction Fee</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-500 mb-2">50%</div>
            <div className="text-gray-400">Locked Liquidity</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default TokenInfo; 