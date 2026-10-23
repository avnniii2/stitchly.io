import React from 'react';
import { useAuth } from '../../store/useAuth';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { FileCheck, ShieldCheck, AlertTriangle, FileText, CheckCircle2 } from 'lucide-react';

export const TailorKyc = () => {
  const { user } = useAuth();
  const isApproved = user?.kycStatus === 'approved' || user?.verified;

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="font-fraunces text-2xl sm:text-3xl text-plum">
          Workshop KYC & Guild Certification
        </h1>
        <p className="text-xs sm:text-sm text-plum-soft mt-1">
          Verification ensures fair master wages, verified craft standards, and customer trust.
        </p>
      </div>

      <Card variant="glass" className="p-6 sm:p-8 space-y-6">
        {/* Status Header */}
        <div className="flex items-center justify-between border-b border-mint/40 pb-4">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
              isApproved ? 'bg-mint text-emerald-800' : 'bg-amber-100 text-amber-800'
            }`}>
              {isApproved ? <ShieldCheck className="w-6 h-6" /> : <AlertTriangle className="w-6 h-6" />}
            </div>
            <div>
              <h3 className="font-fraunces text-lg text-plum">
                Verification Status: {isApproved ? 'Approved Master' : 'Application Under Review'}
              </h3>
              <p className="text-xs text-plum-soft">
                {isApproved 
                  ? 'Your workshop has met all Stitchly Master Artisan standards.' 
                  : 'Submitted to Stitchly Atelier Operations team for physical document audit.'}
              </p>
            </div>
          </div>

          <span className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full ${
            isApproved 
              ? 'bg-mint text-emerald-950 border border-mint-400' 
              : 'bg-amber-100 text-amber-900 border border-amber-300'
          }`}>
            {user?.kycStatus || 'Pending'}
          </span>
        </div>

        {/* Verification Checklist */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-plum-soft">
            Verification Protocol Checklist
          </h4>

          <div className="p-3.5 rounded-2xl bg-cream-100 border border-plum/10 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span className="font-medium text-plum">Workshop Identity / Government Registration</span>
            </div>
            <span className="text-[11px] font-mono text-emerald-800">
              {isApproved ? 'Verified' : 'Document Received'}
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-cream-100 border border-plum/10 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span className="font-medium text-plum">Master Seam Allowance & Finish Quality Check</span>
            </div>
            <span className="text-[11px] font-mono text-emerald-800">
              {isApproved ? 'Passed (Grade A+)' : 'Sample In Review'}
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-cream-100 border border-plum/10 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span className="font-medium text-plum">Direct Artisan Bank Account for Instant Payouts</span>
            </div>
            <span className="text-[11px] font-mono text-emerald-800">
              {isApproved ? 'Connected' : 'Pending Verification'}
            </span>
          </div>
        </div>

        {/* Uploaded Document Info */}
        <div className="p-4 rounded-2xl bg-white border border-mint/60 shadow-xs flex items-center justify-between text-xs">
          <div className="flex items-center gap-3">
            <FileText className="w-6 h-6 text-emerald-700" />
            <div>
              <p className="font-semibold text-plum">Workshop_KYC_Registration.pdf</p>
              <p className="text-[11px] text-plum-soft">Stored securely in atelier base64 database</p>
            </div>
          </div>
          <span className="text-[11px] font-mono text-plum-soft">Base64 Encoded</span>
        </div>
      </Card>
    </div>
  );
};
