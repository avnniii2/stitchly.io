import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../store/useAuth';
import { useWishlist } from '../../store/useWishlist';
import { orderService } from '../../services/orders';
import { tailorService } from '../../services/tailors';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { TapeMeasure } from '../../components/TapeMeasure';
import { Garment } from '../../components/garment/Garment';
import { Modal } from '../../components/Modal';
import { NeedleIcon, ScissorsIcon, SparkleDoodle, PinIcon } from '../../components/Doodles';
import { 
  Sparkles, 
  ShoppingBag, 
  Ruler, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  Camera, 
  Calendar,
  Star,
  Bell,
  Heart,
  Wand2
} from 'lucide-react';

export const CustomerDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { items: wishlistItems } = useWishlist();

  const [orders, setOrders] = useState([]);
  const [recommendedTailors, setRecommendedTailors] = useState([]);
  const [selectedPhotoModal, setSelectedPhotoModal] = useState(null);

  const loadData = async () => {
    const userOrders = await orderService.getOrders({ userId: user?.id, role: 'customer' });
    setOrders(userOrders);
    const tailors = await tailorService.getTailors({ verifiedOnly: true });
    setRecommendedTailors(tailors.slice(0, 3));
  };

  useEffect(() => {
    loadData();
    window.addEventListener('storage', loadData);
    return () => window.removeEventListener('storage', loadData);
  }, [user]);

  const activeOrder = orders.find((o) => o.status !== 'Delivered') || orders[0];

  return (
    <div className="space-y-8 pb-12">
      {/* 1. Warm Greeting & Occasion Reminder */}
      <div className="rounded-3xl bg-gradient-to-r from-blush/40 via-peach/30 to-cream border border-blush/60 p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-soft">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/80 border border-blush text-[11px] font-semibold text-rose-deep uppercase tracking-wider">
            <SparkleDoodle className="w-3.5 h-3.5" color="#D9718A" />
            <span>Atelier Client Lounge</span>
          </div>
          <h1 className="font-fraunces text-2xl sm:text-3xl text-plum">
            Namaste, {user?.name ? user.name.split(' ')[0] : 'Priya'}!
          </h1>
          <p className="text-xs sm:text-sm text-plum-soft">
            Your custom ensembles are progressing beautifully on the karchob frames.
          </p>

          {/* Occasion Countdown Reminder */}
          <div className="pt-2 flex items-center gap-2 text-xs font-semibold text-amber-900 bg-butter/60 border border-butter px-3 py-1 rounded-full w-fit">
            <Calendar className="w-3.5 h-3.5 text-amber-700" />
            <span>Diwali in 38 days — finalize your festive ensemble by Oct 12 to guarantee zero delivery rush!</span>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Button
            variant="primary"
            size="md"
            icon={Sparkles}
            onClick={() => navigate('/app/studio')}
            className="shadow-soft-blush text-xs sm:text-sm font-semibold"
          >
            Create New Design
          </Button>
          <Button
            variant="secondary"
            size="md"
            icon={Ruler}
            onClick={() => navigate('/app/measurements')}
            className="text-xs sm:text-sm"
          >
            Saved Sizing
          </Button>
        </div>
      </div>

      {/* 2. Grid: Continue Your Design & Active Order Mini Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Active Order Spotlight */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-fraunces text-xl text-plum">
              Active Atelier Commission
            </h2>
            {activeOrder && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate(`/app/orders/${activeOrder.id}`)}
                className="text-xs text-rose-deep font-semibold"
              >
                Order Detail & Chat →
              </Button>
            )}
          </div>

          {activeOrder ? (
            <Card variant="blush" className="p-6 sm:p-8 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-blush/50 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-rose-deep">#{activeOrder.id}</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blush text-rose-deep">
                      {activeOrder.status}
                    </span>
                  </div>
                  <h3 className="font-fraunces text-xl sm:text-2xl text-plum mt-1">
                    {activeOrder.title}
                  </h3>
                  <p className="text-xs text-plum-soft">
                    Occasion: {activeOrder.occasion} • Matched Tailor: <strong className="text-plum">{activeOrder.tailorName}</strong> ({activeOrder.tailorCity})
                  </p>
                </div>

                <div className="text-left sm:text-right">
                  <span className="text-xs text-plum-soft block">Target Delivery</span>
                  <span className="text-sm font-bold text-plum flex items-center sm:justify-end gap-1 font-mono">
                    <Calendar className="w-3.5 h-3.5 text-rose-deep" />
                    {activeOrder.estimatedDelivery || activeOrder.deliveredDate}
                  </span>
                </div>
              </div>

              {/* Tape Measure Progress */}
              <TapeMeasure 
                progress={activeOrder.status === 'Cutting' ? 35 : activeOrder.status === 'Stitching' ? 65 : activeOrder.status === 'QC' ? 85 : 95}
                label={`Stage: ${activeOrder.status} in workshop`} 
              />

              {/* Stage Milestones */}
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 pt-1 text-center text-xs">
                {activeOrder.timeline?.slice(0, 6).map((st, idx) => (
                  <div key={idx} className={`p-2 rounded-xl border ${
                    st.completed ? 'bg-mint/40 border-mint text-emerald-950 font-semibold' : 'bg-cream-100 border-plum/10 text-plum-soft'
                  }`}>
                    <span className="text-[10px] block font-bold">{st.completed ? '✓ Done' : `0${idx + 1}`}</span>
                    <span className="text-[10px] line-clamp-1">{st.title}</span>
                  </div>
                ))}
              </div>

              {/* Footer action */}
              <div className="pt-2 border-t border-blush/40 flex items-center justify-between text-xs">
                <span className="text-plum-soft">
                  Payment: <strong className="text-plum">{activeOrder.paymentStatus}</strong>
                </span>

                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => navigate(`/app/orders/${activeOrder.id}`)}
                  icon={ArrowRight}
                  iconPosition="right"
                  className="font-semibold text-xs"
                >
                  Track Live Workshop & Chat
                </Button>
              </div>
            </Card>
          ) : (
            <Card variant="glass" className="p-8 text-center space-y-3">
              <NeedleIcon className="w-8 h-8 mx-auto" color="#D9718A" />
              <h3 className="font-fraunces text-lg text-plum">No Active Commissions</h3>
              <p className="text-xs text-plum-soft max-w-sm mx-auto">
                Ready for your next festival or wedding outfit? Use our AI Studio to visualize cuts and fabrics.
              </p>
              <Button variant="primary" size="sm" onClick={() => navigate('/app/studio')}>
                Start AI Design
              </Button>
            </Card>
          )}
        </div>

        {/* Continue Your Design Card */}
        <div className="lg:col-span-4 space-y-6">
          <Card variant="glass" className="p-6 space-y-4 border-lavender/80 shadow-soft-lavender">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-900 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-purple-700" />
                Continue Your Design
              </span>
              <span className="text-[10px] text-plum-soft">Saved draft</span>
            </div>

            <div className="p-3 bg-cream-100 rounded-2xl border border-blush/60 flex items-center gap-3">
              <div className="w-14 h-16 bg-white rounded-xl overflow-hidden flex items-center justify-center shrink-0 border border-plum/10">
                <Garment type="anarkali" colour="#A8D2BC" fabric="georgette" embroidery="minimal" width={48} height={64} />
              </div>
              <div className="text-xs flex-1">
                <h4 className="font-fraunces font-semibold text-plum">Pastel Sage Anarkali</h4>
                <p className="text-[11px] text-plum-soft">Mehendi lawn • Glass organza</p>
                <p className="text-[11px] font-bold text-rose-deep mt-0.5">Est. ₹14,200</p>
              </div>
            </div>

            <Button
              variant="blush"
              size="sm"
              icon={Wand2}
              onClick={() => navigate('/app/studio', { state: { prefill: { prompt: 'Pastel sage anarkali for mehendi', type: 'anarkali', colour: '#A8D2BC', fabric: 'georgette' } } })}
              className="w-full text-xs font-semibold"
            >
              Resume in Studio
            </Button>
          </Card>

          {/* Quick Doorstep Kit Box */}
          <Card variant="glass" className="p-5 space-y-2 border-dashed border-rose-deep/30">
            <div className="flex items-center gap-2 text-xs font-bold text-rose-deep uppercase tracking-wider">
              <Ruler className="w-3.5 h-3.5" />
              <span>Doorstep Fit Guarantee</span>
            </div>
            <p className="text-xs text-plum-soft leading-relaxed">
              Every outfit includes complimentary doorstep swatch boxes and 2.5-inch hidden seam allowances.
            </p>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/app/measurements')}
              className="p-0 text-xs text-rose-deep font-semibold hover:underline"
            >
              Review saved measurement cards →
            </Button>
          </Card>
        </div>

      </div>

      {/* 3. Wishlist Carousel */}
      {wishlistItems.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-fraunces text-xl text-plum flex items-center gap-2">
              <Heart className="w-5 h-5 text-rose-deep fill-rose-deep" />
              Saved in Your Wishlist
            </h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/app/wishlist')}
              className="text-xs text-plum-soft"
            >
              View all ({wishlistItems.length}) →
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {wishlistItems.slice(0, 3).map((item) => (
              <Card key={item.id} variant="glass" className="p-4 flex items-center gap-4">
                <div className="w-16 h-20 bg-cream-100 rounded-xl overflow-hidden flex items-center justify-center shrink-0 border border-blush/40">
                  <Garment
                    type={item.design?.type || 'lehenga'}
                    colour={item.design?.colour || '#D9718A'}
                    fabric={item.design?.fabric || 'silk'}
                    embroidery={item.design?.embroidery || 'heavy-zari'}
                    neckline={item.design?.neckline || 'sweetheart'}
                    sleeve={item.design?.sleeve || 'elbow'}
                    width={50}
                    height={70}
                  />
                </div>
                <div className="text-xs min-w-0 flex-1">
                  <h4 className="font-fraunces font-semibold text-plum truncate">{item.title}</h4>
                  <p className="font-bold text-plum font-mono mt-0.5">₹{item.price?.toLocaleString('en-IN')}</p>
                  <Button
                    variant="blush"
                    size="sm"
                    onClick={() => navigate('/app/tailors', { state: { activeDesign: item.design, budget: item.price } })}
                    className="mt-2 text-[10px] py-1 px-2.5 font-semibold"
                  >
                    Match Tailor
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* 4. Recommended Master Tailors */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-fraunces text-xl text-plum">
            Recommended Master Karigars
          </h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/app/tailors')}
            className="text-xs text-plum-soft"
          >
            Explore all tailors →
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {recommendedTailors.map((tailor) => (
            <Card key={tailor.id} variant="glass" className="p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <img src={tailor.avatar} alt={tailor.name} className="w-12 h-12 rounded-xl object-cover border border-mint" />
                  <div>
                    <h4 className="font-fraunces text-sm font-semibold text-plum">{tailor.name}</h4>
                    <p className="text-xs text-plum-soft flex items-center gap-1">
                      <PinIcon className="w-3 h-3 text-rose-deep shrink-0" />
                      {tailor.city}
                    </p>
                  </div>
                </div>
                <p className="text-xs text-plum-soft line-clamp-2 mb-3">{tailor.bio}</p>
              </div>

              <div className="pt-3 border-t border-plum/10 flex items-center justify-between text-xs">
                <span className="flex items-center gap-1 font-semibold text-plum">
                  <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  {tailor.rating}
                </span>
                <Button
                  variant="mint"
                  size="sm"
                  onClick={() => navigate('/app/tailors')}
                  className="text-xs"
                >
                  View Profile
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Floating "New Design ✨" Action Button */}
      <div className="fixed bottom-8 right-8 z-30">
        <Button
          variant="primary"
          size="lg"
          icon={Sparkles}
          onClick={() => navigate('/app/studio')}
          className="shadow-2xl font-bold py-3.5 px-6 rounded-full border-2 border-white ring-4 ring-rose-deep/20 text-sm hover:scale-105 transition-transform"
        >
          New Design ✨
        </Button>
      </div>

    </div>
  );
};
