/**
 * Stitchly Seed Data
 * Contains pre-populated users (admin, verified tailors, pending tailor, customer with past orders),
 * sample inspiration looks, and tailor catalog.
 */

export const SEED_USERS = [
  {
    id: 'user-admin-1',
    name: 'Devanshi Shah',
    email: 'admin@stitchly.in',
    phone: '+91 98200 11223',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    title: 'Head of Atelier Operations',
    createdAt: '2025-01-10T08:00:00Z',
  },
  {
    id: 'user-customer-1',
    name: 'Priya Sharma',
    email: 'priya@example.com',
    phone: '+91 98765 43210',
    role: 'customer',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    city: 'Mumbai',
    savedMeasurements: {
      bust: 36,
      waist: 29,
      hip: 39,
      shoulder: 14.5,
      blouseLength: 15,
      lehengaLength: 41,
      armhole: 16,
    },
    orders: [
      {
        id: 'ST-8921',
        title: 'Mulberry Silk Zari Lehenga',
        occasion: 'Sister\'s Sangeet',
        color: 'Rose Gold & Wine',
        fabric: 'Pure Mulberry Silk with Hand Zardozi',
        amount: '₹18,500',
        tailorId: 'tailor-1',
        tailorName: 'Master Rahmatullah Khan',
        tailorCity: 'Jaipur',
        status: 'In Progress (Embroidery)',
        step: 4, // 1: Described, 2: Fabric Picked, 3: Cut & Basted, 4: Embroidery, 5: Quality Check, 6: Dispatched
        orderDate: '18 Sep 2026',
        estimatedDelivery: '04 Oct 2026',
        timeline: [
          { title: 'AI Concept Finalized', date: '18 Sep, 11:30 AM', done: true },
          { title: 'Doorstep Swatches Approved', date: '20 Sep, 03:15 PM', done: true },
          { title: 'Fabric Cut & Basted by Master Rahmatullah', date: '22 Sep, 05:00 PM', done: true },
          { title: 'Hand Zari & Mukaish Work', date: 'In progress', active: true },
          { title: 'Atelier Fit & Quality Check', date: 'Expected 01 Oct', done: false },
          { title: 'Express Delivery to Mumbai', date: 'Expected 04 Oct', done: false },
        ]
      },
      {
        id: 'ST-7430',
        title: 'Raw Silk Princess Cut Blouse',
        occasion: 'Diwali Pooja',
        color: 'Forest Emerald Green',
        fabric: 'Pure Raw Silk with Aari Work Borders',
        amount: '₹4,200',
        tailorId: 'tailor-2',
        tailorName: 'Meenakshi Sundaram',
        tailorCity: 'Bengaluru',
        status: 'Delivered',
        step: 6,
        orderDate: '12 Aug 2026',
        deliveredDate: '24 Aug 2026',
        ratingGiven: 5,
        review: 'The fit on the armholes and princess dart was utterly flawless. Zero alterations needed!'
      }
    ]
  },
  // 3 Verified Tailors
  {
    id: 'tailor-1',
    name: 'Master Rahmatullah Khan',
    email: 'rahmatullah@atelier.stitchly.in',
    phone: '+91 94140 78210',
    role: 'tailor',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    city: 'Jaipur',
    state: 'Rajasthan',
    address: 'Johari Bazaar, Pink City',
    specialties: ['Bridal Lehengas', 'Hand Zardozi', 'Royal Angrakhas'],
    primarySpecialty: 'Bridal Lehengas & Zardozi',
    badge: 'Bridal Specialist',
    verified: true,
    kycStatus: 'approved',
    experienceYears: 24,
    completedOutfits: 342,
    rating: 4.96,
    reviewCount: 189,
    responseTime: '< 2 hours',
    priceRange: '₹12,000 - ₹45,000',
    bio: 'Third-generation royal court karigar from Jaipur. Specializes in multi-kalidar heritage lehengas with authentic real metallic dabka and resham embroidery.',
    featuredWork: [
      { title: 'Rani Pink Velvet Kalidar', image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&auto=format&fit=crop&q=80' },
      { title: 'Ivory Raw Silk Bridal Set', image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=400&auto=format&fit=crop&q=80' }
    ],
    assignedOrders: ['ST-8921']
  },
  {
    id: 'tailor-2',
    name: 'Meenakshi Sundaram',
    email: 'meenakshi@atelier.stitchly.in',
    phone: '+91 98401 23984',
    role: 'tailor',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    city: 'Bengaluru',
    state: 'Karnataka',
    address: 'Malleshwaram 8th Cross',
    specialties: ['Kanjeevaram Blouses', 'Aari Work', 'Temple Cut Drapes'],
    primarySpecialty: 'Kanjeevaram Silk Blouses & Aari Work',
    badge: 'Blouse Master',
    verified: true,
    kycStatus: 'approved',
    experienceYears: 18,
    completedOutfits: 284,
    rating: 4.92,
    reviewCount: 142,
    responseTime: '< 1 hour',
    priceRange: '₹3,500 - ₹14,000',
    bio: 'Trained under master craftsmen of Kanchipuram. Known for immaculate sweetheart necks, deep backs, elbow sleeves with intricate peacock and mango motifs.',
    featuredWork: [
      { title: 'Emerald Mango Aari Blouse', image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=400&auto=format&fit=crop&q=80' },
      { title: 'Crimson Brocade Halter Blouse', image: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=400&auto=format&fit=crop&q=80' }
    ],
    assignedOrders: ['ST-7430']
  },
  {
    id: 'tailor-3',
    name: 'Ustad Jagjit & Gurpreet Singh',
    email: 'singh.atelier@stitchly.in',
    phone: '+91 98110 54321',
    role: 'tailor',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    city: 'Delhi',
    state: 'NCR / Lucknow Heritage Hub',
    address: 'Chandni Chowk & Hazratganj',
    specialties: ['Groom Sherwanis', 'Lucknowi Chikankari', 'Bandhgala Suits'],
    primarySpecialty: 'Chikankari & Bandhgala Sherwanis',
    badge: 'Heritage Tailor',
    verified: true,
    kycStatus: 'approved',
    experienceYears: 21,
    completedOutfits: 318,
    rating: 4.89,
    reviewCount: 167,
    responseTime: '< 3 hours',
    priceRange: '₹14,000 - ₹50,000',
    bio: 'Masters of structured drape and royal Nawabi silhouettes. Renowned for custom tone-on-tone Lucknowi shadow work and crisp Italian wool bandhgalas.',
    featuredWork: [
      { title: 'Pearl Ivory Chikankari Sherwani', image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&auto=format&fit=crop&q=80' },
      { title: 'Midnight Navy Velvet Bandhgala', image: 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=400&auto=format&fit=crop&q=80' }
    ],
    assignedOrders: []
  },
  // 1 Pending Tailor
  {
    id: 'tailor-4',
    name: 'Rajeshwari Sharma',
    email: 'rajeshwari.studio@gmail.com',
    phone: '+91 98204 88712',
    role: 'tailor',
    avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=150&auto=format&fit=crop&q=80',
    city: 'Mumbai',
    state: 'Maharashtra',
    address: 'Bandra West, Art District',
    specialties: ['Cape Anarkalis', 'Pre-draped Sarees', 'Indo-Western Fusion'],
    primarySpecialty: 'Contemporary Fusion & Cape Anarkalis',
    badge: 'Under Review',
    verified: false,
    kycStatus: 'pending',
    kycDocument: 'data:application/pdf;base64,JVBERi0xLjQKJVRhaWxvcl9LWUNfRG9jdW1lbnRfUmFqZXNod2FyaV9TaGFybWE...',
    experienceYears: 9,
    completedOutfits: 96,
    rating: 4.80,
    reviewCount: 42,
    responseTime: '< 4 hours',
    priceRange: '₹8,000 - ₹25,000',
    bio: 'NIFT alumna running an artisanal boutique in Bandra. Merges clean Scandinavian drapes with classical Gujarati mirror and thread work.',
    featuredWork: [
      { title: 'Lilac Organza Cape Set', image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&auto=format&fit=crop&q=80' }
    ],
    assignedOrders: []
  }
];

export const INSPIRATION_GALLERY = [
  {
    id: 'insp-1',
    title: 'Gulaab Petal Zari Kalidar',
    category: 'Bridal',
    silhouette: 'Lehenga',
    fabric: 'Pure Mulberry Silk',
    color: 'Dusty Rose & Antique Gold',
    cityOrigin: 'Jaipur',
    description: '16-kali flair skirt hand-embroidered with micro-pearls and zardozi vines, paired with a sweetheart plunge blouse and scalloped organza dupatta.',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&auto=format&fit=crop&q=80',
    tags: ['Bridal', '16 Kali', 'Zari', 'Handmade'],
    craftsman: 'Master Rahmatullah Khan'
  },
  {
    id: 'insp-2',
    title: 'Peacock Motif Aari Blouse',
    category: 'Festive',
    silhouette: 'Blouse',
    fabric: 'Raw Silk & Glass Beads',
    color: 'Emerald & Gold',
    cityOrigin: 'Bengaluru',
    description: 'Custom elbow-length sleeves with raised 3D aari threadwork dancing peacocks, accented with golden katori sequins and back tassel dori.',
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=600&auto=format&fit=crop&q=80',
    tags: ['Aari Work', 'Elbow Sleeves', 'Temple Border'],
    craftsman: 'Meenakshi Sundaram'
  },
  {
    id: 'insp-3',
    title: 'Nawabi Shadow Chikankari Sherwani',
    category: 'Groom',
    silhouette: 'Sherwani',
    fabric: 'Georgette on Tussar Silk',
    color: 'Pearl Ivory',
    cityOrigin: 'Lucknow',
    description: 'Intricate 32-stitch hand-embroidered shadow work with genuine mother-of-pearl buttons and tailored churidar pants.',
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&auto=format&fit=crop&q=80',
    tags: ['Groom', 'Chikankari', 'Heritage', 'Ivory'],
    craftsman: 'Ustad Jagjit & Gurpreet Singh'
  },
  {
    id: 'insp-4',
    title: 'Lilac Fluted Cape Anarkali',
    category: 'Fusion',
    silhouette: 'Anarkali',
    fabric: 'Glass Organza & Crepe',
    color: 'Pastel Lilac & Silver',
    cityOrigin: 'Mumbai',
    description: 'Modern pre-stitched floor-length anarkali featuring sheer shoulder capes, silver cut-dana yoke and lightweight movement for sangeet dancing.',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&auto=format&fit=crop&q=80',
    tags: ['Fusion', 'Cape', 'Organza', 'Sangeet Ready'],
    craftsman: 'Rajeshwari Sharma'
  },
  {
    id: 'insp-5',
    title: 'Saffron Benarasi Brocade Kurta Set',
    category: 'Festive',
    silhouette: 'Kurta Set',
    fabric: 'Handloom Katan Silk',
    color: 'Warm Saffron Gold',
    cityOrigin: 'Varanasi',
    description: 'Woven with gold kadwa bootis, finished with delicate gotta patti piping and matched with flared palazzo pants.',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600&auto=format&fit=crop&q=80',
    tags: ['Benarasi', 'Kadwa Booti', 'Comfort Fit'],
    craftsman: 'Master Rahmatullah Khan'
  },
  {
    id: 'insp-6',
    title: 'Midnight Velvet Bandhgala',
    category: 'Groom',
    silhouette: 'Bandhgala',
    fabric: 'Micro-Velvet & Satin Lining',
    color: 'Midnight Plum Navy',
    cityOrigin: 'Delhi',
    description: 'Crisp structured collar with tone-on-tone French knot detailing on cuffs and antique bronze crest buttons.',
    image: 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=600&auto=format&fit=crop&q=80',
    tags: ['Royal Cut', 'Velvet', 'Structured'],
    craftsman: 'Ustad Jagjit & Gurpreet Singh'
  }
];

export const HOW_IT_WORKS_STEPS = [
  {
    step: 1,
    title: 'Describe',
    subtitle: 'Share your vision or speak in regional voice',
    badge: 'Step 1',
    description: 'Type a prompt, pick aesthetic tags, upload an Instagram screenshot, or record a voice note in Hindi, Tamil, or Hinglish. Tell us the occasion, silhouette, and your vibe.',
    modalContent: {
      headline: 'Speak or Type Your Dream Silhouette',
      details: 'Our AI understands regional styling nuance — from "pista green kalidar for mehendi" to "deep back sweetheart neck with heavy aari work". It translates raw thoughts into technical atelier patterns.',
      icon: 'Mic',
      accentColor: 'blush'
    }
  },
  {
    step: 2,
    title: 'AI Designs',
    subtitle: 'Generate photorealistic ethnic renders in seconds',
    badge: 'Step 2',
    description: 'Watch 4 photorealistic concepts generate with precise drape simulation. See how organza flutters compared to raw silk before cutting an inch of cloth.',
    modalContent: {
      headline: 'Photorealistic Drape Simulation',
      details: 'Trained exclusively on Indian ethnic patterns, weaves, necklines, and embroideries. You get front, back, and detail views with simulated fall.',
      icon: 'Sparkles',
      accentColor: 'lavender'
    }
  },
  {
    step: 3,
    title: 'Customize',
    subtitle: 'Tweak necklines, borders, flair & sleeves',
    badge: 'Step 3',
    description: 'Swap sweet-heart neck to boat neck, change sleeve length from cap to elbow, dial up the skirt flair (32 kalis!), and choose lining breathability.',
    modalContent: {
      headline: 'Micro-Tailoring Without The Guesswork',
      details: 'Every parameter changes the preview in real-time. Adjust can-can stiffness, border width, back tie tassels, and pocket depths with clean visual toggles.',
      icon: 'Sliders',
      accentColor: 'peach'
    }
  },
  {
    step: 4,
    title: 'Match Tailor',
    subtitle: 'Get paired with a master regional artisan',
    badge: 'Step 4',
    description: 'We match your design with verified independent masters specializing in that exact craft — Jaipur zardozi, Lucknow chikankari, or Bengaluru aari work.',
    modalContent: {
      headline: 'Direct Artisan Matchmaking',
      details: 'No middlemen taking 60% markups. You see your tailor’s workshop, craft heritage, certifications, customer ratings, and exact turnaround commitments.',
      icon: 'Compass',
      accentColor: 'mint'
    }
  },
  {
    step: 5,
    title: 'Track Live',
    subtitle: 'Doorstep swatch box + stage-by-stage photo updates',
    badge: 'Step 5',
    description: 'Receive our complimentary measurement tape & fabric swatch kit. Track fabric cutting, basting, handwork, and atelier quality check with live photo milestones.',
    modalContent: {
      headline: 'Zero Anxiety Transparency',
      details: 'Your tailor shares photos of the chalk markings, the embroidery frame, and basting fit. Video call anytime for on-body drape advice.',
      icon: 'Camera',
      accentColor: 'butter'
    }
  },
  {
    step: 6,
    title: 'Delivered',
    subtitle: 'Atelier packaged with Perfect-Fit Guarantee',
    badge: 'Step 6',
    description: 'Arrives in breathable fabric garment bags with extra margin cloth for future alteration. If the fit isn’t 100% dream-like, free doorstep alterations are on us.',
    modalContent: {
      headline: 'Delivered Right To Your Doorstep',
      details: 'Includes luxury wooden hangers, matching hair accessories/potli bag from remaining cloth, and our 100% Free Doorstep Alteration Guarantee.',
      icon: 'PackageCheck',
      accentColor: 'sky'
    }
  }
];

export const AI_STUDIO_TEASERS = [
  {
    id: 't-1',
    prompt: 'Maroon velvet bridal lehenga with antique gold zardozi',
    category: 'Bridal',
    fabric: 'Micro-Velvet 9000',
    colorHex: '#611629',
    tags: ['Velvet', 'Zardozi', 'Double Dupatta', '36 Kali'],
    images: [
      { id: 'img-1', title: 'Front View — Royal Flair', url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500&auto=format&fit=crop&q=80', description: '36-kali full circular cut with antique dull gold dabka borders.' },
      { id: 'img-2', title: 'Deep U-Neck Blouse Detail', url: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=500&auto=format&fit=crop&q=80', description: 'Hand-beaded sweetheart bustier with emerald drops.' },
      { id: 'img-3', title: 'Trailing Scallop Border', url: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=500&auto=format&fit=crop&q=80', description: 'Cutwork scallop hem with micro pearls.' },
      { id: 'img-4', title: 'Matching Potli & Latkans', url: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=500&auto=format&fit=crop&q=80', description: 'Coordinated handcrafted zardozi latkans.' }
    ]
  },
  {
    id: 't-2',
    prompt: 'Pastel pistachio organza anarkali for mehendi brunch',
    category: 'Mehendi',
    fabric: 'Korean Glass Organza',
    colorHex: '#C5DEC9',
    tags: ['Organza', 'Gotta Patti', 'Breathable', 'Pocket Detail'],
    images: [
      { id: 'img-5', title: 'Flared Kalidar Drape', url: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=500&auto=format&fit=crop&q=80', description: 'Airy, sheer silhouette with soft cotton mul lining.' },
      { id: 'img-6', title: 'Gotta Patti Sleeve Cuffs', url: 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=500&auto=format&fit=crop&q=80', description: 'Geometric gota detailing for daytime gleam.' },
      { id: 'img-7', title: 'Wide Palazzo Bottoms', url: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=500&auto=format&fit=crop&q=80', description: 'Relaxed fit with concealed side zipper and pocket.' },
      { id: 'img-8', title: 'Featherlight Dupatta', url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500&auto=format&fit=crop&q=80', description: '2.5 meter pure organza with pearl tassels.' }
    ]
  },
  {
    id: 't-3',
    prompt: 'Ivory lucknowi chikankari groom sherwani with pearl collar',
    category: 'Groom',
    fabric: 'Tussar Georgette',
    colorHex: '#F6F3EB',
    tags: ['Chikankari', 'Groom', 'Nawabi', 'Silk Churidar'],
    images: [
      { id: 'img-9', title: 'Structured Nawabi Cut', url: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=500&auto=format&fit=crop&q=80', description: 'Handcrafted floral jaal work on front panel.' },
      { id: 'img-10', title: 'Mandarin Collar Detail', url: 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=500&auto=format&fit=crop&q=80', description: 'Embossed pearl buttons and stiff canvas interlining.' },
      { id: 'img-11', title: 'Silk Dupatta Drape', url: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=500&auto=format&fit=crop&q=80', description: 'Coordinated blush-accented tissue stole.' },
      { id: 'img-12', title: 'Churidar Precision Fit', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=80', description: 'Zero bunching around ankle with tailored stretch bias.' }
    ]
  },
  {
    id: 't-4',
    prompt: 'Modern dusty rose halter blouse with mirror cutwork',
    category: 'Blouse',
    fabric: 'Raw Silk & Mirror Glass',
    colorHex: '#E8B4C0',
    tags: ['Halter', 'Mirror Work', 'Padded Cups', 'Backless'],
    images: [
      { id: 'img-13', title: 'Geometric Mirror Yoke', url: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=500&auto=format&fit=crop&q=80', description: 'Hand-sewn original glass mirrors with resham binding.' },
      { id: 'img-14', title: 'Architectural Tie Back', url: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=500&auto=format&fit=crop&q=80', description: 'Secure criss-cross tie cords with handmade thread beads.' },
      { id: 'img-15', title: 'Internal Corset Boning', url: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=500&auto=format&fit=crop&q=80', description: 'Built-in breathable boning for sculpted posture.' },
      { id: 'img-16', title: 'Padded Cup Construction', url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500&auto=format&fit=crop&q=80', description: 'Seamless high-density cups for zero silhouette show.' }
    ]
  }
];

export const TESTIMONIALS = [
  {
    id: 't-1',
    name: 'Ananya Deshmukh',
    city: 'Pune',
    role: 'Bride',
    outfit: 'Bridal Zari Lehenga',
    tailor: 'Master Rahmatullah Khan',
    quote: 'I was terrified of getting my wedding lehenga stitched online. Stitchly sent me 3 fabric swatches in a gorgeous pastel box within 48 hours. Master Rahmatullah even did a video call to show me the zardozi frame. It fits like second skin!',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'
  },
  {
    id: 't-2',
    name: 'Vikram & Natasha Singhania',
    city: 'Delhi NCR',
    role: 'Wedding Couple',
    outfit: 'Groom Sherwani & Bridal Set',
    tailor: 'Ustad Jagjit Singh',
    quote: 'We ordered coordinated outfits for our sangeet and wedding. The group ordering feature saved us nearly ₹24,000 and the live tracking with workshop photos felt like having a personal haute-couture boutique in our living room.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80'
  },
  {
    id: 't-3',
    name: 'Radhika Iyer',
    city: 'Chennai',
    role: 'Mother of the Bride',
    outfit: 'Kanjeevaram Aari Blouses (Set of 4)',
    tailor: 'Meenakshi Sundaram',
    quote: 'Meenakshi Sundaram is a true artist. Every single blouse sleeve had precise peacock embroidery that matched our heritage silk sarees. The doorstep alteration guarantee gave us total peace of mind.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80'
  },
  {
    id: 't-4',
    name: 'Kavita Menon',
    city: 'Bengaluru',
    role: 'Bridesmaid',
    outfit: 'Cape Anarkali',
    tailor: 'Rajeshwari Sharma',
    quote: 'The AI Studio let me test 10 different shades of lavender organza before committing. Being able to record voice instructions in Malayalam made explaining my sleeve preferences effortless.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80'
  }
];

export const FEATURES_DATA = [
  {
    id: 'feat-1',
    title: 'Complimentary Measurement Kit',
    tagline: 'Precision tape & step-by-step video guide',
    icon: 'Ruler',
    accent: 'butter',
    description: 'We courier a tailor-grade measuring tape, swatch sample book, and a 3-minute video guide. Or book a 10-minute guided video call with our fit specialist to measure yourself accurately.',
    details: [
      'Gold-stamped cloth tape measure sent directly to your home',
      'Video guide for 14 custom ethnic measurement points',
      'Saved securely to your Stitchly profile for future orders'
    ]
  },
  {
    id: 'feat-2',
    title: 'Live Workshop Video Milestones',
    tagline: 'Look inside your master tailor’s atelier',
    icon: 'Video',
    accent: 'blush',
    description: 'Track your fabric being marked with tailor chalk, hand-cut, and placed on traditional karchob embroidery frames. See your garment come alive before it is packaged.',
    details: [
      'High-resolution photo updates at every critical milestone',
      'Direct WhatsApp / Video consultation with your matched tailor',
      'Basting stage fit approval before final decorative stitching'
    ]
  },
  {
    id: 'feat-3',
    title: 'Fabric Swatch Dispatch',
    tagline: 'Touch the silk, organza, and velvet at home',
    icon: 'Layers',
    accent: 'lavender',
    description: 'Never worry about color discrepancy on digital screens. For bridal and heavy festive wear, we dispatch 3 chosen fabric cuttings and embroidery swatches to your door.',
    details: [
      'Touch real 100% mulberry silks, Kanchipuram brocades, and Korean organzas',
      'Examine metallic zardozi threads and thread density under your home lighting',
      'Complimentary overnight dispatch across 180+ Indian cities'
    ]
  },
  {
    id: 'feat-4',
    title: '100% Perfect Fit Guarantee',
    tagline: 'Free doorstep alteration or full remake',
    icon: 'ShieldCheck',
    accent: 'mint',
    description: 'Every outfit is tailored with 2-inch internal seam allowances. If your garment feels anything less than perfection, our courier collects it for priority complimentary adjustments.',
    details: [
      'Generous 2-3 inch hidden margins for future sizing flexibility',
      'Free reverse courier pickup within 7 days of delivery',
      'Dedicated atelier relationship manager for every wedding client'
    ]
  },
  {
    id: 'feat-5',
    title: 'Group Wedding Concierge',
    tagline: 'Coordinated colors for bridesmaids & groomsmen',
    icon: 'Users',
    accent: 'peach',
    description: 'Planning a wedding party? Create a group palette. Bridesmaids and groomsmen submit their individual measurements, while colors and embroidery tones remain perfectly harmonious.',
    details: [
      'Unified wedding palette board with per-person custom sizing',
      'Group discounts up to 18% on bulk wedding orders (5+ outfits)',
      'Single shipment coordination so everyone receives their outfits together'
    ]
  },
  {
    id: 'feat-6',
    title: 'Regional Voice Notes',
    tagline: 'Explain your drape in Hindi, Tamil, or Hinglish',
    icon: 'Mic',
    accent: 'sky',
    description: 'No complicated design jargon needed. Speak naturally in your native language: "Blouse ka gala thoda deep chahiye aur aage se princess cut". Our AI Atelier maps it accurately.',
    details: [
      'Multi-lingual voice transcription tailored to Indian fashion terms',
      'Translates casual descriptions into technical craft specifications',
      'Shared directly with your tailor in their preferred language'
    ]
  }
];

export const INITIAL_STATS = {
  tailors: 340,
  outfits: 14200,
  cities: 48,
  rating: 4.94
};
