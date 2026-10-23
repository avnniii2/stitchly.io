import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TESTIMONIALS } from '../../data/seed';
import { Star, Quote } from 'lucide-react';
import { SparkleDoodle } from '../../components/Doodles';

export const TestimonialsSection = () => {
  const [isPaused, setIsPaused] = useState(false);

  // Duplicate for seamless infinite loop effect
  const carouselItems = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section className="py-20 bg-cream relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blush/50 border border-blush text-xs font-semibold text-rose-deep uppercase tracking-wider mb-3">
          <SparkleDoodle className="w-3.5 h-3.5" color="#D9718A" />
          <span>Real Client Stories</span>
        </div>

        <h2 className="font-fraunces text-3xl sm:text-4xl md:text-5xl text-plum font-normal tracking-tight">
          Adored by brides, mothers & grooms
        </h2>
        <p className="text-sm sm:text-base text-plum-soft mt-3 max-w-xl mx-auto">
          Read what happens when artificial intelligence pairs with generational craft hands.
        </p>
      </div>

      {/* Auto-scrolling horizontal cards with pause on hover */}
      <div 
        className="flex overflow-hidden py-4 select-none"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <motion.div
          animate={isPaused ? { x: 0 } : { x: ['0%', '-50%'] }}
          transition={{
            repeat: Infinity,
            repeatType: 'loop',
            duration: 35,
            ease: 'linear'
          }}
          className="flex gap-6 shrink-0 px-4"
        >
          {carouselItems.map((item, idx) => (
            <div
              key={`${item.id}-${idx}`}
              className="w-[320px] sm:w-[380px] rounded-3xl bg-white/90 backdrop-blur-md p-6 border border-blush/60 shadow-soft hover:shadow-soft-lg transition-all flex flex-col justify-between shrink-0"
            >
              <div>
                {/* Star rating */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex text-amber-500">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <Quote className="w-5 h-5 text-blush stroke-[1.5]" />
                </div>

                {/* Quote */}
                <p className="text-xs sm:text-sm text-plum-soft leading-relaxed italic mb-6">
                  "{item.quote}"
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-4 border-t border-plum/10 flex items-center gap-3">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-10 h-10 rounded-full object-cover border border-blush"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-xs text-plum truncate">
                    {item.name}
                  </h4>
                  <p className="text-[11px] text-plum-soft truncate">
                    {item.role} • {item.city}
                  </p>
                  <p className="text-[10px] text-rose-deep font-medium truncate mt-0.5">
                    Stitched by: {item.tailor}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
