import React, { useState } from 'react';
import { useAuth } from '../../store/useAuth';
import { useUI } from '../../store/useUI';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { TapeMeasure } from '../../components/TapeMeasure';
import { Ruler, CheckCircle2, Video, Package, Save, User, Users, HelpCircle, ShieldCheck } from 'lucide-react';

const INITIAL_PROFILES = {
  self: {
    name: 'Priya Sharma (Self)',
    relation: 'Self',
    bust: 36,
    waist: 29,
    hip: 39,
    shoulder: 14.5,
    blouseLength: 15,
    lehengaLength: 41,
    armhole: 16,
  },
  spouse: {
    name: 'Vikram Sharma (Spouse)',
    relation: 'Spouse',
    chest: 40,
    waist: 34,
    shoulder: 18,
    kurtaLength: 42,
    sleeveLength: 25.5,
    neck: 16,
  },
  child: {
    name: 'Aanya (Daughter, 8 Yrs)',
    relation: 'Child',
    chest: 26,
    waist: 23,
    hip: 28,
    shoulder: 11,
    lehengaLength: 30,
    armhole: 12,
  },
};

const MEASUREMENT_TIPS = {
  bust: 'Measure around the fullest part of your bust, keeping the tape comfortably snug and parallel to the floor.',
  waist: 'Measure around your natural waistline, where you typically tie your lehenga waistband or petticoat.',
  hip: 'Stand with feet together and measure around the fullest part of your hips/seat.',
  shoulder: 'Measure across the back from the edge of one shoulder bone across the neck base to the other.',
  blouseLength: 'Measure from high shoulder point down to desired lower crop hem (usually 14-16 inches).',
  lehengaLength: 'Measure from your belly button / tying point down to the floor, wearing your expected heel height.',
  armhole: 'Wrap the tape loosely around the armpit and over the shoulder point where the sleeve attaches.',
  chest: 'Measure around the broadest part of the chest under armpits.',
  kurtaLength: 'From shoulder seam down to just below the knee.',
  sleeveLength: 'From shoulder bone down to wrist bone.',
  neck: 'Around base of neck where mandarin collar sits comfortably with one finger breathing room.',
};

