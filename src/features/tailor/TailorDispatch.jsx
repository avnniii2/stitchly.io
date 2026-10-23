import React, { useState, useEffect } from 'react';
import { useAuth } from '../../store/useAuth';
import { useUI } from '../../store/useUI';
import { ordersService } from '../../services/orders';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { Truck, PackageCheck, QrCode, CheckCircle2, ArrowRight, Printer, ShieldCheck } from 'lucide-react';

export const TailorDispatch = () => {
  const { user } = useAuth();
  const { addToast } = useUI();
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [checklist, setChecklist] = useState({
    ironed: true,
    tassels: true,
    humidityPouch: true,
    certificate: true,
  });

  const loadOrders = async () => {
    if (!user) return;
    const all = await ordersService.getOrdersByTailor(user.id);
    const dispatchable = all.filter((o) => ['QC', 'Ready', 'Dispatched'].includes(o.status));
    setOrders(dispatchable.length > 0 ? dispatchable : all);
    if (!selectedOrder && (dispatchable.length > 0 || all.length > 0)) {
      setSelectedOrder(dispatchable[0] || all[0]);
    }
  };

  useEffect(() => {
    loadOrders();
    window.addEventListener('storage', loadOrders);
    return () => window.removeEventListener('storage', loadOrders);
  }, [user]);

  const handleToggleCheck = (key) => {
    setChecklist({ ...checklist, [key]: !checklist[key] });
  };

  const handleDispatch = async () => {
    if (!selectedOrder) return;
    const awb = `DEL-ST-${Math.floor(100000 + Math.random() * 900000)}-IN`;

    try {
      await ordersService.updateOrderStatus({
        orderId: selectedOrder.id,
        newStatus: 'Dispatched',
        photoUrl: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=500&auto=format&fit=crop&q=80',
        photoCaption: `Dispatched via Delhivery Surface Express. AWB: ${awb}`,
      });

      addToast({
        title: 'Dispatched to Delhivery Surface Express',
        message: `AWB ${awb} generated. Client received live tracking link.`,
        type: 'success',
      });

      await loadOrders();
    } catch (err) {
      addToast({
        title: 'Error',
        message: 'Could not mark order as dispatched.',
        type: 'error',
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-mint/50 border border-mint text-[11px] font-semibold text-emerald-950 uppercase tracking-wider mb-1">
            <Truck className="w-3.5 h-3.5 text-emerald-800" />
            <span>Courier Logistics Handoff</span>
          </div>
          <h1 className="font-fraunces text-2xl sm:text-3xl text-plum">
            Doorstep Dispatch & Courier Tracking (AWB)
          </h1>
          <p className="text-xs sm:text-sm text-plum-soft">
            Generate Delhivery / Shiprocket courier labels, perform pre-pack checklist, and initiate doorstep delivery.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs px-3 py-1.5 rounded-full bg-white text-emerald-900 font-bold border border-mint shadow-xs">
            Courier Partner: Delhivery Surface Express
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Dispatch Queue */}
        <div className="lg:col-span-5 space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-900 px-1">
            Orders in Packaging & Transit Queue
          </h3>

          {orders.map((order) => {
            const isSelected = selectedOrder?.id === order.id;
            return (
              <div
                key={order.id}
                onClick={() => setSelectedOrder(order)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer text-left ${
                  isSelected
                    ? 'bg-white border-emerald-600 shadow-md ring-2 ring-emerald-500/20'
                    : 'bg-white/80 border-mint/60 hover:bg-white hover:border-mint'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="font-mono text-xs font-bold text-emerald-950">
                      #{order.id}
                    </span>
                    <h4 className="font-fraunces text-base text-plum font-semibold mt-0.5">
                      {order.title}
                    </h4>
                    <p className="text-xs text-plum-soft">
                      Client: {order.customerName} ({order.customerCity || 'Mumbai'})
                    </p>
                  </div>

                  <span className={`text-[10px] px-2.5 py-1 rounded-full font-bold uppercase tracking-wider ${
                    order.status === 'Dispatched'
                      ? 'bg-teal-100 text-teal-900 border border-teal-300'
                      : 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                  }`}>
                    {order.status}
                  </span>
                </div>

                <div className="mt-3 pt-2 border-t border-mint/30 flex items-center justify-between text-[11px] text-plum-soft">
                  <span>AWB: {order.awbNumber || 'Pending Handoff'}</span>
                  <span className="font-bold text-emerald-900">{order.amount}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Courier Handoff Station */}
        {selectedOrder && (
          <div className="lg:col-span-7 space-y-6">
            <Card variant="mint" className="p-6 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-mint/40 pb-4">
                <div>
                  <span className="font-mono text-xs font-bold text-emerald-950">
                    Dispatch Station • #{selectedOrder.id}
                  </span>
                  <h2 className="font-fraunces text-xl sm:text-2xl text-plum mt-1">
                    {selectedOrder.title}
                  </h2>
                  <p className="text-xs text-plum-soft">
                    Destination: {selectedOrder.customerName}, Mumbai 400050
                  </p>
                </div>

                <div className="bg-white p-2 rounded-xl border border-mint shadow-xs text-center">
                  <QrCode className="w-10 h-10 text-emerald-800 mx-auto" />
                  <span className="text-[9px] font-mono text-plum-soft block mt-1">
                    {selectedOrder.awbNumber || 'DEL-ST-892144-IN'}
                  </span>
                </div>
              </div>

              {/* Atelier Pre-Pack Verification Checklist */}
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-950 block">
                  Mandatory Atelier Packaging Checklist:
                </span>

                <div className="space-y-2">
                  {[
                    { key: 'ironed', label: 'Steam pressed & loose zari thread ends trimmed' },
                    { key: 'tassels', label: 'Matching latkan tassels & extra embroidery beads included' },
                    { key: 'humidityPouch', label: 'Placed inside anti-humidity satin garment bag with silica' },
                    { key: 'certificate', label: 'Signed Atelier Craftsmanship & Doorstep Fit Guarantee card attached' },
                  ].map((item) => (
                    <div
                      key={item.key}
                      onClick={() => handleToggleCheck(item.key)}
                      className="flex items-center gap-3 p-3 rounded-xl bg-white border border-mint cursor-pointer hover:bg-mint/20 transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={checklist[item.key]}
                        onChange={() => {}}
                        className="w-4 h-4 accent-emerald-700 rounded-sm cursor-pointer"
                      />
                      <span className="text-xs text-plum font-medium">
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Dispatch Action */}
              <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-mint/40">
                <div className="text-xs text-plum-soft">
                  Status:{' '}
                  <strong className="text-emerald-950">
                    {selectedOrder.status === 'Dispatched' ? 'Already in Transit' : 'Ready for Courier Pickup'}
                  </strong>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    icon={Printer}
                    onClick={() => addToast({ title: 'Label Printing', message: 'Delhivery barcode label queued.', type: 'info' })}
                    className="text-xs border-mint text-emerald-900"
                  >
                    Print Shipping Label
                  </Button>

                  <Button
                    variant="primary"
                    size="sm"
                    onClick={handleDispatch}
                    disabled={selectedOrder.status === 'Dispatched'}
                    icon={PackageCheck}
                    className="bg-emerald-800 hover:bg-emerald-900 text-white text-xs shadow-soft-mint"
                  >
                    {selectedOrder.status === 'Dispatched' ? 'Dispatched ✓' : 'Handover to Courier Executive'}
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};
