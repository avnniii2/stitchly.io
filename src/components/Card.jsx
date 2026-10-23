import React from 'react';
import { motion } from 'framer-motion';

export const Card = ({
  children,
  className = '',
  variant = 'default', // 'default', 'glass', 'blush', 'mint', 'sky', 'stitch'
  interactive = false,
  onClick,
  ...props
}) => {
  const variantStyles = {
    default: "bg-white/85 border border-plum/10 shadow-soft",
    glass: "glass-card shadow-soft",
    blush: "bg-white/90 border border-blush shadow-soft-blush",
    mint: "bg-white/90 border border-mint shadow-soft-mint",
    sky: "bg-white/90 border border-sky shadow-soft",
    stitch: "bg-white/90 border-2 border-dashed border-blush-300 shadow-soft",
  };

  const Component = interactive ? motion.div : 'div';
  const motionProps = interactive ? {
    whileHover: { y: -4, transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] } },
    whileTap: { y: 0 },
    cursor: 'pointer'
  } : {};

  return (
    <Component
      onClick={onClick}
      className={`rounded-3xl p-6 relative transition-shadow duration-300 ${variantStyles[variant]} ${interactive ? 'cursor-pointer hover:shadow-soft-lg' : ''} ${className}`}
      {...motionProps}
      {...props}
    >
      {children}
    </Component>
  );
};
