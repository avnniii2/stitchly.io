import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FabricSvgDefs, FABRIC_TYPES } from './fabrics';
import { HemBorder, NecklineEmbroidery } from './embroidery';
import { DressFormMannequin } from './mannequin';

export const Garment = ({
  type = 'lehenga', // 'lehenga' | 'anarkali' | 'kurta' | 'sherwani' | 'blouse'
  colour = '#D9718A',
  fabric = 'silk', // 'silk' | 'velvet' | 'georgette' | 'banarasi' | 'cotton'
  neckline = 'sweetheart', // 'sweetheart' | 'boat' | 'mandarin' | 'deep-v'
  sleeve = 'elbow', // 'sleeveless' | 'cap' | 'elbow' | 'full' | 'bell'
  embroidery = 'heavy-zari', // 'none' | 'minimal' | 'heavy-zari' | 'aari-work' | 'chikankari' | 'mirror-work'
  dupatta = true,
  className = '',
  width = 300,
  height = 520,
}) => {
  // Determine fill property based on fabric
  let fillPaint = colour;
  if (fabric === 'silk') fillPaint = 'url(#grad-silk-sheen)';
  else if (fabric === 'velvet') fillPaint = 'url(#grad-velvet-depth)';
  else if (fabric === 'georgette') fillPaint = 'url(#grad-georgette)';
  else if (fabric === 'banarasi') fillPaint = 'url(#pattern-banarasi-gold)';

  const filterProp = fabric === 'velvet' ? 'url(#filter-velvet-noise)' : undefined;

  // Sleeve Geometry Generator
  const renderSleeves = () => {
    if (sleeve === 'sleeveless') return null;

    if (sleeve === 'cap') {
      return (
        <g className="sleeves-cap" fill={fillPaint} filter={filterProp}>
          {/* Left cap */}
          <path d="M 106,122 Q 92,126 94,142 Q 108,144 114,136 Z" stroke="#4A3F5C" strokeWidth="0.8" opacity="0.95" />
          {/* Right cap */}
          <path d="M 194,122 Q 208,126 206,142 Q 192,144 186,136 Z" stroke="#4A3F5C" strokeWidth="0.8" opacity="0.95" />
        </g>
      );
    }

    if (sleeve === 'elbow') {
      return (
        <g className="sleeves-elbow" fill={fillPaint} filter={filterProp}>
          {/* Left elbow */}
          <path d="M 106,122 Q 88,142 84,182 L 102,185 Q 108,154 114,136 Z" stroke="#4A3F5C" strokeWidth="0.8" />
          {/* Right elbow */}
          <path d="M 194,122 Q 212,142 216,182 L 198,185 Q 192,154 186,136 Z" stroke="#4A3F5C" strokeWidth="0.8" />
          {/* Cuff embroidery */}
          {embroidery !== 'none' && (
            <>
              <line x1="84" y1="182" x2="102" y2="185" stroke="url(#grad-gold-zari)" strokeWidth="3" strokeDasharray="2 2" />
              <line x1="198" y1="185" x2="216" y2="182" stroke="url(#grad-gold-zari)" strokeWidth="3" strokeDasharray="2 2" />
            </>
          )}
        </g>
      );
    }

    if (sleeve === 'bell') {
      return (
        <g className="sleeves-bell" fill={fillPaint} filter={filterProp}>
          <path d="M 106,122 Q 88,142 82,185 Q 65,220 62,235 L 94,228 Q 106,170 114,136 Z" stroke="#4A3F5C" strokeWidth="0.8" />
          <path d="M 194,122 Q 212,142 218,185 Q 235,220 238,235 L 206,228 Q 194,170 186,136 Z" stroke="#4A3F5C" strokeWidth="0.8" />
        </g>
      );
    }

    // Full sleeve
    return (
      <g className="sleeves-full" fill={fillPaint} filter={filterProp}>
        <path d="M 106,122 Q 86,150 80,210 L 76,242 L 92,243 Q 102,190 114,136 Z" stroke="#4A3F5C" strokeWidth="0.8" />
        <path d="M 194,122 Q 214,150 220,210 L 224,242 L 208,243 Q 198,190 186,136 Z" stroke="#4A3F5C" strokeWidth="0.8" />
        {embroidery !== 'none' && (
          <>
            <line x1="76" y1="242" x2="92" y2="243" stroke="url(#grad-gold-zari)" strokeWidth="3.5" strokeDasharray="2 2" />
            <line x1="208" y1="243" x2="224" y2="242" stroke="url(#grad-gold-zari)" strokeWidth="3.5" strokeDasharray="2 2" />
          </>
        )}
      </g>
    );
  };

  // Neckline Cutout Generator for Choli/Top
  const getNecklineCutout = () => {
    switch (neckline) {
      case 'sweetheart':
        return 'M 124,102 Q 137,126 150,118 Q 163,126 176,102';
      case 'boat':
        return 'M 116,98 Q 150,112 184,98';
      case 'mandarin':
        return 'M 134,96 L 166,96 L 166,138 L 134,138 Z';
      case 'deep-v':
        return 'M 125,102 L 150,138 L 175,102';
      default:
        return 'M 124,102 Q 150,122 176,102';
    }
  };

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 300 520"
        width={width}
        height={height}
        className="w-full h-full max-w-full drop-shadow-md select-none"
      >
        {/* Dynamic Defs with active base color */}
        <FabricSvgDefs baseColor={colour} />

        {/* 1. Dress Form Mannequin Underlay */}
        <DressFormMannequin showStand={true} showBase={true} />

        {/* 2. Sleeves (Behind or attached) */}
        {renderSleeves()}

        {/* 3. Garment Body Rendering based on Type */}
        <g id="garment-main-silhouette" filter="url(#garment-shadow)">
          {/* ===================== LEHENGA ===================== */}
          {type === 'lehenga' && (
            <g className="garment-lehenga">
              {/* Blouse / Choli */}
              <path
                d={`M 141,94 L 106,122 C 102,138 108,154 114,166 L 126,192 L 174,192 L 186,166 C 192,154 198,138 194,122 L 159,94 Z`}
                fill={fillPaint}
                filter={filterProp}
                stroke="#4A3F5C"
                strokeWidth="0.8"
              />

              {/* Blouse Neckline Cutout Overlay */}
              <path
                d={`${getNecklineCutout()} L 159,94 L 141,94 Z`}
                fill="#F5EBE0"
                stroke="#B08968"
                strokeWidth="1.2"
              />

              {/* Neckline Embroidery */}
              <NecklineEmbroidery type={embroidery} neckline={neckline} />

              {/* Choli Waistband Embroidery */}
              {embroidery !== 'none' && (
                <line x1="126" y1="191" x2="174" y2="191" stroke="url(#grad-gold-zari)" strokeWidth="2.5" strokeDasharray="3 2" />
              )}

              {/* Flared Lehenga Skirt (32-Kali Flare) */}
              <g className="lehenga-skirt" transform="translate(0, 218)">
                {/* Waistband */}
                <rect x="124" y="0" width="52" height="10" rx="2" fill="url(#grad-gold-zari)" stroke="#8C6D23" strokeWidth="0.6" />

                {/* Skirt Body with Kalidar Drapes */}
                <path
                  d="M 124,10 C 112,60 76,140 38,220 C 80,240 220,240 262,220 C 224,140 188,60 176,10 Z"
                  fill={fillPaint}
                  filter={filterProp}
                  stroke="#4A3F5C"
                  strokeWidth="0.8"
                />

                {/* Kalidar Seam Creases */}
                <g stroke="#000000" strokeWidth="0.6" opacity="0.25">
                  <path d="M 132,10 Q 120,110 82,224" fill="none" />
                  <path d="M 141,10 Q 135,110 118,227" fill="none" />
                  <path d="M 150,10 L 150,228" fill="none" />
                  <path d="M 159,10 Q 165,110 182,227" fill="none" />
                  <path d="M 168,10 Q 180,110 218,224" fill="none" />
                </g>

                {/* Hem Border Embroidery */}
                <HemBorder y={204} width={224} height={20} type={embroidery} />
              </g>
            </g>
          )}

          {/* ===================== ANARKALI ===================== */}
          {type === 'anarkali' && (
            <g className="garment-anarkali">
              {/* Floor-Length Anarkali Kalis */}
              <path
                d="M 141,94 L 106,122 C 102,138 108,154 114,166 L 126,192 C 114,240 70,360 44,430 C 88,450 212,450 256,430 C 230,360 186,240 174,192 L 186,166 C 192,154 198,138 194,122 L 159,94 Z"
                fill={fillPaint}
                filter={filterProp}
                stroke="#4A3F5C"
                strokeWidth="0.8"
              />

              {/* Neckline Cutout */}
              <path
                d={`${getNecklineCutout()} L 159,94 L 141,94 Z`}
                fill="#F5EBE0"
                stroke="#B08968"
                strokeWidth="1.2"
              />

              {/* Kalidar Flute lines */}
              <g stroke="#000000" strokeWidth="0.6" opacity="0.2">
                <path d="M 132,192 Q 115,310 90,436" fill="none" />
                <path d="M 144,192 Q 140,310 130,439" fill="none" />
                <path d="M 156,192 Q 160,310 170,439" fill="none" />
                <path d="M 168,192 Q 185,310 210,436" fill="none" />
              </g>

              {/* Yoke belt */}
              {embroidery !== 'none' && (
                <line x1="126" y1="192" x2="174" y2="192" stroke="url(#grad-gold-zari)" strokeWidth="2.5" />
              )}

              {/* Neckline & Hem Embroidery */}
              <NecklineEmbroidery type={embroidery} neckline={neckline} />
              <HemBorder y={412} width={212} height={20} type={embroidery} />
            </g>
          )}

          {/* ===================== KURTA SET ===================== */}
          {type === 'kurta' && (
            <g className="garment-kurta">
              {/* Bottom Churidar / Pants */}
              <path d="M 132,360 L 130,465 L 144,465 L 148,360 Z" fill="#F7F4EB" stroke="#4A3F5C" strokeWidth="0.6" />
              <path d="M 152,360 L 156,465 L 170,465 L 168,360 Z" fill="#F7F4EB" stroke="#4A3F5C" strokeWidth="0.6" />

              {/* Straight Kurta with Side Slits */}
              <path
                d="M 141,94 L 106,122 C 102,138 108,154 114,166 L 122,210 L 118,370 L 182,370 L 178,210 L 186,166 C 192,154 198,138 194,122 L 159,94 Z"
                fill={fillPaint}
                filter={filterProp}
                stroke="#4A3F5C"
                strokeWidth="0.8"
              />

              {/* Side Slits Lines */}
              <line x1="122" y1="260" x2="118" y2="370" stroke="#000000" strokeWidth="1.2" opacity="0.3" />
              <line x1="178" y1="260" x2="182" y2="370" stroke="#000000" strokeWidth="1.2" opacity="0.3" />

              {/* Neckline Cutout */}
              <path
                d={`${getNecklineCutout()} L 159,94 L 141,94 Z`}
                fill="#F5EBE0"
                stroke="#B08968"
                strokeWidth="1.2"
              />

              <NecklineEmbroidery type={embroidery} neckline={neckline} />
              <HemBorder y={352} width={64} height={16} type={embroidery} />
            </g>
          )}

          {/* ===================== SHERWANI ===================== */}
          {type === 'sherwani' && (
            <g className="garment-sherwani">
              {/* Churidar Silk Bottoms */}
              <path d="M 134,380 L 132,470 L 146,470 L 148,380 Z" fill="#F7F4EB" stroke="#4A3F5C" strokeWidth="0.6" />
              <path d="M 152,380 L 154,470 L 168,470 L 166,380 Z" fill="#F7F4EB" stroke="#4A3F5C" strokeWidth="0.6" />

              {/* Structured Coat */}
              <path
                d="M 138,90 L 104,118 L 114,166 L 122,215 L 116,395 L 184,395 L 178,215 L 186,166 L 196,118 L 162,90 Z"
                fill={fillPaint}
                filter={filterProp}
                stroke="#4A3F5C"
                strokeWidth="1"
              />

              {/* Mandarin Collar */}
              <path d="M 138,90 L 162,90 L 160,78 L 140,78 Z" fill="url(#grad-gold-zari)" stroke="#8C6D23" strokeWidth="0.8" />

              {/* Center Placket Line & Metallic Buttons */}
              <line x1="150" y1="90" x2="150" y2="395" stroke="#4A3F5C" strokeWidth="1.5" />
              {[105, 125, 145, 165, 185, 205, 225].map((y) => (
                <circle key={y} cx="150" cy={y} r="2.2" fill="#D4AF37" stroke="#664D00" strokeWidth="0.6" />
              ))}

              {/* Chest Welt Pocket & Pocket Square */}
              <rect x="162" y="132" width="22" height="3" fill="#D4AF37" />
              <path d="M 166,132 L 173,122 L 180,132 Z" fill="#FFF9F5" />

              <HemBorder y={378} width={68} height={16} type={embroidery} />
            </g>
          )}

          {/* ===================== BLOUSE ===================== */}
          {type === 'blouse' && (
            <g className="garment-blouse">
              {/* Standalone Fitted Crop Blouse */}
              <path
                d="M 141,94 L 106,122 C 102,138 108,154 114,166 L 126,198 L 174,198 L 186,166 C 192,154 198,138 194,122 L 159,94 Z"
                fill={fillPaint}
                filter={filterProp}
                stroke="#4A3F5C"
                strokeWidth="1"
              />

              {/* Princess Dart Lines */}
              <path d="M 128,198 Q 134,160 138,138" fill="none" stroke="#000000" strokeWidth="0.8" opacity="0.3" />
              <path d="M 172,198 Q 166,160 162,138" fill="none" stroke="#000000" strokeWidth="0.8" opacity="0.3" />

              {/* Neckline Cutout */}
              <path
                d={`${getNecklineCutout()} L 159,94 L 141,94 Z`}
                fill="#F5EBE0"
                stroke="#B08968"
                strokeWidth="1.2"
              />

              <NecklineEmbroidery type={embroidery} neckline={neckline} />
              <HemBorder y={186} width={48} height={12} type={embroidery} />
            </g>
          )}
        </g>

        {/* 4. Sheer Flowing Dupatta (Organza / Net) */}
        {dupatta && type !== 'blouse' && (
          <g className="garment-dupatta" opacity="0.75" pointerEvents="none">
            {/* Draped across left shoulder down to hem */}
            <path
              d="M 96,120 C 80,180 84,320 68,440 C 90,442 108,432 104,320 C 102,230 114,160 118,124 Z"
              fill={colour}
              stroke="#D4AF37"
              strokeWidth="0.8"
              strokeDasharray="2 3"
            />
            {/* Scalloped edge */}
            <path
              d="M 68,440 Q 84,444 104,440"
              fill="none"
              stroke="#FDE68A"
              strokeWidth="2.5"
            />
          </g>
        )}
      </svg>
    </div>
  );
};
