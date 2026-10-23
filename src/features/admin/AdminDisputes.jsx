import React, { useState } from 'react';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { useUI } from '../../store/useUI';
import { AlertTriangle, CheckCircle2, RotateCcw, ShieldAlert, ArrowRight, DollarSign } from 'lucide-react';

const INITIAL_DISPUTES = [
  {
    id: 'DISP-104',
    orderId: 'ST-7182',
    customerName: 'Ananya Deshmukh',
    tailorName: 'Master Rahmatullah Khan',
    issue: 'Bust dart seam 1.2 inches tighter than submitted 36" dimension.',
    amount: '₹14,200',
    status: 'Open Review',
    evidencePhotos: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400',
      'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=400'
    ],
    timestamp: 'Yesterday at 04:30 PM'
  },
  {
    id: 'DISP-105',
    orderId: 'ST-6540',
    customerName: 'Rohit Verma',
    tailorName: 'Ustad Irfan Ansari',
    issue: 'Delayed dispatch past scheduled sangeet event date.',
    amount: '₹22,500',
    status: 'Investigating',
    evidencePhotos: [
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400'
    ],
    timestamp: '2 days ago'
  }
];

export const AdminDisputes = () => {
  const { addToast } = useUI();
  const [disputes, setDisputes] = useState(INITIAL_DISPUTES);
  const [selectedDispute, setSelectedDispute] = useState(INITIAL_DISPUTES[0]);

  const handleAction = (disputeId, actionType) => {
    setDisputes((prev) =>
      prev.map((d) => (d.id === disputeId ? { ...d, status: `Resolved (${actionType})` } : d))
    );

    addToast({
      title: 'Dispute Action Executed',
      message: `Resolution: ${actionType} triggered for #${disputeId}. Parties notified.`,
      type: 'success',
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-sky/50 border border-sky-300 text-[11px] font-semibold text-blue-900 uppercase tracking-wider mb-1">
            <AlertTriangle className="w-3.5 h-3.5 text-blue-700" />
            <span>Resolution & Escrow Room</span>
          </div>
          <h1 className="font-fraunces text-2xl sm:text-3xl text-plum">
            Customer Guarantee & Dispute Management
          </h1>
          <p className="text-xs sm:text-sm text-plum-soft">
            Mediate doorstep fit claims, delivery delays, and manage Stitchly Escrow settlements.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs px-3 py-1.5 rounded-full bg-amber-100 text-amber-900 font-bold border border-amber-300">
            {disputes.filter((d) => !d.status.includes('Resolved')).length} Active Claims
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Dispute List */}
        <div className="lg:col-span-5 space-y-3">
          {disputes.map((item) => {
            const isSelected = selectedDispute?.id === item.id;
            return (
              <div
                key={item.id}
                onClick={() => setSelectedDispute(item)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer text-left ${
                  isSelected
                    ? 'bg-white border-blue-600 shadow-md ring-2 ring-blue-500/20'
                    : 'bg-white/80 border-sky/60 hover:bg-white'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="font-mono text-xs font-bold text-blue-950">
                      #{item.id} • Order {item.orderId}
                    </span>
                    <h4 className="font-fraunces text-base text-plum font-semibold mt-0.5">
                      {item.customerName}
                    </h4>
                    <p className="text-xs text-plum-soft">
                      Artisan: {item.tailorName}
                    </p>
                  </div>

                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 font-bold">
                    {item.status}
                  </span>
                </div>

                <p className="text-xs text-plum font-medium mt-2 line-clamp-2">
                  {item.issue}
                </p>

                <div className="mt-2 pt-2 border-t border-sky/30 flex items-center justify-between text-[11px] text-plum-soft">
                  <span>Escrow: {item.amount}</span>
                  <span>{item.timestamp}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Mediation Workspace */}
        {selectedDispute && (
          <div className="lg:col-span-7 space-y-6">
            <Card variant="sky" className="p-6 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-sky/40 pb-4">
                <div>
                  <span className="font-mono text-xs font-bold text-blue-950">
                    Dispute #{selectedDispute.id} • Escrow Amount: {selectedDispute.amount}
                  </span>
                  <h2 className="font-fraunces text-xl sm:text-2xl text-plum mt-1">
                    Claim from {selectedDispute.customerName}
                  </h2>
                  <p className="text-xs text-plum-soft">
                    Target Artisan: {selectedDispute.tailorName}
                  </p>
                </div>

                <span className="text-xs px-3 py-1 rounded-full font-bold bg-blue-100 text-blue-900 border border-blue-200 self-start">
                  {selectedDispute.status}
                </span>
              </div>

              {/* Evidence Statement */}
              <div className="p-4 rounded-xl bg-white border border-sky space-y-2 text-xs">
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-900 block">
                  Customer Claim & Problem Statement:
                </span>
                <p className="text-plum leading-relaxed text-sm font-medium">
                  "{selectedDispute.issue}"
                </p>
              </div>

              {/* Evidence Photos */}
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-950 block">
                  Submitted Photo Proof & Tape Measure Comparison:
                </span>
                <div className="grid grid-cols-2 gap-3">
                  {selectedDispute.evidencePhotos.map((url, i) => (
                    <img
                      key={i}
                      src={url}
                      alt="Dispute evidence"
                      className="w-full h-36 object-cover rounded-xl border border-sky"
                    />
                  ))}
                </div>
              </div>

              {/* Resolution Controls */}
              <div className="pt-4 border-t border-sky/40 space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-950 block">
                  Execute Official Resolution:
                </span>

                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleAction(selectedDispute.id, 'Claim Dismissed')}
                    className="text-xs border-sky text-plum-soft hover:text-plum"
                  >
                    Dismiss Claim
                  </Button>

                  <Button
                    variant="secondary"
                    size="sm"
                    icon={RotateCcw}
                    onClick={() => handleAction(selectedDispute.id, 'Free Re-Stitch Authorized')}
                    className="text-xs bg-amber-100 text-amber-900 border-amber-300"
                  >
                    Authorize Free Re-Stitch
                  </Button>

                  <Button
                    variant="primary"
                    size="sm"
                    icon={DollarSign}
                    onClick={() => handleAction(selectedDispute.id, 'Full Escrow Refund')}
                    className="text-xs bg-blue-800 hover:bg-blue-900 text-white"
                  >
                    Issue Escrow Refund to Customer
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};
