import React from 'react';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { Calendar, Clock, CheckCircle, AlertCircle } from 'lucide-react';

export const TailorSchedule = () => {
  const scheduleEvents = [
    {
      date: 'Today, 24 Sep',
      time: '04:00 PM',
      event: 'Karchob Hand Zari Work — Order #ST-8921 (Priya Sharma)',
      type: 'Workshop Milestone',
      status: 'Live'
    },
    {
      date: 'Tomorrow, 25 Sep',
      time: '11:30 AM',
      event: 'Video Basting Consultation — Sangeet Client (Ananya D.)',
      type: 'Client Video Call',
      status: 'Upcoming'
    },
    {
      date: 'Sat, 27 Sep',
      time: '02:00 PM',
      event: 'Doorstep Courier Dispatch Box #902 — Express Delivery',
      type: 'Pickup',
      status: 'Scheduled'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-fraunces text-2xl sm:text-3xl text-plum">
          Workshop Basting & Fitting Schedule
        </h1>
        <p className="text-xs sm:text-sm text-plum-soft mt-1">
          Track cutting deadlines, courier pickups, and client video fitting calls.
        </p>
      </div>

      <div className="space-y-3">
        {scheduleEvents.map((item, idx) => (
          <Card key={idx} variant="glass" className="p-5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-mint flex items-center justify-center shrink-0">
                <Calendar className="w-6 h-6 text-emerald-800" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-xs text-plum">{item.date}</span>
                  <span className="text-[11px] text-plum-soft">• {item.time}</span>
                  <span className="text-[10px] px-2 py-0.2 rounded-full bg-cream-200 border border-plum/10 text-plum-soft">
                    {item.type}
                  </span>
                </div>
                <h4 className="font-semibold text-sm text-plum mt-1">{item.event}</h4>
              </div>
            </div>

            <span className="text-xs font-bold text-emerald-800 px-3 py-1 rounded-full bg-mint/50">
              {item.status}
            </span>
          </Card>
        ))}
      </div>
    </div>
  );
};
