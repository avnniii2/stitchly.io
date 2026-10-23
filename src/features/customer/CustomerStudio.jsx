import React, { useState } from 'react';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { Chip } from '../../components/Chip';
import { NeedleLoader } from '../../components/NeedleLoader';
import { Wand2, Sparkles, Mic, Layers, Sliders, CheckCircle } from 'lucide-react';
import { AI_STUDIO_TEASERS } from '../../data/seed';

export const CustomerStudio = () => {
  const [prompt, setPrompt] = useState('Dusty rose organza kalidar with antique silver gotta patti');
  const [isGenerating, setIsGenerating] = useState(false);
  const [results, setResults] = useState(AI_STUDIO_TEASERS[1]);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setResults(AI_STUDIO_TEASERS[Math.floor(Math.random() * AI_STUDIO_TEASERS.length)]);
      setIsGenerating(false);
    }, 900);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-fraunces text-2xl sm:text-3xl text-plum">
            AI Ethnic Design Studio
          </h1>
          <p className="text-xs sm:text-sm text-plum-soft mt-1">
            Prompt in English or regional voice to visualize silhouettes, drape, and micro-embroidery.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-lavender text-purple-950">
            Drape Simulation v2.4 Active
          </span>
        </div>
      </div>

      {/* Prompt Bar */}
      <Card variant="glass" className="p-6 space-y-4">
        <label className="block text-xs font-bold uppercase tracking-wider text-rose-deep">
          Describe Silhouette, Occasion & Fabric Preference
        </label>
        
        <div className="relative">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={2}
            className="w-full p-4 rounded-2xl bg-cream-100 border border-plum/20 text-sm text-plum focus:outline-none focus:ring-2 focus:ring-rose-deep"
            placeholder="e.g. Deep maroon velvet lehenga with sweetheart neck and 32 kalis..."
          />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              icon={Mic}
              onClick={() => alert("Regional Voice input: Web Speech API module enabled for Part 2.")}
              className="text-xs"
            >
              Voice Note (Hindi / Tamil / Hinglish)
            </Button>
          </div>

          <Button
            variant="primary"
            size="md"
            icon={Wand2}
            isLoading={isGenerating}
            onClick={handleGenerate}
            className="shadow-soft-blush font-semibold"
          >
            Generate 4 Render Views
          </Button>
        </div>
      </Card>

      {/* Render Canvas */}
      <Card variant="glass" className="p-6 min-h-[350px] flex items-center justify-center">
        {isGenerating ? (
          <NeedleLoader text="Simulating ethnic embroidery & bias fall..." />
        ) : (
          <div className="w-full space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-fraunces text-lg text-plum">
                Simulated Pattern Perspectives
              </h3>
              <span className="text-xs text-emerald-800 font-semibold flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5" /> Ready for Tailor Match
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {results.images.map((img, i) => (
                <div key={i} className="rounded-2xl overflow-hidden border border-blush/60 bg-cream-100">
                  <div className="aspect-[3/4] relative">
                    <img src={img.url} alt={img.title} className="w-full h-full object-cover" />
                    <span className="absolute bottom-2 left-2 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded-full backdrop-blur-sm">
                      Perspective 0{i + 1}
                    </span>
                  </div>
                  <div className="p-3">
                    <h4 className="font-semibold text-xs text-plum">{img.title}</h4>
                    <p className="text-[11px] text-plum-soft mt-0.5">{img.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};
