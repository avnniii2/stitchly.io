import React from 'react';
import { motion } from 'framer-motion';
import { HOW_IT_WORKS_STEPS } from '../../data/seed';
import { useUI } from '../../store/useUI';
import { NeedleIcon, ScissorsIcon, SparkleDoodle } from '../../components/Doodles';
import { Mic, Sparkles, Sliders, Compass, Camera, PackageCheck, ArrowRight } from 'lucide-react';

const iconMap = {
  Mic,
  Sparkles,
  Sliders,
  Compass,
  Camera,
  PackageCheck
};

export const HowItWorksSection = () => {
  const { openModal } = useUI();

  return (
    <section className="py-20 bg-cream relative overflow-hidden">
      {/* Background stitch-line decorative wave */}
      <div className="absolute top-1/2 left-0 right-0 h-0.5 -translate-y-12 border-t-2 border-dashed border-blush/60 pointer-events-none hidden lg:block -z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blush/50 border border-blush text-xs font-semibold text-rose-deep uppercase tracking-wider mb-3">
            <NeedleIcon className="w-3.5 h-3.5" color="#D9718A" />
            <span>The 6-Step Atelier Journey</span>
          </div>

          <h2 className="font-fraunces text-3xl sm:text-4xl md:text-5xl text-plum font-normal tracking-tight">
            From imagination to <span className="chalk-underline">perfection</span>
          </h2>
          <p className="text-sm sm:text-base text-plum-soft mt-3 leading-relaxed">
            Click on any milestone below to inspect our transparent atelier process. 
            No confusing fashion lingo, no endless physical fitting rounds.
          </p>
        </div>

        {/* 6 Clickable Timeline Step Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
          {HOW_IT_WORKS_STEPS.map((step, idx) => {
            const Icon = iconMap[step.modalContent.icon] || Sparkles;

            return (
              <motion.div
                key={step.step}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                onClick={() => openModal('how-it-works-step', step)}
                className="cursor-pointer group rounded-3xl bg-white/80 backdrop-blur-md p-5 border border-blush/60 shadow-soft hover:shadow-soft-lg hover:border-rose-deep transition-all flex flex-col justify-between relative"
              >
                {/* Step badge pill */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-rose-deep px-2.5 py-1 rounded-full bg-blush/40 group-hover:bg-rose-deep group-hover:text-white transition-colors">
                    0{step.step}
                  </span>
                  <div className="w-7 h-7 rounded-full bg-cream-100 flex items-center justify-center group-hover:bg-blush transition-colors">
                    <Icon className="w-3.5 h-3.5 text-plum group-hover:text-rose-deep transition-colors" />
                  </div>
                </div>

                <div>
                  <h3 className="font-fraunces text-lg text-plum group-hover:text-rose-deep transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-xs text-plum-soft mt-1.5 leading-relaxed line-clamp-3">
                    {step.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-plum/10 flex items-center justify-between text-[11px] font-semibold text-rose-deep">
                  <span>View Details</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
