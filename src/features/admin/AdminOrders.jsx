import React, { useState, useEffect } from 'react';
import { orderService } from '../../services/orders';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { Package, Clock, CheckCircle2, User, Search } from 'lucide-react';

export const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    orderService.getOrders({ role: 'admin' }).then(setOrders);
  }, []);

  const filtered = orders.filter(o => 
    o.title?.toLowerCase().includes(search.toLowerCase()) ||
    o.id?.toLowerCase().includes(search.toLowerCase()) ||
    o.customerName?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-fraunces text-2xl sm:text-3xl text-plum">
            Global Orders Fulfillment Tracker
          </h1>
          <p className="text-xs sm:text-sm text-plum-soft mt-1">
            Real-time monitoring across all customer orders and workshop production lines.
          </p>
        </div>

        <div className="relative max-w-xs w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-plum-soft" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by order # or client..."
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-white border border-plum/20 text-plum focus:outline-none"
          />
        </div>
      </div>

      <div className="space-y-3">
        {filtered.map((order) => (
          <Card key={order.id} variant="glass" className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-blue-900">
                  #{order.id}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-sky/40 text-blue-950">
                  {order.status}
                </span>
              </div>
              <h3 className="font-fraunces text-lg text-plum font-semibold mt-1">
                {order.title}
              </h3>
              <p className="text-xs text-plum-soft">
                Client: {order.customerName || 'Priya Sharma'} • Tailor: {order.tailorName || 'Master Artisan'}
              </p>
            </div>

            <div className="flex items-center gap-6">
              <div>
                <span className="text-[10px] text-plum-soft uppercase block">Amount</span>
                <span className="text-sm font-bold text-plum">{order.amount}</span>
              </div>
              <div>
                <span className="text-[10px] text-plum-soft uppercase block">Delivery Target</span>
                <span className="text-xs font-semibold text-plum">{order.estimatedDelivery || order.deliveredDate}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
