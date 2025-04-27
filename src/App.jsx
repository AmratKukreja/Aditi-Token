import React, { useState, useEffect } from "react";
import { motion as Motion } from "framer-motion";
import WalletConnect from "./components/WalletConnect";
import TokenBalance from "./components/TokenBalance";
import TransferForm from "./components/TransferForm";
import WalletInfo from './components/WalletInfo';
import TransactionHistory from './components/TransactionHistory';
import TokenInfo from './components/TokenInfo';
import ADTLogo from './assets/ADTLogo';
import PriceTicker from './components/PriceTicker';
import ThemeToggle from './components/ThemeToggle';
import CoinPrices from './components/CoinPrices';
import Token3DView from './components/Token3DView';
import Background3D from './components/Background3D';
import FAQ from './components/FAQ';
import CommunityPoll from './components/CommunityPoll';
import AboutToken from './components/AboutToken';
import './styles/animations.css';

function App() {
  const [userAddress, setUserAddress] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleConnect = (address) => {
    setUserAddress(address);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 gradient-animation">
      <Background3D />
      
      {/* Sticky Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-gray-900/95 backdrop-blur-sm shadow-lg' : ''
      }`}>
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-4"
            >
              <ADTLogo className="w-12 h-12 float-animation" />
              <h1 className="text-2xl font-bold text-white">ADITI Token</h1>
            </Motion.div>
            
            {/* Desktop Menu */}
            <Motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="hidden md:flex items-center space-x-4"
            >
              <div className="bg-gray-800/50 px-4 py-2 rounded-lg">
                <PriceTicker />
              </div>
              <ThemeToggle />
              <WalletConnect onConnect={handleConnect} />
            </Motion.div>
            
            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button 
                onClick={toggleMobileMenu}
                className="text-white p-2 focus:outline-none"
              >
                <svg 
                  className="w-6 h-6" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                  />
                </svg>
              </button>
            </div>
          </div>
          
          {/* Mobile Menu Dropdown */}
          {isMobileMenuOpen && (
            <Motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="md:hidden bg-gray-800/95 backdrop-blur-sm mt-4 py-4 px-2 rounded-lg"
            >
              <div className="flex flex-col space-y-4">
                <div className="bg-gray-800/50 px-4 py-2 rounded-lg">
                  <PriceTicker />
                </div>
                <div className="flex justify-center">
                  <ThemeToggle />
                </div>
                <div className="flex justify-center">
                  <WalletConnect onConnect={handleConnect} />
                </div>
              </div>
            </Motion.div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-32 pb-16 px-4">
        <div className="max-w-7xl mx-auto space-y-16">
          {/* Hero Section */}
          <Motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center relative"
          >
            <div className="relative z-10">
              <Token3DView className="w-40 h-40 mx-auto mb-8" />
              <h1 className="text-5xl font-bold text-white mb-4">ADITI Token Dashboard</h1>
              <p className="text-xl text-gray-400">Manage your ADT tokens and transactions</p>
            </div>
          </Motion.section>

          {/* About Section */}
          <AboutToken />

          {/* Market Overview Section */}
          <CoinPrices />

          {/* Token Info Section */}
          <TokenInfo />

          {userAddress ? (
            <Motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              {/* Dashboard Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column */}
                <div className="space-y-8">
                  <WalletInfo />
                  <TokenBalance userAddress={userAddress} />
                </div>
                
                {/* Right Column */}
                <div className="space-y-8">
                  <TransferForm userAddress={userAddress} />
                  <TransactionHistory />
                </div>
              </div>
            </Motion.div>
          ) : (
            <Motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-xl blur-xl animate-pulse"></div>
              <div className="relative bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 text-center">
                <Motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="flex flex-col items-center space-y-6"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                    <svg
                      className="w-8 h-8 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-white">Connect Your Wallet</h2>
                  <p className="text-gray-400 text-lg max-w-md">
                    Please connect your wallet to access the dashboard and manage your tokens
                  </p>
                  <Motion.div
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    transition={{ 
                      repeat: Infinity,
                      repeatType: "reverse",
                      duration: 1.5
                    }}
                    className="mt-4"
                  >
                    <WalletConnect onConnect={handleConnect} />
                  </Motion.div>
                </Motion.div>
              </div>
            </Motion.div>
          )}

          {/* FAQ Section */}
          <Motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <FAQ />
          </Motion.div>

          {/* Community Poll Section */}
          <Motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <CommunityPoll />
          </Motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-gray-400">
            <div>
              <h3 className="text-white font-bold mb-4">About ADITI Token</h3>
              <p>A next-generation decentralized token platform.</p>
            </div>
            <div>
              <h3 className="text-white font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-purple-500 transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-purple-500 transition-colors">Whitepaper</a></li>
                <li><a href="#" className="hover:text-purple-500 transition-colors">Community</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold mb-4">Connect With Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-purple-500 transition-colors">Twitter</a>
                <a href="#" className="text-gray-400 hover:text-purple-500 transition-colors">Telegram</a>
                <a href="#" className="text-gray-400 hover:text-purple-500 transition-colors">Discord</a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-500">
            <p>&copy; 2025 ADITI Token. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
