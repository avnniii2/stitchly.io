import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SEED_USERS } from '../../data/seed';
import { Button } from '../../components/Button';
import { Chip } from '../../components/Chip';
import { Modal } from '../../components/Modal';
import { PinIcon, ScissorsIcon, NeedleIcon } from '../../components/Doodles';
import { Search, Star, Clock, MapPin, Award, CheckCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

export const TailorsPage = () => {
  const navigate = useNavigate();
  const allTailors = SEED_USERS.filter((u) => u.role === 'tailor');

  const [selectedCity, setSelectedCity] = useState('All');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTailor, setSelectedTailor] = useState(null);

  const cities = ['All', 'Jaipur', 'Bengaluru', 'Delhi', 'Mumbai'];
  const specialties = ['All', 'Bridal Lehengas', 'Aari Work', 'Chikankari', 'Fusion'];

  const filteredTailors = allTailors.filter((tailor) => {
    const matchesCity = selectedCity === 'All' || tailor.city.toLowerCase() === selectedCity.toLowerCase();
    const matchesSpecialty = selectedSpecialty === 'All' || 
      tailor.primarySpecialty.toLowerCase().includes(selectedSpecialty.toLowerCase()) ||
      tailor.specialties.some(s => s.toLowerCase().includes(selectedSpecialty.toLowerCase()));
    const matchesSearch = !searchQuery.trim() || 
      tailor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tailor.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tailor.primarySpecialty.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCity && matchesSpecialty && matchesSearch;
  });

  return (
    <div className="py-12 bg-cream atelier-grain min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-mint/50 border border-mint text-xs font-semibold text-emerald-950 uppercase tracking-wider mb-3">
            <PinIcon className="w-3.5 h-3.5 text-emerald-700" />
            <span>Artisan Directory</span>
          </div>

          <h1 className="font-fraunces text-4xl sm:text-5xl text-plum font-normal tracking-tight">
            Independent <span className="chalk-underline chalk-underline-mint">Master Tailors</span>
          </h1>
          <p className="text-sm sm:text-base text-plum-soft mt-3 leading-relaxed">
            Discover verified heritage karigars from India's iconic craft hubs. 
            Direct pricing, zero middleman markups, and guaranteed artisan standards.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="rounded-3xl bg-white/90 backdrop-blur-md p-6 border border-mint/60 shadow-soft space-y-4">
          {/* Search Box */}
          <div className="relative thread-input rounded-2xl border border-plum/20 bg-cream-100 overflow-hidden max-w-lg">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-plum-soft" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by master name, craft or city (e.g. Jaipur, Zardozi, Aari)..."
              className="w-full pl-10 pr-4 py-2.5 bg-transparent text-xs sm:text-sm text-plum placeholder-plum-soft/60 focus:outline-none"
            />
          </div>

          {/* City Chips */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-xs font-semibold text-plum-soft mr-2">City Hub:</span>
            {cities.map((city) => (
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

          {/* Specialty Chips */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-xs font-semibold text-plum-soft mr-2">Craft Specialty:</span>
            {specialties.map((spec) => (
              <Chip
                key={spec}
                variant={selectedSpecialty === spec ? 'blush' : 'neutral'}
                active={selectedSpecialty === spec}
                onClick={() => setSelectedSpecialty(spec)}
                size="sm"
              >
                {spec}
              </Chip>
            ))}
          </div>
        </div>

        {/* Tailors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTailors.map((tailor) => (
            <motion.div
              key={tailor.id}
              whileHover={{ y: -6 }}
              className="rounded-3xl bg-white/85 backdrop-blur-md p-6 border border-mint/60 shadow-soft flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={tailor.avatar}
                      alt={tailor.name}
                      className="w-14 h-14 rounded-2xl object-cover border-2 border-mint shadow-xs"
                    />
                    <div>
                      <h3 className="font-fraunces text-lg text-plum font-semibold">
                        {tailor.name}
                      </h3>
                      <div className="flex items-center gap-1 text-xs text-plum-soft mt-0.5">
                        <PinIcon className="w-3.5 h-3.5 text-rose-deep shrink-0" />
                        <span>{tailor.city}, {tailor.state}</span>
                      </div>
                    </div>
                  </div>

                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${
                    tailor.verified 
                      ? 'bg-mint text-emerald-950 border-mint-400' 
                      : 'bg-amber-100 text-amber-900 border-amber-300'
                  }`}>
                    {tailor.badge}
                  </span>
                </div>

                <div className="flex items-center gap-4 py-2 px-3 rounded-2xl bg-cream-100 border border-plum/5 text-xs mb-3">
                  <div className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    <span className="font-bold text-plum">{tailor.rating}</span>
                    <span className="text-plum-soft">({tailor.reviewCount})</span>
                  </div>
                  <div className="w-px h-3 bg-plum/20" />
                  <div className="flex items-center gap-1 text-plum-soft">
                    <Clock className="w-3.5 h-3.5 text-emerald-700" />
                    <span>{tailor.responseTime}</span>
                  </div>
                  <div className="w-px h-3 bg-plum/20" />
                  <div className="text-plum-soft">
                    {tailor.experienceYears}y craft
                  </div>
                </div>

                <p className="text-xs text-plum-soft leading-relaxed line-clamp-3 mb-4">
                  {tailor.bio}
                </p>

                <div className="space-y-1.5 mb-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-plum-soft">
                    Specialties:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {tailor.specialties.map((spec) => (
                      <span
                        key={spec}
                        className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-mint/40 text-emerald-950 border border-mint/80"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-mint/30 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-plum-soft block">Typical Price</span>
                  <span className="text-xs font-bold text-plum">{tailor.priceRange}</span>
                </div>
                <Button
                  variant="mint"
                  size="sm"
                  onClick={() => setSelectedTailor(tailor)}
                  className="font-semibold text-xs"
                >
                  View Profile
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tailor Detail Modal */}
        <Modal
          isOpen={Boolean(selectedTailor)}
          onClose={() => setSelectedTailor(null)}
          title={selectedTailor?.name}
          subtitle={`${selectedTailor?.primarySpecialty} • ${selectedTailor?.city}`}
          maxWidth="max-w-2xl"
        >
          {selectedTailor && (
            <div className="space-y-5">
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-mint/20 border border-mint">
                <img
                  src={selectedTailor.avatar}
                  alt={selectedTailor.name}
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-mint"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-fraunces text-xl text-plum">{selectedTailor.name}</h4>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-mint text-emerald-950 font-bold">
                      {selectedTailor.badge}
                    </span>
                  </div>
                  <p className="text-xs text-plum-soft mt-0.5">{selectedTailor.address}, {selectedTailor.city}</p>
                  <p className="text-xs text-emerald-800 font-medium mt-1">
                    {selectedTailor.experienceYears} Years Master Experience • {selectedTailor.completedOutfits} Handcrafted Outfits
                  </p>
                </div>
              </div>

              <div>
                <h5 className="text-xs font-bold uppercase tracking-wider text-plum-soft mb-1.5">
                  About the Master Karigar
                </h5>
                <p className="text-sm text-plum leading-relaxed bg-cream-100 p-4 rounded-2xl border border-plum/10">
                  {selectedTailor.bio}
                </p>
              </div>

              {selectedTailor.featuredWork && selectedTailor.featuredWork.length > 0 && (
                <div>
                  <h5 className="text-xs font-bold uppercase tracking-wider text-plum-soft mb-2">
                    Recent Atelier Commissions
                  </h5>
                  <div className="grid grid-cols-2 gap-3">
                    {selectedTailor.featuredWork.map((fw, idx) => (
                      <div key={idx} className="rounded-xl overflow-hidden border border-mint/50 relative aspect-[4/3]">
                        <img src={fw.image} alt={fw.title} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-2.5">
                          <span className="text-xs text-white font-medium">{fw.title}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-3 border-t border-plum/10 flex justify-between items-center">
                <div>
                  <span className="text-xs text-plum-soft block">Commission Range</span>
                  <span className="text-sm font-bold text-plum">{selectedTailor.priceRange}</span>
                </div>
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => {
                    setSelectedTailor(null);
                    navigate('/signup');
                  }}
                  icon={ArrowRight}
                  iconPosition="right"
                >
                  Request Match with {selectedTailor.name.split(' ')[0]}
                </Button>
              </div>
            </div>
          )}
        </Modal>

      </div>
    </div>
  );
};
