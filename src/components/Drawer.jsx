import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export const Drawer = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  position = 'right', // 'right' or 'bottom'
  size = 'max-w-md',
  className = '',
}) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const slideVariants = {
    right: {
      initial: { x: '100%', opacity: 0.5 },
      animate: { x: 0, opacity: 1 },
      exit: { x: '100%', opacity: 0 }
    },
    bottom: {
      initial: { y: '100%', opacity: 0.5 },
      animate: { y: 0, opacity: 1 },
      exit: { y: '100%', opacity: 0 }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-plum/40 backdrop-blur-sm"
            aria-hidden="true"
          />

          <div className={`fixed inset-y-0 right-0 flex ${position === 'bottom' ? 'bottom-0 left-0 right-0 items-end' : ''} pointer-events-none`}>
            <motion.div
              role="dialog"
              aria-modal="true"
              variants={slideVariants[position]}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className={`pointer-events-auto w-full ${size} bg-cream h-full flex flex-col shadow-2xl border-l border-blush/60 ${className}`}
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-blush/40 bg-white/70 backdrop-blur-md">
                <div>
                  {title && (
                    <h3 className="font-fraunces text-xl font-normal text-plum tracking-tight">
                      {title}
                    </h3>
                  )}
                  {subtitle && (
                    <p className="text-xs text-plum-soft mt-0.5 font-sans">
                      {subtitle}
                    </p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="w-9 h-9 rounded-full bg-cream-200 hover:bg-blush/50 text-plum flex items-center justify-center transition-colors focus:outline-none"
                  aria-label="Close drawer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Scrollable Body */}
              <div className="flex-1 overflow-y-auto p-6 atelier-grain">
                {children}
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
