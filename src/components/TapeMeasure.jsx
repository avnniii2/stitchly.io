import React from 'react';
import { motion } from 'framer-motion';

export const TapeMeasure = ({ 
  progress = 0, // 0 to 100
  label = '', 
  className = '',
  showMarks = true
}) => {
  const clamped = Math.min(100, Math.max(0, progress));

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <div className="flex justify-between items-center text-xs font-semibold text-plum mb-1.5 px-1">
          <span>{label}</span>
          <span className="font-mono text-rose-deep">{clamped}%</span>
        </div>
      )}

      {/* Tape Measure Body */}
      <div className="relative h-6 w-full rounded-lg bg-butter border border-amber-300/80 shadow-inner overflow-hidden flex items-center">
        {/* Repeating millimeter and inch ticks background */}
        <div 
          className="absolute inset-0 opacity-45 pointer-events-none"
          style={{
            backgroundImage: `repeating-linear-gradient(
              to right,
              #4A3F5C 0,
              #4A3F5C 1px,
              transparent 1px,
              transparent 8px
            )`
          }}
        />

        {/* Inch Numbers across the tape */}
        {showMarks && (
          <div className="absolute inset-0 flex justify-between items-center px-2 text-[9px] font-mono text-plum/60 select-none pointer-events-none">
            <span>1"</span>
            <span>3"</span>
            <span>6"</span>
            <span>9"</span>
            <span>12"</span>
            <span>15"</span>
            <span>18"</span>
          </div>
        )}

        {/* Active Measured Portion (Rose/Blush ribbon sliding across) */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${clamped}%` }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="h-full bg-gradient-to-r from-blush via-rose-deep/70 to-rose-deep relative border-r-2 border-plum"
        >
          {/* Metal brass end clamp indicator on the right edge */}
          <div className="absolute right-0 top-0 bottom-0 w-2 bg-amber-400 border-l border-amber-600 shadow-sm" />
        </motion.div>
      </div>
    </div>
  );
};
