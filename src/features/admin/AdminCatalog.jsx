import React, { useState } from 'react';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { useUI } from '../../store/useUI';
import { Layers, Plus, Edit, Sparkles, Tag, Check } from 'lucide-react';

const INITIAL_GARMENTS = [
  { id: 'g-1', name: 'Lehenga Set (3-Piece)', basePrice: 16500, estDays: 14, defaultMargin: '2.5"' },
  { id: 'g-2', name: 'Kurta & Churidar Set', basePrice: 6500, estDays: 7, defaultMargin: '2.0"' },
  { id: 'g-3', name: 'Royal Groom Sherwani', basePrice: 21000, estDays: 16, defaultMargin: '2.5"' },
  { id: 'g-4', name: 'Floor-Length Anarkali', basePrice: 11500, estDays: 10, defaultMargin: '2.0"' },
  { id: 'g-5', name: 'Sweetheart Padded Blouse', basePrice: 3500, estDays: 5, defaultMargin: '2.0"' },
];

const INITIAL_FABRICS = [
  { id: 'f-1', name: 'Pure Mulberry Silk', texture: 'Silk Sheen Gradient', perMeterRate: 1450, region: 'Varanasi' },
  { id: 'f-2', name: 'Italian Micro-Velvet', texture: 'Deep Light Absorption', perMeterRate: 1850, region: 'Surat' },
  { id: 'f-3', name: 'Air-Drape Pure Georgette', texture: 'Soft Semi-Sheer Draping', perMeterRate: 980, region: 'Surat' },
  { id: 'f-4', name: 'Banarasi Gold Brocade', texture: 'Woven Zari Floral Grid', perMeterRate: 2800, region: 'Varanasi' },
  { id: 'f-5', name: 'Hand-Spun Raw Chanderi', texture: 'Subtle Cotton-Silk Luster', perMeterRate: 1200, region: 'Madhya Pradesh' },
];

export const AdminCatalog = () => {
  const { addToast } = useUI();
  const [garments, setGarments] = useState(INITIAL_GARMENTS);
  const [fabrics, setFabrics] = useState(INITIAL_FABRICS);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-sky/50 border border-sky-300 text-[11px] font-semibold text-blue-900 uppercase tracking-wider mb-1">
            <Layers className="w-3.5 h-3.5 text-blue-700" />
            <span>Master Atelier Directory</span>
          </div>
          <h1 className="font-fraunces text-2xl sm:text-3xl text-plum">
            Garment Silhouettes & Fabric Inventory Catalog
          </h1>
          <p className="text-xs sm:text-sm text-plum-soft">
            Manage the parametric 3D silhouettes, fabric swatch properties, and platform baseline making rates.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          icon={Plus}
          onClick={() => addToast({ title: 'Catalog Updated', message: 'New silhouette added to AI Studio generator.', type: 'success' })}
          className="text-xs bg-blue-800 hover:bg-blue-900 text-white"
        >
          Add New Silhouette
        </Button>
      </div>

      {/* Garments Table */}
      <Card variant="sky" className="p-6 space-y-4">
        <h3 className="font-fraunces text-lg text-plum">
          Parametric Garment Silhouettes (AI Studio)
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-sky/40 text-plum-soft uppercase text-[10px] tracking-wider">
                <th className="py-2.5">Silhouette Name</th>
                <th className="py-2.5">Base Making Rate</th>
                <th className="py-2.5">Standard Turnaround</th>
                <th className="py-2.5">Internal Seam Allowance</th>
                <th className="py-2.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sky/20">
              {garments.map((g) => (
                <tr key={g.id} className="hover:bg-white/60">
                  <td className="py-3 font-bold text-plum">{g.name}</td>
                  <td className="py-3 font-semibold text-emerald-900">
                    ₹{g.basePrice.toLocaleString('en-IN')}
                  </td>
                  <td className="py-3 text-plum-soft">{g.estDays} Days</td>
                  <td className="py-3 font-mono text-plum">{g.defaultMargin}</td>
                  <td className="py-3 text-right">
                    <button
                      onClick={() => addToast({ title: 'Rate Adjusted', message: `${g.name} baseline price updated.`, type: 'info' })}
                      className="text-blue-700 hover:underline font-semibold"
                    >
                      Edit Rate
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Fabrics Table */}
      <Card variant="sky" className="p-6 space-y-4">
        <h3 className="font-fraunces text-lg text-plum">
          Curated Atelier Fabric Swatches
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-sky/40 text-plum-soft uppercase text-[10px] tracking-wider">
                <th className="py-2.5">Fabric Swatch</th>
                <th className="py-2.5">SVG Shader Property</th>
                <th className="py-2.5">Origin Weaving Region</th>
                <th className="py-2.5">Per-Meter Procurement</th>
                <th className="py-2.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sky/20">
              {fabrics.map((f) => (
                <tr key={f.id} className="hover:bg-white/60">
                  <td className="py-3 font-bold text-plum">{f.name}</td>
                  <td className="py-3 text-plum-soft">{f.texture}</td>
                  <td className="py-3 text-plum">{f.region}</td>
                  <td className="py-3 font-semibold text-emerald-900">
                    ₹{f.perMeterRate}/meter
                  </td>
                  <td className="py-3 text-right">
                    <button
                      onClick={() => addToast({ title: 'Swatch Configured', message: `${f.name} shader settings saved.`, type: 'info' })}
                      className="text-blue-700 hover:underline font-semibold"
                    >
                      Edit Shader
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
