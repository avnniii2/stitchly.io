import React, { useState, useEffect } from 'react';
import { tailorService } from '../../services/tailors';
import { useUI } from '../../store/useUI';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { Modal } from '../../components/Modal';
import { PinIcon, ScissorsIcon } from '../../components/Doodles';
import { CheckCircle2, XCircle, FileText, Star, Clock, ShieldCheck, Eye } from 'lucide-react';
import confetti from 'canvas-confetti';

export const AdminTailors = () => {
  const { addToast } = useUI();
  const [tailors, setTailors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedKycDoc, setSelectedKycDoc] = useState(null);

  const loadTailors = async () => {
    setIsLoading(true);
    const data = await tailorService.getTailors();
    setTailors(data);
    setIsLoading(false);
  };

  useEffect(() => {
    loadTailors();
  }, []);

  const handleApprove = async (id, name) => {
    await tailorService.updateTailorKycStatus(id, 'approved');
    try {
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
    } catch {}
    addToast({
      title: 'Tailor Approved!',
      message: `${name} has been certified as a verified Stitchly master artisan.`,
      type: 'success'
    });
    loadTailors();
  };

  const handleReject = async (id, name) => {
    await tailorService.updateTailorKycStatus(id, 'rejected');
    addToast({
      title: 'Application Rejected',
      message: `${name}’s KYC was flagged for missing craft documentation.`,
      type: 'error'
    });
    loadTailors();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-fraunces text-2xl sm:text-3xl text-plum">
            Tailor Applications & Guild Verification
          </h1>
          <p className="text-xs sm:text-sm text-plum-soft mt-1">
            Audit workshop registrations, seam standards, and craft certifications.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {tailors.map((tailor) => {
          const isPending = tailor.kycStatus === 'pending';
          const isApproved = tailor.kycStatus === 'approved' || tailor.verified;

          return (
            <Card
              key={tailor.id}
              variant={isPending ? 'blush' : 'glass'}
              className={`p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 transition-all ${
                isPending ? 'border-2 border-rose-deep shadow-soft-blush' : ''
              }`}
            >
              <div className="flex items-start gap-4">
                <img
                  src={tailor.avatar}
                  alt={tailor.name}
                  className="w-14 h-14 rounded-2xl object-cover border-2 border-plum/10 shrink-0"
                />

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-fraunces text-lg text-plum font-semibold">
                      {tailor.name}
                    </h3>
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                      isPending 
                        ? 'bg-amber-100 text-amber-900 border border-amber-300 animate-pulse' 
                        : isApproved 
                        ? 'bg-mint text-emerald-950 border border-mint-400' 
                        : 'bg-rose-100 text-rose-900'
                    }`}>
                      {tailor.badge}
                    </span>
                  </div>

                  <p className="text-xs text-plum-soft">
                    {tailor.city}, {tailor.state || 'India'} • {tailor.primarySpecialty}
                  </p>

                  <div className="flex items-center gap-3 text-[11px] text-plum-soft pt-1">
                    <span>{tailor.experienceYears} Years Craft</span>
                    <span>•</span>
                    <span>{tailor.email}</span>
                    <span>•</span>
                    <span>{tailor.phone}</span>
                  </div>
                </div>
              </div>

              {/* Actions & Status Controls */}
              <div className="flex flex-wrap items-center gap-3 shrink-0">
                {tailor.kycDocument && (
                  <Button
                    variant="secondary"
                    size="sm"
                    icon={FileText}
                    onClick={() => setSelectedKycDoc(tailor)}
                    className="text-xs"
                  >
                    View KYC Doc
                  </Button>
                )}

                {isPending && (
                  <>
                    <Button
                      variant="primary"
                      size="sm"
                      icon={CheckCircle2}
                      onClick={() => handleApprove(tailor.id, tailor.name)}
                      className="text-xs font-semibold"
                    >
                      Approve Master
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      icon={XCircle}
                      onClick={() => handleReject(tailor.id, tailor.name)}
                      className="text-xs text-rose-deep hover:bg-rose-50"
                    >
                      Reject
                    </Button>
                  </>
                )}

                {isApproved && (
                  <div className="flex items-center gap-1.5 text-xs text-emerald-800 font-semibold px-3 py-1.5 rounded-full bg-mint/50">
                    <ShieldCheck className="w-4 h-4 text-emerald-700" />
                    <span>Verified Artisan</span>
                  </div>
                )}
              </div>
            </Card>
          );
        })}
      </div>

      {/* KYC Inspector Modal */}
      <Modal
        isOpen={Boolean(selectedKycDoc)}
        onClose={() => setSelectedKycDoc(null)}
        title="Workshop Verification Document"
        subtitle={`Applicant: ${selectedKycDoc?.name} (${selectedKycDoc?.city})`}
      >
        {selectedKycDoc && (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-cream-100 border border-plum/10 text-xs text-plum space-y-2">
              <div className="flex justify-between items-center font-semibold">
                <span>Document Status</span>
                <span className="uppercase text-rose-deep font-mono">{selectedKycDoc.kycStatus}</span>
              </div>
              <p className="text-plum-soft">
                Attached document is base64 encoded and stored in the Stitchly mock persistent registry.
              </p>
              <div className="font-mono text-[10px] text-plum-soft break-all p-2 bg-white rounded-lg border border-plum/10">
                {selectedKycDoc.kycDocument.slice(0, 120)}... [Base64 Validated]
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <Button variant="ghost" size="sm" onClick={() => setSelectedKycDoc(null)}>
                Close Viewer
              </Button>
              {selectedKycDoc.kycStatus === 'pending' && (
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    handleApprove(selectedKycDoc.id, selectedKycDoc.name);
                    setSelectedKycDoc(null);
                  }}
                >
                  Approve Application Now
                </Button>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
