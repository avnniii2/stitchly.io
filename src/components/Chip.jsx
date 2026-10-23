import React from 'react';
import { motion } from 'framer-motion';

export const Chip = ({
  children,
  variant = 'blush',
  active = false,
  onClick,
  className = '',
  icon: Icon,
  size = 'md',
  ...props
}) => {
  const isClickable = Boolean(onClick);

  const sizeStyles = {
    sm: 'text-xs px-2.5 py-0.5 gap-1',
    md: 'text-xs md:text-sm px-3.5 py-1.5 gap-1.5',
    lg: 'text-sm px-4 py-2 gap-2'
  };

  const paletteStyles = {
    blush: active 
      ? 'bg-rose-deep text-white border-rose-deep shadow-sm' 
      : 'bg-blush/40 text-plum border-blush hover:bg-blush hover:text-plum',
    mint: active 
      ? 'bg-emerald-700 text-white border-emerald-700 shadow-sm' 
      : 'bg-mint/40 text-emerald-900 border-mint hover:bg-mint hover:text-emerald-950',
    lavender: active 
      ? 'bg-purple-800 text-white border-purple-800 shadow-sm' 
      : 'bg-lavender/40 text-purple-950 border-lavender hover:bg-lavender',
    peach: active 
      ? 'bg-amber-700 text-white border-amber-700 shadow-sm' 
      : 'bg-peach/50 text-amber-950 border-peach hover:bg-peach',
    butter: active 
      ? 'bg-amber-600 text-white border-amber-600 shadow-sm' 
      : 'bg-butter/50 text-amber-950 border-butter hover:bg-butter',
    sky: active 
      ? 'bg-blue-700 text-white border-blue-700 shadow-sm' 
      : 'bg-sky/50 text-blue-950 border-sky hover:bg-sky',
    neutral: active 
      ? 'bg-plum text-white border-plum shadow-sm' 
      : 'bg-white/70 text-plum border-plum/15 hover:bg-white',
  };

  const Component = isClickable ? motion.button : 'span';
  const motionProps = isClickable ? {
    whileHover: { scale: 1.03 },
    whileTap: { scale: 0.97 },
    type: 'button'
  } : {};

  return (
    <Component
      onClick={onClick}
      className={`inline-flex items-center font-medium rounded-full border transition-colors duration-200 select-none ${sizeStyles[size]} ${paletteStyles[variant]} ${isClickable ? 'cursor-pointer' : ''} ${className}`}
      {...motionProps}
      {...props}
    >
      {Icon && <Icon className="w-3.5 h-3.5 shrink-0" />}
      <span>{children}</span>
    </Component>
  );
};
