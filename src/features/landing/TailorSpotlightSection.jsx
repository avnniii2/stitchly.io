import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { SEED_USERS } from '../../data/seed';
import { Button } from '../../components/Button';
import { PinIcon, ScissorsIcon, NeedleIcon } from '../../components/Doodles';
import { Star, ShieldCheck, ChevronLeft, ChevronRight, Clock, Award, ArrowRight } from 'lucide-react';

export const TailorSpotlightSection = () => {
  const navigate = useNavigate();
  const tailors = SEED_USERS.filter((u) => u.role === 'tailor' && u.verified);
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? tailors.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === tailors.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="py-20 bg-cream relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-mint/50 border border-mint text-xs font-semibold text-emerald-950 uppercase tracking-wider mb-3">
              <PinIcon className="w-3.5 h-3.5 text-emerald-700" />
              <span>Artisan Spotlight</span>
            </div>
            <h2 className="font-fraunces text-3xl sm:text-4xl md:text-5xl text-plum font-normal tracking-tight">
              Crafted by verified <span className="chalk-underline chalk-underline-mint">master artisans</span>
            </h2>
            <p className="text-sm sm:text-base text-plum-soft mt-3 max-w-xl">
              Every tailor on Stitchly is vetted for fine needlecraft, seam allowances, and generational craftsmanship.
            </p>
          </div>

          <div className="flex items-center gap-2 mt-6 md:mt-0">
            <button
              type="button"
              onClick={prevSlide}
              className="w-10 h-10 rounded-full bg-white border border-plum/10 text-plum hover:bg-blush/40 flex items-center justify-center transition-colors shadow-xs"
              aria-label="Previous tailor"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={nextSlide}
              className="w-10 h-10 rounded-full bg-white border border-plum/10 text-plum hover:bg-blush/40 flex items-center justify-center transition-colors shadow-xs"
              aria-label="Next tailor"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <Button
              variant="mint"
              size="sm"
              onClick={() => navigate('/tailors')}
              className="ml-2 font-medium"
            >
              View all tailors
            </Button>
          </div>
        </div>

        {/* Carousel Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tailors.map((tailor, idx) => (
            <motion.div
              key={tailor.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -6 }}
              className="rounded-3xl bg-white/85 backdrop-blur-md p-6 border border-mint/60 shadow-soft-mint flex flex-col justify-between relative overflow-hidden group"
            >
              {/* Top Details */}
              <div>
                {/* Header Profile Info */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={tailor.avatar}
                      alt={tailor.name}
                      className="w-14 h-14 rounded-2xl object-cover border-2 border-mint shadow-xs"
                    />
                    <div>
                      <h3 className="font-fraunces text-lg text-plum font-semibold group-hover:text-emerald-900 transition-colors">
                        {tailor.name}
                      </h3>
                      <div className="flex items-center gap-1 text-xs text-plum-soft mt-0.5">
                        <PinIcon className="w-3.5 h-3.5 text-rose-deep shrink-0" />
                        <span>{tailor.city}, {tailor.state}</span>
                      </div>
                    </div>
                  </div>

                  {/* Badge */}
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-mint text-emerald-950 border border-mint-400">
                    {tailor.badge}
                  </span>
                </div>

                {/* Rating & Response Metrics */}
                <div className="flex items-center gap-4 py-2.5 px-3 rounded-2xl bg-cream-100 border border-plum/5 text-xs mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    <span className="font-bold text-plum">{tailor.rating}</span>
                    <span className="text-plum-soft">({tailor.reviewCount})</span>
                  </div>
                  <div className="w-px h-3 bg-plum/20" />
                  <div className="flex items-center gap-1 text-plum-soft">
                    <Clock className="w-3.5 h-3.5 text-emerald-700" />
                    <span>{tailor.responseTime}</span>
                  </div>
                  <div className="w-px h-3 bg-plum/20" />
                  <div className="text-plum-soft font-mono">
                    {tailor.experienceYears}y exp
                  </div>
                </div>

                {/* Bio Snippet */}
                <p className="text-xs text-plum-soft leading-relaxed line-clamp-2 mb-4">
                  {tailor.bio}
                </p>

                {/* Specialties Chips */}
                <div className="space-y-1.5 mb-5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-plum-soft">
                    Specialties:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {tailor.specialties.map((spec) => (
                      <span
                        key={spec}
                        className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-mint/40 text-emerald-950 border border-mint/80"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-mint/30 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-plum-soft block">Price Range</span>
                  <span className="text-xs font-bold text-plum">{tailor.priceRange}</span>
                </div>
                <Button
                  variant="mint"
                  size="sm"
                  onClick={() => navigate('/tailors')}
                  icon={ArrowRight}
                  iconPosition="right"
                  className="font-medium text-xs"
                >
                  View Profile
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
