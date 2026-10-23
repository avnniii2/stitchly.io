import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useUI } from '../../store/useUI';
import { Button } from '../../components/Button';
import { NeedleIcon, ScissorsIcon, SparkleDoodle } from '../../components/Doodles';
import { ArrowRight, Mail, CheckCircle2, Globe, Heart } from 'lucide-react';

export const CtaFooterSection = () => {
  const navigate = useNavigate();
  const { currentLanguage, setLanguage, addToast } = useUI();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!newsletterEmail.trim() || !newsletterEmail.includes('@')) {
      addToast({
        title: 'Invalid Email',
        message: 'Please enter a valid email address for atelier chronicles.',
        type: 'error'
      });
      return;
    }

    setIsSubscribed(true);
    addToast({
      title: 'Subscribed to Atelier Chronicles',
      message: 'You’ll receive seasonal fabric forecasts & artisan spotlights.',
      type: 'stitch'
    });
  };

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'hi', label: 'हिन्दी' },
    { code: 'gu', label: 'ગુજરાતી' },
    { code: 'ta', label: 'தமிழ்' },
  ];

  return (
    <footer className="bg-white/80 border-t border-blush/60 relative overflow-hidden">
      
      {/* Pre-Footer Action Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="rounded-4xl bg-gradient-to-tr from-blush/40 via-peach/30 to-lavender/40 border border-blush p-8 sm:p-14 text-center relative overflow-hidden shadow-soft-lg">
          <div className="w-14 h-14 rounded-2xl bg-white mx-auto flex items-center justify-center shadow-soft mb-4">
            <NeedleIcon className="w-8 h-8 -rotate-12" color="#D9718A" />
          </div>

          <h2 className="font-fraunces text-3xl sm:text-4xl md:text-5xl text-plum font-normal tracking-tight">
            Ready to design your <span className="chalk-underline">heirloom outfit</span>?
          </h2>
          <p className="text-sm sm:text-base text-plum-soft max-w-xl mx-auto mt-3 mb-8 leading-relaxed">
            Join thousands of brides and festive wear lovers who skip crowded bazaars and stitch their dream silhouettes with zero compromise.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              variant="primary"
              size="lg"
              onClick={() => navigate('/signup')}
              icon={ArrowRight}
              iconPosition="right"
              className="w-full sm:w-auto font-semibold shadow-soft-blush"
            >
              Begin In The AI Studio
            </Button>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => navigate('/tailors')}
              className="w-full sm:w-auto font-medium"
            >
              Browse Artisan Catalog
            </Button>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Newsletter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-plum/10">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blush flex items-center justify-center shadow-xs">
                <NeedleIcon className="w-5 h-5 -rotate-12" color="#D9718A" />
              </div>
              <span className="font-fraunces text-2xl font-semibold text-plum">
                Stitchly
              </span>
            </div>
            <p className="text-xs text-plum-soft leading-relaxed max-w-sm">
              A two-sided online marketplace where customers create custom Indian ethnic & bridal wear with AI, customize every cut, and get matched with master independent tailors.
            </p>

            {/* Newsletter Subscription */}
            <div className="pt-2">
              <span className="text-xs font-bold uppercase tracking-wider text-plum block mb-2">
                Atelier Chronicles
              </span>
              {isSubscribed ? (
                <div className="inline-flex items-center gap-2 p-2 px-3 rounded-2xl bg-mint/50 border border-mint text-xs text-emerald-950 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  <span>Subscribed! Check your inbox soon.</span>
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="flex gap-2 max-w-sm">
                  <div className="relative flex-1 thread-input rounded-2xl border border-plum/20 bg-cream-100 overflow-hidden">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-plum-soft" />
                    <input
                      type="email"
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="w-full pl-9 pr-3 py-2 text-xs bg-transparent text-plum focus:outline-none placeholder-plum-soft/60"
                    />
                  </div>
                  <Button type="submit" variant="primary" size="sm" className="shrink-0 text-xs px-3">
                    Join
                  </Button>
                </form>
              )}
            </div>
          </div>

          {/* Useful Column 1 */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-plum">
              Atelier Services
            </h4>
            <ul className="space-y-2 text-xs text-plum-soft">
              <li><Link to="/how-it-works" className="hover:text-rose-deep transition-colors">How It Works</Link></li>
              <li><Link to="/tailors" className="hover:text-rose-deep transition-colors">Verified Tailors</Link></li>
              <li><Link to="/inspiration" className="hover:text-rose-deep transition-colors">Inspiration Archive</Link></li>
              <li><Link to="/signup" className="hover:text-rose-deep transition-colors">Doorstep Swatch Kit</Link></li>
              <li><Link to="/signup" className="hover:text-rose-deep transition-colors">Group Weddings</Link></li>
            </ul>
          </div>

          {/* Useful Column 2 */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-plum">
              For Independent Tailors
            </h4>
            <ul className="space-y-2 text-xs text-plum-soft">
              <li><Link to="/signup" className="hover:text-rose-deep transition-colors">Join as Master Tailor</Link></li>
              <li><Link to="/login" className="hover:text-rose-deep transition-colors">Tailor Workshop Portal</Link></li>
              <li><span className="text-plum-soft/70">KYC Verification Standards</span></li>
              <li><span className="text-plum-soft/70">Fair Wage Guarantee</span></li>
              <li><span className="text-plum-soft/70">Jaipur & Lucknow Hubs</span></li>
            </ul>
          </div>

          {/* Useful Column 3: Language & Legal */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-plum">
              Atelier Language
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => setLanguage(lang.label)}
                  className={`px-2.5 py-1 text-xs rounded-full border transition-all ${
                    currentLanguage === lang.label
                      ? 'bg-rose-deep text-white border-rose-deep shadow-xs'
                      : 'bg-white border-plum/15 text-plum hover:bg-blush/30'
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>

            <div className="pt-4 text-xs text-plum-soft space-y-1">
              <p>100% Perfect Fit Guarantee</p>
              <p>Zero Shop Visits Required</p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-plum-soft">
          <p>© {new Date().getFullYear()} Stitchly Technologies Pvt. Ltd. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Handcrafted with <Heart className="w-3.5 h-3.5 text-rose-deep fill-current" /> for Indian ethnic wear lovers.
          </p>
        </div>
      </div>

    </footer>
  );
};
