import React from 'react';
import { ScissorsIcon } from './Doodles';

export const StitchDivider = ({ 
  className = '', 
  color = '#D9718A', 
  withScissors = false,
  wavy = false 
}) => {
  if (wavy) {
    return (
      <div className={`relative w-full py-4 flex items-center justify-center overflow-hidden ${className}`}>
        <svg className="w-full h-4" preserveAspectRatio="none" viewBox="0 0 1200 16">
          <path
            d="M0,8 Q30,1 60,8 T120,8 T180,8 T240,8 T300,8 T360,8 T420,8 T480,8 T540,8 T600,8 T660,8 T720,8 T780,8 T840,8 T900,8 T960,8 T1020,8 T1080,8 T1140,8 T1200,8"
            fill="none"
            stroke={color}
            strokeWidth="1.8"
            strokeDasharray="6 6"
            strokeLinecap="round"
            opacity="0.5"
          />
        </svg>
      </div>
    );
  }

  return (
    <div className={`relative w-full py-4 flex items-center justify-center ${className}`}>
      <div 
        className="w-full h-0 border-t-2 border-dashed"
        style={{ borderColor: color, opacity: 0.4 }}
      />
      {withScissors && (
        <div className="absolute px-3 bg-cream">
          <ScissorsIcon className="w-5 h-5 -rotate-45" color={color} />
        </div>
      )}
    </div>
  );
};
