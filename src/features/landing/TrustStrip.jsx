import React, { useEffect, useState, useRef } from 'react';
import { Star, ShieldCheck, MapPin, Sparkles, Scissors } from 'lucide-react';
import { INITIAL_STATS } from '../../data/seed';

// Simple counter component with intersection observer
const Counter = ({ target, suffix = '', duration = 1800 }) => {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.2 }
    );

    if (elementRef.current) observer.observe(elementRef.current);
    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // easeOutCubic
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easedProgress * target));

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };
    window.requestAnimationFrame(step);
  }, [hasStarted, target, duration]);

  return (
    <span ref={elementRef} className="font-fraunces">
      {count.toLocaleString()}
      {suffix}
    </span>
  );
};

export const TrustStrip = () => {
  const stats = [
    {
      id: 'tailors',
      value: INITIAL_STATS.tailors,
      suffix: '+',
      label: 'Verified Master Tailors',
      sublabel: 'Across 14 artisanal clusters',
      icon: Scissors,
      accent: 'text-rose-deep'
    },
    {
      id: 'outfits',
      value: INITIAL_STATS.outfits,
      suffix: '+',
      label: 'Custom Outfits Handcrafted',
      sublabel: 'Zero shop visits required',
      icon: Sparkles,
      accent: 'text-purple-700'
    },
    {
      id: 'cities',
      value: INITIAL_STATS.cities,
      suffix: '',
      label: 'Major Indian Cities',
      sublabel: 'Doorstep swatch & measurement kits',
      icon: MapPin,
      accent: 'text-emerald-700'
    },
    {
      id: 'rating',
      value: 4.96,
      isFloat: true,
      label: 'Client Star Rating',
      sublabel: 'Over 3,800+ five-star reviews',
      icon: Star,
      accent: 'text-amber-500'
    }
  ];

  return (
    <section className="py-8 bg-white/60 border-y border-blush/40 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 divide-y md:divide-y-0 md:divide-x divide-blush/30">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div 
                key={stat.id} 
                className={`flex flex-col items-center text-center p-3 ${idx > 0 ? 'pt-6 md:pt-3' : ''}`}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-8 h-8 rounded-full bg-cream-200 flex items-center justify-center">
                    <Icon className={`w-4 h-4 ${stat.accent}`} />
                  </div>
                  <div className="text-2xl sm:text-3xl md:text-4xl font-semibold text-plum tracking-tight">
                    {stat.isFloat ? (
                      <span className="font-fraunces flex items-center gap-1">
                        4.96 <span className="text-amber-500 text-xl">★</span>
                      </span>
                    ) : (
                      <Counter target={stat.value} suffix={stat.suffix} />
                    )}
                  </div>
                </div>

                <p className="text-xs sm:text-sm font-semibold text-plum">
                  {stat.label}
                </p>
                <p className="text-[11px] text-plum-soft mt-0.5">
                  {stat.sublabel}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
