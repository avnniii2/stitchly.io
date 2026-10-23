import React from 'react';

export const EMBROIDERY_TYPES = {
  none: {
    id: 'none',
    name: 'Clean Minimal Cut',
    description: 'Precision basted edges with zero embellishments for sleek contemporary drapery.',
    priceOffset: 0
  },
  minimal: {
    id: 'minimal',
    name: 'Gotta Patti & Micro-Pearl',
    description: 'Delicate metallic gotta edging with hand-sewn micro freshwater pearl drops.',
    priceOffset: 2400
  },
  'heavy-zari': {
    id: 'heavy-zari',
    name: 'Royal Heritage Zardozi',
    description: 'Antique dull-gold dabka, katori sequins, salma, and French knot floral vines.',
    priceOffset: 7800
  },
  'aari-work': {
    id: 'aari-work',
    name: 'Temple Aari Threadwork',
    description: 'Raised chain-stitch peacock motifs with copper gold metallic outlines.',
    priceOffset: 5200
  },
  chikankari: {
    id: 'chikankari',
    name: 'Lucknowi Shadow Work',
    description: '32-stitch delicate white-on-tone bakhiya and phanda floral embroidery.',
    priceOffset: 4500
  },
  'mirror-work': {
    id: 'mirror-work',
    name: 'Kutch Artisanal Glass Mirror',
    description: 'Original hand-bound glass mirrors framed in resham silk geometric lattices.',
    priceOffset: 3800
  }
};

/**
 * Hem Border Embroidery Path Generator
 */
export const HemBorder = ({ y = 430, width = 280, height = 24, type = 'heavy-zari', color = '#FDE68A' }) => {
  if (type === 'none') return null;

  return (
    <g className="embroidery-hem" transform={`translate(0, ${y})`}>
      {/* Base border ribbon */}
      <rect x={150 - width / 2} y={0} width={width} height={height} rx="4" fill="url(#grad-gold-zari)" opacity="0.9" />

      {/* Decorative inner pattern */}
      {type === 'heavy-zari' && (
        <>
          <line
            x1={150 - width / 2 + 6}
            y1={5}
            x2={150 + width / 2 - 6}
            y2={5}
            stroke="#4A3F5C"
            strokeWidth="1.2"
            strokeDasharray="2 3"
            opacity="0.6"
          />
          <line
            x1={150 - width / 2 + 6}
            y1={19}
            x2={150 + width / 2 - 6}
            y2={19}
            stroke="#4A3F5C"
            strokeWidth="1.2"
            strokeDasharray="2 3"
            opacity="0.6"
          />
          {/* Scalloped edge pearls below */}
          <path
            d={`M ${150 - width / 2},${height} Q ${150 - width / 2 + 10},${height + 6} ${150 - width / 2 + 20},${height} T ${150 - width / 2 + 40},${height} T ${150 - width / 2 + 60},${height} T ${150 - width / 2 + 80},${height} T ${150 - width / 2 + 100},${height} T ${150 - width / 2 + 120},${height} T ${150 - width / 2 + 140},${height} T ${150 - width / 2 + 160},${height} T ${150 - width / 2 + 180},${height} T ${150 - width / 2 + 200},${height} T ${150 - width / 2 + 220},${height} T ${150 - width / 2 + 240},${height} T ${150 - width / 2 + 260},${height} T ${150 + width / 2},${height}`}
            fill="none"
            stroke="#FFF9F5"
            strokeWidth="2.5"
            strokeDasharray="1 3"
          />
        </>
      )}

      {type === 'aari-work' && (
        <path
          d={`M ${150 - width / 2 + 10},12 C ${150 - width / 2 + 30},4 ${150 - width / 2 + 50},20 ${150 - width / 2 + 70},12 S ${150 - width / 2 + 110},4 ${150 - width / 2 + 130},12 S ${150 - width / 2 + 170},4 ${150 - width / 2 + 190},12 S ${150 - width / 2 + 230},4 ${150 - width / 2 + 250},12`}
          fill="none"
          stroke="#4A3F5C"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="3 2"
        />
      )}

      {type === 'mirror-work' && (
        <g opacity="0.95">
          {[-100, -60, -20, 20, 60, 100].map((offset, i) => (
            <circle key={i} cx={150 + offset} cy={12} r="5" fill="#FFFFFF" stroke="#D9718A" strokeWidth="1.8" />
          ))}
        </g>
      )}

      {type === 'chikankari' && (
        <path
          d={`M ${150 - width / 2 + 10},12 L ${150 + width / 2 - 10},12`}
          stroke="#FFF9F5"
          strokeWidth="4"
          strokeDasharray="4 6"
          strokeLinecap="round"
        />
      )}

      {type === 'minimal' && (
        <line
          x1={150 - width / 2 + 4}
          y1={12}
          x2={150 + width / 2 - 4}
          y2={12}
          stroke="#FFF9F5"
          strokeWidth="2"
          strokeDasharray="3 3"
        />
      )}
    </g>
  );
};

/**
 * Neckline Embroidery Path Generator
 */
export const NecklineEmbroidery = ({ type = 'heavy-zari', neckline = 'sweetheart' }) => {
  if (type === 'none') return null;

  return (
    <g className="embroidery-neckline">
      {neckline === 'sweetheart' && (
        <path
          d="M 124,102 Q 137,126 150,118 Q 163,126 176,102"
          fill="none"
          stroke="url(#grad-gold-zari)"
          strokeWidth="3.5"
          strokeDasharray="2 3"
          strokeLinecap="round"
        />
      )}

      {neckline === 'boat' && (
        <path
          d="M 116,98 Q 150,112 184,98"
          fill="none"
          stroke="url(#grad-gold-zari)"
          strokeWidth="3.5"
          strokeDasharray="2 3"
          strokeLinecap="round"
        />
      )}

      {neckline === 'mandarin' && (
        <path
          d="M 132,96 L 150,100 L 168,96 L 168,138 L 150,140 L 132,138 Z"
          fill="none"
          stroke="url(#grad-gold-zari)"
          strokeWidth="2"
          strokeDasharray="2 2"
        />
      )}

      {neckline === 'deep-v' && (
        <path
          d="M 125,102 L 150,138 L 175,102"
          fill="none"
          stroke="url(#grad-gold-zari)"
          strokeWidth="3.5"
          strokeDasharray="2 3"
        />
      )}
    </g>
  );
};
