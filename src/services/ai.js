/**
 * Stitchly AI Design Generation Service
 * Parses regional styling prompts and procedural SVG parameters,
 * returning 4 coherent, diverse variations.
 */

const delay = (ms = 1800) => new Promise((resolve) => setTimeout(resolve, ms));

export const parsePromptToParams = (prompt = '') => {
  const p = prompt.toLowerCase();

  // 1. Detect Garment Type
  let type = 'lehenga';
  if (p.includes('anarkali')) type = 'anarkali';
  else if (p.includes('sherwani') || p.includes('bandhgala') || p.includes('men')) type = 'sherwani';
  else if (p.includes('kurta') || p.includes('kurti')) type = 'kurta';
  else if (p.includes('blouse') || p.includes('choli')) type = 'blouse';

  // 2. Detect Base Color
  let colour = '#D9718A'; // default dusty rose
  let colorName = 'Dusty Rose';
  if (p.includes('red') || p.includes('maroon') || p.includes('crimson') || p.includes('bridal red')) {
    colour = '#7A1C2E';
    colorName = 'Royal Crimson Wine';
  } else if (p.includes('emerald') || p.includes('green') || p.includes('forest')) {
    colour = '#1C5B42';
    colorName = 'Forest Emerald';
  } else if (p.includes('pistachio') || p.includes('pista') || p.includes('mint') || p.includes('sage')) {
    colour = '#A8D2BC';
    colorName = 'Pistachio Sage';
  } else if (p.includes('ivory') || p.includes('white') || p.includes('cream') || p.includes('pearl')) {
    colour = '#F7F4EB';
    colorName = 'Pearl Ivory';
  } else if (p.includes('lavender') || p.includes('lilac') || p.includes('purple')) {
    colour = '#A490D4';
    colorName = 'Lilac Amethyst';
  } else if (p.includes('navy') || p.includes('midnight') || p.includes('blue')) {
    colour = '#1F2A48';
    colorName = 'Midnight Navy';
  } else if (p.includes('gold') || p.includes('yellow') || p.includes('saffron') || p.includes('mustard')) {
    colour = '#DF8B34';
    colorName = 'Saffron Gold';
  }

  // 3. Detect Fabric
  let fabric = 'silk';
  if (p.includes('velvet')) fabric = 'velvet';
  else if (p.includes('organza') || p.includes('georgette') || p.includes('chiffon')) fabric = 'georgette';
  else if (p.includes('banarasi') || p.includes('brocade') || p.includes('katan')) fabric = 'banarasi';
  else if (p.includes('cotton') || p.includes('chanderi')) fabric = 'cotton';

  // 4. Detect Neckline
  let neckline = 'sweetheart';
  if (p.includes('mandarin') || p.includes('collar') || p.includes('stand')) neckline = 'mandarin';
  else if (p.includes('boat')) neckline = 'boat';
  else if (p.includes('deep') || p.includes('v-neck') || p.includes('plunge')) neckline = 'deep-v';

  // 5. Detect Sleeve
  let sleeve = 'elbow';
  if (p.includes('sleeveless') || p.includes('strapless')) sleeve = 'sleeveless';
  else if (p.includes('full') || p.includes('long')) sleeve = 'full';
  else if (p.includes('cap')) sleeve = 'cap';
  else if (p.includes('bell') || p.includes('flute')) sleeve = 'bell';

  // 6. Detect Embroidery
  let embroidery = 'heavy-zari';
  if (p.includes('chikankari') || p.includes('shadow')) embroidery = 'chikankari';
  else if (p.includes('aari') || p.includes('peacock')) embroidery = 'aari-work';
  else if (p.includes('mirror') || p.includes('kutch')) embroidery = 'mirror-work';
  else if (p.includes('minimal') || p.includes('light') || p.includes('subtle')) embroidery = 'minimal';
  else if (p.includes('plain') || p.includes('clean')) embroidery = 'none';

  return { type, colour, colorName, fabric, neckline, sleeve, embroidery };
};

