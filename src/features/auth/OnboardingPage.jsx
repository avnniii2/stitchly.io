import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../store/useAuth';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { Stepper } from '../../components/Stepper';
import { NeedleIcon, ScissorsIcon, SparkleDoodle } from '../../components/Doodles';
import { Ruler, Sparkles, CheckCircle2, ArrowRight, ShieldCheck, Heart, Palette, Calendar } from 'lucide-react';
import confetti from 'canvas-confetti';

const STYLE_QUIZ = {
  colors: [
    { id: 'pastel', label: 'Dreamy Pastels', desc: 'Blush pink, lavender, powder blue, and peach', color: '#F9D5DC' },
    { id: 'jewel', label: 'Royal Jewel Tones', desc: 'Deep ruby maroon, emerald, royal navy, wine', color: '#881337' },
    { id: 'earthy', label: 'Marwar Earthy', desc: 'Rust, terracotta, mustard yellow, and sage', color: '#D97706' },
    { id: 'ivory', label: 'Antique Ivory & Gold', desc: 'Raw silk cream with vintage gold zari', color: '#FFF1B8' },
  ],
  occasions: [
    { id: 'sangeet', label: 'Sangeet & Mehendi', desc: 'Lightweight movement, playful color bursts, breathable fabrics' },
    { id: 'wedding', label: 'Bridal & Grand Wedding', desc: 'Heavy hand zardozi, 32-kali volume, antique dabka embroidery' },
    { id: 'festive', label: 'Diwali & Festival Puja', desc: 'Classic chanderi kurtas, gotapatti borders, festive elegance' },
    { id: 'reception', label: 'Cocktail & Reception', desc: 'Modern structured silhouettes, sequin sheen, minimal clean cuts' },
  ],
  fits: [
    { id: 'voluminous', label: 'Voluminous 32-Kali Flare', desc: 'Maximum swirl drape with internal can-can lining support' },
    { id: 'sleek', label: 'Sleek & Contemporary', desc: 'Clean lines, A-line fall, comfortable day-to-night weight' },
    { id: 'traditional', label: 'Heritage Royal Anarkali', desc: 'Floor-touching kalidar with authentic karchob necklines' },
  ]
};

