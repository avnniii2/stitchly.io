import React from 'react';
import { motion } from 'framer-motion';

export const Tabs = ({
  tabs,
  activeTab,
  onChange,
  className = '',
  variant = 'pills', // 'pills' or 'underline'
}) => {
  return (
    <div 
      role="tablist" 
      className={`flex items-center gap-1.5 p-1.5 bg-cream-200/90 border border-plum/10 rounded-full overflow-x-auto no-scrollbar ${className}`}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        const Icon = tab.icon;

        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(tab.id)}
            className={`relative px-4 py-2 text-xs md:text-sm font-medium rounded-full transition-colors whitespace-nowrap z-10 flex items-center gap-2 ${
              isActive ? 'text-plum' : 'text-plum-soft hover:text-plum'
            }`}
          >
            {Icon && <Icon className="w-4 h-4 shrink-0" />}
            <span>{tab.label}</span>

            {/* Count badge if available */}
            {tab.count !== undefined && (
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                isActive ? 'bg-rose-deep text-white' : 'bg-blush text-plum'
              }`}>
                {tab.count}
              </span>
            )}

            {/* Animated active pill backdrop */}
            {isActive && (
              <motion.div
                layoutId="activeTabPill"
                className="absolute inset-0 bg-white rounded-full shadow-sm border border-blush/60 -z-10"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
};
