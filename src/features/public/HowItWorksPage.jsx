import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HOW_IT_WORKS_STEPS } from '../../data/seed';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { StitchDivider } from '../../components/StitchDivider';
import { NeedleIcon, ScissorsIcon, SparkleDoodle } from '../../components/Doodles';
import { Check, X, ChevronDown, ChevronUp, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const HowItWorksPage = () => {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState(0);

  const faqs = [
    {
      q: 'How does the Doorstep Measurement Kit work?',
      a: 'Once you finalize your outfit concept, we courier a complimentary gold-stamped tailor measuring tape, fabric swatches, and a visual 14-point measurement card. You can also hop on a 10-minute video call where our master stylist guides you step-by-step.'
    },
    {
      q: 'What if the blouse or lehenga doesn’t fit when it arrives?',
      a: 'We offer a 100% Free Doorstep Alteration Guarantee. Every outfit is crafted with a hidden 2-to-3 inch internal seam allowance. If an adjustment is needed, our courier picks it up from your house, your matched tailor adjusts it within 72 hours, and returns it to your door.'
    },
    {
      q: 'Can I send my own fabric or heirloom saree to be stitched?',
      a: 'Yes! You can either select our verified fabrics (pure mulberry silks, Kanchipuram brocades, organzas) or arrange a doorstep courier pickup for your existing fabric or vintage heirloom sarees to be transformed.'
    },
    {
      q: 'How do I know the color on my phone matches the real fabric?',
      a: 'For all bridal and heavy festive orders, we courier 3 physical fabric cuttings and embroidery swatches to your home before cutting your final garment, so you can inspect the exact sheen and feel under your own room lighting.'
    }
  ];

  return (
    <div className="py-12 bg-cream atelier-grain min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Page Hero */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blush/60 border border-blush text-xs font-semibold text-rose-deep uppercase tracking-wider mb-3">
            <NeedleIcon className="w-3.5 h-3.5" color="#D9718A" />
            <span>The Stitchly Process</span>
          </div>

          <h1 className="font-fraunces text-4xl sm:text-5xl text-plum font-normal tracking-tight">
            Haute-couture made <span className="chalk-underline">effortless</span>
          </h1>
          <p className="text-base text-plum-soft mt-4 leading-relaxed">
            Discover how we pair generative AI design with traditional karigar ateliers 
            across India to deliver heirloom-grade custom garments to your doorstep.
          </p>
        </div>

        {/* Deep Dive 6 Steps */}
        <div className="space-y-12">
          {HOW_IT_WORKS_STEPS.map((step, idx) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className="rounded-4xl bg-white/90 backdrop-blur-md p-6 sm:p-10 border border-blush/60 shadow-soft grid grid-cols-1 md:grid-cols-12 gap-6 items-center"
            >
              <div className="md:col-span-2 flex md:flex-col items-center justify-between md:justify-center border-b md:border-b-0 md:border-r border-blush/40 pb-4 md:pb-0 md:pr-6">
                <span className="text-xs uppercase font-bold tracking-widest text-rose-deep">
                  Step 0{step.step}
                </span>
                <span className="font-fraunces text-4xl sm:text-5xl font-light text-plum/30 my-1">
                  0{step.step}
                </span>
              </div>

              <div className="md:col-span-7 space-y-2">
                <h3 className="font-fraunces text-2xl text-plum">
                  {step.title}: {step.subtitle}
                </h3>
                <p className="text-sm text-plum-soft leading-relaxed">
                  {step.description}
                </p>
                <p className="text-xs text-rose-deep font-medium pt-1">
                  {step.modalContent.details}
                </p>
              </div>

              <div className="md:col-span-3 flex justify-end">
                <Button
                  variant="blush"
                  size="sm"
                  onClick={() => navigate('/signup')}
                  icon={ArrowRight}
                  iconPosition="right"
                  className="w-full md:w-auto"
                >
                  Try Step {step.step}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        <StitchDivider withScissors color="#D9718A" />

        {/* Comparison Table: Traditional vs Stitchly */}
        <div className="rounded-4xl bg-white/90 backdrop-blur-md p-6 sm:p-10 border border-blush shadow-soft">
          <div className="text-center max-w-xl mx-auto mb-8">
            <h2 className="font-fraunces text-2xl sm:text-3xl text-plum">
              Traditional Tailor vs Stitchly Atelier
            </h2>
            <p className="text-xs sm:text-sm text-plum-soft mt-1">
              Why thousands of brides are leaving crowded bazaars behind
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-blush/50 text-plum">
                  <th className="py-3 px-4 font-bold uppercase text-[11px] tracking-wider text-plum-soft">Experience</th>
                  <th className="py-3 px-4 font-bold text-plum-soft">Traditional Local Boutique</th>
                  <th className="py-3 px-4 font-bold text-rose-deep bg-blush/20 rounded-t-xl">Stitchly Atelier</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-blush/30">
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-plum">Shop Visits Needed</td>
                  <td className="py-3.5 px-4 text-plum-soft flex items-center gap-1.5 text-rose-700">
                    <X className="w-4 h-4 shrink-0" /> 3 to 5 physical visits
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-emerald-800 bg-blush/10">
                    <div className="flex items-center gap-1.5">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" /> Zero (100% Doorstep)
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-plum">Visualizing Final Outfit</td>
                  <td className="py-3.5 px-4 text-plum-soft">Rough hand sketches on receipt paper</td>
                  <td className="py-3.5 px-4 font-semibold text-emerald-800 bg-blush/10">
                    4 Photorealistic AI renders from all angles
                  </td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-plum">Craftsman Selection</td>
                  <td className="py-3.5 px-4 text-plum-soft">Whomever the shop contracts locally</td>
                  <td className="py-3.5 px-4 font-semibold text-emerald-800 bg-blush/10">
                    Matched with authentic regional master (Jaipur, Lucknow)
                  </td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-plum">Progress Tracking</td>
                  <td className="py-3.5 px-4 text-plum-soft">"Madam kal aana, abhi baqi hai"</td>
                  <td className="py-3.5 px-4 font-semibold text-emerald-800 bg-blush/10">
                    Live stage photos (Chalk, Cut, Zari, Dispatched)
                  </td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-plum">Fit Guarantee</td>
                  <td className="py-3.5 px-4 text-plum-soft">Extra charges for alterations</td>
                  <td className="py-3.5 px-4 font-semibold text-emerald-800 bg-blush/10">
                    100% Free Doorstep Alteration or Full Remake
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="rounded-4xl bg-white/80 p-6 sm:p-10 border border-blush/60 shadow-soft">
          <div className="text-center max-w-xl mx-auto mb-8">
            <h2 className="font-fraunces text-2xl sm:text-3xl text-plum">
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-plum-soft mt-1">
              Everything you need to know about our custom stitching process
            </p>
          </div>

          <div className="space-y-3 max-w-3xl mx-auto">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-blush/50 bg-cream-100/50 overflow-hidden transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                    className="w-full p-4 text-left flex items-center justify-between font-semibold text-sm text-plum"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? <ChevronUp className="w-4 h-4 text-rose-deep" /> : <ChevronDown className="w-4 h-4 text-plum-soft" />}
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="px-4 pb-4 text-xs text-plum-soft leading-relaxed border-t border-blush/20 pt-2"
                      >
                        {faq.a}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center py-6">
          <Button
            variant="primary"
            size="lg"
            onClick={() => navigate('/signup')}
            icon={ArrowRight}
            iconPosition="right"
          >
            Start Your Custom Outfit
          </Button>
        </div>

      </div>
    </div>
  );
};
