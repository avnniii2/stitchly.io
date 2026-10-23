import React, { useState } from 'react';
import { useUI } from '../../store/useUI';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { Chip } from '../../components/Chip';
import { TapeMeasure } from '../../components/TapeMeasure';
import { Garment } from '../../components/garment/Garment';
import { Users, Sparkles, Copy, Check, Plus, HeartHandshake, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';

const INITIAL_GROUP_MEMBERS = [
  { id: 'm-1', name: 'Priya Sharma (Bride)', role: 'Bride', outfit: 'Mulberry Silk Zari Lehenga', color: '#D9718A', status: 'Customized & Sized', price: 28500 },
  { id: 'm-2', name: 'Rohan Singhania (Groom)', role: 'Groom', outfit: 'Chikankari Tussar Sherwani', color: '#F7F4EB', status: 'Measurements Confirmed', price: 22000 },
  { id: 'm-3', name: 'Ananya Deshmukh', role: 'Maid of Honour', outfit: 'Sage Organza Fluted Anarkali', color: '#A8D2BC', status: 'Measurements Confirmed', price: 8500 },
  { id: 'm-4', name: 'Kavita Menon', role: 'Bridesmaid', outfit: 'Sage Organza Fluted Anarkali', color: '#A8D2BC', status: 'Customized & Sized', price: 8500 },
];

export const CustomerGroup = () => {
  const { addToast } = useUI();
  const [members, setMembers] = useState(INITIAL_GROUP_MEMBERS);
  const [copied, setCopied] = useState(false);
  const [newMemberName, setNewMemberName] = useState('');
  const [newMemberRole, setNewMemberRole] = useState('Bridesmaid');

  const discountPercentage = Math.min(18, members.length * 3.5);
  const totalAmount = members.reduce((acc, m) => acc + m.price, 0);
  const savings = Math.round(totalAmount * (discountPercentage / 100));

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    addToast({ title: 'Invite Link Copied!', message: 'Share with bridesmaids & groomsmen to join palette.', type: 'stitch' });
    setTimeout(() => setCopied(false), 2500);
  };

  const handleAddMember = (e) => {
    e.preventDefault();
    if (!newMemberName.trim()) return;

    const newM = {
      id: `m-${Date.now()}`,
      name: newMemberName.trim(),
      role: newMemberRole,
      outfit: newMemberRole.includes('Groom') ? 'Silk Kurta & Bundi Set' : 'Sage Organza Anarkali',
      color: '#A8D2BC',
      status: 'Invite Sent',
      price: newMemberRole.includes('Groom') ? 7200 : 8500
    };

    setMembers([...members, newM]);
    setNewMemberName('');
    try {
      confetti({ particleCount: 30, spread: 60, origin: { y: 0.6 } });
    } catch {}
    addToast({ title: 'Party Member Added', message: `${newM.name} invited with custom sizing link.`, type: 'success' });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-blush/40 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-peach/50 border border-peach text-xs font-semibold text-amber-950 uppercase tracking-wider mb-1">
            <Users className="w-3.5 h-3.5 text-rose-deep" />
            <span>Wedding Entourage Board</span>
          </div>
          <h1 className="font-fraunces text-2xl sm:text-3xl text-plum">
            Ananya & Rohan's Sangeet Squad
          </h1>
          <p className="text-xs sm:text-sm text-plum-soft">
            Single master dyelot guarantee: coordinated fabrics, individual custom sizing, and unlocked group savings.
          </p>
        </div>

        <Button
          variant="secondary"
          size="sm"
          icon={copied ? Check : Copy}
          onClick={handleCopyLink}
          className="text-xs shrink-0"
        >
          {copied ? 'Copied Invite Link' : 'Copy Party Invite Link'}
        </Button>
      </div>

      {/* Group Savings & Discount Meter */}
      <Card variant="blush" className="p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-blush/40 pb-3">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-rose-deep">
              Party Discount Meter
            </span>
            <div className="font-fraunces text-2xl text-plum">
              {discountPercentage}% Group Atelier Discount Unlocked!
            </div>
          </div>

          <div className="text-left sm:text-right">
            <span className="text-xs text-plum-soft block">Party Savings</span>
            <span className="text-base font-bold text-emerald-800">Save ₹{savings.toLocaleString('en-IN')}</span>
          </div>
        </div>

        <TapeMeasure
          progress={(discountPercentage / 18) * 100}
          label={`${members.length} Members Joined • Goal: 6 Members for Max 18% Discount`}
        />
      </Card>

      {/* Members Grid & Add Member Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Members List */}
        <div className="lg:col-span-8 space-y-3">
          <h3 className="font-fraunces text-xl text-plum">Entourage Outfits ({members.length})</h3>

          {members.map((mem) => (
            <Card key={mem.id} variant="glass" className="p-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-cream-100 flex items-center justify-center shrink-0 border border-plum/10">
                  <Users className="w-5 h-5 text-rose-deep" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold text-xs sm:text-sm text-plum">{mem.name}</h4>
                    <span className="text-[10px] font-bold px-2 py-0.2 rounded-full bg-blush text-rose-deep">
                      {mem.role}
                    </span>
                  </div>
                  <p className="text-xs text-plum-soft">{mem.outfit}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs">
                <span className="hidden sm:inline px-2 py-0.5 rounded-full bg-mint text-emerald-950 font-semibold text-[10px]">
                  {mem.status}
                </span>
                <span className="font-bold text-plum font-mono">₹{mem.price.toLocaleString('en-IN')}</span>
              </div>
            </Card>
          ))}
        </div>

        {/* Add Member Box */}
        <div className="lg:col-span-4">
          <Card variant="glass" className="p-6 space-y-4">
            <h3 className="font-fraunces text-lg text-plum font-semibold">
              Invite Wedding Party Member
            </h3>
            <p className="text-xs text-plum-soft">
              They receive a private link to enter their measurements without seeing group budgets.
            </p>

            <form onSubmit={handleAddMember} className="space-y-3">
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-plum-soft block mb-1">
                  Member Name
                </label>
                <input
                  type="text"
                  value={newMemberName}
                  onChange={(e) => setNewMemberName(e.target.value)}
                  placeholder="e.g. Diya Singhania"
                  className="w-full p-2.5 text-xs rounded-xl bg-cream-100 border border-plum/15 text-plum focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-plum-soft block mb-1">
                  Wedding Party Role
                </label>
                <select
                  value={newMemberRole}
                  onChange={(e) => setNewMemberRole(e.target.value)}
                  className="w-full p-2.5 text-xs font-semibold rounded-xl bg-cream-100 border border-plum/15 text-plum focus:outline-none"
                >
                  <option value="Bridesmaid">Bridesmaid</option>
                  <option value="Groomsman">Groomsman</option>
                  <option value="Mother of Bride">Mother of Bride</option>
                  <option value="Father of Bride">Father of Bride</option>
                  <option value="Sister of Groom">Sister of Groom</option>
                </select>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="md"
                icon={Plus}
                className="w-full font-semibold text-xs mt-2"
              >
                Add & Send Sizing Pass
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};
