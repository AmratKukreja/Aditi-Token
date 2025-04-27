import { motion } from 'framer-motion';

const ADTLogo = ({ className = "w-12 h-12" }) => (
  <motion.div
    initial={{ scale: 0.8, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ duration: 0.5, ease: "easeOut" }}
    className="float-animation glow-animation"
  >
    <svg
      className={className}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <motion.circle
        cx="50"
        cy="50"
        r="45"
        fill="url(#gradient)"
        animate={{
          scale: [1, 1.05, 1],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.path
        d="M30 50 L50 30 L70 50 L50 70 Z"
        fill="white"
        stroke="#4F46E5"
        strokeWidth="2"
        animate={{
          scale: [1, 1.02, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.text
        x="50"
        y="50"
        textAnchor="middle"
        dominantBaseline="middle"
        fill="white"
        fontSize="24"
        fontWeight="bold"
        animate={{
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        ADT
      </motion.text>
      <defs>
        <linearGradient id="gradient" x1="0" y1="0" x2="100" y2="100">
          <stop offset="0%" stopColor="#4F46E5" />
          <stop offset="100%" stopColor="#7C3AED" />
        </linearGradient>
      </defs>
    </svg>
  </motion.div>
);

export default ADTLogo; 