export const CustomerMeasurements = () => {
  const { user } = useAuth();
  const { addToast } = useUI();
  const [activeProfileKey, setActiveProfileKey] = useState('self');
  const [profiles, setProfiles] = useState(INITIAL_PROFILES);
  const [unit, setUnit] = useState('inches'); // 'inches' | 'cm'
  const [activeTipField, setActiveTipField] = useState('bust');

  const currentProfile = profiles[activeProfileKey];

  const handleValueChange = (key, val) => {
    const num = parseFloat(val) || 0;
    setProfiles({
      ...profiles,
      [activeProfileKey]: {
        ...profiles[activeProfileKey],
        [key]: unit === 'cm' ? parseFloat((num / 2.54).toFixed(1)) : num,
      },
    });
  };

  const handleSave = () => {
    addToast({
      title: 'Measurement Profile Saved',
      message: `${currentProfile.name} is securely synced to all master tailoring orders.`,
      type: 'success',
    });
  };

  const displayVal = (inchesVal) => {
    if (unit === 'cm') {
      return (inchesVal * 2.54).toFixed(1);
    }
    return inchesVal;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-blush/40 border border-blush text-[11px] font-semibold text-rose-deep uppercase tracking-wider mb-1">
            <Ruler className="w-3.5 h-3.5 text-rose-deep" />
            <span>Doorstep Tailoring Profile</span>
          </div>
          <h1 className="font-fraunces text-2xl sm:text-3xl text-plum">
            Precision Measurement Profiles & Family Vault
          </h1>
          <p className="text-xs sm:text-sm text-plum-soft">
            Save individual fit profiles for yourself, spouse, and family members. Backed by our 100% Free Doorstep Alteration Guarantee.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Unit Toggle */}
          <div className="flex items-center p-1 rounded-full bg-cream-100 border border-plum/10 shadow-xs">
            <button
              onClick={() => setUnit('inches')}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                unit === 'inches'
                  ? 'bg-rose-deep text-white shadow-xs'
                  : 'text-plum-soft hover:text-plum'
              }`}
            >
              Inches (in)
            </button>
            <button
              onClick={() => setUnit('cm')}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                unit === 'cm'
                  ? 'bg-rose-deep text-white shadow-xs'
                  : 'text-plum-soft hover:text-plum'
              }`}
            >
              Centimeters (cm)
            </button>
          </div>

          <Button
            variant="primary"
            onClick={handleSave}
            icon={Save}
            className="text-xs shadow-soft-blush"
          >
            Save Profile
          </Button>
        </div>
      </div>

      {/* Profiles Tabs */}
      <div className="flex items-center gap-2 border-b border-blush/40 pb-2 overflow-x-auto no-scrollbar">
        {Object.entries(profiles).map(([key, prof]) => (
          <button
            key={key}
            onClick={() => {
              setActiveProfileKey(key);
              const firstKey = Object.keys(prof).find((k) => !['name', 'relation'].includes(k));
              if (firstKey) setActiveTipField(firstKey);
            }}
            className={`px-4 py-2 rounded-2xl text-xs font-bold flex items-center gap-2 transition-all whitespace-nowrap ${
              activeProfileKey === key
                ? 'bg-plum text-white shadow-md'
                : 'bg-white border border-blush text-plum-soft hover:text-plum'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>{prof.name}</span>
          </button>
        ))}
      </div>

      {/* Highlights Banner */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card variant="glass" className="p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-butter flex items-center justify-center shrink-0">
            <Package className="w-5 h-5 text-amber-800" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-plum">Doorstep Measurement Kit</h4>
            <p className="text-[11px] text-plum-soft">Tape Measure #TM-89 Delivered</p>
          </div>
        </Card>

        <Card variant="glass" className="p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-mint flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5 text-emerald-800" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-plum">100% Fit Guarantee</h4>
            <p className="text-[11px] text-emerald-800 font-semibold">2.5" Hidden Seam Margin Included</p>
          </div>
        </Card>

        <Card variant="glass" className="p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blush flex items-center justify-center shrink-0">
            <Video className="w-5 h-5 text-rose-deep" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-plum">Virtual Fitting Master</h4>
            <p className="text-[11px] text-plum-soft">10-Min Live Video Call Assistance</p>
          </div>
        </Card>
      </div>

      {/* Main Measurement Inputs & Illustrated Guide */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Inputs */}
        <div className="lg:col-span-7 space-y-4">
          <Card variant="glass" className="p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-blush/40 pb-3">
              <div>
                <h3 className="font-fraunces text-lg text-plum">
                  {currentProfile.name}
                </h3>
                <span className="text-[11px] text-plum-soft">
                  Click any field to view the atelier placement illustration and measuring tips.
                </span>
              </div>
              <span className="text-xs font-bold text-rose-deep uppercase">
                {unit.toUpperCase()}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {Object.entries(currentProfile)
                .filter(([k]) => !['name', 'relation'].includes(k))
                .map(([fieldKey, val]) => {
                  const isActive = activeTipField === fieldKey;
                  return (
                    <div
                      key={fieldKey}
                      onClick={() => setActiveTipField(fieldKey)}
                      className={`p-3 rounded-2xl border transition-all cursor-pointer ${
                        isActive
                          ? 'bg-blush/30 border-rose-deep shadow-xs'
                          : 'bg-cream-100 border-plum/10 hover:border-blush'
                      }`}
                    >
                      <label className="text-[10px] font-bold uppercase tracking-wider text-plum capitalize block mb-1">
                        {fieldKey.replace(/([A-Z])/g, ' $1')}
                      </label>
                      <div className="flex items-center gap-1.5">
                        <input
                          type="number"
                          step={unit === 'cm' ? '1' : '0.5'}
                          value={displayVal(val)}
                          onChange={(e) => handleValueChange(fieldKey, e.target.value)}
                          className="w-full text-sm font-bold text-plum bg-white px-2.5 py-1 rounded-lg border border-plum/20 focus:outline-none focus:ring-2 focus:ring-rose-deep"
                        />
                        <span className="text-xs font-semibold text-plum-soft">
                          {unit === 'cm' ? 'cm' : '"'}
                        </span>
                      </div>
                    </div>
                  );
                })}
            </div>
          </Card>
        </div>

        {/* Right Illustrated Guide Tip */}
        <div className="lg:col-span-5 space-y-4">
          <Card variant="glass" className="p-6 space-y-4 border-2 border-blush">
            <div className="flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-rose-deep" />
              <h3 className="font-fraunces text-base text-plum font-semibold capitalize">
                How to Measure: {activeTipField.replace(/([A-Z])/g, ' $1')}
              </h3>
            </div>

            <div className="p-4 rounded-2xl bg-cream-50 border border-plum/10 space-y-3">
              <div className="aspect-16/9 rounded-xl bg-blush/20 flex items-center justify-center p-4 text-center">
                <TapeMeasure />
              </div>
              <p className="text-xs text-plum leading-relaxed font-medium">
                {MEASUREMENT_TIPS[activeTipField] ||
                  'Keep the tape flat against the body without pulling too tightly. Breathe normally.'}
              </p>
            </div>

            <div className="text-[11px] text-plum-soft space-y-1">
              <p>💡 <strong>Tailor Guarantee Note:</strong> All Stitchly master karigars automatically leave 2.5 inches of internal margin folds inside both side seams for lifetime flexibility.</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
