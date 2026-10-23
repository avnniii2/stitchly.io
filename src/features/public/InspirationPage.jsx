import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { INSPIRATION_GALLERY } from '../../data/seed';
import { useUI } from '../../store/useUI';
import { Button } from '../../components/Button';
import { Chip } from '../../components/Chip';
import { SparkleDoodle } from '../../components/Doodles';
import { Sparkles, Wand2, Filter, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export const InspirationPage = () => {
  const navigate = useNavigate();
  const { openDrawer } = useUI();
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Bridal', 'Festive', 'Groom', 'Fusion'];

  const filteredLooks = selectedCategory === 'All'
    ? INSPIRATION_GALLERY
    : INSPIRATION_GALLERY.filter((l) => l.category.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <div className="py-12 bg-cream atelier-grain min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-lavender/50 border border-lavender text-xs font-semibold text-purple-950 uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-purple-700" />
            <span>Atelier Lookbook</span>
          </div>

          <h1 className="font-fraunces text-4xl sm:text-5xl text-plum font-normal tracking-tight">
            Curated <span className="chalk-underline">Inspiration Archive</span>
          </h1>
          <p className="text-sm sm:text-base text-plum-soft mt-3 leading-relaxed">
            Real outfits designed by clients in our AI studio and tailored by master artisans. 
            Tap any creation to inspect fabric, lining, and craftsmanship details.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center justify-center gap-2">
          {categories.map((cat) => (
            <Chip
              key={cat}
              variant={selectedCategory === cat ? 'blush' : 'neutral'}
              active={selectedCategory === cat}
              onClick={() => setSelectedCategory(cat)}
              size="md"
            >
              {cat}
            </Chip>
          ))}
        </div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLooks.map((item, idx) => (
            <motion.div
              key={item.id}
              whileHover={{ y: -6 }}
              className="rounded-3xl bg-white/90 backdrop-blur-md overflow-hidden border border-blush/60 shadow-soft hover:shadow-soft-lg flex flex-col justify-between"
            >
              <div className="aspect-[4/5] relative overflow-hidden bg-plum/5">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
                
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium text-plum shadow-xs">
                  {item.category} • {item.silhouette}
                </div>

                <div className="absolute bottom-3 left-3 right-3 bg-plum/70 backdrop-blur-md px-3.5 py-2 rounded-2xl text-xs text-white flex items-center justify-between">
                  <span className="font-medium truncate">{item.craftsman}</span>
                  <span className="text-[11px] text-blush shrink-0">{item.cityOrigin}</span>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-fraunces text-xl font-semibold text-plum">
                    {item.title}
                  </h3>
                  <p className="text-xs text-plum-soft mt-1 leading-relaxed">
                    {item.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {item.tags?.map((t) => (
                      <span key={t} className="text-[10px] bg-cream-200 border border-plum/10 px-2 py-0.5 rounded-full text-plum-soft">
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-plum/10">
                  <Button
                    variant="blush"
                    size="sm"
                    icon={Wand2}
                    onClick={() => {
                      navigate('/app/studio', {
                        state: {
                          prefill: {
                            prompt: `${item.title} - ${item.description}`,
                            type: item.silhouette?.toLowerCase()?.includes('anarkali')
                              ? 'anarkali'
                              : item.silhouette?.toLowerCase()?.includes('sherwani')
                              ? 'sherwani'
                              : item.silhouette?.toLowerCase()?.includes('kurta')
                              ? 'kurta'
                              : 'lehenga',
                            fabric: 'silk',
                            colour: item.category === 'Bridal' ? '#D9718A' : '#4A3F5C',
                            price: 19500,
                            image: item.image,
                          },
                        },
                      });
                    }}
                    className="w-full text-xs font-semibold justify-center"
                  >
                    Recreate This Look in Studio ✨
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
};
