import React, { useState, useEffect } from 'react';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { Modal } from '../../components/Modal';
import { useUI } from '../../store/useUI';
import { getStoredUsers, saveStoredUsers } from '../../services/storage';
import { notificationService } from '../../services/notifications';
import { UserCheck, ShieldCheck, XCircle, FileText, CheckCircle2, Eye, AlertTriangle } from 'lucide-react';

export const AdminVerification = () => {
  const { addToast } = useUI();
  const [users, setUsers] = useState([]);
  const [selectedTailor, setSelectedTailor] = useState(null);
  const [rejectReason, setRejectReason] = useState('');
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);

  const loadTailors = () => {
    const all = getStoredUsers();
    const tailors = all.filter((u) => u.role === 'tailor');
    setUsers(tailors);
  };

  useEffect(() => {
    loadTailors();
    window.addEventListener('storage', loadTailors);
    return () => window.removeEventListener('storage', loadTailors);
  }, []);

  const handleApprove = async (tailor) => {
    const all = getStoredUsers();
    const idx = all.findIndex((u) => u.id === tailor.id);
    if (idx !== -1) {
      all[idx].verified = true;
      all[idx].kycStatus = 'verified';
      saveStoredUsers(all);

      await notificationService.addNotification({
        userId: tailor.id,
        role: 'tailor',
        title: 'Atelier KYC Approved! 🎉',
        message: 'Your workshop documents have been verified by Admin. Your profile is now live with Verified Artisan status.',
        type: 'kyc',
      });

      addToast({
        title: 'Artisan Verified',
        message: `${tailor.name} has been granted Verified Artisan status.`,
        type: 'success',
      });

      loadTailors();
      setSelectedTailor(null);
    }
  };

  const handleReject = async () => {
    if (!selectedTailor) return;
    const all = getStoredUsers();
    const idx = all.findIndex((u) => u.id === selectedTailor.id);
    if (idx !== -1) {
      all[idx].verified = false;
      all[idx].kycStatus = 'rejected';
      all[idx].kycReason = rejectReason || 'Incomplete address or unverified guild document.';
      saveStoredUsers(all);

      await notificationService.addNotification({
        userId: selectedTailor.id,
        role: 'tailor',
        title: 'KYC Resubmission Needed',
        message: `Admin feedback: ${all[idx].kycReason}`,
        type: 'kyc',
      });

      addToast({
        title: 'Application Rejected',
        message: `${selectedTailor.name} notified with resubmission reason.`,
        type: 'info',
      });

      loadTailors();
      setIsRejectModalOpen(false);
      setSelectedTailor(null);
      setRejectReason('');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-sky/50 border border-sky-300 text-[11px] font-semibold text-blue-900 uppercase tracking-wider mb-1">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-700" />
            <span>Artisan Trust & Safety</span>
          </div>
          <h1 className="font-fraunces text-2xl sm:text-3xl text-plum">
            Tailor Verification & KYC Queue
          </h1>
          <p className="text-xs sm:text-sm text-plum-soft">
            Review identity proofs, workshop establishment certificates, and approve independent karigars.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs px-3 py-1.5 rounded-full bg-blue-100 text-blue-900 font-bold border border-blue-200">
            {users.filter((u) => u.kycStatus === 'pending' || !u.verified).length} Pending Verification
          </span>
        </div>
      </div>

      {/* Tailors Table / Cards */}
      <div className="space-y-4">
        {users.map((tailor) => {
          const isVerified = tailor.verified && tailor.kycStatus === 'verified';
          return (
            <Card key={tailor.id} variant="sky" className="p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <img
                    src={tailor.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100'}
                    alt={tailor.name}
                    className="w-14 h-14 rounded-2xl object-cover border-2 border-sky"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-fraunces text-lg text-plum font-semibold">
                        {tailor.name}
                      </h3>
                      <span
                        className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                          isVerified
                            ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                            : 'bg-amber-100 text-amber-900 border border-amber-300'
                        }`}
                      >
                        {isVerified ? 'Verified Artisan ✓' : 'Pending KYC'}
                      </span>
                    </div>

                    <p className="text-xs text-plum-soft mt-0.5">
                      {tailor.city} • Specialty: {tailor.primarySpecialty || 'Bridal Zardozi'} • {tailor.email}
                    </p>
                    <p className="text-[11px] text-plum-soft/80 mt-1">
                      Experience: {tailor.yearsExperience || '18'} Years • Phone: {tailor.phone || '+91 98290 12345'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    icon={Eye}
                    onClick={() => setSelectedTailor(tailor)}
                    className="text-xs border-sky text-blue-900"
                  >
                    View Documents
                  </Button>

                  {!isVerified && (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        icon={XCircle}
                        onClick={() => {
                          setSelectedTailor(tailor);
                          setIsRejectModalOpen(true);
                        }}
                        className="text-xs text-red-700 border-red-200 hover:bg-red-50"
                      >
                        Reject
                      </Button>

                      <Button
                        variant="primary"
                        size="sm"
                        icon={CheckCircle2}
                        onClick={() => handleApprove(tailor)}
                        className="text-xs bg-emerald-800 hover:bg-emerald-900 text-white"
                      >
                        Approve KYC
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Document View Modal */}
      {selectedTailor && !isRejectModalOpen && (
        <Modal
          isOpen={true}
          onClose={() => setSelectedTailor(null)}
          title={`KYC Credentials — ${selectedTailor.name}`}
          size="lg"
        >
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-cream-50 border border-plum/10 space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-900 block">
                  Aadhaar / National Identity Document
                </span>
                <div className="aspect-16/9 rounded-xl bg-sky/30 border border-sky flex items-center justify-center text-blue-900 font-mono text-xs">
                  [AADHAAR CARD VERIFIED: XXXX-XXXX-4819]
                </div>
                <span className="text-[10px] text-plum-soft block">
                  Status: Digilocker API Matched (Name & DOB Verified)
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-cream-50 border border-plum/10 space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-900 block">
                  Jaipur Master Craftsman Guild Registry
                </span>
                <div className="aspect-16/9 rounded-xl bg-mint/30 border border-mint flex items-center justify-center text-emerald-900 font-mono text-xs">
                  [GUILD REGISTRATION: RAJ-JPR-2014-998]
                </div>
                <span className="text-[10px] text-plum-soft block">
                  Physical Workshop: Johari Bazaar, Jaipur (Audited)
                </span>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-plum/10">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedTailor(null)}
              >
                Close Preview
              </Button>
              <Button
                variant="primary"
                size="sm"
                icon={CheckCircle2}
                onClick={() => handleApprove(selectedTailor)}
                className="bg-emerald-800 hover:bg-emerald-900 text-white text-xs"
              >
                Confirm & Approve Artisan
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* Reject Modal */}
      {isRejectModalOpen && selectedTailor && (
        <Modal
          isOpen={true}
          onClose={() => setIsRejectModalOpen(false)}
          title={`Reject Application — ${selectedTailor.name}`}
          size="md"
        >
          <div className="space-y-4">
            <p className="text-xs text-plum-soft">
              Please enter the specific reason for rejecting or asking for resubmission. The tailor will receive this in their notification feed.
            </p>

            <textarea
              rows={3}
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="e.g. Uploaded trade license is expired or blurry. Please upload clear copy of recent electricity bill for workshop address verification."
              className="w-full p-3 text-xs text-plum rounded-xl border border-plum/20 bg-cream-50 focus:outline-none focus:ring-2 focus:ring-rose-deep"
            />

            <div className="flex justify-end gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsRejectModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={handleReject}
                className="bg-red-700 hover:bg-red-800 text-white text-xs"
              >
                Confirm Rejection
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
