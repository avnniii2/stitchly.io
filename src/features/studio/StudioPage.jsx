import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Garment } from '../../components/garment/Garment';
import { FABRIC_TYPES, COLOR_PALETTES } from '../../components/garment/fabrics';
import { EMBROIDERY_TYPES } from '../../components/garment/embroidery';
import { aiService } from '../../services/ai';
import { useVoice, SUPPORTED_VOICE_LANGS } from '../../hooks/useVoice';
import { useWishlist } from '../../store/useWishlist';
import { useUI } from '../../store/useUI';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { Chip } from '../../components/Chip';
import { Modal } from '../../components/Modal';
import { NeedleLoader } from '../../components/NeedleLoader';
import { NeedleIcon, ScissorsIcon, SparkleDoodle, PinIcon } from '../../components/Doodles';
import { 
  Wand2, 
  Mic, 
  MicOff, 
  Upload, 
  Heart, 
  Sparkles, 
  Sliders, 
  Camera, 
  Clock, 
  ShieldCheck, 
  ArrowRight, 
  RotateCcw,
  CheckCircle2,
  Gift,
  Zap,
  HelpCircle,
  Eye,
  X
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const StudioPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { addToast } = useUI();
  const { addToWishlist, removeFromWishlist, isWishlisted } = useWishlist();

  // Preload from location state (e.g. from Inspiration "Recreate this look" or Wishlist)
  const prefill = location.state?.prefill || {};

  // Form State
  const [prompt, setPrompt] = useState(prefill.prompt || 'Pastel pink anarkali for mehendi with gota patti and bell sleeves');
  const [voiceLang, setVoiceLang] = useState('hi-IN');
  const [occasion, setOccasion] = useState(prefill.occasion || 'Mehendi');
  const [budget, setBudget] = useState(prefill.price || 19500);
  const [gender, setGender] = useState('Women');
  const [refImage, setRefImage] = useState(prefill.image || null);

  // Active Customization Specs
  const [garmentType, setGarmentType] = useState(prefill.type || 'lehenga');
  const [colour, setColour] = useState(prefill.colour || '#D9718A');
  const [fabric, setFabric] = useState(prefill.fabric || 'silk');
  const [neckline, setNeckline] = useState(prefill.neckline || 'sweetheart');
  const [sleeve, setSleeve] = useState(prefill.sleeve || 'elbow');
  const [embroidery, setEmbroidery] = useState(prefill.embroidery || 'heavy-zari');
  const [dupatta, setDupatta] = useState(true);
  const [express, setExpress] = useState(false);
  const [giftMode, setGiftMode] = useState(false);

  // AI Generation States
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState(0); // 0: Sketching, 1: Fabrics, 2: Embroidery
  const [results, setResults] = useState([]);
  const [selectedResultId, setSelectedResultId] = useState(null);

  // AR Try-On Modal State
  const [arOpen, setArOpen] = useState(false);
  const [cameraStream, setCameraStream] = useState(null);
  const [arScale, setArScale] = useState(1);
  const videoRef = useRef(null);

  // Voice hook
  const { isListening, transcript, startListening, stopListening } = useVoice({
    lang: voiceLang,
    onResult: (text) => setPrompt(text)
  });

  // Calculate live budget & turnaround
  const fabricMultiplier = FABRIC_TYPES[fabric]?.priceMultiplier || 1.2;
  const embroideryCost = EMBROIDERY_TYPES[embroidery]?.priceOffset || 2500;
  const baseCost = garmentType === 'blouse' ? 3500 : garmentType === 'sherwani' ? 16000 : 12000;
  let estimatedTotal = Math.round((baseCost * fabricMultiplier) + embroideryCost);
  if (express) estimatedTotal = Math.round(estimatedTotal * 1.25);
  const estimatedDays = express ? 6 : (garmentType === 'blouse' ? 5 : 9);

  // Generation status text rotation
  useEffect(() => {
    let interval = null;
    if (isGenerating) {
      interval = setInterval(() => {
        setGenerationStep((prev) => (prev + 1) % 3);
      }, 750);
    }
    return () => clearInterval(interval);
  }, [isGenerating]);

  // Voice transcript synchronization
  useEffect(() => {
    if (transcript) setPrompt(transcript);
  }, [transcript]);

  const handleGenerate = async () => {
    setIsGenerating(true);
    setGenerationStep(0);
    try {
      const generatedCards = await aiService.generateDesigns(prompt, refImage);
      setResults(generatedCards);
      if (generatedCards.length > 0) {
        selectCard(generatedCards[0]);
      }
      addToast({
        title: 'Designs Generated!',
        message: '4 bespoke variations drafted by the atelier engine.',
        type: 'stitch'
      });
    } catch {
      addToast({ title: 'Generation error', message: 'Please try again', type: 'error' });
    } finally {
      setIsGenerating(false);
    }
  };

  const selectCard = (card) => {
    setSelectedResultId(card.id);
    setGarmentType(card.silhouetteType);
    setColour(card.colour);
    setFabric(card.fabric);
    setNeckline(card.neckline);
    setSleeve(card.sleeve);
    setEmbroidery(card.embroidery);
    setDupatta(card.dupatta !== false);

    try {
      confetti({ particleCount: 35, spread: 50, origin: { y: 0.55 } });
    } catch {}
  };

  const handleRefImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setRefImage(reader.result);
        addToast({ title: 'Reference Uploaded', message: `${file.name} analyzed for silhouette inspiration.`, type: 'stitch' });
      };
      reader.readAsDataURL(file);
    }
  };

  // AR Try-On Camera Management
  const openArTryOn = async () => {
    setArOpen(true);
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
        setCameraStream(stream);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      }
    } catch (err) {
      console.warn('Camera access denied or unavailable; falling back to mannequin staging');
    }
  };

  const closeArTryOn = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach((track) => track.stop());
      setCameraStream(null);
    }
    setArOpen(false);
  };

  const currentDesignSnapshot = {
    type: garmentType,
    colour,
    colorName: COLOR_PALETTES.find((c) => c.hex === colour)?.name || 'Customized Hue',
    fabric,
    neckline,
    sleeve,
    embroidery,
    dupatta,
    occasion,
    price: estimatedTotal,
    express,
    giftMode
  };

  const handleFindTailor = () => {
    navigate('/app/tailors', {
      state: {
        activeDesign: currentDesignSnapshot,
        budget: estimatedTotal,
        occasion
      }
    });
  };

  const handleWishlistToggle = () => {
    const activeItem = {
      id: selectedResultId || `design-${Date.now()}`,
      title: `${currentDesignSnapshot.colorName} ${garmentType.charAt(0).toUpperCase() + garmentType.slice(1)}`,
      design: currentDesignSnapshot,
      price: estimatedTotal
    };

    if (isWishlisted(activeItem.id)) {
      removeFromWishlist(activeItem.id);
      addToast({ title: 'Removed from Wishlist', type: 'info' });
    } else {
      addToWishlist(activeItem);
      addToast({ title: 'Saved to Wishlist!', message: 'View anytime in your atelier archive.', type: 'success' });
    }
  };

  return (
    <div className="space-y-6">
      {/* Studio Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-blush/40 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-lavender/50 border border-lavender text-xs font-semibold text-purple-950 uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5 text-purple-700" />
            <span>Atelier Design Studio</span>
          </div>
          <h1 className="font-fraunces text-2xl sm:text-3xl text-plum">
            Interactive Generative Studio
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            icon={Heart}
            onClick={handleWishlistToggle}
            className={`text-xs font-semibold ${isWishlisted(selectedResultId || 'temp') ? 'text-rose-deep fill-rose-deep' : 'text-plum-soft'}`}
          >
            {isWishlisted(selectedResultId || 'temp') ? 'Saved' : 'Save Design'}
          </Button>

          <Button
            variant="primary"
            size="sm"
            icon={ArrowRight}
            iconPosition="right"
            onClick={handleFindTailor}
            className="shadow-soft-blush font-semibold text-xs"
          >
            Find My Tailor
          </Button>
        </div>
      </div>

      {/* 3-ZONE MAIN STUDIO CONTAINER */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* ================= ZONE 1: LEFT ("Your Idea") ================= */}
        <div className="lg:col-span-4 space-y-5">
          <Card variant="glass" className="p-5 sm:p-6 space-y-4 border-lavender/80 shadow-soft-lavender">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-deep flex items-center gap-1.5">
                <Wand2 className="w-4 h-4 text-purple-700" />
                Prompt The Atelier
              </span>

              {/* Language Selector */}
              <select
                value={voiceLang}
                onChange={(e) => setVoiceLang(e.target.value)}
                className="text-[11px] font-medium bg-cream-100 border border-plum/15 rounded-full px-2.5 py-1 text-plum focus:outline-none"
              >
                {SUPPORTED_VOICE_LANGS.map((lang) => (
                  <option key={lang.code} value={lang.code}>{lang.name}</option>
                ))}
              </select>
            </div>

            {/* Glowing Lavender Prompt Box */}
            <div className="relative rounded-2xl p-1 bg-gradient-to-r from-lavender via-blush to-peach shadow-inner-glow">
              <div className="relative bg-white rounded-xl overflow-hidden">
                <textarea
                  rows={3}
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe your silhouette, collar, colors, or fabrics..."
                  className="w-full p-3.5 text-xs sm:text-sm text-plum bg-transparent focus:outline-none placeholder-plum-soft/60"
                />

                {/* Bottom Prompt Tools: Mic & Clear */}
                <div className="flex items-center justify-between px-3 py-2 bg-cream-100/60 border-t border-plum/10">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={isListening ? stopListening : startListening}
                      className={`p-1.5 rounded-full transition-all ${
                        isListening ? 'bg-rose-deep text-white animate-pulse' : 'bg-white hover:bg-blush text-plum'
                      }`}
                      title={isListening ? 'Listening... click to stop' : 'Speak regional voice note'}
                    >
                      {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4 text-rose-deep" />}
                    </button>
                    {isListening && (
                      <span className="text-[11px] text-rose-deep font-semibold animate-pulse flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-deep" />
                        Listening ({voiceLang})...
                      </span>
                    )}
                  </div>

                  <span className="text-[10px] text-plum-soft font-mono">
                    AI Pattern Parser Ready
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Inspiration Chips */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-plum-soft">
                Or Try Fast Atelier Prompts:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {[
                  'bridal red lehenga with gold zari',
                  'pastel pink anarkali for mehendi',
                  "men's ivory sherwani",
                  'emerald green deep-back blouse'
                ].map((chip) => (
                  <button
                    key={chip}
                    type="button"
                    onClick={() => {
                      setPrompt(chip);
                      handleGenerate();
                    }}
                    className="text-[11px] text-plum px-2.5 py-1 rounded-full bg-white hover:bg-blush/50 border border-plum/10 text-left transition-colors truncate max-w-full"
                  >
                    "{chip}"
                  </button>
                ))}
              </div>
            </div>

            {/* Occasion & Gender Selector */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-plum-soft block mb-1">
                  Occasion
                </label>
                <select
                  value={occasion}
                  onChange={(e) => setOccasion(e.target.value)}
                  className="w-full text-xs font-semibold p-2.5 rounded-xl bg-cream-100 border border-plum/15 text-plum focus:outline-none"
                >
                  <option value="Wedding">Wedding / Pheras</option>
                  <option value="Sangeet">Sangeet Night</option>
                  <option value="Mehendi">Mehendi Lawn</option>
                  <option value="Reception">Banquet Reception</option>
                  <option value="Festive">Diwali / Festive</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-plum-soft block mb-1">
                  Fit Category
                </label>
                <div className="flex rounded-xl bg-cream-100 border border-plum/15 p-0.5">
                  {['Women', 'Men'].map((g) => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => {
                        setGender(g);
                        if (g === 'Men') setGarmentType('sherwani');
                        else if (garmentType === 'sherwani') setGarmentType('lehenga');
                      }}
                      className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                        gender === g ? 'bg-white text-plum shadow-xs' : 'text-plum-soft hover:text-plum'
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Reference Image Chalk-Outline Drop Zone */}
            <div className="pt-2">
              <label className="text-[10px] font-bold uppercase tracking-wider text-plum-soft block mb-1">
                Visual Reference (Instagram / Pinterest)
              </label>
              <div className="border-2 border-dashed border-rose-deep/40 rounded-2xl p-3 text-center bg-cream-100/50 hover:bg-blush/20 transition-colors relative cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleRefImageUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                {refImage ? (
                  <div className="flex items-center gap-3">
                    <img src={refImage} alt="Ref" className="w-12 h-12 rounded-xl object-cover border border-plum/20" />
                    <div className="text-left flex-1 min-w-0">
                      <span className="text-xs font-semibold text-plum truncate block">Reference Attached</span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setRefImage(null);
                        }}
                        className="text-[10px] text-rose-deep underline"
                      >
                        Remove reference
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2 text-xs text-plum-soft py-1">
                    <Upload className="w-4 h-4 text-rose-deep" />
                    <span>Drop screenshot or browse moodboard</span>
                  </div>
                )}
              </div>
            </div>

            {/* Generate Action Button */}
            <Button
              variant="primary"
              size="lg"
              icon={Wand2}
              isLoading={isGenerating}
              onClick={handleGenerate}
              className="w-full font-semibold shadow-soft-blush"
            >
              Generate 4 Bespoke Designs
            </Button>
          </Card>
        </div>

        {/* ================= ZONE 2: CENTRE ("The Canvas Stage") ================= */}
        <div className="lg:col-span-4 flex flex-col items-center">
          <Card variant="glass" className="w-full p-4 sm:p-6 flex flex-col items-center justify-between min-h-[540px] relative overflow-hidden bg-gradient-to-b from-cream to-white/90">
            {/* Top Canvas Badges */}
            <div className="w-full flex items-center justify-between z-10">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-cream-200 border border-plum/10 text-plum-soft">
                {garmentType.toUpperCase()} • {FABRIC_TYPES[fabric]?.name}
              </span>

              <Button
                variant="blush"
                size="sm"
                icon={Camera}
                onClick={openArTryOn}
                className="text-xs font-semibold"
              >
                AR Virtual Mirror
              </Button>
            </div>

            {/* Central Mannequin SVG Stage */}
            <div className="relative w-full max-w-[320px] aspect-[3/5] flex items-center justify-center my-2">
              <AnimatePresence mode="wait">
                {isGenerating ? (
                  <motion.div
                    key="generating-state"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center text-center p-6"
                  >
                    <NeedleLoader
                      text={
                        generationStep === 0
                          ? 'Sketching silhouette on dress form...'
                          : generationStep === 1
                          ? 'Weaving fabric sheen & bias drape...'
                          : 'Applying metallic embroidery & zari...'
                      }
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    key={`${garmentType}-${colour}-${fabric}-${neckline}-${sleeve}-${embroidery}-${dupatta}`}
                    initial={{ opacity: 0.85, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="w-full h-full flex items-center justify-center"
                  >
                    <Garment
                      type={garmentType}
                      colour={colour}
                      fabric={fabric}
                      neckline={neckline}
                      sleeve={sleeve}
                      embroidery={embroidery}
                      dupatta={dupatta}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Canvas Bottom Quick Info */}
            <div className="w-full pt-3 border-t border-plum/10 flex items-center justify-between text-xs text-plum-soft z-10">
              <span className="flex items-center gap-1 text-emerald-800 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Parametric SVG Render
              </span>
              <span className="font-mono text-plum">
                Scale 1:1 Atelier Ratio
              </span>
            </div>
          </Card>
        </div>

        {/* ================= ZONE 3: RIGHT ("Make It Yours") ================= */}
        <div className="lg:col-span-4 space-y-5">
          <Card variant="glass" className="p-5 sm:p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-blush/40 pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-deep flex items-center gap-1.5">
                <Sliders className="w-4 h-4" />
                Bespoke Customizer
              </span>
              <span className="text-[11px] text-plum-soft">Live adjustments</span>
            </div>

            {/* Garment Silhouette Type Selector */}
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-plum-soft block mb-1.5">
                Silhouette Type
              </label>
              <div className="grid grid-cols-3 gap-1.5 text-xs">
                {[
                  { id: 'lehenga', label: 'Lehenga' },
                  { id: 'anarkali', label: 'Anarkali' },
                  { id: 'kurta', label: 'Kurta Set' },
                  { id: 'sherwani', label: 'Sherwani' },
                  { id: 'blouse', label: 'Blouse Only' }
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setGarmentType(item.id)}
                    className={`py-1.5 px-2 rounded-xl text-xs font-medium border text-center transition-all ${
                      garmentType === item.id
                        ? 'bg-rose-deep text-white border-rose-deep font-bold shadow-xs'
                        : 'bg-white border-plum/10 text-plum hover:bg-blush/30'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Palette Swatches */}
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-plum-soft block mb-1.5">
                Atelier Palette
              </label>
              <div className="flex flex-wrap gap-2">
                {COLOR_PALETTES.map((pal) => (
                  <button
                    key={pal.id}
                    type="button"
                    onClick={() => setColour(pal.hex)}
                    className={`w-7 h-7 rounded-full border-2 transition-transform ${
                      colour === pal.hex ? 'border-plum scale-110 shadow-md ring-2 ring-blush' : 'border-white hover:scale-105'
                    }`}
                    style={{ backgroundColor: pal.hex }}
                    title={pal.name}
                  />
                ))}
              </div>
            </div>

            {/* Fabric Swatches */}
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-plum-soft block mb-1.5">
                Fabric Drape
              </label>
              <div className="grid grid-cols-2 gap-1.5 text-xs">
                {Object.values(FABRIC_TYPES).map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setFabric(f.id)}
                    className={`p-2 rounded-xl border text-left transition-all ${
                      fabric === f.id
                        ? 'bg-cream-200 border-rose-deep text-plum font-bold shadow-xs'
                        : 'bg-white border-plum/10 text-plum hover:bg-blush/20'
                    }`}
                  >
                    <div className="text-[11px] leading-tight">{f.name}</div>
                    <div className="text-[9px] text-plum-soft">{f.sheen}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Neckline & Sleeve Pickers */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-plum-soft block mb-1">
                  Neckline
                </label>
                <select
                  value={neckline}
                  onChange={(e) => setNeckline(e.target.value)}
                  className="w-full text-xs font-semibold p-2 rounded-xl bg-cream-100 border border-plum/15 text-plum focus:outline-none"
                >
                  <option value="sweetheart">Sweetheart Neck</option>
                  <option value="boat">Boat Neck</option>
                  <option value="mandarin">Mandarin Collar</option>
                  <option value="deep-v">Plunge Deep-V</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-plum-soft block mb-1">
                  Sleeve Cut
                </label>
                <select
                  value={sleeve}
                  onChange={(e) => setSleeve(e.target.value)}
                  className="w-full text-xs font-semibold p-2 rounded-xl bg-cream-100 border border-plum/15 text-plum focus:outline-none"
                >
                  <option value="sleeveless">Sleeveless</option>
                  <option value="cap">Cap Sleeve</option>
                  <option value="elbow">Elbow Length</option>
                  <option value="full">Full Churidar Sleeve</option>
                  <option value="bell">Fluted Bell Sleeve</option>
                </select>
              </div>
            </div>

            {/* Embroidery Level */}
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-plum-soft block mb-1">
                Embroidery & Border Detailing
              </label>
              <select
                value={embroidery}
                onChange={(e) => setEmbroidery(e.target.value)}
                className="w-full text-xs font-semibold p-2.5 rounded-xl bg-cream-100 border border-plum/15 text-plum focus:outline-none"
              >
                {Object.values(EMBROIDERY_TYPES).map((emb) => (
                  <option key={emb.id} value={emb.id}>
                    {emb.name} (+₹{emb.priceOffset.toLocaleString('en-IN')})
                  </option>
                ))}
              </select>
            </div>

            {/* Dupatta & Toggles */}
            <div className="flex items-center justify-between pt-1 text-xs">
              <label className="flex items-center gap-2 cursor-pointer text-plum font-semibold">
                <input
                  type="checkbox"
                  checked={dupatta}
                  onChange={(e) => setDupatta(e.target.checked)}
                  className="rounded text-rose-deep focus:ring-rose-deep"
                />
                <span>Include Flowing Dupatta</span>
              </label>

              <label className="flex items-center gap-1.5 cursor-pointer text-xs font-semibold text-rose-deep">
                <Zap className="w-3.5 h-3.5" />
                <input
                  type="checkbox"
                  checked={express}
                  onChange={(e) => setExpress(e.target.checked)}
                  className="rounded text-rose-deep focus:ring-rose-deep"
                />
                <span>Express Tag (+25%)</span>
              </label>
            </div>

            {/* Gift Mode Toggle */}
            <div className="flex items-center justify-between text-xs pt-1 border-t border-plum/10">
              <label className="flex items-center gap-1.5 cursor-pointer text-plum-soft hover:text-plum">
                <Gift className="w-3.5 h-3.5 text-amber-700" />
                <span>Gift Mode (Hide price tag from recipient)</span>
              </label>
              <input
                type="checkbox"
                checked={giftMode}
                onChange={(e) => setGiftMode(e.target.checked)}
                className="rounded text-amber-600 focus:ring-amber-500"
              />
            </div>

            {/* Live Budget & Timeline Card with Count-Up */}
            <div className="rounded-2xl bg-cream-200 border border-blush p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-rose-deep">
                  Estimated Atelier Price
                </span>
                <span className="text-xs font-semibold text-plum flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-rose-deep" />
                  Ready in ~{estimatedDays} days
                </span>
              </div>

              <div className="flex items-baseline justify-between">
                <div className="font-fraunces text-2xl font-bold text-plum">
                  {giftMode ? (
                    <span className="text-base text-amber-900 font-sans italic">Price hidden (Gift Mode)</span>
                  ) : (
                    <span>₹{estimatedTotal.toLocaleString('en-IN')}</span>
                  )}
                </div>
                <span className="text-[10px] text-plum-soft">Includes 100% Free Doorstep Fit</span>
              </div>
            </div>

            {/* Stylist Notes Box */}
            <div className="p-3.5 rounded-2xl bg-white border border-blush/60 space-y-1.5 text-xs text-plum-soft">
              <span className="text-[10px] font-bold uppercase tracking-wider text-purple-900 flex items-center gap-1">
                <SparkleDoodle className="w-3.5 h-3.5" color="#D9718A" />
                Atelier Stylist Advice ({occasion})
              </span>
              <p className="text-[11px] leading-relaxed">
                {aiService.getStylistTips(occasion)[0]}
              </p>
            </div>
          </Card>
        </div>

      </div>

      {/* ================= 4 GENERATED RESULTS STRIP ================= */}
      {results.length > 0 && (
        <div className="pt-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-fraunces text-xl text-plum">
                Bespoke AI Variations
              </h3>
              <p className="text-xs text-plum-soft">
                Click any variation below to stage it on the canvas and customize parameters.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {results.map((card) => {
              const isSelected = selectedResultId === card.id;
              return (
                <motion.div
                  key={card.id}
                  whileHover={{ y: -4 }}
                  onClick={() => selectCard(card)}
                  className={`cursor-pointer rounded-3xl bg-white p-4 border transition-all flex flex-col justify-between ${
                    isSelected ? 'border-2 border-rose-deep ring-2 ring-blush shadow-soft-blush' : 'border-plum/10 shadow-xs hover:border-blush'
                  }`}
                >
                  <div className="aspect-[3/4] bg-cream-100 rounded-2xl overflow-hidden relative mb-3 flex items-center justify-center">
                    <Garment
                      type={card.silhouetteType}
                      colour={card.colour}
                      fabric={card.fabric}
                      neckline={card.neckline}
                      sleeve={card.sleeve}
                      embroidery={card.embroidery}
                      dupatta={card.dupatta}
                      width={180}
                      height={260}
                    />
                    <span className="absolute top-2 left-2 text-[9px] font-bold px-2 py-0.5 rounded-full bg-white/90 text-plum shadow-xs">
                      {card.tag}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-fraunces text-sm font-semibold text-plum truncate">
                      {card.title}
                    </h4>
                    <p className="text-[11px] text-plum-soft line-clamp-2 mt-0.5">
                      {card.stylistNote}
                    </p>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-plum/10 flex items-center justify-between text-xs">
                    <span className="font-bold text-plum">₹{card.price.toLocaleString('en-IN')}</span>
                    <Button variant={isSelected ? 'primary' : 'blush'} size="sm" className="text-[11px] py-1 px-3">
                      {isSelected ? 'Active on Stage' : 'Select'}
                    </Button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

      {/* ================= AR TRY-ON CAMERA MODAL ================= */}
      <Modal
        isOpen={arOpen}
        onClose={closeArTryOn}
        title="Atelier AR Mirror Simulation"
        subtitle="Align garment drape with your webcam or mirror silhouette"
        maxWidth="max-w-2xl"
      >
        <div className="space-y-4">
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-plum/90 flex items-center justify-center border border-blush/60">
            {/* Live Camera Feed */}
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Fallback Staging when camera is denied or loading */}
            {!cameraStream && (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6 text-center bg-plum/80 backdrop-blur-sm z-0">
                <Camera className="w-10 h-10 text-blush mb-2 animate-pulse" />
                <p className="text-sm font-semibold">Webcam Mirror Mode Standby</p>
                <p className="text-xs text-cream-200/80 max-w-sm mt-1">
                  If camera access is blocked in your browser, drag and resize the semi-transparent dress form over your space below.
                </p>
              </div>
            )}

            {/* Overlaid Adjustable Garment SVG */}
            <motion.div
              drag
              dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
              style={{ scale: arScale }}
              className="relative z-10 opacity-80 cursor-grab active:cursor-grabbing"
            >
              <Garment
                type={garmentType}
                colour={colour}
                fabric={fabric}
                neckline={neckline}
                sleeve={sleeve}
                embroidery={embroidery}
                dupatta={dupatta}
                width={220}
                height={340}
              />
            </motion.div>

            {/* Drag Tooltip */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[11px] text-white pointer-events-none">
              Drag to position silhouette • Scale below
            </div>
          </div>

          {/* Scale Slider */}
          <div className="flex items-center justify-between gap-4 p-3 bg-cream-100 rounded-2xl border border-plum/10 text-xs">
            <span className="font-semibold text-plum">Garment Size Adjust:</span>
            <input
              type="range"
              min="0.7"
              max="1.4"
              step="0.05"
              value={arScale}
              onChange={(e) => setArScale(parseFloat(e.target.value))}
              className="flex-1"
            />
            <span className="font-mono text-plum-soft">{Math.round(arScale * 100)}%</span>
          </div>

          <div className="pt-2 flex justify-between items-center">
            <Button variant="ghost" size="sm" onClick={closeArTryOn}>
              Close Mirror
            </Button>
            <Button
              variant="primary"
              size="md"
              onClick={() => {
                closeArTryOn();
                handleFindTailor();
              }}
              icon={ArrowRight}
              iconPosition="right"
            >
              Proceed With This Fit
            </Button>
          </div>
        </div>
      </Modal>

    </div>
  );
};
