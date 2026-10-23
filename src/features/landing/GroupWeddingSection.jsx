import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../../components/Button';
import { SparkleDoodle, PinIcon } from '../../components/Doodles';
import { Users, Sparkles, Check, ArrowRight, ShieldCheck, HeartHandshake } from 'lucide-react';

export const GroupWeddingSection = () => {
  const navigate = useNavigate();

  const weddingRoles = [
    {
      role: 'The Bride',
      outfit: '16-Kali Pure Silk Lehenga',
      fabric: 'Mulberry Silk & Zardozi',
      color: 'Dusty Rose & Antique Gold',
      price: '₹28,500',
      image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=300&auto=format&fit=crop&q=80'
    },
    {
      role: 'The Groom',
      outfit: 'Royal Nawabi Sherwani',
      fabric: 'Chikankari on Tussar',
      color: 'Pearl Ivory & Silver Resham',
      price: '₹22,000',
      image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=300&auto=format&fit=crop&q=80'
    },
    {
      role: 'Bridesmaids (x4)',
      outfit: 'Fluted Organza Cape Sets',
      fabric: 'Glass Organza & Mulmul',
      color: 'Pastel Sage & Silver',
      price: '₹8,500 ea',
      image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=300&auto=format&fit=crop&q=80'
    },
    {
      role: 'Groomsmen (x4)',
      outfit: 'Silk Kurta & Bundi Jacket',
      fabric: 'Handloom Katan Silk',
      color: 'Ivory & Sage Accents',
      price: '₹7,200 ea',
      image: 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=300&auto=format&fit=crop&q=80'
    }
  ];

  return (
    <section className="py-20 bg-cream relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner Card */}
        <div className="rounded-4xl bg-gradient-to-br from-peach/30 via-blush/20 to-lavender/30 border border-blush/80 p-8 sm:p-12 shadow-soft-lg relative overflow-hidden">
          
          {/* Top Badge */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 border border-blush shadow-xs">
              <Users className="w-4 h-4 text-rose-deep" />
              <span className="text-xs font-bold uppercase tracking-wider text-plum">
                Group Wedding Atelier Service
              </span>
            </div>

            {/* Discount Badge */}
            <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-rose-deep text-white shadow-soft-blush">
              <SparkleDoodle className="w-4 h-4" color="#FFFFFF" />
              <span className="text-xs font-bold uppercase tracking-wide">
                Save 18% on Group Stitches (5+ Outfits)
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-5 space-y-5 text-center lg:text-left">
              <h2 className="font-fraunces text-3xl sm:text-4xl text-plum font-normal tracking-tight leading-tight">
                Harmonious wedding parties without the <span className="chalk-underline">group chat chaos</span>
              </h2>
              <p className="text-sm text-plum-soft leading-relaxed">
                Set a unified palette. We send individual measurement links to each bridesmaid and groomsman, 
                dye fabrics in the exact same batch, and ship coordinated packages worldwide.
              </p>

              <div className="space-y-2.5 pt-1 text-xs text-plum font-medium">
                <div className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-mint flex items-center justify-center">
                    <Check className="w-3.5 h-3.5 text-emerald-800" />
                  </div>
                  <span>Single master dyelot guarantee — exact color harmony</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-mint flex items-center justify-center">
                    <Check className="w-3.5 h-3.5 text-emerald-800" />
                  </div>
                  <span>Doorstep fit kits dispatched to different cities</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-mint flex items-center justify-center">
                    <Check className="w-3.5 h-3.5 text-emerald-800" />
                  </div>
                  <span>Dedicated senior atelier concierge assigned to your party</span>
                </div>
              </div>

              <div className="pt-4">
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => navigate('/signup')}
                  icon={ArrowRight}
                  iconPosition="right"
                  className="font-semibold shadow-soft-blush"
                >
                  Create Wedding Party Board
                </Button>
              </div>
            </div>

            {/* Right: Wedding Party Member Cards Grid */}
            <div className="lg:col-span-7">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
                {weddingRoles.map((role, idx) => (
                  <motion.div
                    key={role.role}
                    whileHover={{ y: -4 }}
                    className="rounded-2xl bg-white/90 backdrop-blur-md p-3 border border-blush/60 shadow-xs flex flex-col justify-between overflow-hidden"
                  >
                    <div className="aspect-square rounded-xl overflow-hidden mb-2.5 bg-plum/5">
                      <img
                        src={role.image}
                        alt={role.role}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-rose-deep block">
                        {role.role}
                      </span>
                      <h4 className="font-fraunces text-xs font-semibold text-plum truncate mt-0.5">
                        {role.outfit}
                      </h4>
                      <p className="text-[10px] text-plum-soft truncate">
                        {role.color}
                      </p>
                    </div>
                    <div className="mt-2 pt-2 border-t border-plum/10 text-[11px] font-bold text-plum">
                      {role.price}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
