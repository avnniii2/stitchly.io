import React, { useState } from 'react';
import { useAuth } from '../../store/useAuth';
import { useUI } from '../../store/useUI';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { TapeMeasure } from '../../components/TapeMeasure';
import { ScissorsIcon, PinIcon } from '../../components/Doodles';
import { 
  ClipboardList, 
  Calendar, 
  Clock, 
  Upload, 
  CheckCircle2, 
  Camera,
  AlertCircle,
  Eye
} from 'lucide-react';

export const TailorDashboard = () => {
  const { user } = useAuth();
  const { addToast } = useUI();
  const [currentStep, setCurrentStep] = useState(4); // Stage 4: Embroidery

  const handleUpdateStatus = () => {
    setCurrentStep((prev) => Math.min(6, prev + 1));
    addToast({
      title: 'Milestone Progressed',
      message: 'Client notified with live workshop status.',
      type: 'stitch'
    });
  };

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-mint/50 via-mint/20 to-white border border-mint p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-soft-mint">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/90 border border-mint text-[11px] font-semibold text-emerald-950 uppercase tracking-wider">
            <ScissorsIcon className="w-3.5 h-3.5" color="#2E8B57" />
            <span>Master Atelier Workspace</span>
          </div>
          <h1 className="font-fraunces text-2xl sm:text-3xl text-plum">
            Salaam, {user?.name || 'Master Rahmatullah'}
          </h1>
          <p className="text-xs sm:text-sm text-plum-soft">
            Operating from {user?.city || 'Jaipur'} • Craft Specialization: {user?.primarySpecialty || 'Bridal Zardozi'}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-white px-4 py-2 rounded-2xl border border-mint shadow-xs text-center">
            <span className="text-[10px] text-plum-soft uppercase font-bold block">Capacity</span>
            <span className="text-sm font-bold text-emerald-800">4 / 6 Outfits</span>
          </div>
          <div className="bg-white px-4 py-2 rounded-2xl border border-mint shadow-xs text-center">
            <span className="text-[10px] text-plum-soft uppercase font-bold block">Rating</span>
            <span className="text-sm font-bold text-amber-600">4.96 ★</span>
          </div>
        </div>
      </div>

      {/* Active Work on the Cutting Table */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-fraunces text-xl text-plum">
            On The Workshop Frame (Active Commission)
          </h2>
          <span className="text-xs text-emerald-800 font-semibold">1 Commission in progress</span>
        </div>

        <Card variant="mint" className="p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-mint/40 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-emerald-900">
                  Order #ST-8921
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-mint text-emerald-950">
                  Priority Bridal Commission
                </span>
              </div>
              <h3 className="font-fraunces text-xl sm:text-2xl text-plum mt-1">
                Mulberry Silk Zari Lehenga
              </h3>
              <p className="text-xs text-plum-soft">
                Client: Priya Sharma (Mumbai) • Deadline: 04 Oct 2026
              </p>
            </div>

            <div className="text-left sm:text-right">
              <span className="text-xs text-plum-soft block">Payout Allocated</span>
              <span className="text-base font-bold text-emerald-900">₹18,500</span>
            </div>
          </div>

          {/* Measurements Specifications */}
          <div className="bg-white/80 p-4 rounded-2xl border border-mint text-xs space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-900 block">
              Verified Client Dimensions (Inches):
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-plum">
              <div>Bust: <strong className="font-mono">36.0"</strong></div>
              <div>Waist: <strong className="font-mono">29.0"</strong></div>
              <div>Hip: <strong className="font-mono">39.0"</strong></div>
              <div>Lehenga Length: <strong className="font-mono">41.0"</strong></div>
            </div>
            <p className="text-[11px] text-plum-soft italic pt-1">
              Note: Include 2.5-inch hidden margin inside each kali seam for future adjustments.
            </p>
          </div>

          {/* Milestone Update Trigger */}
          <div className="space-y-2">
            <TapeMeasure 
              progress={currentStep >= 5 ? 85 : 65} 
              label={`Current Atelier Stage: Stage 0${currentStep} of 06`} 
            />
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-mint/30">
            <Button
              variant="secondary"
              size="sm"
              icon={Camera}
              onClick={() => addToast({ title: 'Workshop Photo Uploaded', message: 'Attached to client milestone view.', type: 'stitch' })}
              className="text-xs w-full sm:w-auto"
            >
              Upload Live Workshop Photo
            </Button>

            <Button
              variant="mint"
              size="sm"
              icon={CheckCircle2}
              onClick={handleUpdateStatus}
              className="text-xs w-full sm:w-auto font-semibold"
            >
              Advance to Next Atelier Milestone
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};
