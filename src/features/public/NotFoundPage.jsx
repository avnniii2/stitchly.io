import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../../components/Button';
import { ScissorsIcon, NeedleIcon, PinIcon } from '../../components/Doodles';
import { Home, ArrowLeft, Search } from 'lucide-react';

export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-cream atelier-grain flex items-center justify-center p-6 text-center">
      <div className="max-w-lg w-full rounded-4xl bg-white/80 backdrop-blur-xl p-8 sm:p-12 border border-blush shadow-soft-lg relative overflow-hidden">
        
        {/* Soft pastel background circles */}
        <div className="absolute -top-12 -right-12 w-40 h-40 bg-blush/40 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-lavender/40 rounded-full blur-2xl pointer-events-none" />

        {/* Animated Snapped Thread SVG Motif */}
        <div className="relative w-28 h-28 mx-auto mb-6 flex items-center justify-center">
          <motion.div
            animate={{
              rotate: [-10, 10, -10],
              y: [-4, 4, -4]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="w-20 h-20 rounded-3xl bg-blush/50 flex items-center justify-center border border-blush shadow-xs"
          >
            <ScissorsIcon className="w-10 h-10 text-rose-deep -rotate-45" />
          </motion.div>

          {/* Sinuous Snapped Thread Path */}
          <svg className="absolute inset-0 w-full h-full overflow-visible pointer-events-none">
            <path
              d="M 10,70 Q 30,20 60,70 T 110,60"
              fill="none"
              stroke="#D9718A"
              strokeWidth="2"
              strokeDasharray="4 4"
              opacity="0.6"
            />
          </svg>
        </div>

        <span className="text-xs uppercase font-bold tracking-widest text-rose-deep px-3 py-1 rounded-full bg-blush/40 border border-blush">
          Error 404 • Lost Pattern
        </span>

        <h1 className="font-fraunces text-3xl sm:text-4xl text-plum font-normal mt-4 mb-2">
          The thread has snapped!
        </h1>

        <p className="text-sm text-plum-soft max-w-sm mx-auto leading-relaxed mb-8">
          The pattern piece you’re looking for seems to have slipped off the cutting table or got tucked away in the embroidery basket.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button
            variant="primary"
            size="md"
            icon={Home}
            onClick={() => navigate('/')}
            className="w-full sm:w-auto"
          >
            Return to Atelier Home
          </Button>

          <Button
            variant="secondary"
            size="md"
            icon={Search}
            onClick={() => navigate('/tailors')}
            className="w-full sm:w-auto"
          >
            Explore Master Tailors
          </Button>
        </div>

        <div className="mt-8 pt-6 border-t border-plum/10 text-xs text-plum-soft">
          Need help tracing an order? <Link to="/login" className="text-rose-deep font-semibold hover:underline">Sign in to your atelier</Link>
        </div>

      </div>
    </div>
  );
};
