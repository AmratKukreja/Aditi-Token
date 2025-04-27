import { useState, useEffect } from 'react';
import { motion as Motion } from 'framer-motion';
import { FaThumbsUp, FaComment, FaChartBar } from 'react-icons/fa';

const CommunityPoll = () => {
  const [activeTab, setActiveTab] = useState('poll');
  const [feedback, setFeedback] = useState('');
  const [submittedFeedback, setSubmittedFeedback] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [pollResults, setPollResults] = useState({
    'Staking Rewards Program': 0,
    'NFT Integration': 0,
    'Cross-chain Bridge': 0,
    'Governance Voting': 0,
    'Mobile App Development': 0,
  });

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedFeedback = localStorage.getItem('communityFeedback');
    const savedPollResults = localStorage.getItem('pollResults');
    const savedVote = localStorage.getItem('userVote');

    if (savedFeedback) {
      setSubmittedFeedback(JSON.parse(savedFeedback));
    }
    if (savedPollResults) {
      setPollResults(JSON.parse(savedPollResults));
    }
    if (savedVote) {
      setHasVoted(true);
      setSelectedOption(savedVote);
    }
  }, []);

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    if (!feedback.trim()) return;

    const newFeedback = {
      text: feedback,
      timestamp: new Date().toISOString(),
    };

    const updatedFeedback = [...submittedFeedback, newFeedback];
    setSubmittedFeedback(updatedFeedback);
    localStorage.setItem('communityFeedback', JSON.stringify(updatedFeedback));
    setFeedback('');
  };

  const handleVote = (option) => {
    if (hasVoted) return;

    const newResults = { ...pollResults };
    newResults[option] = (newResults[option] || 0) + 1;
    
    setPollResults(newResults);
    setSelectedOption(option);
    setHasVoted(true);
    
    localStorage.setItem('pollResults', JSON.stringify(newResults));
    localStorage.setItem('userVote', option);
  };

  const getTotalVotes = () => {
    return Object.values(pollResults).reduce((sum, count) => sum + count, 0);
  };

  const getPercentage = (votes) => {
    const total = getTotalVotes();
    return total > 0 ? Math.round((votes / total) * 100) : 0;
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6">
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setActiveTab('poll')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
            activeTab === 'poll'
              ? 'bg-purple-500 text-white'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <FaChartBar />
          <span>Poll</span>
        </button>
        <button
          onClick={() => setActiveTab('feedback')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
            activeTab === 'feedback'
              ? 'bg-purple-500 text-white'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <FaComment />
          <span>Feedback</span>
        </button>
      </div>

      {activeTab === 'poll' ? (
        <div>
          <h3 className="text-xl font-bold text-white mb-4">Community Poll</h3>
          <p className="text-gray-400 mb-6">Which feature should we prioritize for ADITI Token's next development phase?</p>
          
          {!hasVoted ? (
            <div className="space-y-4">
              {Object.keys(pollResults).map((option) => (
                <Motion.button
                  key={option}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleVote(option)}
                  className="w-full p-4 bg-gray-700/50 hover:bg-gray-700 rounded-lg text-left text-white transition-colors"
                >
                  {option}
                </Motion.button>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {Object.entries(pollResults).map(([option, votes]) => (
                <div key={option} className="space-y-2">
                  <div className="flex justify-between text-sm text-gray-400">
                    <span>{option}</span>
                    <span>{getPercentage(votes)}%</span>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                    <Motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${getPercentage(votes)}%` }}
                      transition={{ duration: 0.5 }}
                      className={`h-full ${
                        option === selectedOption
                          ? 'bg-purple-500'
                          : 'bg-gray-600'
                      }`}
                    />
                  </div>
                </div>
              ))}
              <p className="text-gray-400 text-sm mt-4">
                Total votes: {getTotalVotes()}
              </p>
            </div>
          )}
        </div>
      ) : (
        <div>
          <h3 className="text-xl font-bold text-white mb-4">Share Your Feedback</h3>
          <form onSubmit={handleFeedbackSubmit} className="space-y-4">
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Share your thoughts about ADITI Token..."
              className="w-full p-4 bg-gray-700/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              rows="4"
            />
            <Motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full p-4 bg-purple-500 text-white rounded-lg font-medium hover:bg-purple-600 transition-colors"
            >
              Submit Feedback
            </Motion.button>
          </form>

          {submittedFeedback.length > 0 && (
            <div className="mt-6 space-y-4">
              <h4 className="text-lg font-semibold text-white">Recent Feedback</h4>
              {submittedFeedback.slice().reverse().map((item, index) => (
                <Motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 bg-gray-700/50 rounded-lg"
                >
                  <p className="text-white">{item.text}</p>
                  <p className="text-gray-400 text-sm mt-2">
                    {new Date(item.timestamp).toLocaleString()}
                  </p>
                </Motion.div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CommunityPoll; 