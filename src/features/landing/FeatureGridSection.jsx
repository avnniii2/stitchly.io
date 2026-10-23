import React from 'react';
import { motion } from 'framer-motion';
import { FEATURES_DATA } from '../../data/seed';
import { useUI } from '../../store/useUI';
import { NeedleIcon, ScissorsIcon, SparkleDoodle } from '../../components/Doodles';
import { Ruler, Video, Layers, ShieldCheck, Users, Mic, ArrowRight } from 'lucide-react';

const iconMap = {
  Ruler,
  Video,
  Layers,
  ShieldCheck,
  Users,
  Mic
};

export const FeatureGridSection = () => {
  const { openDrawer } = useUI();

  return (
    <section className="py-20 bg-cream relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-peach/50 border border-peach text-xs font-semibold text-amber-950 uppercase tracking-wider mb-3">
            <SparkleDoodle className="w-3.5 h-3.5" color="#D9718A" />
            <span>The Stitchly Difference</span>
          </div>

          <h2 className="font-fraunces text-3xl sm:text-4xl md:text-5xl text-plum font-normal tracking-tight">
            Haute-couture craft, <span className="chalk-underline">doorstep ease</span>
          </h2>
          <p className="text-sm sm:text-base text-plum-soft mt-3 leading-relaxed">
            Every feature is designed to replace awkward measuring tape visits, fabric guessing games, 
            and alteration delays with complete transparency.
          </p>
        </div>

        {/* 6 Clickable Pastel Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES_DATA.map((feature, idx) => {
            const Icon = iconMap[feature.icon] || SparkleDoodle;

            return (
              <motion.div
                key={feature.id}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                onClick={() => openDrawer('feature-detail', feature)}
                className="cursor-pointer group rounded-3xl bg-white/80 backdrop-blur-md p-7 border border-blush/60 shadow-soft hover:shadow-soft-lg hover:border-rose-deep transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-cream-200 border border-plum/10 flex items-center justify-center mb-5 group-hover:scale-105 group-hover:bg-blush transition-all">
                    <Icon className="w-6 h-6 text-plum group-hover:text-rose-deep transition-colors" />
                  </div>

                  <h3 className="font-fraunces text-xl text-plum group-hover:text-rose-deep transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-xs font-medium text-rose-deep mt-1">
                    {feature.tagline}
                  </p>

                  <p className="text-xs text-plum-soft mt-3 leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-plum/10 flex items-center justify-between text-xs font-semibold text-plum group-hover:text-rose-deep">
                  <span>Explore service details</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
