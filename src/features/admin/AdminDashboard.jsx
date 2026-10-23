import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { Activity, UserCheck, PackageSearch, Sparkles, ArrowRight, ShieldAlert, CheckCircle2 } from 'lucide-react';

const ORDER_FLOW_DATA = [
  { day: 'Mon', orders: 24, renders: 310 },
  { day: 'Tue', orders: 32, renders: 420 },
  { day: 'Wed', orders: 28, renders: 390 },
  { day: 'Thu', orders: 45, renders: 580 },
  { day: 'Fri', orders: 52, renders: 670 },
  { day: 'Sat', orders: 68, renders: 890 },
  { day: 'Sun', orders: 60, renders: 780 },
];

export const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-sky/40 via-sky/20 to-white border border-sky p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-sm">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/90 border border-sky text-[11px] font-semibold text-blue-900 uppercase tracking-wider">
            <Activity className="w-3.5 h-3.5 text-blue-700" />
            <span>Atelier Operations Control</span>
          </div>
          <h1 className="font-fraunces text-2xl sm:text-3xl text-plum">
            Operations Control Room
          </h1>
          <p className="text-xs sm:text-sm text-plum-soft">
            Live overview of independent tailor matches, workshop KYC reviews, and order fulfillment.
          </p>
        </div>

        <Button
          variant="sky"
          size="md"
          icon={UserCheck}
          onClick={() => navigate('/admin/tailors')}
          className="text-xs sm:text-sm font-semibold shrink-0"
        >
          Review Pending KYC (1)
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card variant="sky" className="p-5 space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-plum-soft">
            Total Orders in Workshop
          </span>
          <div className="text-2xl font-bold font-fraunces text-plum">
            184 Active
          </div>
          <span className="text-[11px] text-emerald-700 font-semibold">
            99.2% On-Time Basting Rate
          </span>
        </Card>

        <Card variant="sky" className="p-5 space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800">
            Pending Tailor KYCs
          </span>
          <div className="text-2xl font-bold font-fraunces text-amber-900">
            1 Application
          </div>
          <span className="text-[11px] text-rose-deep font-semibold">
            Rajeshwari Sharma (Mumbai)
          </span>
        </Card>

        <Card variant="sky" className="p-5 space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-plum-soft">
            Monthly Atelier GMV
          </span>
          <div className="text-2xl font-bold font-fraunces text-blue-900">
            ₹38.4 Lakhs
          </div>
          <span className="text-[11px] text-blue-700 font-semibold">
            +32% vs last month
          </span>
        </Card>

        <Card variant="sky" className="p-5 space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-plum-soft">
            Doorstep Fit Success
          </span>
          <div className="text-2xl font-bold font-fraunces text-emerald-900">
            98.8%
          </div>
          <span className="text-[11px] text-emerald-700 font-semibold">
            Zero-alteration benchmark
          </span>
        </Card>
      </div>

      {/* Recharts Chart: Weekly Atelier Activity */}
      <Card variant="glass" className="p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-sky/50 pb-3">
          <div>
            <h3 className="font-fraunces text-lg text-plum font-semibold">
              Weekly Order Volume & AI Studio Generations
            </h3>
            <p className="text-xs text-plum-soft">
              Real-time synchronization between client prompts and workshop cuts
            </p>
          </div>
          <span className="text-xs font-semibold text-blue-800 bg-sky/40 px-2.5 py-1 rounded-full">
            Live Telemetry
          </span>
        </div>

        <div className="h-72 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={ORDER_FLOW_DATA} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="orderGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4B77BE" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#4B77BE" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5F1FC" />
              <XAxis dataKey="day" tick={{ fill: '#4A3F5C', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#8A7F9C', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #D8E8F8', boxShadow: '0 8px 30px rgba(0,0,0,0.08)' }}
              />
              <Area type="monotone" dataKey="orders" stroke="#4B77BE" strokeWidth={2.5} fillOpacity={1} fill="url(#orderGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
};
