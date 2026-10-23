import { AI_STUDIO_TEASERS } from '../data/seed';

const delay = (ms = 900) => new Promise(resolve => setTimeout(resolve, ms));

export const aiStudioService = {
  /**
   * Get all prompt templates/teasers
   */
  async getTeaserPresets() {
    return AI_STUDIO_TEASERS;
  },

  /**
   * Simulate AI generation
   */
  async simulateGenerate(teaserId) {
    await delay(1200); // realistic AI render latency
    const teaser = AI_STUDIO_TEASERS.find(t => t.id === teaserId) || AI_STUDIO_TEASERS[0];
    return {
      id: `gen-${Date.now()}`,
      prompt: teaser.prompt,
      fabric: teaser.fabric,
      category: teaser.category,
      colorHex: teaser.colorHex,
      tags: teaser.tags,
      variations: teaser.images,
      specs: {
        suggestedKalis: '24 to 32 Kalis',
        recommendedLining: '100% Pure Mulmul / Breathable Cotton Voile',
        matchingTailorsCount: 3,
        estimatedStitchingTime: '10-14 days',
        estimatedPriceRange: '₹14,500 - ₹22,000'
      }
    };
  }
};