export const OnboardingPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  // Style Quiz Answers
  const [selectedColor, setSelectedColor] = useState('pastel');
  const [selectedOccasion, setSelectedOccasion] = useState('sangeet');
  const [selectedFit, setSelectedFit] = useState('voluminous');

  const isTailor = user?.role === 'tailor';

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#F9D5DC', '#D5EFE3', '#FFE2CF', '#E4DAF6']
      });
    } catch {}
  };

  const finishOnboarding = () => {
    triggerConfetti();
    // Save quiz answers to localStorage
    try {
      localStorage.setItem('stitchly_user_preferences', JSON.stringify({
        color: selectedColor,
        occasion: selectedOccasion,
        fit: selectedFit,
      }));
    } catch {}

    if (isTailor) {
      navigate('/tailor');
    } else {
      navigate('/app');
    }
  };

  return (
    <div className="min-h-screen bg-cream atelier-grain flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="max-w-2xl w-full space-y-6">
        {/* Top Progress */}
        <div className="text-center">
          <div className="w-12 h-12 rounded-2xl bg-blush mx-auto flex items-center justify-center shadow-soft mb-3">
            <NeedleIcon className="w-6 h-6 -rotate-12" color="#D9718A" />
          </div>
          <h2 className="font-fraunces text-2xl md:text-3xl text-plum">
            {isTailor ? 'Welcome to the Master Tailor Guild' : 'Personalize Your Stitchly Atelier'}
          </h2>
          <p className="text-sm text-plum-soft mt-1">
            {isTailor 
              ? 'Your workshop profile is set up. Let’s configure your craft presence.'
              : 'Take our 1-minute style quiz to seed your custom AI recommendations.'}
          </p>
        </div>

        <Stepper
          steps={[
            { title: 'Welcome' },
            { title: isTailor ? 'Verification' : 'Style Quiz' },
            { title: 'Ready' }
          ]}
          currentStep={step}
        />

        {/* Step Card Content */}
        <Card variant="glass" className="p-6 md:p-8 relative">
          {step === 1 && (
            <div className="space-y-5 text-center">
              <div className="w-16 h-16 rounded-full bg-peach/50 mx-auto flex items-center justify-center">
                <SparkleDoodle className="w-8 h-8 text-rose-deep" />
              </div>
              <h3 className="font-fraunces text-xl md:text-2xl text-plum">
                Namaste, {user?.name}!
              </h3>
              <p className="text-sm text-plum-soft leading-relaxed max-w-md mx-auto">
                {isTailor ? (
                  <>
                    You have joined Stitchly’s network of verified heritage karigars from <strong>{user?.city || 'Jaipur'}</strong>. 
                    We connect you directly with clients seeking your specialization in <strong>{user?.primarySpecialty || 'Bespoke tailoring'}</strong>.
                  </>
                ) : (
                  <>
                    Welcome to your personal Indian bespoke couture atelier. Let's calibrate your color palettes, 
                    occasions, and silhouettes so our AI Studio generates your dream looks instantly.
                  </>
                )}
              </p>

              <div className="pt-4 flex justify-center">
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => setStep(2)}
                  icon={ArrowRight}
                  iconPosition="right"
                >
                  {isTailor ? 'Continue Setup' : 'Start Style Quiz ✨'}
                </Button>
              </div>
            </div>
          )}

          {/* Customer Step 2: Interactive Style Quiz */}
          {step === 2 && !isTailor && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-blush/40 pb-3">
                <div>
                  <h3 className="font-fraunces text-lg text-plum">
                    Atelier Aesthetic Quiz
                  </h3>
                  <p className="text-xs text-plum-soft">
                    Tap your preferred tones, events, and silhouettes.
                  </p>
                </div>
                <span className="text-xs font-bold text-rose-deep">3 Questions</span>
              </div>

              {/* Q1: Palette */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-plum flex items-center gap-1.5 uppercase tracking-wider">
                  <Palette className="w-3.5 h-3.5 text-rose-deep" />
                  <span>1. Favorite Ethnic Color Palette</span>
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  {STYLE_QUIZ.colors.map((c) => (
                    <div
                      key={c.id}
                      onClick={() => setSelectedColor(c.id)}
                      className={`p-3 rounded-2xl border transition-all cursor-pointer text-left ${
                        selectedColor === c.id
                          ? 'bg-blush/30 border-rose-deep shadow-xs ring-1 ring-rose-deep'
                          : 'bg-white border-plum/10 hover:border-blush'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-3.5 h-3.5 rounded-full shrink-0 border border-plum/20" style={{ backgroundColor: c.color }} />
                        <strong className="text-xs text-plum font-semibold block">{c.label}</strong>
                      </div>
                      <p className="text-[10px] text-plum-soft mt-1 leading-snug">{c.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Q2: Occasion */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-plum flex items-center gap-1.5 uppercase tracking-wider">
                  <Calendar className="w-3.5 h-3.5 text-rose-deep" />
                  <span>2. Primary Upcoming Occasion</span>
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  {STYLE_QUIZ.occasions.map((o) => (
                    <div
                      key={o.id}
                      onClick={() => setSelectedOccasion(o.id)}
                      className={`p-3 rounded-2xl border transition-all cursor-pointer text-left ${
                        selectedOccasion === o.id
                          ? 'bg-blush/30 border-rose-deep shadow-xs ring-1 ring-rose-deep'
                          : 'bg-white border-plum/10 hover:border-blush'
                      }`}
                    >
                      <strong className="text-xs text-plum font-semibold block">{o.label}</strong>
                      <p className="text-[10px] text-plum-soft mt-0.5 leading-snug">{o.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Q3: Fit */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-plum flex items-center gap-1.5 uppercase tracking-wider">
                  <Ruler className="w-3.5 h-3.5 text-rose-deep" />
                  <span>3. Desired Flare & Silhouette Fit</span>
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {STYLE_QUIZ.fits.map((f) => (
                    <div
                      key={f.id}
                      onClick={() => setSelectedFit(f.id)}
                      className={`p-2.5 rounded-2xl border transition-all cursor-pointer text-left ${
                        selectedFit === f.id
                          ? 'bg-blush/30 border-rose-deep shadow-xs ring-1 ring-rose-deep'
                          : 'bg-white border-plum/10 hover:border-blush'
                      }`}
                    >
                      <strong className="text-[11px] text-plum font-semibold block">{f.label}</strong>
                      <p className="text-[9px] text-plum-soft mt-0.5 leading-snug">{f.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex justify-between items-center border-t border-blush/40">
                <Button variant="ghost" size="sm" onClick={() => setStep(1)}>
                  Back
                </Button>
                <Button variant="primary" size="md" onClick={() => setStep(3)}>
                  Save Preferences & Proceed
                </Button>
              </div>
            </div>
          )}

          {/* Tailor Step 2 */}
          {step === 2 && isTailor && (
            <div className="space-y-5">
              <div className="flex items-center gap-3 border-b border-mint/50 pb-4">
                <div className="w-10 h-10 rounded-xl bg-mint flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-emerald-800" />
                </div>
                <div>
                  <h3 className="font-fraunces text-lg text-plum">
                    Workshop Verification Underway
                  </h3>
                  <p className="text-xs text-plum-soft">
                    Status: <span className="font-bold text-amber-700 uppercase">Application Pending Review</span>
                  </p>
                </div>
              </div>

              <p className="text-sm text-plum leading-relaxed">
                Thank you for submitting your craft credentials. Our artisan vetting team in {user?.city || 'Jaipur'} verifies workshop licenses, master certifications, and seam quality samples within 24 hours.
              </p>

              <div className="p-4 rounded-2xl bg-mint/20 border border-mint text-xs text-emerald-950 space-y-1.5">
                <p className="font-semibold">While you wait:</p>
                <p>• You have access to explore the workshop and test booking quotes</p>
                <p>• Set up your daily stitching capacity and holiday calendar</p>
                <p>• Browse customer inspiration boards</p>
              </div>

              <div className="pt-4 flex justify-between items-center">
                <Button variant="ghost" size="sm" onClick={() => setStep(1)}>
                  Back
                </Button>
                <Button variant="mint" size="md" onClick={() => setStep(3)}>
                  Acknowledge & Continue
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-5 text-center">
              <div className="w-16 h-16 rounded-full bg-mint/50 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 text-emerald-700" />
              </div>
              <h3 className="font-fraunces text-xl md:text-2xl text-plum">
                You’re All Set!
              </h3>
              <p className="text-sm text-plum-soft leading-relaxed max-w-md mx-auto">
                {isTailor 
                  ? 'Your master artisan workspace is configured. You can receive custom commission requests, send quotes, and track earnings.'
                  : 'Your personalized ethnic profile is calibrated. You are ready to generate custom designs, match with artisans, and track orders.'}
              </p>

              <div className="pt-4 flex justify-center">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={finishOnboarding}
                  icon={ArrowRight}
                  iconPosition="right"
                  className="font-semibold"
                >
                  Enter My {isTailor ? 'Tailor Workshop' : 'Customer Atelier'}
                </Button>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};
