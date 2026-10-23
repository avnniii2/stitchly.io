import React from 'react';

export const Skeleton = ({
  className = '',
  variant = 'rectangular', // 'text', 'circular', 'rectangular'
  width,
  height,
}) => {
  const variantStyles = {
    text: 'h-4 w-3/4 rounded-md',
    circular: 'rounded-full',
    rectangular: 'rounded-2xl',
  };

  return (
    <div
      style={{ width, height }}
      className={`animate-pulse bg-gradient-to-r from-blush/20 via-blush/40 to-blush/20 bg-[length:200%_100%] ${variantStyles[variant]} ${className}`}
    />
  );
};
