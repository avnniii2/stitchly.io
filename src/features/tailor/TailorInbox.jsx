import React, { useState, useEffect } from 'react';
import { useAuth } from '../../store/useAuth';
import { useUI } from '../../store/useUI';
import { ordersService } from '../../services/orders';
import { Garment } from '../../components/garment/Garment';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { Chip } from '../../components/Chip';
import { ScissorsIcon, PinIcon } from '../../components/Doodles';
import { 
  Inbox, 
  Send, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Calendar, 
  Ruler, 
  Sparkles, 
  IndianRupee,
  FileText,
  AlertCircle
} from 'lucide-react';

export const TailorInbox = () => {
  const { user } = useAuth();
  const { addToast } = useUI();
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isQuoting, setIsQuoting] = useState(false);

  // Quote form state
  const [quotePrice, setQuotePrice] = useState(18500);
  const [turnaroundDays, setTurnaroundDays] = useState(12);
  const [tailorNotes, setTailorNotes] = useState('We will source hand-spun pure silk and embroider with antique gold zari on karchob frame.');

  const loadRequests = async () => {
    if (!user) return;
    const all = await ordersService.getOrdersByTailor(user.id);
    // Booking requests awaiting quote or response
    const requests = all.filter((o) => o.status === 'Requested' || o.paymentStatus?.includes('Quote'));
    setOrders(requests.length > 0 ? requests : all.slice(0, 3));
    if (requests.length > 0 && !selectedOrder) {
      setSelectedOrder(requests[0]);
      setQuotePrice(requests[0].numericAmount || 18500);
    } else if (all.length > 0 && !selectedOrder) {
      setSelectedOrder(all[0]);
      setQuotePrice(all[0].numericAmount || 18500);
    }
  };

  useEffect(() => {
    loadRequests();

    const handleStorageChange = () => {
      loadRequests();
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [user]);

  const handleSendQuote = async () => {
    if (!selectedOrder) return;
    setIsQuoting(true);
    try {
      await ordersService.sendQuote({
        orderId: selectedOrder.id,
        quotedPrice: quotePrice,
        turnaroundDays: turnaroundDays,
        tailorNotes: tailorNotes,
      });

      addToast({
        title: 'Formal Quote Dispatched',
        message: `Quote of ₹${quotePrice.toLocaleString('en-IN')} sent to ${selectedOrder.customerName}.`,
        type: 'success',
      });

      await loadRequests();
    } catch (err) {
      addToast({
        title: 'Error',
        message: 'Could not send quote.',
        type: 'error',
      });
    } finally {
      setIsQuoting(false);
    }
  };

  const handleDecline = (orderId) => {
    addToast({
      title: 'Booking Request Declined',
      message: 'The client has been notified to match with an alternate artisan.',
      type: 'stitch',
    });
    setOrders((prev) => prev.filter((o) => o.id !== orderId));
    if (selectedOrder?.id === orderId) {
      setSelectedOrder(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-mint/50 border border-mint text-[11px] font-semibold text-emerald-950 uppercase tracking-wider mb-1">
            <Inbox className="w-3.5 h-3.5 text-emerald-800" />
            <span>Artisan Commission Inbox</span>
          </div>
          <h1 className="font-fraunces text-2xl sm:text-3xl text-plum">
            Booking Requests & Feasibility Quotes
          </h1>
          <p className="text-xs sm:text-sm text-plum-soft">
            Review custom customer designs, assess fabric & embroidery requirements, and send formal quotes.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-900 font-bold border border-emerald-300">
            {orders.length} Active Inquiries
          </span>
        </div>
      </div>

      {orders.length === 0 ? (
        <Card variant="mint" className="p-12 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-white mx-auto flex items-center justify-center shadow-xs">
            <CheckCircle2 className="w-8 h-8 text-emerald-700" />
          </div>
          <h3 className="font-fraunces text-xl text-plum">All Caught Up!</h3>
          <p className="text-xs text-plum-soft max-w-md mx-auto">
            You have responded to all incoming commission requests. New customer requests matching your Jaipur bridal specialization will appear here instantly.
          </p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Request List */}
          <div className="lg:col-span-5 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-900 px-1">
              Incoming Customer Commissions
            </h3>
            {orders.map((order) => {
              const isSelected = selectedOrder?.id === order.id;
              return (
                <div
                  key={order.id}
                  onClick={() => {
                    setSelectedOrder(order);
                    setQuotePrice(order.numericAmount || 18500);
                  }}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer text-left ${
                    isSelected
                      ? 'bg-white border-emerald-600 shadow-md ring-2 ring-emerald-500/20'
                      : 'bg-white/80 border-mint/60 hover:bg-white hover:border-mint'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-emerald-950">
                          #{order.id}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-mint text-emerald-900 font-bold">
                          {order.status}
                        </span>
                      </div>
                      <h4 className="font-fraunces text-base text-plum font-semibold mt-1">
                        {order.title}
                      </h4>
                      <p className="text-xs text-plum-soft">
                        Client: {order.customerName} • {order.occasion}
                      </p>
                    </div>

                    <div className="text-right">
                      <span className="text-xs font-bold text-emerald-900 block">
                        ₹{(order.numericAmount || 18500).toLocaleString('en-IN')}
                      </span>
                      <span className="text-[10px] text-plum-soft">Est. Budget</span>
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t border-mint/30 flex items-center justify-between text-[11px] text-plum-soft">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-emerald-700" />
                      Target: {order.estimatedDelivery || '14 Days'}
                    </span>
                    <span className="font-semibold text-rose-deep">
                      {order.design?.fabric || 'Silk'} • {order.design?.embroidery || 'Zari'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Feasibility & Quote Workspace */}
          {selectedOrder && (
            <div className="lg:col-span-7 space-y-6">
              <Card variant="mint" className="p-6 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-mint/40 pb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm font-bold text-emerald-950">
                        Commission #{selectedOrder.id}
                      </span>
                      {selectedOrder.express && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-200 text-amber-950 font-bold">
                          Express (+25%)
                        </span>
                      )}
                    </div>
                    <h2 className="font-fraunces text-xl sm:text-2xl text-plum mt-1">
                      {selectedOrder.title}
                    </h2>
                    <p className="text-xs text-plum-soft">
                      Occasion: {selectedOrder.occasion} • Target Delivery: {selectedOrder.estimatedDelivery}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDecline(selectedOrder.id)}
                      icon={XCircle}
                      className="border-red-200 text-red-700 hover:bg-red-50 text-xs"
                    >
                      Decline
                    </Button>
                  </div>
                </div>

                {/* Garment Design Preview & Specs */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 bg-white/70 p-4 rounded-2xl border border-mint">
                  <div className="sm:col-span-5 flex items-center justify-center p-2 bg-cream/40 rounded-xl">
                    <div className="w-36 h-48">
                      <Garment
                        type={selectedOrder.design?.type || 'lehenga'}
                        colour={selectedOrder.design?.colour || '#D9718A'}
                        fabric={selectedOrder.design?.fabric || 'silk'}
                        neckline={selectedOrder.design?.neckline || 'sweetheart'}
                        sleeve={selectedOrder.design?.sleeve || 'elbow'}
                        embroidery={selectedOrder.design?.embroidery || 'heavy-zari'}
                        dupatta={selectedOrder.design?.dupatta !== false}
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-7 space-y-2 text-xs">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-900 block">
                      Custom Parametric Specifications:
                    </span>
                    <div className="grid grid-cols-2 gap-2 text-plum">
                      <div className="p-2 rounded-lg bg-cream-100 border border-plum/10">
                        <span className="text-[10px] text-plum-soft block">Silhouette</span>
                        <strong className="capitalize">{selectedOrder.design?.type || 'Lehenga'}</strong>
                      </div>
                      <div className="p-2 rounded-lg bg-cream-100 border border-plum/10">
                        <span className="text-[10px] text-plum-soft block">Fabric Texture</span>
                        <strong className="capitalize">{selectedOrder.design?.fabric || 'Silk'}</strong>
                      </div>
                      <div className="p-2 rounded-lg bg-cream-100 border border-plum/10">
                        <span className="text-[10px] text-plum-soft block">Neckline Cut</span>
                        <strong className="capitalize">{selectedOrder.design?.neckline || 'Sweetheart'}</strong>
                      </div>
                      <div className="p-2 rounded-lg bg-cream-100 border border-plum/10">
                        <span className="text-[10px] text-plum-soft block">Embroidery</span>
                        <strong className="capitalize">{selectedOrder.design?.embroidery || 'Heavy Zari'}</strong>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Verified Measurements */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-950 flex items-center gap-1.5">
                      <Ruler className="w-3.5 h-3.5 text-emerald-800" />
                      Client Measurements ({selectedOrder.customerName})
                    </span>
                    <span className="text-[10px] text-emerald-800 font-semibold bg-mint px-2 py-0.5 rounded-full">
                      Tape Measure Verified
                    </span>
                  </div>

                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 text-center text-xs">
                    {Object.entries(selectedOrder.measurements || {
                      bust: 36,
                      waist: 29,
                      hip: 39,
                      shoulder: 14.5,
                      blouseLength: 15,
                      lehengaLength: 41
                    }).map(([key, val]) => (
                      <div key={key} className="p-2 rounded-xl bg-white border border-mint">
                        <span className="text-[10px] text-plum-soft uppercase block font-semibold truncate">
                          {key}
                        </span>
                        <span className="text-xs font-bold text-plum">{val}"</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Feasibility & Formal Quote Tool */}
                <div className="rounded-2xl bg-white p-5 border border-emerald-400/80 shadow-soft-mint space-y-4">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-emerald-800" />
                    <h3 className="font-fraunces text-base text-plum font-semibold">
                      Workshop Feasibility & Formal Quote Generator
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-plum block">
                        Formal Quoted Price (₹ INR)
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-2.5 text-plum-soft font-bold">₹</span>
                        <input
                          type="number"
                          step="500"
                          value={quotePrice}
                          onChange={(e) => setQuotePrice(Number(e.target.value))}
                          className="w-full pl-8 pr-3 py-2 text-sm font-bold text-plum rounded-xl border border-plum/20 bg-cream-50 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                        />
                      </div>
                      <span className="text-[10px] text-plum-soft block">
                        Customer will pay 40% (₹{Math.round(quotePrice * 0.4).toLocaleString('en-IN')}) upon accepting.
                      </span>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-bold text-plum block">
                          Turnaround Timeline
                        </label>
                        <span className="text-xs font-bold text-emerald-800">
                          {turnaroundDays} Days
                        </span>
                      </div>
                      <input
                        type="range"
                        min="5"
                        max="30"
                        value={turnaroundDays}
                        onChange={(e) => setTurnaroundDays(Number(e.target.value))}
                        className="w-full accent-emerald-700"
                      />
                      <span className="text-[10px] text-plum-soft block">
                        Estimated dispatch: within ~{turnaroundDays} business days.
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-plum block">
                      Artisan Note & Feasibility Guarantee
                    </label>
                    <textarea
                      rows={2}
                      value={tailorNotes}
                      onChange={(e) => setTailorNotes(e.target.value)}
                      className="w-full p-3 text-xs text-plum rounded-xl border border-plum/20 bg-cream-50 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                      placeholder="Specify fabric sourcing, lining type, margin allowances..."
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <div className="text-xs text-plum-soft">
                      Status: <strong className="text-emerald-900">{selectedOrder.paymentStatus || 'Awaiting Quote'}</strong>
                    </div>

                    <Button
                      variant="primary"
                      onClick={handleSendQuote}
                      disabled={isQuoting}
                      icon={Send}
                      className="bg-emerald-800 hover:bg-emerald-900 text-white shadow-soft-mint text-xs"
                    >
                      {isQuoting ? 'Dispatching Quote...' : 'Send Formal Quote & Specs'}
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
