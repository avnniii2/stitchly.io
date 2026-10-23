import React, { useState } from 'react';
import { useAuth } from '../../store/useAuth';
import { useUI } from '../../store/useUI';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  ShieldCheck, 
  Globe, 
  Gift, 
  Copy, 
  Check, 
  Share2, 
  LogOut,
  Sparkles
} from 'lucide-react';

export const CustomerProfile = () => {
  const { user, logout } = useAuth();
  const { addToast } = useUI();
  const [language, setLanguage] = useState('en'); // 'en' | 'hi'
  const [copied, setCopied] = useState(false);
  const [address, setAddress] = useState('402, Palm Heights, Bandra West, Mumbai, Maharashtra 400050');
  const [isEditingAddress, setIsEditingAddress] = useState(false);

  const referralCode = 'STITCH-PRIYA-88';

  const handleCopyCode = () => {
    navigator.clipboard?.writeText?.(referralCode);
    setCopied(true);
    addToast({
      title: 'Referral Code Copied',
      message: 'Share with friends! They get ₹1,000 off and you earn ₹1,500 tailoring credit.',
      type: 'success',
    });
    setTimeout(() => setCopied(false), 2500);
  };

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    addToast({
      title: lang === 'hi' ? 'भाषा बदली गई' : 'Language Updated',
      message: lang === 'hi' ? 'ऐप अब हिंदी और प्रांतीय भाषा समर्थन में है।' : 'App interface set to English.',
      type: 'info',
    });
  };

  return (
    <div className="max-w-4xl space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-fraunces text-2xl sm:text-3xl text-plum">
          {language === 'hi' ? 'क्लाइंट प्रोफाइल व सेटिंग्स' : 'Atelier Client Profile & Preferences'}
        </h1>
        <p className="text-xs sm:text-sm text-plum-soft mt-1">
          {language === 'hi'
            ? 'अपनी प्रोफ़ाइल, भाषा विकल्प और रेफरल रिवार्ड्स को प्रबंधित करें।'
            : 'Manage contact credentials, interface language, addresses, and referral rewards.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* Left: Profile Credentials & Language */}
        <div className="md:col-span-7 space-y-6">
          <Card variant="glass" className="p-6 sm:p-8 space-y-6">
            <div className="flex items-center gap-4 border-b border-blush/40 pb-6">
              <img
                src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}
                alt={user?.name}
                className="w-16 h-16 rounded-2xl object-cover border-2 border-blush shadow-xs"
              />
              <div>
                <h2 className="font-fraunces text-xl text-plum">{user?.name}</h2>
                <span className="text-xs text-rose-deep font-semibold uppercase tracking-wider">
                  {user?.role} Atelier Member
                </span>
                <p className="text-[11px] text-plum-soft">Customer since September 2026</p>
              </div>
            </div>

            {/* Language Switcher */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-plum flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-rose-deep" />
                <span>Preferred Interface Language / भाषा चुनें</span>
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => handleLanguageChange('en')}
                  className={`p-3 rounded-2xl border text-xs font-bold flex items-center justify-between transition-all ${
                    language === 'en'
                      ? 'bg-rose-deep text-white shadow-soft-blush border-rose-deep'
                      : 'bg-cream-100 border-plum/10 text-plum hover:bg-white'
                  }`}
                >
                  <span>English (India)</span>
                  {language === 'en' && <Check className="w-4 h-4" />}
                </button>

                <button
                  onClick={() => handleLanguageChange('hi')}
                  className={`p-3 rounded-2xl border text-xs font-bold flex items-center justify-between transition-all ${
                    language === 'hi'
                      ? 'bg-rose-deep text-white shadow-soft-blush border-rose-deep'
                      : 'bg-cream-100 border-plum/10 text-plum hover:bg-white'
                  }`}
                >
                  <span>हिन्दी (Hindi)</span>
                  {language === 'hi' && <Check className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Contact Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                <span className="text-plum-soft font-semibold">Registered Email</span>
                <div className="flex items-center gap-2 p-3 rounded-xl bg-cream-100 border border-plum/10 text-plum font-mono">
                  <Mail className="w-4 h-4 text-plum-soft" />
                  <span className="truncate">{user?.email}</span>
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-plum-soft font-semibold">Registered Mobile</span>
                <div className="flex items-center gap-2 p-3 rounded-xl bg-cream-100 border border-plum/10 text-plum font-mono">
                  <Phone className="w-4 h-4 text-plum-soft" />
                  <span>{user?.phone || '+91 98765 43210'}</span>
                </div>
              </div>
            </div>

            {/* Delivery Address */}
            <div className="space-y-1 pt-2 text-xs">
              <span className="text-plum-soft font-semibold">Primary Doorstep Delivery Address</span>
              {isEditingAddress ? (
                <div className="space-y-2">
                  <textarea
                    rows={2}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full p-3 rounded-xl border border-plum/20 bg-white text-xs text-plum focus:outline-none focus:ring-2 focus:ring-rose-deep"
                  />
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => setIsEditingAddress(false)}
                      className="text-xs"
                    >
                      Save Address
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex items-start justify-between gap-2 p-3 rounded-xl bg-cream-100 border border-plum/10 text-plum">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-rose-deep shrink-0 mt-0.5" />
                    <span>{address}</span>
                  </div>
                  <button
                    onClick={() => setIsEditingAddress(true)}
                    className="text-xs text-rose-deep font-semibold hover:underline shrink-0 ml-2"
                  >
                    Edit
                  </button>
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Right: Referral & Rewards Vault */}
        <div className="md:col-span-5 space-y-6">
          <Card variant="glass" className="p-6 space-y-4 border-2 border-blush shadow-soft-blush">
            <div className="flex items-center gap-2">
              <Gift className="w-5 h-5 text-rose-deep" />
              <h3 className="font-fraunces text-base text-plum font-semibold">
                Stitchly Atelier Referral Club
              </h3>
            </div>

            <p className="text-xs text-plum-soft leading-relaxed">
              Invite friends planning weddings or festive outfits. They get <strong>₹1,000 off</strong> on their first bespoke order, and you receive <strong>₹1,500 tailoring credits</strong> upon delivery.
            </p>

            <div className="p-3.5 rounded-2xl bg-cream-100 border border-plum/10 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-plum-soft font-bold uppercase block">
                  Your Unique Referral Code
                </span>
                <span className="font-mono text-sm font-bold text-plum">
                  {referralCode}
                </span>
              </div>

              <Button
                variant="secondary"
                size="sm"
                onClick={handleCopyCode}
                icon={copied ? Check : Copy}
                className="text-xs"
              >
                {copied ? 'Copied!' : 'Copy'}
              </Button>
            </div>

            {/* Reward Progress Tracker */}
            <div className="p-4 rounded-2xl bg-peach/40 border border-peach space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-plum">Tailoring Credits Earned:</span>
                <span className="text-base font-bold text-rose-deep">₹3,000</span>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between text-[11px] text-plum-soft">
                  <span>2 Friends Joined</span>
                  <span>Goal: 3 for ₹5,000 Bridal Tier</span>
                </div>
                <div className="h-2 rounded-full bg-white overflow-hidden border border-blush">
                  <div className="h-full bg-rose-deep rounded-full w-2/3" />
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
