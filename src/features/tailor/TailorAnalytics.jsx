import React from 'react';
import { Card } from '../../components/Card';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line 
} from 'recharts';
import { TrendingUp, Users, Star, Award, Calendar, DollarSign } from 'lucide-react';

const MONTHLY_DATA = [
  { month: 'May', orders: 4, revenue: 68000 },
  { month: 'Jun', orders: 6, revenue: 104000 },
  { month: 'Jul', orders: 5, revenue: 92000 },
  { month: 'Aug', orders: 8, revenue: 148000 },
  { month: 'Sep', orders: 11, revenue: 204000 },
  { month: 'Oct (Est)', orders: 14, revenue: 260000 },
];

const RATING_BREAKDOWN = [
  { stars: '5 Stars', count: 48, percentage: 92 },
  { stars: '4 Stars', count: 4, percentage: 8 },
  { stars: '3 Stars', count: 0, percentage: 0 },
  { stars: '2 Stars', count: 0, percentage: 0 },
  { stars: '1 Star', count: 0, percentage: 0 },
];

export const TailorAnalytics = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-mint/50 border border-mint text-[11px] font-semibold text-emerald-950 uppercase tracking-wider mb-1">
          <TrendingUp className="w-3.5 h-3.5 text-emerald-800" />
          <span>Workshop Performance</span>
        </div>
        <h1 className="font-fraunces text-2xl sm:text-3xl text-plum">
          Artisan Analytics & Repeat Client Trends
        </h1>
        <p className="text-xs sm:text-sm text-plum-soft">
          Gain visibility into your seasonal wedding orders, craft ratings, and client retention rates.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card variant="mint" className="p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shrink-0 shadow-xs">
            <Users className="w-5 h-5 text-emerald-800" />
          </div>
          <div>
            <span className="text-[10px] text-plum-soft uppercase font-bold block">Repeat Client Rate</span>
            <span className="text-xl font-bold text-emerald-900">42.8%</span>
            <span className="text-[10px] text-emerald-700 block">Top 5% in Jaipur region</span>
          </div>
        </Card>

        <Card variant="mint" className="p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shrink-0 shadow-xs">
            <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
          </div>
          <div>
            <span className="text-[10px] text-plum-soft uppercase font-bold block">Average Craft Rating</span>
            <span className="text-xl font-bold text-plum">4.96 ★</span>
            <span className="text-[10px] text-plum-soft block">Based on 52 verified outfits</span>
          </div>
        </Card>

        <Card variant="mint" className="p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shrink-0 shadow-xs">
            <Award className="w-5 h-5 text-emerald-800" />
          </div>
          <div>
            <span className="text-[10px] text-plum-soft uppercase font-bold block">Doorstep First-Fit</span>
            <span className="text-xl font-bold text-emerald-900">98.1%</span>
            <span className="text-[10px] text-plum-soft block">Zero alteration claims</span>
          </div>
        </Card>

        <Card variant="mint" className="p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shrink-0 shadow-xs">
            <Calendar className="w-5 h-5 text-emerald-800" />
          </div>
          <div>
            <span className="text-[10px] text-plum-soft uppercase font-bold block">Avg. Turnaround</span>
            <span className="text-xl font-bold text-plum">10.2 Days</span>
            <span className="text-[10px] text-emerald-700 block">2.8 days faster than SLA</span>
          </div>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trend */}
        <Card variant="mint" className="p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-mint/40 pb-3">
            <h3 className="font-fraunces text-base text-plum font-semibold">
              Monthly Payout Trend (₹ INR)
            </h3>
            <span className="text-xs text-emerald-800 font-bold">+38% Wedding Season Bump</span>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={MONTHLY_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="month" stroke="#4A3F5C" fontSize={11} />
                <YAxis stroke="#4A3F5C" fontSize={11} tickFormatter={(val) => `₹${val / 1000}k`} />
                <Tooltip
                  formatter={(val) => [`₹${val.toLocaleString('en-IN')}`, 'Atelier Earnings']}
                  contentStyle={{ backgroundColor: '#FFF', borderRadius: '12px', border: '1px solid #D5EFE3' }}
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#2E8B57"
                  strokeWidth={3}
                  dot={{ r: 4, fill: '#2E8B57' }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Orders Count Bar Chart */}
        <Card variant="mint" className="p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-mint/40 pb-3">
            <h3 className="font-fraunces text-base text-plum font-semibold">
              Bespoke Outfits Delivered per Month
            </h3>
            <span className="text-xs text-plum-soft">Festive capacity limit: 14</span>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MONTHLY_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="month" stroke="#4A3F5C" fontSize={11} />
                <YAxis stroke="#4A3F5C" fontSize={11} />
                <Tooltip
                  formatter={(val) => [`${val} Outfits`, 'Delivered']}
                  contentStyle={{ backgroundColor: '#FFF', borderRadius: '12px', border: '1px solid #D5EFE3' }}
                />
                <Bar dataKey="orders" fill="#D5EFE3" stroke="#2E8B57" strokeWidth={1.5} radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Ratings Distribution */}
      <Card variant="mint" className="p-6 space-y-4">
        <h3 className="font-fraunces text-base text-plum font-semibold">
          Customer Quality & Review Breakdown
        </h3>
        <div className="space-y-2 max-w-xl">
          {RATING_BREAKDOWN.map((item) => (
            <div key={item.stars} className="flex items-center gap-3 text-xs">
              <span className="w-16 text-plum font-medium">{item.stars}</span>
              <div className="flex-1 h-3 rounded-full bg-cream-100 overflow-hidden border border-mint">
                <div
                  className="h-full bg-emerald-700 rounded-full"
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
              <span className="w-10 text-right font-bold text-plum">{item.percentage}%</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
