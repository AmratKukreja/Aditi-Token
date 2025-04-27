import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaChevronDown, FaChevronUp } from 'react-icons/fa';

const FAQ = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedIndex, setExpandedIndex] = useState(null);

  const faqs = [
    {
      question: "What is ADITI Token?",
      answer: "ADITI Token (ADT) is a decentralized cryptocurrency designed for fast, secure, and low-cost transactions. It's built on the Ethereum blockchain and aims to revolutionize digital payments."
    },
    {
      question: "How do I buy ADITI Tokens?",
      answer: "You can purchase ADITI Tokens through our DApp using MetaMask or other Web3 wallets. Simply connect your wallet, select the amount you want to purchase, and complete the transaction."
    },
    {
      question: "What is the total supply of ADITI Tokens?",
      answer: "The total supply of ADITI Tokens is capped at 1,000,000 ADT. This limited supply helps maintain the token's value and scarcity."
    },
    {
      question: "How do I store my ADITI Tokens?",
      answer: "ADITI Tokens can be stored in any ERC-20 compatible wallet like MetaMask, Trust Wallet, or Ledger. Always ensure you keep your private keys secure and never share them with anyone."
    },
    {
      question: "What are the transaction fees?",
      answer: "ADITI Token transactions incur a 2% fee, which is distributed to token holders and used for platform development and maintenance."
    },
    {
      question: "Is ADITI Token audited?",
      answer: "Yes, ADITI Token's smart contract has been audited by leading blockchain security firms to ensure its safety and reliability."
    },
    {
      question: "Can I stake ADITI Tokens?",
      answer: "Yes, you can stake your ADITI Tokens to earn passive income. The staking rewards are distributed based on the amount and duration of your stake."
    },
    {
      question: "What makes ADITI Token different from other cryptocurrencies?",
      answer: "ADITI Token stands out with its focus on community governance, low transaction fees, and innovative tokenomics. It's designed to be both user-friendly and sustainable in the long term."
    }
  ];

  const filteredFAQs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleFAQ = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h2 className="text-3xl font-bold text-white mb-8 text-center">Frequently Asked Questions</h2>
      
      {/* Search Bar */}
      <div className="relative mb-8">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FaSearch className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search FAQs..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        />
      </div>

      {/* FAQ List */}
      <div className="space-y-4">
        {filteredFAQs.map((faq, index) => (
          <motion.div
            key={index}
            className="bg-gray-800 rounded-lg overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full px-6 py-4 flex items-center justify-between text-left focus:outline-none"
            >
              <span className="text-lg font-medium text-white">{faq.question}</span>
              <span className="text-purple-500">
                {expandedIndex === index ? <FaChevronUp /> : <FaChevronDown />}
              </span>
            </button>
            
            <AnimatePresence>
              {expandedIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="px-6 pb-4"
                >
                  <p className="text-gray-400">{faq.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {/* No Results Message */}
      {filteredFAQs.length === 0 && (
        <div className="text-center text-gray-400 py-8">
          No FAQs found matching your search.
        </div>
      )}
    </div>
  );
};

export default FAQ; 