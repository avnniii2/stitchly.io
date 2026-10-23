import React from 'react';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { Wallet, ArrowUpRight, CheckCircle2, Download } from 'lucide-react';

const EARNINGS_DATA = [
  { month: 'May', earnings: 42000, outfits: 5 },
  { month: 'Jun', earnings: 68000, outfits: 7 },
  { month: 'Jul', earnings: 84000, outfits: 9 },
  { month: 'Aug', earnings: 95000, outfits: 11 },
  { month: 'Sep', earnings: 112000, outfits: 13 },
];

export const TailorEarnings = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-fraunces text-2xl sm:text-3xl text-plum">
            Earnings & Artisan Payouts
          </h1>
          <p className="text-xs sm:text-sm text-plum-soft mt-1">
            Zero commission delays. 100% direct payouts credited upon customer doorstep delivery.
          </p>
        </div>

        <Button variant="secondary" size="sm" icon={Download} className="text-xs">
          Export Tax Statement (GST/TDS)
        </Button>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card variant="glass" className="p-5 space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-plum-soft">
            Total Payouts (FY 2026)
          </span>
          <div className="text-2xl font-bold font-fraunces text-emerald-900">
            ₹4,01,000
          </div>
          <span className="text-[11px] text-emerald-700 flex items-center gap-1 font-semibold">
            <ArrowUpRight className="w-3.5 h-3.5" /> +28% vs previous quarter
          </span>
        </Card>

        <Card variant="glass" className="p-5 space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-plum-soft">
            In Escrow / In Progress
          </span>
          <div className="text-2xl font-bold font-fraunces text-plum">
            ₹18,500
          </div>
          <span className="text-[11px] text-plum-soft">
            Order #ST-8921 (Lehenga embroidery stage)
          </span>
        </Card>

        <Card variant="glass" className="p-5 space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-plum-soft">
            Average Outfit Value
          </span>
          <div className="text-2xl font-bold font-fraunces text-plum">
            ₹11,400
          </div>
          <span className="text-[11px] text-plum-soft">
            Bridal & festive wear commissions
          </span>
        </Card>
      </div>

      {/* Recharts Bar Chart Card */}
      <Card variant="glass" className="p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-mint/40 pb-3">
          <h3 className="font-fraunces text-lg text-plum font-semibold">
            Monthly Payout Growth
          </h3>
          <span className="text-xs text-emerald-800 font-semibold">
            5 Consecutive Months Growth
          </span>
        </div>

        <div className="h-72 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={EARNINGS_DATA} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5F6EE" />
              <XAxis dataKey="month" tick={{ fill: '#4A3F5C', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#8A7F9C', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(val) => `₹${val/1000}k`} />
              <Tooltip 
                formatter={(val) => [`₹${val.toLocaleString()}`, 'Artisan Payout']}
                contentStyle={{ backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #D5EFE3', boxShadow: '0 8px 30px rgba(0,0,0,0.08)' }}
              />
              <Bar dataKey="earnings" fill="#8CD1B0" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
};