export const aiService = {
  /**
   * Generates 4 meaningfully distinct design concepts from prompt & optional reference image
   */
  async generateDesigns(prompt = '', refImage = null) {
    // If VITE_AI_API_KEY exists, external calls could be made here; fallback is guaranteed
    await delay(1800);

    const base = parsePromptToParams(prompt);

    // Variation 1: The direct interpretation
    const var1 = {
      id: `des-${Date.now()}-1`,
      title: `${base.colorName} Royal ${base.type.charAt(0).toUpperCase() + base.type.slice(1)}`,
      silhouetteType: base.type,
      colour: base.colour,
      colorName: base.colorName,
      fabric: base.fabric,
      neckline: base.neckline,
      sleeve: base.sleeve,
      embroidery: base.embroidery,
      dupatta: true,
      price: 19500,
      days: 9,
      stylistNote: `Handcrafted ${base.fabric} with authentic ${base.embroidery} details for maximum regal drama.`,
      tag: 'Direct Match'
    };

    // Variation 2: Elevated Fabric / Opulent Variation
    const altFabric = base.fabric === 'velvet' ? 'banarasi' : 'velvet';
    const var2 = {
      id: `des-${Date.now()}-2`,
      title: `Regal ${altFabric.charAt(0).toUpperCase() + altFabric.slice(1)} Edition`,
      silhouetteType: base.type,
      colour: base.colour,
      colorName: base.colorName,
      fabric: altFabric,
      neckline: base.neckline === 'boat' ? 'sweetheart' : 'boat',
      sleeve: 'full',
      embroidery: 'heavy-zari',
      dupatta: true,
      price: 24800,
      days: 12,
      stylistNote: `Heavier weight drape with multi-kali volume and antique metallic salma work.`,
      tag: 'Opulent Cut'
    };

    // Variation 3: Contemporary Lightweight / Fusion
    const var3 = {
      id: `des-${Date.now()}-3`,
      title: `Breeze Organza Sangeet Edition`,
      silhouetteType: base.type === 'lehenga' ? 'anarkali' : base.type,
      colour: base.colour === '#631828' ? '#D9718A' : '#A8D2BC',
      colorName: 'Airy Pastel Hue',
      fabric: 'georgette',
      neckline: 'deep-v',
      sleeve: 'bell',
      embroidery: 'minimal',
      dupatta: true,
      price: 14200,
      days: 7,
      stylistNote: `Featherlight 100% mulmul-lined silhouette ideal for high-energy dancing and sangeet night.`,
      tag: 'Modern Light'
    };

    // Variation 4: Heritage Artisanal Cut (Chikankari or Aari)
    const var4 = {
      id: `des-${Date.now()}-4`,
      title: `Heritage Karchob Masterpiece`,
      silhouetteType: base.type,
      colour: '#F7F4EB', // Pearl Ivory
      colorName: 'Pearl Ivory & Zari',
      fabric: 'silk',
      neckline: 'mandarin',
      sleeve: 'elbow',
      embroidery: 'aari-work',
      dupatta: true,
      price: 21500,
      days: 10,
      stylistNote: `Intricate handcrafted peacock and temple border aari threadwork by master artisans.`,
      tag: 'Artisan Heritage'
    };

    return [var1, var2, var3, var4];
  },

  /**
   * Stylist tips generator based on occasion
   */
  getStylistTips(occasion = 'Wedding', type = 'lehenga') {
    const tipsMap = {
      Wedding: [
        'Select a double dupatta: one draped across the shoulder and a sheer featherlight head veil for pheras.',
        'Choose a sweetheart or scoop neck if pairing with heavy jadau or polki choker necklaces.',
        'Opt for high-density can-can netting for structured 36-kali skirt volume.'
      ],
      Sangeet: [
        'Keep sleeve cuffs un-embellished at the inner elbow to allow free, frictionless dance movement.',
        'Choose georgette or glass organza to reduce garment weight by nearly 40%.',
        'Add a concealed waistband pocket for your phone and lipstick.'
      ],
      Mehendi: [
        'Opt for elbow or cap sleeves so your hands and forearms are unobstructed for henna application.',
        'Pistachio mint, sunny butter, and warm coral are the top photography-approved daytime hues.',
        'Cotton mulmul lining ensures absolute breathability during warm outdoor lawn functions.'
      ],
      Reception: [
        'Deep jewel tones like midnight plum and emerald velvet shine magnificently under artificial banquet chandeliers.',
        'A structured bandhgala collar or plunging architectural neckline creates a sleek modern silhouette.',
        'Tone-on-tone resham embroidery with subtle micro-crystals creates understated high-fashion gleam.'
      ]
    };

    return tipsMap[occasion] || tipsMap.Wedding;
  }
};
