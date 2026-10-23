import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ScissorsIcon, NeedleIcon, PinIcon } from '../../components/Doodles';
import { Sparkles, Sliders } from 'lucide-react';

export const OutfitChangerStrip = () => {
  const [sliderPosition, setSliderPosition] = useState(50); // 0 to 100
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const handleMove = (clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  return (
    <section className="py-20 bg-cream-100/70 atelier-grain relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-butter/60 border border-butter text-xs font-semibold text-amber-950 uppercase tracking-wider mb-3">
            <Sliders className="w-3.5 h-3.5 text-amber-800" />
            <span>Interactive Fabric & Palette Transformer</span>
          </div>

          <h2 className="font-fraunces text-3xl sm:text-4xl md:text-5xl text-plum font-normal tracking-tight">
            Same silhouette, <span className="chalk-underline">infinite fabrics</span>
          </h2>
          <p className="text-sm sm:text-base text-plum-soft mt-3 leading-relaxed">
            Drag the golden needle slider to see how the exact same kalidar silhouette transforms 
            from lightweight daytime organza silk into heavy midnight royal velvet.
          </p>
        </div>

        {/* Draggable Comparison Canvas */}
        <div className="max-w-4xl mx-auto">
          <div
            ref={containerRef}
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
            onMouseLeave={() => setIsDragging(false)}
            onMouseMove={handleMouseMove}
            onTouchStart={() => setIsDragging(true)}
            onTouchEnd={() => setIsDragging(false)}
            onTouchMove={handleTouchMove}
            className="relative h-[440px] sm:h-[500px] w-full rounded-4xl overflow-hidden shadow-soft-lg border-2 border-blush cursor-ew-resize select-none bg-cream-200"
          >
            {/* Background Image: Night Royal Velvet */}
            <div className="absolute inset-0">
              <img
                src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=1200&auto=format&fit=crop&q=80"
                alt="Midnight Plum Velvet"
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-plum/80 via-transparent to-transparent" />
              
              {/* Right Tag */}
              <div className="absolute bottom-6 right-6 text-right text-white">
                <span className="text-[10px] uppercase font-bold tracking-widest bg-plum/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                  Night Reception • Micro-Velvet
                </span>
                <h4 className="font-fraunces text-xl font-normal mt-2 drop-shadow">
                  Midnight Plum & Zardozi
                </h4>
                <p className="text-xs text-white/80">36-Kali Full Circular Drape</p>
              </div>
            </div>

            {/* Foreground Clipped Image: Daytime Rose Silk */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${sliderPosition}%` }}
            >
              <div className="absolute inset-0 w-[896px] h-full max-w-none">
                <img
                  src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1200&auto=format&fit=crop&q=80"
                  alt="Dusty Rose Silk"
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-plum/80 via-transparent to-transparent" />
                
                {/* Left Tag */}
                <div className="absolute bottom-6 left-6 text-left text-white">
                  <span className="text-[10px] uppercase font-bold tracking-widest bg-rose-deep/70 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                    Daytime Sangeet • Mulberry Silk
                  </span>
                  <h4 className="font-fraunces text-xl font-normal mt-2 drop-shadow">
                    Dusty Rose & Light Gota
                  </h4>
                  <p className="text-xs text-white/80">Featherlight Pure Weave</p>
                </div>
              </div>
            </div>

            {/* Vertical Divider Line with Needle Handle */}
            <div
              className="absolute top-0 bottom-0 w-0.5 bg-white shadow-2xl pointer-events-none"
              style={{ left: `${sliderPosition}%` }}
            >
              {/* Draggable Central Button Handle */}
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-white shadow-soft-lg border-2 border-rose-deep flex items-center justify-center pointer-events-auto cursor-grab active:cursor-grabbing">
                <div className="relative">
                  <ScissorsIcon className="w-5 h-5 text-rose-deep -rotate-45" />
                </div>
              </div>
            </div>

            {/* Instruction tooltip badge */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-semibold text-plum border border-blush shadow-xs pointer-events-none">
              ← Drag left or right to compare →
            </div>
          </div>

          {/* Quick Preset Buttons */}
          <div className="flex items-center justify-center gap-3 mt-4">
            <button
              type="button"
              onClick={() => setSliderPosition(20)}
              className="text-xs font-semibold px-3 py-1 rounded-full bg-white border border-plum/10 text-plum hover:bg-blush/40"
            >
              Show Night Velvet (80%)
            </button>
            <button
              type="button"
              onClick={() => setSliderPosition(50)}
              className="text-xs font-semibold px-3 py-1 rounded-full bg-white border border-plum/10 text-plum hover:bg-blush/40"
            >
              50 / 50 Split
            </button>
            <button
              type="button"
              onClick={() => setSliderPosition(80)}
              className="text-xs font-semibold px-3 py-1 rounded-full bg-white border border-plum/10 text-plum hover:bg-blush/40"
            >
              Show Rose Silk (80%)
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
