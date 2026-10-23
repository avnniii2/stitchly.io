import React from 'react';

export const DressFormMannequin = ({ showStand = true, showBase = true }) => {
  return (
    <g className="mannequin-frame" pointerEvents="none">
      {/* 1. Wooden Top Finial (Turned Beechwood) */}
      <circle cx="150" cy="52" r="7" fill="#C89D7C" stroke="#A67B5B" strokeWidth="1.5" />
      <path d="M 145,59 C 145,59 144,66 142,70 L 158,70 C 156,66 155,59 155,59 Z" fill="#DDB892" stroke="#A67B5B" strokeWidth="1.5" />
      <ellipse cx="150" cy="71" rx="9" ry="2.5" fill="#B08968" />

      {/* 2. Neck Cap & Neck Column */}
      <path d="M 142,72 L 141,92 L 159,92 L 158,72 Z" fill="#E6CCB2" stroke="#B08968" strokeWidth="1.2" />

      {/* 3. Dress Form Muslin Torso Body (Subtle Tailor Dummy) */}
      <path
        d="M 141,92 C 122,96 110,108 106,122 C 102,138 108,154 114,166 C 120,178 126,188 128,206 C 130,224 126,242 118,258 C 114,266 112,272 114,278 L 186,278 C 188,272 186,266 182,258 C 174,242 170,224 172,206 C 174,188 180,178 186,166 C 192,154 198,138 194,122 C 190,108 178,96 159,92 Z"
        fill="#F5EBE0"
        stroke="#DDB892"
        strokeWidth="1.8"
        strokeDasharray="4 2"
        opacity="0.85"
      />

      {/* Mannequin Center Front Balance Line */}
      <line x1="150" y1="92" x2="150" y2="278" stroke="#DDB892" strokeWidth="1.2" strokeDasharray="3 3" opacity="0.65" />
      {/* Bustline Tape */}
      <path d="M 112,142 Q 150,150 188,142" fill="none" stroke="#DDB892" strokeWidth="1" strokeDasharray="2 3" opacity="0.5" />
      {/* Waistline Tape */}
      <path d="M 127,204 Q 150,210 173,204" fill="none" stroke="#DDB892" strokeWidth="1" strokeDasharray="2 3" opacity="0.5" />

      {/* 4. Heavy Brass Central Pole */}
      {showStand && (
        <>
          <rect x="147.5" y="278" width="5" height="195" fill="url(#grad-gold-zari)" stroke="#8C6D23" strokeWidth="0.8" />
          {/* Turn adjuster clamp ring */}
          <rect x="144" y="325" width="12" height="6" rx="2" fill="#D4AF37" stroke="#664D00" strokeWidth="1" />
        </>
      )}

      {/* 5. Cast Iron / Turned Wood Base & Tripod Feet */}
      {showBase && (
        <g id="mannequin-base">
          {/* Circular brass collar */}
          <ellipse cx="150" cy="470" rx="14" ry="4" fill="#B38025" />
          {/* Tripod Legs */}
          <path d="M 150,470 Q 140,490 115,502" fill="none" stroke="#A67B5B" strokeWidth="4.5" strokeLinecap="round" />
          <path d="M 150,470 Q 160,490 185,502" fill="none" stroke="#A67B5B" strokeWidth="4.5" strokeLinecap="round" />
          <path d="M 150,470 L 150,504" fill="none" stroke="#A67B5B" strokeWidth="4.5" strokeLinecap="round" />

          {/* Cast feet casters */}
          <circle cx="115" cy="503" r="2.5" fill="#D4AF37" />
          <circle cx="185" cy="503" r="2.5" fill="#D4AF37" />
          <circle cx="150" cy="505" r="2.5" fill="#D4AF37" />

          {/* Floor Soft Shadow */}
          <ellipse cx="150" cy="506" rx="55" ry="7" fill="#4A3F5C" opacity="0.12" filter="blur(3px)" />
        </g>
      )}
    </g>
  );
};
