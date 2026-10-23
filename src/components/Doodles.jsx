import React from 'react';

export const NeedleIcon = ({ className = "w-5 h-5", color = "#D9718A" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M4 20 L16 8" />
    <path d="M16 8 C18 6 20 6.5 21 7.5 C22 8.5 22.5 10.5 20.5 12.5 L19 14" />
    <circle cx="18" cy="9" r="0.8" fill={color} />
    <path d="M4 20 C2 22 2 22 2 22" strokeDasharray="1 2" />
    <path d="M18 9 C17 5 13 4 11 6 C9 8 8 12 6 15" strokeDasharray="2 3" opacity="0.75" />
  </svg>
);

export const ThreadSpoolIcon = ({ className = "w-5 h-5", color = "#4A3F5C" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" className={className}>
    <rect x="7" y="5" width="10" height="14" rx="2" fill="#F9D5DC" stroke={color} />
    <line x1="5" y1="5" x2="19" y2="5" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="5" y1="19" x2="19" y2="19" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="7" y1="8" x2="17" y2="8" stroke={color} strokeDasharray="2 2" />
    <line x1="7" y1="11" x2="17" y2="11" stroke={color} strokeDasharray="2 2" />
    <line x1="7" y1="14" x2="17" y2="14" stroke={color} strokeDasharray="2 2" />
    <line x1="7" y1="16" x2="17" y2="16" stroke={color} strokeDasharray="2 2" />
  </svg>
);

export const ScissorsIcon = ({ className = "w-5 h-5", color = "#D9718A" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="6" cy="6" r="3" />
    <circle cx="6" cy="18" r="3" />
    <line x1="8.5" y1="8.5" x2="20" y2="20" />
    <line x1="8.5" y1="15.5" x2="20" y2="4" />
  </svg>
);

export const PinIcon = ({ className = "w-5 h-5", color = "#D9718A" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" className={className}>
    <circle cx="12" cy="7" r="4.5" fill="#FFE2CF" stroke={color} />
    <line x1="12" y1="11.5" x2="12" y2="21" strokeLinecap="round" />
    <line x1="12" y1="21" x2="11.5" y2="21.5" />
  </svg>
);

export const ButtonDoodle = ({ className = "w-5 h-5", color = "#8A7F9C" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" className={className}>
    <circle cx="12" cy="12" r="9" fill="#FFF9F5" stroke={color} />
    <circle cx="10" cy="10" r="1.2" fill={color} />
    <circle cx="14" cy="10" r="1.2" fill={color} />
    <circle cx="10" cy="14" r="1.2" fill={color} />
    <circle cx="14" cy="14" r="1.2" fill={color} />
  </svg>
);

export const SparkleDoodle = ({ className = "w-4 h-4", color = "#D9718A" }) => (
  <svg viewBox="0 0 24 24" fill={color} className={className}>
    <path d="M12 0 L14 9 L23 12 L14 15 L12 24 L10 15 L1 12 L10 9 Z" />
  </svg>
);
