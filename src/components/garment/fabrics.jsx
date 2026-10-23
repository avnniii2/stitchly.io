import React from 'react';

/**
 * Stitchly Fabric Engine
 * Defines fabric color palettes, SVG gradients, patterns, and sheen filters.
 */

export const FABRIC_TYPES = {
  silk: {
    id: 'silk',
    name: 'Mulberry Silk',
    sheen: 'high',
    weight: 'medium',
    priceMultiplier: 1.35,
    description: 'Natural pearl luster with rich drape and structural elegance.',
    filterId: 'filter-silk-sheen',
    gradientId: 'grad-silk-sheen'
  },
  velvet: {
    id: 'velvet',
    name: 'Micro-Velvet 9000',
    sheen: 'deep-matte',
    weight: 'heavy',
    priceMultiplier: 1.5,
    description: 'Plush, dense royal texture with dramatic shadow depth.',
    filterId: 'filter-velvet-noise',
    gradientId: 'grad-velvet-depth'
  },
  georgette: {
    id: 'georgette',
    name: 'Pure Georgette & Mulmul',
    sheen: 'matte-sheer',
    weight: 'featherlight',
    priceMultiplier: 1.15,
    description: 'Airy, floaty bounce with breathable cotton voile lining.',
    filterId: 'filter-georgette-grain',
    gradientId: 'grad-georgette'
  },
  banarasi: {
    id: 'banarasi',
    name: 'Katan Banarasi Brocade',
    sheen: 'metallic-gold',
    weight: 'heavy',
    priceMultiplier: 1.6,
    description: 'Handloom warp with woven pure gold and silver kadwa motifs.',
    filterId: 'filter-banarasi-brocade',
    patternId: 'pattern-banarasi-gold'
  },
  cotton: {
    id: 'cotton',
    name: 'Chanderi Handloom Cotton',
    sheen: 'subtle',
    weight: 'light',
    priceMultiplier: 1.0,
    description: 'Crisp, breathable organic handloom weave for daytime festivities.',
    filterId: 'filter-chanderi-weave',
    gradientId: 'grad-cotton-soft'
  }
};

export const COLOR_PALETTES = [
  { id: 'rose-gold', name: 'Dusty Rose Gold', hex: '#D9718A', secondary: '#F9D5DC', accent: '#D4AF37' },
  { id: 'emerald', name: 'Forest Emerald', hex: '#1C5B42', secondary: '#48856C', accent: '#F0D479' },
  { id: 'ivory', name: 'Pearl Ivory', hex: '#F7F4EB', secondary: '#FFFDF9', accent: '#C8B084' },
  { id: 'maroon', name: 'Royal Crimson Wine', hex: '#631828', secondary: '#89273B', accent: '#E8BE65' },
  { id: 'pistachio', name: 'Pistachio Mint', hex: '#A8D2BC', secondary: '#D5EFE3', accent: '#B8A155' },
  { id: 'lavender', name: 'Lilac Amethyst', hex: '#A490D4', secondary: '#E4DAF6', accent: '#E0C588' },
  { id: 'midnight', name: 'Midnight Royal Navy', hex: '#1F2A48', secondary: '#374977', accent: '#F4D284' },
  { id: 'saffron', name: 'Saffron Benarasi Gold', hex: '#DF8B34', secondary: '#F7BC78', accent: '#FFF1B8' },
];

/**
 * Returns SVG <defs> containing fabric gradients, noise filters, and brocade patterns.
 */
export const FabricSvgDefs = ({ baseColor = '#D9718A' }) => {
  return (
    <defs>
      {/* 1. Silk Sheen Gradient */}
      <linearGradient id="grad-silk-sheen" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor={baseColor} stopOpacity="0.9" />
        <stop offset="35%" stopColor="#FFFFFF" stopOpacity="0.35" />
        <stop offset="55%" stopColor={baseColor} stopOpacity="1" />
        <stop offset="85%" stopColor="#000000" stopOpacity="0.18" />
        <stop offset="100%" stopColor={baseColor} stopOpacity="0.95" />
      </linearGradient>

      {/* 2. Velvet Depth Gradient */}
      <radialGradient id="grad-velvet-depth" cx="45%" cy="40%" r="65%">
        <stop offset="0%" stopColor={baseColor} stopOpacity="1" />
        <stop offset="60%" stopColor={baseColor} stopOpacity="0.88" />
        <stop offset="100%" stopColor="#1B0C11" stopOpacity="0.45" />
      </radialGradient>

      {/* 3. Velvet Micro-Noise Filter */}
      <filter id="filter-velvet-noise" x="-10%" y="-10%" width="120%" height="120%">
        <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="3" result="noise" />
        <feColorMatrix type="matrix" values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.12 0" />
        <feComposite in2="SourceGraphic" in="glint" operator="over" />
      </filter>

      {/* 4. Georgette Translucent Gradient */}
      <linearGradient id="grad-georgette" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor={baseColor} stopOpacity="0.82" />
        <stop offset="70%" stopColor={baseColor} stopOpacity="0.72" />
        <stop offset="100%" stopColor={baseColor} stopOpacity="0.9" />
      </linearGradient>

      {/* 5. Banarasi Woven Kadwa Brocade Pattern */}
      <pattern id="pattern-banarasi-gold" width="24" height="24" patternUnits="userSpaceOnUse">
        <rect width="24" height="24" fill={baseColor} />
        {/* Intricate floral booti */}
        <circle cx="12" cy="12" r="3" fill="#D4AF37" opacity="0.65" />
        <path d="M12,5 Q13,9 12,12 Q11,9 12,5 Z" fill="#F4D284" opacity="0.85" />
        <path d="M12,19 Q13,15 12,12 Q11,15 12,19 Z" fill="#F4D284" opacity="0.85" />
        <path d="M5,12 Q9,13 12,12 Q9,11 5,12 Z" fill="#F4D284" opacity="0.85" />
        <path d="M19,12 Q15,13 12,12 Q15,11 19,12 Z" fill="#F4D284" opacity="0.85" />
        <circle cx="12" cy="12" r="1" fill="#FFF9F5" />
      </pattern>

      {/* 6. Gold Metallic Shimmer Gradient */}
      <linearGradient id="grad-gold-zari" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#C99738" />
        <stop offset="50%" stopColor="#FDE68A" />
        <stop offset="100%" stopColor="#B38025" />
      </linearGradient>

      {/* 7. Soft Shadow Drop */}
      <filter id="garment-shadow" x="-15%" y="-10%" width="130%" height="130%">
        <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="#4A3F5C" floodOpacity="0.18" />
      </filter>
    </defs>
  );
};
