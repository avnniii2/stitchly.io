import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AI_STUDIO_TEASERS } from '../../data/seed';
import { Button } from '../../components/Button';
import { Chip } from '../../components/Chip';
import { NeedleLoader } from '../../components/NeedleLoader';
import { NeedleIcon, SparkleDoodle } from '../../components/Doodles';
import { Wand2, ArrowRight, Sparkles, CheckCircle2, SlidersHorizontal } from 'lucide-react';

export const StudioTeaserSection = () => {
  const navigate = useNavigate();
  const [selectedTeaserId, setSelectedTeaserId] = useState(AI_STUDIO_TEASERS[0].id);
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTeaser, setActiveTeaser] = useState(AI_STUDIO_TEASERS[0]);

  const handleChipClick = (teaser) => {
    if (teaser.id === activeTeaser.id && !isGenerating) return;

    setSelectedTeaserId(teaser.id);
    setIsGenerating(true);

    // Simulate AI generation latency
    setTimeout(() => {
      setActiveTeaser(teaser);
      setIsGenerating(false);
    }, 750);
  };

  return (
    <section id="studio-teaser" className="py-20 bg-cream-100/60 atelier-grain relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-lavender/50 border border-lavender text-xs font-semibold text-purple-950 uppercase tracking-wider mb-3">
            <Wand2 className="w-3.5 h-3.5 text-purple-700" />
            <span>Interactive Mini AI Studio Demo</span>
          </div>

          <h2 className="font-fraunces text-3xl sm:text-4xl md:text-5xl text-plum font-normal tracking-tight">
            See your prompt turn into <span className="chalk-underline">4 atelier renders</span>
          </h2>
          <p className="text-sm sm:text-base text-plum-soft mt-3 leading-relaxed">
            Pick an ethnic silhouette prompt chip below to trigger our simulated generation pipeline. 
            Review 4 photorealistic perspectives before cutting an inch of cloth.
          </p>
        </div>

        {/* Prompt Selection Chips Bar */}
        <div className="max-w-4xl mx-auto mb-10 flex flex-wrap items-center justify-center gap-2.5">
          {AI_STUDIO_TEASERS.map((teaser) => (
            <Chip
              key={teaser.id}
              variant={teaser.id === selectedTeaserId ? 'blush' : 'neutral'}
              active={teaser.id === selectedTeaserId}
              onClick={() => handleChipClick(teaser)}
              size="md"
              icon={Wand2}
              className="py-2 text-xs md:text-sm font-medium"
            >
              {teaser.prompt.length > 38 ? `${teaser.prompt.slice(0, 36)}...` : teaser.prompt}
            </Chip>
          ))}
        </div>

        {/* Studio Canvas Box */}
        <div className="max-w-5xl mx-auto rounded-3xl bg-white/90 backdrop-blur-xl p-6 sm:p-8 border border-blush shadow-soft-lg">
          
          {/* Active Generation Meta Strip */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-blush/40">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-rose-deep">
                Active Prompt Spec
              </span>
              <h3 className="font-fraunces text-lg sm:text-xl text-plum mt-0.5">
                "{activeTeaser.prompt}"
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-plum-soft">Fabric:</span>
              <span className="text-xs font-semibold text-plum bg-cream-200 px-2.5 py-1 rounded-full border border-plum/10">
                {activeTeaser.fabric}
              </span>
            </div>
          </div>

          {/* Render Area with Simulated Needle Loader or 4 Generated Cards */}
          <div className="min-h-[380px] flex items-center justify-center py-6">
            <AnimatePresence mode="wait">
              {isGenerating ? (
                <motion.div
                  key="loader"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <NeedleLoader text="Simulating fabric drape, zari reflection & bias cut..." />
                </motion.div>
              ) : (
                <motion.div
                  key={activeTeaser.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 w-full"
                >
                  {activeTeaser.images.map((item, idx) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.08 }}
                      whileHover={{ y: -4 }}
                      className="group rounded-2xl bg-cream-100 overflow-hidden border border-blush/50 shadow-xs flex flex-col"
                    >
                      <div className="aspect-[3/4] relative overflow-hidden bg-plum/5">
                        <img
                          src={item.url}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-2 left-2 bg-black/40 backdrop-blur-md px-2 py-0.5 rounded-full text-[10px] font-mono text-white">
                          View 0{idx + 1}
                        </div>
                      </div>

                      <div className="p-3.5 flex-1 flex flex-col justify-between">
                        <div>
                          <h4 className="font-semibold text-xs text-plum group-hover:text-rose-deep transition-colors">
                            {item.title}
                          </h4>
                          <p className="text-[11px] text-plum-soft mt-1 leading-snug">
                            {item.description}
                          </p>
                        </div>

                        <div className="mt-3 pt-2 border-t border-plum/10 flex items-center justify-between text-[10px] text-rose-deep font-semibold">
                          <span>AI Render Pass</span>
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* CTA Footer Bar */}
          <div className="mt-6 pt-6 border-t border-blush/40 flex flex-col sm:flex-row items-center justify-between gap-4 bg-blush/20 -mx-6 -mb-6 sm:-mx-8 sm:-mb-8 p-6 rounded-b-3xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-xs">
                <SparkleDoodle className="w-5 h-5 text-rose-deep" />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-semibold text-plum">
                  Want to customize this design with your exact body measurements?
                </p>
                <p className="text-xs text-plum-soft">
                  Swap colors, sleeve cuts, and match with verified master tailors.
                </p>
              </div>
            </div>

            <Button
              variant="primary"
              size="md"
              onClick={() => navigate('/signup')}
              icon={ArrowRight}
              iconPosition="right"
              className="shrink-0 font-semibold"
            >
              Sign up to customize
            </Button>
          </div>

        </div>

      </div>
    </section>
  );
};
