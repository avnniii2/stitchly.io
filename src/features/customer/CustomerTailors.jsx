import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { tailorService } from '../../services/tailors';
import { orderService } from '../../services/orders';
import { useAuth } from '../../store/useAuth';
import { useUI } from '../../store/useUI';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { Chip } from '../../components/Chip';
import { Modal } from '../../components/Modal';
import { Garment } from '../../components/garment/Garment';
import { PinIcon, ScissorsIcon, NeedleIcon, SparkleDoodle } from '../../components/Doodles';
import { 
  Search, 
  Star, 
  Clock, 
  MapPin, 
  ShieldCheck, 
  Award, 
  ArrowRight, 
  Sparkles,
  Send,
  Calendar,
  CheckCircle2
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const CustomerTailors = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addToast } = useUI();

  // Incoming design from AI Studio or Wishlist
  const activeDesign = location.state?.activeDesign || {
    type: 'lehenga',
    colour: '#D9718A',
    colorName: 'Dusty Rose Gold',
    fabric: 'silk',
    neckline: 'sweetheart',
    sleeve: 'elbow',
    embroidery: 'heavy-zari',
    dupatta: true,
    price: 19500,
    occasion: 'Wedding / Sangeet'
  };

  const [tailors, setTailors] = useState([]);
  const [selectedCity, setSelectedCity] = useState('All');
  const [search, setSearch] = useState('');
  const [selectedTailor, setSelectedTailor] = useState(null);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [bookingNotes, setBookingNotes] = useState('Please ensure extra 2.5-inch margin in kali seams and matching Latkan tassels.');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    tailorService.matchTailorsForDesign(activeDesign, { city: selectedCity }).then(setTailors);
  }, [selectedCity]);

  const filtered = tailors.filter((t) => {
    return (
      !search.trim() ||
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.city.toLowerCase().includes(search.toLowerCase()) ||
      t.primarySpecialty.toLowerCase().includes(search.toLowerCase())
    );
  });

  const handleSendBookingRequest = async () => {
    if (!selectedTailor) return;
    setIsSubmitting(true);
    try {
      const newOrder = await orderService.createBookingRequest({
        customerId: user?.id || 'user-customer-1',
        customerName: user?.name || 'Priya Sharma',
        tailorId: selectedTailor.id,
        tailorName: selectedTailor.name,
        tailorCity: selectedTailor.city,
        title: `${activeDesign.colorName || 'Bespoke'} ${activeDesign.type.toUpperCase()}`,
        occasion: activeDesign.occasion || 'Wedding Sangeet',
        design: activeDesign,
        measurements: user?.savedMeasurements || { bust: 36, waist: 29, hip: 39 },
        notes: bookingNotes,
        budget: activeDesign.price || 19500,
        express: activeDesign.express,
        giftMode: activeDesign.giftMode
      });

      try {
        confetti({ particleCount: 50, spread: 70, origin: { y: 0.6 } });
      } catch {}

      addToast({
        title: 'Commission Request Sent!',
        message: `${selectedTailor.name} will review your measurements and send a formal quote.`,
        type: 'success'
      });

      setBookingModalOpen(false);
      navigate(`/app/orders`);
    } catch (err) {
      addToast({ title: 'Request failed', message: err.message, type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header & Attached Design Pill */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-blush/40 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-mint/50 border border-mint text-xs font-semibold text-emerald-950 uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
            <span>Smart Artisan Matchmaking</span>
          </div>
          <h1 className="font-fraunces text-2xl sm:text-3xl text-plum">
            Matched Master Tailors
          </h1>
          <p className="text-xs sm:text-sm text-plum-soft">
            Artisans certified for {activeDesign.fabric} craftsmanship and {activeDesign.embroidery} needlework.
          </p>
        </div>

        {/* Attached Design Mini Pill */}
        <div className="flex items-center gap-3 p-2.5 px-4 rounded-2xl bg-white border border-blush shadow-xs shrink-0">
          <div className="w-10 h-10 rounded-xl bg-cream-100 flex items-center justify-center shrink-0 overflow-hidden border border-blush/60">
            <Garment
              type={activeDesign.type}
              colour={activeDesign.colour}
              fabric={activeDesign.fabric}
              embroidery={activeDesign.embroidery}
              neckline={activeDesign.neckline}
              sleeve={activeDesign.sleeve}
              width={40}
              height={56}
            />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-rose-deep block">Attached Design</span>
            <span className="text-xs font-semibold text-plum capitalize">
              {activeDesign.colorName} • {activeDesign.type}
            </span>
          </div>
        </div>
      </div>

      {/* Filter / Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-3xl bg-white border border-mint/60 shadow-soft">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-plum-soft" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by master name or craft..."
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-cream-100 border border-plum/15 text-plum focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
          <span className="text-xs font-semibold text-plum-soft whitespace-nowrap">City Hub:</span>
          {['All', 'Jaipur', 'Bengaluru', 'Delhi', 'Mumbai'].map((city) => (
            <Chip
              key={city}
              variant={selectedCity === city ? 'mint' : 'neutral'}
              active={selectedCity === city}
              onClick={() => setSelectedCity(city)}
              size="sm"
            >
              {city}
            </Chip>
          ))}
        </div>
      </div>

      {/* Matched Tailor Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((tailor) => (
          <Card
            key={tailor.id}
            variant="glass"
            className="p-6 flex flex-col justify-between border-mint/60 shadow-soft hover:shadow-soft-lg transition-all"
          >
            <div>
              {/* Header with Match Ring */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <img
                    src={tailor.avatar}
                    alt={tailor.name}
                    className="w-14 h-14 rounded-2xl object-cover border-2 border-mint"
                  />
                  <div>
                    <h3 className="font-fraunces text-lg text-plum font-semibold">
                      {tailor.name}
                    </h3>
                    <p className="text-xs text-plum-soft flex items-center gap-1 mt-0.5">
                      <PinIcon className="w-3.5 h-3.5 text-rose-deep shrink-0" />
                      <span>{tailor.city}, {tailor.state || 'India'}</span>
                    </p>
                  </div>
                </div>

                {/* Match Percentage Ring Badge */}
                <div className="flex flex-col items-center justify-center w-12 h-12 rounded-full bg-mint/50 border-2 border-emerald-600 text-center shrink-0">
                  <span className="text-xs font-bold text-emerald-950">{tailor.matchScore}%</span>
                  <span className="text-[8px] text-emerald-800 uppercase font-semibold">Match</span>
                </div>
              </div>

              {/* Rationale pill */}
              <div className="p-2.5 rounded-xl bg-mint/20 border border-mint text-[11px] text-emerald-950 font-medium mb-3">
                {tailor.matchRationale}
              </div>

              {/* Metrics */}
              <div className="flex items-center justify-between text-xs py-2 px-3 rounded-xl bg-cream-100 border border-plum/5 text-plum-soft mb-3">
                <span className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  <strong className="text-plum">{tailor.rating}</strong> ({tailor.reviewCount})
                </span>
                <span>{tailor.experienceYears}y exp</span>
                <span>{tailor.responseTime}</span>
              </div>

              {/* Specialties */}
              <div className="flex flex-wrap gap-1 mb-4">
                {tailor.specialties?.slice(0, 3).map((spec) => (
                  <span key={spec} className="text-[10px] px-2 py-0.5 rounded-full bg-cream-200 border border-plum/10 text-plum">
                    {spec}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-plum/10 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-plum-soft block">Commission Range</span>
                <span className="text-xs font-bold text-plum">{tailor.priceRange}</span>
              </div>

              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  setSelectedTailor(tailor);
                  setBookingModalOpen(true);
                }}
                className="text-xs font-semibold"
              >
                Request Quote
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Booking Commission Modal */}
      <Modal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        title="Commission Workshop Booking"
        subtitle={`To: ${selectedTailor?.name} (${selectedTailor?.city})`}
        maxWidth="max-w-xl"
      >
        {selectedTailor && (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-cream-100 border border-plum/10 flex items-center gap-3">
              <div className="w-14 h-14 rounded-xl bg-white border border-blush flex items-center justify-center shrink-0 overflow-hidden">
                <Garment
                  type={activeDesign.type}
                  colour={activeDesign.colour}
                  fabric={activeDesign.fabric}
                  embroidery={activeDesign.embroidery}
                  neckline={activeDesign.neckline}
                  sleeve={activeDesign.sleeve}
                  width={50}
                  height={70}
                />
              </div>
              <div className="flex-1 min-w-0 text-xs">
                <h4 className="font-fraunces text-sm font-semibold text-plum">
                  {activeDesign.colorName} • {activeDesign.type.toUpperCase()}
                </h4>
                <p className="text-plum-soft">
                  Fabric: {FABRIC_TYPES[activeDesign.fabric]?.name} • Embroidery: {EMBROIDERY_TYPES[activeDesign.embroidery]?.name}
                </p>
                <p className="font-bold text-rose-deep mt-0.5">
                  Target Budget: ₹{activeDesign.price?.toLocaleString('en-IN')}
                </p>
              </div>
            </div>

            {/* Client Measurements Checklist */}
            <div className="p-3.5 rounded-2xl bg-mint/20 border border-mint text-xs text-emerald-950 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                <span>14-Point Verified Measurements Attached</span>
              </div>
              <span className="font-mono font-bold">Bust 36" • Waist 29"</span>
            </div>

            {/* Custom Notes to Tailor */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold uppercase tracking-wider text-plum">
                Special Tailoring Notes / Latkan Details
              </label>
              <textarea
                rows={2}
                value={bookingNotes}
                onChange={(e) => setBookingNotes(e.target.value)}
                className="w-full p-3 text-xs rounded-xl bg-cream-100 border border-plum/20 text-plum focus:outline-none"
              />
            </div>

            <div className="pt-2 flex justify-between items-center">
              <Button variant="ghost" size="sm" onClick={() => setBookingModalOpen(false)}>
                Cancel
              </Button>
              <Button
                variant="primary"
                size="md"
                isLoading={isSubmitting}
                icon={Send}
                iconPosition="right"
                onClick={handleSendBookingRequest}
                className="font-semibold shadow-soft-blush"
              >
                Send Request to Master Artisan
              </Button>
            </div>
          </div>
        )}
      </Modal>

    </div>
  );
};
