import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUI } from '../store/useUI';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { NeedleIcon } from './Doodles';

export const ToastContainer = () => {
  const { toasts, removeToast } = useUI();

  return (
    <div 
      aria-live="polite" 
      className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none px-4"
    >
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-auto bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-soft-lg border border-blush flex items-start gap-3 relative overflow-hidden"
          >
            {/* Left Accent indicator */}
            <div className="mt-0.5 shrink-0">
              {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-600" />}
              {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-rose-deep" />}
              {toast.type === 'stitch' && <NeedleIcon className="w-5 h-5" color="#D9718A" />}
              {(!toast.type || toast.type === 'info') && <Info className="w-5 h-5 text-plum-soft" />}
            </div>

            <div className="flex-1 pr-4">
              <h4 className="text-sm font-semibold text-plum">{toast.title}</h4>
              {toast.message && (
                <p className="text-xs text-plum-soft mt-0.5 leading-relaxed">{toast.message}</p>
              )}
            </div>

            <button
              type="button"
              onClick={() => removeToast(toast.id)}
              className="text-plum-soft hover:text-plum p-1 -mr-1 rounded-full transition-colors"
              aria-label="Dismiss toast"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Bottom thread stitch animation */}
            <div className="absolute bottom-0 left-0 right-0 h-0.5 border-b border-dashed border-rose-deep/30" />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
