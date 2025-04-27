import { motion as Motion } from 'framer-motion';
import { FaUserFriends } from 'react-icons/fa';

const AboutToken = () => {
  return (
    <Motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className="relative z-30 max-w-xl sm:max-w-2xl mx-auto mt-44 md:mt-64 mb-20 bg-gradient-to-br from-purple-800/90 to-blue-900/80 border border-purple-700/30 rounded-2xl shadow-lg px-0 md:px-2 hover:shadow-xl transition-shadow duration-300"
      style={{ boxShadow: '0 6px 18px 0 rgba(31, 38, 135, 0.18)' }}
    >
      <div className="flex flex-col md:flex-row items-center md:items-stretch">
        {/* Icon/Illustration */}
        <div className="flex-shrink-0 flex items-center justify-center w-full md:w-1/3 bg-gradient-to-br from-pink-400/30 to-blue-400/20 rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none py-8 md:py-0">
          <span className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-pink-400/40 text-pink-500 text-4xl md:text-5xl shadow-md">
            <FaUserFriends />
          </span>
        </div>
        {/* Text Content */}
        <div className="flex-1 flex flex-col justify-center py-6 px-4 md:py-10 md:px-6 text-center md:text-left">
          <h2 className="text-xl md:text-2xl font-bold text-white mb-4 drop-shadow-lg leading-tight">The Story Behind ADITI Token</h2>
          <p className="text-base md:text-lg text-gray-200 mb-5 leading-relaxed">
          ADITI Token isn't just another crypto project—it's a heartfelt tribute to my best friends. I created this token to celebrate our friendships, the memories we've shared, and the support we've given each other through every high and low. This token is a symbol of trust, loyalty, and the unbreakable bonds we share.
          </p>
          <div className="mt-5 flex items-center justify-center md:justify-start gap-2">
            <span className="text-pink-300 font-semibold text-base md:text-lg">For my best friend, with love.</span>
          </div>
        </div>
      </div>
    </Motion.section>
  );
};

export default AboutToken; 