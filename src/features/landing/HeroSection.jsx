import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../../components/Button';
import { Chip } from '../../components/Chip';
import { NeedleIcon, ScissorsIcon, SparkleDoodle, PinIcon } from '../../components/Doodles';
import { ArrowRight, Sparkles, Wand2, Users, Star } from 'lucide-react';

const OUTFIT_SILHOUETTES = [
  {
    id: 'lehenga',
    name: 'Royal Kalidar Lehenga',
    silhouette: '32-Kali Flare Skirt',
    colorName: 'Dusty Rose & Antique Dabka',
    bgGradient: 'from-blush/60 via-peach/40 to-cream',
    swatches: ['#F9D5DC', '#D9718A', '#FFE2CF', '#B27082'],
    chips: ['100% Pure Mulberry Silk', 'Hand Zardozi', 'Sweetheart Neck', 'Double Can-can'],
    prompt: 'maroon lehenga for sangeet with antique gold dabka',
    svgType: 'lehenga',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&auto=format&fit=crop&q=80',
    craftsmanCity: 'Jaipur Master Karigar'
  },
  {
    id: 'blouse',
    name: 'Aari Work Royal Blouse',
    silhouette: 'Deep Back Sweetheart',
    colorName: 'Emerald Green & Gold Thread',
    bgGradient: 'from-mint/60 via-lavender/40 to-cream',
    swatches: ['#D5EFE3', '#8CD1B0', '#FFF1B8', '#2E8B57'],
    chips: ['Raw Silk Base', 'Peacock Aari Work', 'Elbow Sleeves', 'Handcrafted Latkans'],
    prompt: 'deep-back sweetheart blouse with intricate peacock aari work',
    svgType: 'blouse',
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=600&auto=format&fit=crop&q=80',
    craftsmanCity: 'Bengaluru Temple Craftsman'
  },
  {
    id: 'sherwani',
    name: 'Nawabi Shadow Sherwani',
    silhouette: 'Structured Bandhgala',
    colorName: 'Pearl Ivory & Silver Resham',
    bgGradient: 'from-sky/50 via-cream/80 to-peach/30',
    swatches: ['#D8E8F8', '#FFF9F5', '#FFE2CF', '#6A8CAF'],
    chips: ['Tussar Georgette', 'Lucknowi Chikankari', 'Mandarin Collar', 'Pearl Buttons'],
    prompt: 'ivory chikankari sherwani with pearl button collar',
    svgType: 'sherwani',
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&auto=format&fit=crop&q=80',
    craftsmanCity: 'Lucknow Heritage Karigar'
  },
  {
    id: 'kurta',
    name: 'Organza Fluted Anarkali Kurta',
    silhouette: 'Floor-length Anarkali',
    colorName: 'Pistachio Mint & Gota Patti',
    bgGradient: 'from-mint/50 via-butter/40 to-cream',
    swatches: ['#D5EFE3', '#FFF1B8', '#FFE2CF', '#7BB89A'],
    chips: ['Korean Glass Organza', 'Gotta Patti Borders', 'Concealed Pockets', 'Featherlight Mulmul'],
    prompt: 'pastel organza anarkali kurta for daytime mehendi',
    svgType: 'kurta',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&auto=format&fit=crop&q=80',
    craftsmanCity: 'Varanasi Weaving Guild'
  }
];

