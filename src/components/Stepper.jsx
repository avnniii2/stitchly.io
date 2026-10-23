import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { NeedleIcon } from './Doodles';

export const Stepper = ({
  steps = [],
  currentStep = 1,
  onStepClick,
  className = ''
}) => {
  return (
    <div className={`w-full py-4 ${className}`}>
      <div className="relative flex items-center justify-between max-w-3xl mx-auto px-4">
        {/* Thread connecting line background */}
        <div className="absolute left-8 right-8 top-1/2 -translate-y-1/2 h-0.5 border-t-2 border-dashed border-plum/20 -z-0" />
        
        {/* Animated active thread progress */}
        <motion.div 
          className="absolute left-8 top-1/2 -translate-y-1/2 h-0.5 bg-rose-deep -z-0"
          initial={{ width: 0 }}
          animate={{ 
            width: steps.length > 1 ? `${((currentStep - 1) / (steps.length - 1)) * 100}%` : '0%' 
          }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{ maxWidth: 'calc(100% - 4rem)' }}
        />

        {steps.map((step, idx) => {
          const stepNum = idx + 1;
          const isCompleted = stepNum < currentStep;
          const isCurrent = stepNum === currentStep;

          return (
            <div key={idx} className="flex flex-col items-center relative z-10">
              <button
                type="button"
                disabled={!onStepClick}
                onClick={() => onStepClick && onStepClick(stepNum)}
                className={`w-9 h-9 md:w-11 md:h-11 rounded-full flex items-center justify-center font-medium text-xs md:text-sm transition-all duration-300 ${
                  isCompleted
                    ? 'bg-rose-deep text-white shadow-soft-blush'
                    : isCurrent
                    ? 'bg-white text-plum ring-4 ring-blush border-2 border-rose-deep shadow-md font-bold'
                    : 'bg-cream-100 text-plum-soft border border-plum/20'
                } ${onStepClick ? 'cursor-pointer hover:scale-105' : 'cursor-default'}`}
              >
                {isCompleted ? (
                  <Check className="w-4 h-4 stroke-[2.5]" />
                ) : isCurrent ? (
                  <NeedleIcon className="w-4 h-4" color="#D9718A" />
                ) : (
                  <span>{stepNum}</span>
                )}
              </button>

              <span className={`mt-2 text-[11px] md:text-xs font-medium text-center whitespace-nowrap hidden sm:block ${
                isCurrent ? 'text-plum font-bold' : 'text-plum-soft'
              }`}>
                {step.title || step}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
