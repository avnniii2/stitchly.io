import React, { useState } from 'react';
import { useAuth } from '../../store/useAuth';
import { useUI } from '../../store/useUI';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { ScissorsIcon, PinIcon } from '../../components/Doodles';
import { 
  IndianRupee, 
  Calendar, 
  Sliders, 
  Save, 
  Zap, 
  CheckCircle2, 
  AlertCircle,
  Clock
} from 'lucide-react';

export const TailorPricing = () => {
  const { user } = useAuth();
  const { addToast } = useUI();

  // Pricing controls
  const [rates, setRates] = useState({
    lehenga: 18500,
    kurta: 7500,
    sherwani: 22000,
    anarkali: 12500,
    blouse: 3800,
  });

  const [capacity, setCapacity] = useState(6);
  const [expressMultiplier, setExpressMultiplier] = useState(25);
  const [blockedDays, setBlockedDays] = useState([
    '2026-10-18', // Diwali holiday
    '2026-10-19',
    '2026-10-20'
  ]);

  const handleRateChange = (garment, val) => {
    setRates({ ...rates, [garment]: Number(val) });
  };

  const handleSave = () => {
    addToast({
      title: 'Pricing & Availability Saved',
      message: 'Updated tailoring rate card and workshop schedule.',
      type: 'success',
    });
  };

  const toggleDay = (day) => {
    if (blockedDays.includes(day)) {
      setBlockedDays(blockedDays.filter((d) => d !== day));
    } else {
      setBlockedDays([...blockedDays, day]);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-mint/50 border border-mint text-[11px] font-semibold text-emerald-950 uppercase tracking-wider mb-1">
            <Sliders className="w-3.5 h-3.5 text-emerald-800" />
            <span>Workshop Economics</span>
          </div>
          <h1 className="font-fraunces text-2xl sm:text-3xl text-plum">
            Tailoring Rates & Capacity Controls
          </h1>
          <p className="text-xs sm:text-sm text-plum-soft">
            Set your bespoke making charges, rush order multipliers, and workshop availability calendar.
          </p>
        </div>

        <Button
          variant="primary"
          onClick={handleSave}
          icon={Save}
          className="bg-emerald-800 hover:bg-emerald-900 text-white text-xs shadow-soft-mint"
        >
          Save Atelier Settings
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Base Rate Cards */}
        <div className="lg:col-span-7 space-y-6">
          <Card variant="mint" className="p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-mint/40 pb-3">
              <h3 className="font-fraunces text-lg text-plum">
                Base Making Charges (₹ INR)
              </h3>
              <span className="text-[11px] text-emerald-900 font-semibold bg-white px-2 py-0.5 rounded-md border border-mint">
                Excludes Fabric Sourcing
              </span>
            </div>

            <div className="space-y-3">
              {Object.entries(rates).map(([garment, price]) => (
                <div
                  key={garment}
                  className="flex items-center justify-between p-3 rounded-xl bg-white border border-mint"
                >
                  <div>
                    <strong className="text-xs font-bold text-plum uppercase capitalize block">
                      {garment} Set
                    </strong>
                    <span className="text-[10px] text-plum-soft">
                      Includes 2 fittings + 2.5" internal seam margin
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-plum-soft">₹</span>
                    <input
                      type="number"
                      step="500"
                      value={price}
                      onChange={(e) => handleRateChange(garment, e.target.value)}
                      className="w-28 px-3 py-1.5 rounded-lg border border-plum/20 text-xs font-bold text-plum text-right focus:outline-none focus:ring-2 focus:ring-emerald-600"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Express Rush Surcharge */}
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-950 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-600 shrink-0" />
                <div>
                  <strong>Express Rush Surcharge (+{expressMultiplier}%)</strong>
                  <p className="text-[11px] text-amber-900">
                    Client pays 25% premium for prioritized 5-day dispatch.
                  </p>
                </div>
              </div>
              <input
                type="number"
                value={expressMultiplier}
                onChange={(e) => setExpressMultiplier(Number(e.target.value))}
                className="w-16 px-2 py-1 rounded-lg border border-amber-300 text-xs font-bold text-center"
              />
            </div>
          </Card>
        </div>

        {/* Right: Capacity & Availability Calendar */}
        <div className="lg:col-span-5 space-y-6">
          <Card variant="mint" className="p-6 space-y-5">
            <h3 className="font-fraunces text-lg text-plum">
              Workshop Capacity & Days Off
            </h3>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-plum">Monthly Cutting Capacity:</span>
                <strong className="text-emerald-900 font-bold">{capacity} Bespoke Outfits</strong>
              </div>
              <input
                type="range"
                min="2"
                max="15"
                value={capacity}
                onChange={(e) => setCapacity(Number(e.target.value))}
                className="w-full accent-emerald-700"
              />
              <span className="text-[10px] text-plum-soft block">
                Limits simultaneous booking requests to prevent craft quality compromise.
              </span>
            </div>

            <div className="space-y-2 pt-2 border-t border-mint/40">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-plum">Workshop Blocked Dates:</span>
                <span className="text-[10px] text-plum-soft">Click to toggle blackout days</span>
              </div>

              <div className="grid grid-cols-4 gap-2 text-center text-xs">
                {[
                  { date: '2026-10-18', label: '18 Oct (Diwali)' },
                  { date: '2026-10-19', label: '19 Oct (Diwali)' },
                  { date: '2026-10-20', label: '20 Oct (Padwa)' },
                  { date: '2026-11-04', label: '04 Nov (Dev Uthani)' },
                  { date: '2026-11-15', label: '15 Nov' },
                  { date: '2026-11-20', label: '20 Nov' },
                  { date: '2026-12-25', label: '25 Dec (Winter)' },
                  { date: '2026-12-31', label: '31 Dec' },
                ].map((item) => {
                  const isBlocked = blockedDays.includes(item.date);
                  return (
                    <button
                      key={item.date}
                      onClick={() => toggleDay(item.date)}
                      className={`p-2 rounded-xl text-[10px] font-bold transition-all ${
                        isBlocked
                          ? 'bg-rose-100 text-rose-900 border border-rose-300'
                          : 'bg-white border border-mint text-emerald-950 hover:bg-mint/30'
                      }`}
                    >
                      {item.label}
                      <span className="block text-[8px] mt-0.5 opacity-70">
                        {isBlocked ? 'Closed' : 'Open'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