export const HeroSection = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [typedPrompt, setTypedPrompt] = useState('');
  const [charIndex, setCharIndex] = useState(0);

  const currentOutfit = OUTFIT_SILHOUETTES[currentIndex];

  // Morph outfit every 3.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % OUTFIT_SILHOUETTES.length);
    }, 3800);
    return () => clearInterval(timer);
  }, []);

  // Typewriter effect for prompt bubble
  useEffect(() => {
    setTypedPrompt('');
    setCharIndex(0);
    const targetText = currentOutfit.prompt;
    let index = 0;

    const typeTimer = setInterval(() => {
      if (index < targetText.length) {
        setTypedPrompt(targetText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(typeTimer);
      }
    }, 45);

    return () => clearInterval(typeTimer);
  }, [currentIndex]);

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:py-20 atelier-grain">
      {/* Soft Floating Pastel Blobs */}
      <div className="absolute top-10 left-1/4 w-72 h-72 rounded-full bg-blush/35 blur-3xl -z-10 animate-float-slow pointer-events-none" />
      <div className="absolute top-40 right-10 w-96 h-96 rounded-full bg-lavender/40 blur-3xl -z-10 animate-float-reverse pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 rounded-full bg-mint/30 blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline, Tagline, CTAs */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            {/* Atelier Pill Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-blush shadow-xs"
            >
              <NeedleIcon className="w-4 h-4" color="#D9718A" />
              <span className="text-xs font-semibold tracking-wide text-plum uppercase">
                India’s Premier Bespoke AI Atelier
              </span>
              <SparkleDoodle className="w-3.5 h-3.5" color="#D9718A" />
            </motion.div>

            {/* Main Fraunces Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-fraunces text-4xl sm:text-5xl lg:text-6xl text-plum font-normal tracking-tight leading-[1.12]"
            >
              Designed by you, <br className="hidden sm:inline" />
              stitched by <span className="chalk-underline italic font-medium">experts</span>.
            </motion.h1>

            {/* Subheading / Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg text-plum-soft leading-relaxed max-w-xl mx-auto lg:mx-0 font-normal"
            >
              Create custom Indian ethnic, bridal, and festive outfits with AI. 
              Get paired with matched independent master tailors, review live workshop basting updates, 
              and enjoy guaranteed doorstep fit — <span className="text-plum font-semibold">with zero shop visits</span>.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2"
            >
              <Button
                variant="primary"
                size="lg"
                onClick={() => navigate('/signup')}
                icon={ArrowRight}
                iconPosition="right"
                className="w-full sm:w-auto text-base font-semibold shadow-soft-blush"
              >
                Design your outfit
              </Button>

              <Button
                variant="secondary"
                size="lg"
                onClick={() => navigate('/tailors')}
                className="w-full sm:w-auto font-medium"
              >
                Meet our tailors
              </Button>
            </motion.div>

            {/* Social Trust Snippet */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="pt-4 flex items-center justify-center lg:justify-start gap-4 text-xs text-plum-soft"
            >
              <div className="flex -space-x-2 overflow-hidden">
                <img className="inline-block h-8 w-8 rounded-full ring-2 ring-cream" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" alt="Customer" />
                <img className="inline-block h-8 w-8 rounded-full ring-2 ring-cream" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80" alt="Customer" />
                <img className="inline-block h-8 w-8 rounded-full ring-2 ring-cream" src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80" alt="Customer" />
              </div>
              <div className="flex items-center gap-1.5">
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <span className="font-semibold text-plum">4.94 / 5</span>
                <span>(3,800+ bride & festive reviews)</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Morphing Canvas */}
          <div className="lg:col-span-6 relative flex justify-center">
            {/* Outer Decorative Stitch Line Container */}
            <div className="relative w-full max-w-lg aspect-[4/5] sm:aspect-[4/4.6] rounded-4xl bg-white/70 backdrop-blur-xl p-4 sm:p-6 shadow-soft-lg border-2 border-dashed border-blush/60 overflow-hidden flex flex-col justify-between">
              
              {/* Dynamic Animated Typing Prompt Bubble */}
              <div className="relative z-20">
                <div className="p-3.5 rounded-2xl bg-white/95 backdrop-blur-md shadow-soft border border-plum/10 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blush to-peach flex items-center justify-center shrink-0">
                    <Wand2 className="w-4 h-4 text-rose-deep animate-pulse" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-rose-deep">
                      AI Atelier Prompt
                    </p>
                    <p className="text-xs font-mono text-plum truncate">
                      "{typedPrompt}"
                      <span className="inline-block w-1.5 h-3 bg-rose-deep ml-0.5 animate-pulse" />
                    </p>
                  </div>
                </div>
              </div>

              {/* Central Morphing Outfit Showcase */}
              <div className="relative flex-1 my-3 rounded-3xl overflow-hidden flex items-center justify-center bg-gradient-to-b from-cream-100 to-white/60">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentOutfit.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <img
                      src={currentOutfit.image}
                      alt={currentOutfit.name}
                      className="w-full h-full object-cover object-top"
                    />

                    {/* Gradient Overlay for Text Readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-plum/80 via-transparent to-black/10" />

                    {/* Overlay Details */}
                    <div className="absolute bottom-4 left-4 right-4 text-white z-10">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-bold uppercase tracking-widest bg-white/20 backdrop-blur-md px-2.5 py-0.5 rounded-full">
                          {currentOutfit.silhouette}
                        </span>
                        <span className="text-[10px] text-cream-200">
                          {currentOutfit.craftsmanCity}
                        </span>
                      </div>
                      <h3 className="font-fraunces text-xl sm:text-2xl font-normal leading-tight text-white drop-shadow-sm">
                        {currentOutfit.name}
                      </h3>
                      <p className="text-xs text-white/80 font-medium">
                        {currentOutfit.colorName}
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Floating Pin & Scissors motif */}
                <motion.div
                  animate={{ y: [-4, 4, -4], rotate: [0, 4, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute top-4 right-4 z-20 bg-white/90 backdrop-blur-md p-2 rounded-2xl shadow-soft border border-blush/80"
                >
                  <ScissorsIcon className="w-5 h-5 text-rose-deep -rotate-12" />
                </motion.div>
              </div>

              {/* Bottom Morphing Swatches & Chips */}
              <div className="relative z-20 space-y-2 pt-1">
                {/* Dynamic Colour Swatches */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] font-semibold text-plum-soft mr-1">
                      Swatches:
                    </span>
                    {currentOutfit.swatches.map((color, idx) => (
                      <motion.div
                        key={color + idx}
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: idx * 0.08 }}
                        className="w-5 h-5 rounded-full border-2 border-white shadow-xs cursor-pointer hover:scale-110 transition-transform"
                        style={{ backgroundColor: color }}
                        title={color}
                      />
                    ))}
                  </div>

                  <span className="text-[11px] font-mono text-plum-soft">
                    Morphing 0{currentIndex + 1} / 04
                  </span>
                </div>

                {/* Morphing Chips */}
                <div className="flex flex-wrap gap-1.5">
                  <AnimatePresence>
                    {currentOutfit.chips.map((chip, idx) => (
                      <motion.span
                        key={chip}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.3, delay: idx * 0.05 }}
                        className="text-[10px] font-medium px-2.5 py-1 rounded-full bg-white/80 border border-blush text-plum shadow-2xs"
                      >
                        {chip}
                      </motion.span>
                    ))}
                  </AnimatePresence>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
