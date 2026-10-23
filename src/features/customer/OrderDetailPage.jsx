import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { orderService } from '../../services/orders';
import { paymentService } from '../../services/payments';
import { courierService } from '../../services/courier';
import { useAuth } from '../../store/useAuth';
import { useUI } from '../../store/useUI';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { Modal } from '../../components/Modal';
import { Garment } from '../../components/garment/Garment';
import { TapeMeasure } from '../../components/TapeMeasure';
import { StitchDivider } from '../../components/StitchDivider';
import { NeedleIcon, ScissorsIcon, SparkleDoodle, PinIcon } from '../../components/Doodles';
import { 
  ShoppingBag, 
  Clock, 
  Truck, 
  MessageSquare, 
  Camera, 
  Star, 
  RotateCcw, 
  CreditCard, 
  QrCode, 
  CheckCircle2, 
  Send,
  AlertTriangle,
  FileCheck2,
  Calendar,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const OrderDetailPage = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addToast } = useUI();

  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Modals & Panels
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [paymentType, setPaymentType] = useState('advance'); // 'advance' | 'balance'
  const [paymentMethod, setPaymentMethod] = useState('upi'); // 'upi' | 'card' | 'emi'
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState('');

  const [alterationModalOpen, setAlterationModalOpen] = useState(false);
  const [alterationNotes, setAlterationNotes] = useState('');

  const [chatMessage, setChatMessage] = useState('');

  const loadOrder = async () => {
    try {
      const data = await orderService.getOrderById(orderId || 'ST-8921');
      setOrder(data);
    } catch {
      // fallback to seed
      const orders = await orderService.getOrders({ userId: user?.id, role: 'customer' });
      setOrder(orders[0]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadOrder();

    // Listen for storage events (tailor updating in another tab!)
    const handleStorageChange = () => {
      loadOrder();
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [orderId]);

  if (isLoading || !order) {
    return (
      <div className="py-16 text-center text-plum-soft">
        <NeedleIcon className="w-8 h-8 mx-auto animate-spin" color="#D9718A" />
        <p className="mt-2 text-xs">Retrieving order details from workshop...</p>
      </div>
    );
  }

  const milestones = paymentService.calculateMilestones(order.numericAmount || 18500);
  const courierData = courierService.getTrackingDetails(order.awbNumber);
  const isDelivered = order.status === 'Delivered';
  const isQuotePending = order.paymentStatus?.includes('Quote Received');
  const needsAdvance = order.paidAdvance === 0 && (order.status === 'Requested' || isQuotePending);

  // Handle Payment Submit
  const handlePayment = async () => {
    setIsProcessingPayment(true);
    await paymentService.processPayment({
      orderId: order.id,
      amount: paymentType === 'advance' ? milestones.advance : milestones.balance,
      method: paymentMethod,
      splitType: paymentType
    });

    if (paymentType === 'advance') {
      await orderService.acceptQuoteAndPayAdvance({ orderId: order.id, paymentMethod: paymentMethod.toUpperCase() });
    } else {
      await orderService.payBalance({ orderId: order.id });
    }

    try {
      confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });
    } catch {}

    addToast({
      title: 'Payment Secured in Escrow',
      message: paymentType === 'advance' ? '40% advance confirmed. Tailor notified to begin production!' : 'Full balance settled. Thank you!',
      type: 'success'
    });

    setIsProcessingPayment(false);
    setPaymentModalOpen(false);
    loadOrder();
  };

  // Handle Send Chat
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;

    await orderService.sendChatMessage({
      orderId: order.id,
      senderId: user?.id || 'user-customer-1',
      senderName: user?.name || 'Priya Sharma',
      senderRole: 'customer',
      text: chatMessage
    });

    setChatMessage('');
    loadOrder();
  };

  // Handle Review Submit
  const handleReviewSubmit = async () => {
    await orderService.submitReview({
      orderId: order.id,
      rating,
      reviewText
    });
    setReviewModalOpen(false);
    addToast({ title: 'Review Published', message: 'Thank you for supporting independent karigars!', type: 'success' });
    loadOrder();
  };

  // Handle Alteration Submit
  const handleAlterationSubmit = async () => {
    await orderService.requestAlteration({
      orderId: order.id,
      notes: alterationNotes
    });
    setAlterationModalOpen(false);
    addToast({ title: 'Alteration Scheduled', message: 'Free courier pickup arranged under our 100% Fit Guarantee.', type: 'stitch' });
    loadOrder();
  };

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="rounded-3xl bg-white border border-blush/60 p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-soft">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="font-mono text-xs font-bold text-rose-deep">
              Order #{order.id}
            </span>
            <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
              isDelivered ? 'bg-mint text-emerald-950' : 'bg-blush text-rose-deep'
            }`}>
              {order.status}
            </span>
            {order.paymentStatus && (
              <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-cream-200 text-plum-soft">
                {order.paymentStatus}
              </span>
            )}
          </div>

          <h1 className="font-fraunces text-2xl sm:text-3xl text-plum">
            {order.title}
          </h1>
          <p className="text-xs sm:text-sm text-plum-soft mt-0.5">
            Tailored by <strong className="text-plum">{order.tailorName}</strong> ({order.tailorCity}) • Commissioned {order.orderDate}
          </p>
        </div>

        {/* Action Buttons depending on status */}
        <div className="flex flex-wrap items-center gap-3">
          {needsAdvance && (
            <Button
              variant="primary"
              size="md"
              icon={CreditCard}
              onClick={() => {
                setPaymentType('advance');
                setPaymentModalOpen(true);
              }}
              className="shadow-soft-blush font-semibold text-xs"
            >
              Pay 40% Advance ({milestones.formattedAdvance})
            </Button>
          )}

          {isDelivered && !order.paidBalance && (
            <Button
              variant="primary"
              size="md"
              icon={CreditCard}
              onClick={() => {
                setPaymentType('balance');
                setPaymentModalOpen(true);
              }}
              className="shadow-soft-blush font-semibold text-xs"
            >
              Settle Balance ({milestones.formattedBalance})
            </Button>
          )}

          {isDelivered && (
            <>
              {!order.review && (
                <Button
                  variant="secondary"
                  size="sm"
                  icon={Star}
                  onClick={() => setReviewModalOpen(true)}
                  className="text-xs"
                >
                  Rate & Review
                </Button>
              )}

              <Button
                variant="stitch"
                size="sm"
                icon={RotateCcw}
                onClick={() => setAlterationModalOpen(true)}
                className="text-xs"
              >
                Free Alteration Pickup
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Main Grid: Left Stage (Design & Timeline) & Right Stage (Workshop Photos, Chat, Courier) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column (Design Card, Measurements, Timeline) */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* Garment Design Card */}
          <Card variant="glass" className="p-6 space-y-4">
            <h3 className="font-fraunces text-lg text-plum font-semibold">
              Commissioned Pattern & Specs
            </h3>

            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="w-40 h-56 bg-cream-100 rounded-2xl border border-blush/60 flex items-center justify-center shrink-0">
                <Garment
                  type={order.design?.type || 'lehenga'}
                  colour={order.design?.colour || '#D9718A'}
                  fabric={order.design?.fabric || 'silk'}
                  embroidery={order.design?.embroidery || 'heavy-zari'}
                  neckline={order.design?.neckline || 'sweetheart'}
                  sleeve={order.design?.sleeve || 'elbow'}
                  width={150}
                  height={210}
                />
              </div>

              <div className="space-y-2 text-xs text-plum flex-1">
                <div>
                  <span className="text-plum-soft block text-[10px] uppercase font-bold">Fabric</span>
                  <span className="font-semibold capitalize">{order.design?.fabric || 'Mulberry Silk'}</span>
                </div>
                <div>
                  <span className="text-plum-soft block text-[10px] uppercase font-bold">Embroidery Style</span>
                  <span className="font-semibold capitalize">{order.design?.embroidery || 'Zari Zardozi'}</span>
                </div>
                <div>
                  <span className="text-plum-soft block text-[10px] uppercase font-bold">Cuts</span>
                  <span>{order.design?.neckline} neckline • {order.design?.sleeve} sleeves</span>
                </div>
                <div>
                  <span className="text-plum-soft block text-[10px] uppercase font-bold">Occasion</span>
                  <span>{order.occasion}</span>
                </div>
              </div>
            </div>
          </Card>

          {/* 6-Stage Live Timeline */}
          <Card variant="glass" className="p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-blush/40 pb-3">
              <h3 className="font-fraunces text-lg text-plum font-semibold">
                Live Workshop Sequence
              </h3>
              <span className="text-xs text-rose-deep font-semibold">
                Est. Delivery: {order.estimatedDelivery || order.deliveredDate}
              </span>
            </div>

            <div className="space-y-4 relative pl-4 border-l-2 border-dashed border-blush/60">
              {order.timeline?.map((step, idx) => (
                <div key={idx} className="relative">
                  {/* Pin Dot */}
                  <div className={`absolute -left-[23px] top-1 w-3.5 h-3.5 rounded-full border-2 ${
                    step.completed 
                      ? 'bg-rose-deep border-white ring-2 ring-blush' 
                      : step.active 
                      ? 'bg-amber-400 border-white ring-2 ring-amber-200 animate-pulse' 
                      : 'bg-cream-200 border-plum/20'
                  }`} />
                  <p className={`text-xs font-semibold ${step.completed ? 'text-plum' : 'text-plum-soft'}`}>
                    {step.title}
                  </p>
                  <p className="text-[11px] text-plum-soft font-mono mt-0.5">{step.date}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Measurements Profile Attached */}
          <Card variant="glass" className="p-5 space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-rose-deep block">
              14-Point Tailoring Dimensions Locked to Order:
            </span>
            <div className="grid grid-cols-4 gap-2 text-xs font-mono text-plum pt-1">
              <div className="p-2 rounded-lg bg-cream-100 border border-plum/5">Bust: 36"</div>
              <div className="p-2 rounded-lg bg-cream-100 border border-plum/5">Waist: 29"</div>
              <div className="p-2 rounded-lg bg-cream-100 border border-plum/5">Hip: 39"</div>
              <div className="p-2 rounded-lg bg-cream-100 border border-plum/5">Margin: 2.5"</div>
            </div>
          </Card>
        </div>

        {/* Right Column: Workshop Photos, Courier Tracking, Chat */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* Workshop Milestone Photos */}
          <Card variant="glass" className="p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-blush/40 pb-3">
              <h3 className="font-fraunces text-lg text-plum font-semibold flex items-center gap-2">
                <Camera className="w-4 h-4 text-rose-deep" />
                Live Workshop Photos
              </h3>
              <span className="text-xs text-plum-soft">Uploaded by Tailor</span>
            </div>

            {order.photos && order.photos.length > 0 ? (
              <div className="grid grid-cols-2 gap-3">
                {order.photos.map((ph, idx) => (
                  <div key={idx} className="rounded-2xl overflow-hidden border border-blush/60 relative aspect-[4/3]">
                    <img src={ph.url} alt={ph.stage} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent flex flex-col justify-end p-2.5 text-white">
                      <span className="text-[10px] font-bold uppercase text-blush">{ph.stage}</span>
                      <p className="text-[11px] leading-tight line-clamp-2">{ph.caption}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-6 text-center text-xs text-plum-soft bg-cream-100 rounded-2xl border border-dashed border-plum/10">
                Workshop photos will appear here as the tailor cuts and bastes your outfit.
              </div>
            )}
          </Card>

          {/* Courier Dispatch Tracking */}
          <Card variant="glass" className="p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-blush/40 pb-3">
              <h3 className="font-fraunces text-lg text-plum font-semibold flex items-center gap-2">
                <Truck className="w-4 h-4 text-emerald-700" />
                Express Courier Tracking
              </h3>
              <span className="font-mono text-xs font-bold text-plum">{order.awbNumber}</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-cream-100 border border-plum/10 text-xs space-y-1">
              <div className="flex justify-between font-semibold text-plum">
                <span>{courierData.partner}</span>
                <span className="text-emerald-800">{courierData.currentStatus}</span>
              </div>
              <p className="text-plum-soft text-[11px]">{courierData.origin} → {courierData.destination}</p>
            </div>

            <div className="space-y-3 pt-1">
              {courierData.stages.map((stg, i) => (
                <div key={i} className="flex items-start gap-3 text-xs">
                  <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${stg.completed ? 'bg-emerald-600' : 'bg-plum/20'}`} />
                  <div>
                    <p className={`font-semibold ${stg.completed ? 'text-plum' : 'text-plum-soft'}`}>{stg.title}</p>
                    <p className="text-[11px] text-plum-soft">{stg.details} • <span className="font-mono">{stg.time}</span></p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Live In-App Chat with Tailor */}
          <Card variant="glass" className="p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-blush/40 pb-3">
              <h3 className="font-fraunces text-lg text-plum font-semibold flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-rose-deep" />
                Atelier Workshop Chat
              </h3>
              <span className="text-xs text-emerald-800 font-semibold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                Tailor Online
              </span>
            </div>

            {/* Chat Messages */}
            <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
              {order.messages?.map((msg) => {
                const isMe = msg.senderRole === 'customer';
                return (
                  <div key={msg.id} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                    <div className={`p-3 rounded-2xl max-w-[85%] text-xs ${
                      isMe 
                        ? 'bg-rose-deep text-white rounded-br-none shadow-xs' 
                        : 'bg-white border border-plum/10 text-plum rounded-bl-none shadow-xs'
                    }`}>
                      <p>{msg.text}</p>
                    </div>
                    <span className="text-[9px] text-plum-soft font-mono mt-0.5 px-1">{msg.timestamp}</span>
                  </div>
                );
              })}
            </div>

            {/* Chat Input */}
            <form onSubmit={handleSendMessage} className="flex gap-2 pt-2">
              <input
                type="text"
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                placeholder="Ask tailor about latkan tassels, basting fit..."
                className="flex-1 px-3.5 py-2 text-xs rounded-xl bg-cream-100 border border-plum/20 text-plum focus:outline-none"
              />
              <Button type="submit" variant="primary" size="sm" icon={Send} className="shrink-0 text-xs px-3">
                Send
              </Button>
            </form>
          </Card>

        </div>

      </div>

      {/* ================= PAYMENT MODAL (40% / 60% Split) ================= */}
      <Modal
        isOpen={paymentModalOpen}
        onClose={() => setPaymentModalOpen(false)}
        title={paymentType === 'advance' ? 'Secure 40% Milestone Advance' : 'Settle Final 60% Balance'}
        subtitle="Escrow-backed payment protection. Tailor receives payout upon delivery."
        maxWidth="max-w-md"
      >
        <div className="space-y-5">
          <div className="p-4 rounded-2xl bg-cream-200 border border-blush text-center space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-rose-deep">
              Amount Due Now
            </span>
            <div className="font-fraunces text-3xl font-bold text-plum">
              {paymentType === 'advance' ? milestones.formattedAdvance : milestones.formattedBalance}
            </div>
            <p className="text-xs text-plum-soft">
              {paymentType === 'advance' ? `Remaining ${milestones.formattedBalance} paid upon doorstep fit` : 'Final delivery clearance'}
            </p>
          </div>

          {/* Payment Method Selector */}
          <div className="space-y-2">
            <label className="text-[11px] font-bold uppercase tracking-wider text-plum">Select Demo Payment Method</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'upi', label: 'UPI / QR', icon: QrCode },
                { id: 'card', label: 'Debit / Card', icon: CreditCard },
                { id: 'emi', label: '3-Month EMI', icon: Clock }
              ].map((m) => {
                const Icon = m.icon;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setPaymentMethod(m.id)}
                    className={`p-3 rounded-xl border text-center flex flex-col items-center gap-1.5 transition-all ${
                      paymentMethod === m.id ? 'bg-white border-rose-deep text-rose-deep font-bold shadow-xs' : 'bg-cream-100 border-plum/10 text-plum'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-[11px]">{m.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="p-3 rounded-xl bg-mint/20 border border-mint text-[11px] text-emerald-950 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
            <span>100% Escrow Protection: Funds held securely until you inspect garment fit.</span>
          </div>

          <div className="pt-2 flex justify-between items-center">
            <Button variant="ghost" size="sm" onClick={() => setPaymentModalOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              size="md"
              isLoading={isProcessingPayment}
              onClick={handlePayment}
              className="font-semibold shadow-soft-blush"
            >
              Confirm Mock Payment
            </Button>
          </div>
        </div>
      </Modal>

      {/* ================= REVIEW MODAL ================= */}
      <Modal
        isOpen={reviewModalOpen}
        onClose={() => setReviewModalOpen(false)}
        title="Review Master Artisan"
        subtitle={`Order #${order.id} • ${order.tailorName}`}
        maxWidth="max-w-md"
      >
        <div className="space-y-4">
          <div className="text-center space-y-2">
            <p className="text-xs text-plum-soft">How satisfied are you with the seam quality and drape?</p>
            <div className="flex justify-center gap-2 text-amber-500">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="p-1 hover:scale-110 transition-transform"
                >
                  <Star className={`w-7 h-7 ${star <= rating ? 'fill-amber-500' : 'text-plum/20'}`} />
                </button>
              ))}
            </div>
          </div>

          <textarea
            rows={3}
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="Share feedback on armhole fit, dart placement, zari finish..."
            className="w-full p-3 text-xs rounded-xl bg-cream-100 border border-plum/20 text-plum focus:outline-none"
          />

          <div className="pt-2 flex justify-end gap-2">
            <Button variant="ghost" size="sm" onClick={() => setReviewModalOpen(false)}>Cancel</Button>
            <Button variant="primary" size="md" onClick={handleReviewSubmit}>Publish Review</Button>
          </div>
        </div>
      </Modal>

      {/* ================= ALTERATION MODAL ================= */}
      <Modal
        isOpen={alterationModalOpen}
        onClose={() => setAlterationModalOpen(false)}
        title="100% Free Doorstep Alteration"
        subtitle="Our courier collects the garment for master adjustment at zero cost."
        maxWidth="max-w-md"
      >
        <div className="space-y-4">
          <p className="text-xs text-plum-soft leading-relaxed">
            Your garment includes 2.5-inch hidden margins. Describe where you would like adjustments (e.g. loosen waist by 1 inch, raise armhole dart).
          </p>

          <textarea
            rows={3}
            value={alterationNotes}
            onChange={(e) => setAlterationNotes(e.target.value)}
            placeholder="e.g. Blouse back needs 0.5 inch tightening; lehenga length is perfect."
            className="w-full p-3 text-xs rounded-xl bg-cream-100 border border-plum/20 text-plum focus:outline-none"
          />

          <div className="pt-2 flex justify-end gap-2">
            <Button variant="ghost" size="sm" onClick={() => setAlterationModalOpen(false)}>Cancel</Button>
            <Button variant="primary" size="md" onClick={handleAlterationSubmit}>Schedule Free Pickup</Button>
          </div>
        </div>
      </Modal>

    </div>
  );
};
