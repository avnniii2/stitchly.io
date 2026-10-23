import React from 'react';
import { Card } from '../../components/Card';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const CITY_DEMAND_DATA = [
  { city: 'Mumbai', orders: 48, gmv: 8.4 },
  { city: 'Delhi NCR', orders: 42, gmv: 7.6 },
  { city: 'Bengaluru', orders: 36, gmv: 6.2 },
  { city: 'Hyderabad', orders: 28, gmv: 4.8 },
  { city: 'Jaipur', orders: 22, gmv: 4.1 },
  { city: 'Chennai', orders: 18, gmv: 3.5 },
];

export const AdminAnalytics = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-fraunces text-2xl sm:text-3xl text-plum">
          Marketplace & Regional Analytics
        </h1>
        <p className="text-xs sm:text-sm text-plum-soft mt-1">
          Cluster demand insights across metros and tier-1 wedding hubs.
        </p>
      </div>

      <Card variant="glass" className="p-6 space-y-4">
        <h3 className="font-fraunces text-lg text-plum font-semibold">
          Regional Commission Volume (Lakhs INR)
        </h3>

        <div className="h-72 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={CITY_DEMAND_DATA}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5F1FC" />
              <XAxis dataKey="city" tick={{ fill: '#4A3F5C', fontSize: 12 }} />
              <YAxis tick={{ fill: '#8A7F9C', fontSize: 11 }} tickFormatter={(v) => `₹${v}L`} />
              <Tooltip 
                formatter={(val) => [`₹${val} Lakhs`, 'Gross Merchandise Value']}
                contentStyle={{ borderRadius: '16px', border: '1px solid #D8E8F8' }}
              />
              <Bar dataKey="gmv" fill="#4B77BE" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
};
