import React from 'react';
import { useAuth } from '../../store/useAuth';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { TapeMeasure } from '../../components/TapeMeasure';
import { NeedleIcon, SparkleDoodle } from '../../components/Doodles';
import { ShoppingBag, Calendar, CheckCircle, Clock, Star } from 'lucide-react';

export const CustomerOrders = () => {
  const { user } = useAuth();
  const orders = user?.orders || [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-fraunces text-2xl sm:text-3xl text-plum">
          My Atelier Orders
        </h1>
        <p className="text-xs sm:text-sm text-plum-soft mt-1">
          Track fabric cutting, basting, hand embroidery, and doorstep deliveries.
        </p>
      </div>

      <div className="space-y-4">
        {orders.map((order) => {
          const isDelivered = order.status === 'Delivered';
          return (
            <Card key={order.id} variant="glass" className="p-6 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-blush/40 pb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-rose-deep">
                      #{order.id}
                    </span>
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                      isDelivered ? 'bg-mint text-emerald-950' : 'bg-blush text-rose-deep'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                  <h3 className="font-fraunces text-xl text-plum mt-1">
                    {order.title}
                  </h3>
                </div>

                <div className="text-left sm:text-right">
                  <span className="text-sm font-bold text-plum">{order.amount}</span>
                  <span className="text-xs text-plum-soft block">
                    {isDelivered ? `Delivered ${order.deliveredDate}` : `Est. ${order.estimatedDelivery}`}
                  </span>
                </div>
              </div>

              {!isDelivered && (
                <div className="space-y-2">
                  <TapeMeasure progress={65} label="Order Milestone Progress" />
                  <p className="text-xs text-plum-soft">
                    Craftsman: <strong className="text-plum">{order.tailorName}</strong> ({order.tailorCity})
                  </p>
                </div>
              )}

              {isDelivered && order.review && (
                <div className="bg-cream-100 p-3 rounded-2xl border border-plum/10 text-xs text-plum-soft flex items-start gap-2">
                  <div className="flex text-amber-500 shrink-0 mt-0.5">
                    {[...Array(order.ratingGiven || 5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span>"{order.review}"</span>
                </div>
              )}

              <div className="pt-2 flex justify-between items-center text-xs">
                <span className="text-plum-soft font-mono">Ordered: {order.orderDate}</span>
                <span className="text-rose-deep font-semibold">100% Fit Guarantee Covered</span>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
