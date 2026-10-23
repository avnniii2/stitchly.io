import React from 'react';
import { motion } from 'framer-motion';

export const Button = React.forwardRef(({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  isLoading = false,
  onClick,
  type = 'button',
  icon: Icon,
  iconPosition = 'left',
  ...props
}, ref) => {
  const baseStyles = "relative inline-flex items-center justify-center font-medium rounded-full transition-all duration-300 select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-deep/40 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden";

  const sizeStyles = {
    sm: "text-xs px-3.5 py-1.5 gap-1.5",
    md: "text-sm px-5 py-2.5 gap-2",
    lg: "text-base px-7 py-3.5 gap-2.5 shadow-soft",
  };

  const variantStyles = {
    primary: "bg-rose-deep text-white hover:bg-rose-deep-hover shadow-soft-blush hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0",
    blush: "bg-blush text-plum hover:bg-blush-300 shadow-soft hover:shadow-md hover:-translate-y-0.5",
    mint: "bg-mint-300 text-emerald-900 hover:bg-mint-400 shadow-soft-mint hover:shadow-md hover:-translate-y-0.5",
    sky: "bg-sky-200 text-blue-900 hover:bg-sky-300 shadow-soft hover:shadow-md hover:-translate-y-0.5",
    secondary: "bg-white/80 backdrop-blur-sm text-plum border border-plum/15 hover:border-plum/30 hover:bg-white shadow-sm hover:-translate-y-0.5",
    stitch: "bg-cream-100 text-plum border-2 border-dashed border-rose-deep/50 hover:border-rose-deep hover:bg-blush-50",
    ghost: "bg-transparent text-plum hover:bg-blush/20 hover:text-rose-deep",
  };

  return (
    <motion.button
      ref={ref}
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      whileTap={{ scale: disabled || isLoading ? 1 : 0.98 }}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {/* Subtle shimmer effect on primary */}
      {variant === 'primary' && !disabled && (
        <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full hover:animate-[shimmer_2s_infinite]" />
      )}

      {isLoading ? (
        <span className="inline-flex items-center gap-2">
          <svg className="animate-spin -ml-1 mr-1 h-4 w-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span>Please wait...</span>
        </span>
      ) : (
        <>
          {Icon && iconPosition === 'left' && <Icon className="w-4 h-4 shrink-0" />}
          <span>{children}</span>
          {Icon && iconPosition === 'right' && <Icon className="w-4 h-4 shrink-0" />}
        </>
      )}
    </motion.button>
  );
});

Button.displayName = 'Button';
