import React from 'react';
import { HeroSection } from './HeroSection';
import { TrustStrip } from './TrustStrip';
import { HowItWorksSection } from './HowItWorksSection';
import { StudioTeaserSection } from './StudioTeaserSection';
import { FeatureGridSection } from './FeatureGridSection';
import { OutfitChangerStrip } from './OutfitChangerStrip';
import { TailorSpotlightSection } from './TailorSpotlightSection';
import { InspirationGridSection } from './InspirationGridSection';
import { GroupWeddingSection } from './GroupWeddingSection';
import { TestimonialsSection } from './TestimonialsSection';
import { CtaFooterSection } from './CtaFooterSection';

export const LandingPage = () => {
  return (
    <div className="flex flex-col w-full overflow-hidden">
      {/* 1. Hero */}
      <HeroSection />

      {/* 2. Trust Strip */}
      <TrustStrip />

      {/* 3. How It Works */}
      <HowItWorksSection />

      {/* 4. AI Studio Teaser */}
      <StudioTeaserSection />

      {/* 5. Feature Grid */}
      <FeatureGridSection />

      {/* 6. Outfit Changer Strip */}
      <OutfitChangerStrip />

      {/* 7. Tailor Spotlight */}
      <TailorSpotlightSection />

      {/* 8. Inspiration Feed Preview */}
      <InspirationGridSection />

      {/* 9. Group Ordering / Wedding Section */}
      <GroupWeddingSection />

      {/* 10. Testimonials */}
      <TestimonialsSection />

      {/* 11. Final CTA + Footer */}
      <CtaFooterSection />
    </div>
  );
};
