import React from 'react';
import { motion } from 'framer-motion';

export const NeedleLoader = ({ 
  text = 'Threading your custom atelier pattern...', 
  size = 'md',
  className = '' 
}) => {
  return (
    <div className={`flex flex-col items-center justify-center gap-4 py-8 text-center ${className}`}>
      <div className="relative w-20 h-20 flex items-center justify-center">
        {/* Needle animated dipping motion */}
        <motion.div
          animate={{
            y: [-6, 6, -6],
            rotate: [15, 25, 15],
          }}
          transition={{
            duration: 1.6,
            repeat: Infinity,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative z-10"
        >
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            {/* Needle Body */}
            <path
              d="M10 32 L28 10 C30 8 32 9 33 10 C34 11 35 13 33 15 L14 34 Z"
              fill="#D9718A"
              opacity="0.9"
            />
            {/* Needle Eye */}
            <ellipse cx="29" cy="12" rx="1.5" ry="3" fill="#FFF9F5" transform="rotate(-45 29 12)" />
            {/* Needle Tip Point */}
            <path d="M10 32 L8 36 L12 34 Z" fill="#4A3F5C" />
          </svg>
        </motion.div>

        {/* Dancing Sinuous Thread */}
        <svg className="absolute inset-0 w-full h-full overflow-visible pointer-events-none">
          <motion.path
            d="M 5,28 C 15,10 25,35 38,12 S 50,30 35,40"
            fill="none"
            stroke="#D9718A"
            strokeWidth="2"
            strokeDasharray="4 4"
            initial={{ pathOffset: 0 }}
            animate={{ pathOffset: 1 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
        </svg>

        {/* Soft fabric patch backdrop */}
        <div className="absolute w-14 h-14 rounded-full bg-blush/40 blur-sm -z-0" />
      </div>

      {text && (
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm font-medium text-plum-soft tracking-wide animate-pulse"
        >
          {text}
        </motion.p>
      )}
    </div>
  );
};
