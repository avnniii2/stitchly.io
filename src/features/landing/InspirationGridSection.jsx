import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { INSPIRATION_GALLERY } from '../../data/seed';
import { useUI } from '../../store/useUI';
import { Button } from '../../components/Button';
import { SparkleDoodle, PinIcon } from '../../components/Doodles';
import { Sparkles, Wand2, ArrowRight } from 'lucide-react';

export const InspirationGridSection = () => {
  const navigate = useNavigate();
  const { openDrawer } = useUI();
  const previewLooks = INSPIRATION_GALLERY.slice(0, 4);

  return (
    <section className="py-20 bg-cream-100/60 atelier-grain relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-lavender/50 border border-lavender text-xs font-semibold text-purple-950 uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5 text-purple-700" />
              <span>Real Atelier Archive</span>
            </div>
            <h2 className="font-fraunces text-3xl sm:text-4xl md:text-5xl text-plum font-normal tracking-tight">
              Inspiration stitched for <span className="chalk-underline">real weddings</span>
            </h2>
            <p className="text-sm sm:text-base text-plum-soft mt-3 max-w-xl">
              Real outfits customized with AI and hand-stitched by independent artisans across Jaipur, Lucknow, and Bengaluru.
            </p>
          </div>

          <div className="mt-6 md:mt-0">
            <Button
              variant="secondary"
              size="md"
              onClick={() => navigate('/inspiration')}
              icon={ArrowRight}
              iconPosition="right"
            >
              Browse entire gallery (60+ looks)
            </Button>
          </div>
        </div>

        {/* Masonry / Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {previewLooks.map((item, idx) => (
            <motion.div
              key={item.id}
              whileHover={{ y: -6 }}
              className="group rounded-3xl bg-white/90 backdrop-blur-md overflow-hidden border border-blush/60 shadow-soft hover:shadow-soft-lg flex flex-col justify-between"
            >
              {/* Image Frame */}
              <div className="aspect-[3/4] relative overflow-hidden bg-plum/5">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Silhouette Tag */}
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-semibold text-plum shadow-xs">
                  {item.silhouette}
                </div>

                {/* Craftsman Badge */}
                <div className="absolute bottom-3 left-3 right-3 bg-plum/70 backdrop-blur-md px-3 py-1.5 rounded-2xl text-[11px] text-white flex items-center justify-between">
                  <span className="truncate">{item.craftsman}</span>
                  <span className="text-[10px] text-blush shrink-0">{item.cityOrigin}</span>
                </div>
              </div>

              {/* Text Info & Recreate Action */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-fraunces text-base font-semibold text-plum group-hover:text-rose-deep transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-[11px] text-plum-soft mt-1 line-clamp-2">
                    {item.description}
                  </p>
                </div>

                {/* Action button */}
                <div className="pt-3 mt-3 border-t border-plum/10">
                  <Button
                    variant="blush"
                    size="sm"
                    icon={Wand2}
                    onClick={() => openDrawer('inspiration-detail', item)}
                    className="w-full text-xs font-semibold justify-center"
                  >
                    Recreate this look
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
