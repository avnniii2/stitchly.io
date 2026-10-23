import React from 'react';
import { NeedleIcon, ButtonDoodle, SparkleDoodle } from './Doodles';
import { Button } from './Button';

export const EmptyState = ({
  title = 'No items found',
  description = 'Your custom atelier box is waiting for new designs and stitches.',
  actionLabel,
  onAction,
  icon: CustomIcon,
  className = '',
}) => {
  return (
    <div className={`flex flex-col items-center justify-center p-8 md:p-12 text-center rounded-3xl bg-white/60 border border-dashed border-blush/60 ${className}`}>
      <div className="relative w-16 h-16 rounded-full bg-blush/30 flex items-center justify-center mb-4">
        {CustomIcon ? (
          <CustomIcon className="w-8 h-8 text-plum" />
        ) : (
          <NeedleIcon className="w-8 h-8" color="#D9718A" />
        )}
        <div className="absolute -top-1 -right-1">
          <SparkleDoodle className="w-4 h-4" color="#D9718A" />
        </div>
      </div>

      <h3 className="font-fraunces text-xl md:text-2xl text-plum mb-2">
        {title}
      </h3>
      <p className="text-sm text-plum-soft max-w-sm mb-6 leading-relaxed">
        {description}
      </p>

      {actionLabel && onAction && (
        <Button onClick={onAction} variant="blush" size="sm">
          {actionLabel}
        </Button>
      )}
    </div>
  );
};
