import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useWishlist } from '../../store/useWishlist';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { EmptyState } from '../../components/EmptyState';
import { Garment } from '../../components/garment/Garment';
import { Heart, Sparkles, Trash2, ArrowRight } from 'lucide-react';

export const CustomerWishlist = () => {
  const navigate = useNavigate();
  const { items, removeFromWishlist } = useWishlist();

  const handleCustomizeAgain = (item) => {
    navigate('/app/studio', {
      state: {
        prefill: {
          prompt: `Custom ${item.design?.fabric} ${item.design?.type}`,
          type: item.design?.type,
          colour: item.design?.colour,
          fabric: item.design?.fabric,
          neckline: item.design?.neckline,
          sleeve: item.design?.sleeve,
          embroidery: item.design?.embroidery,
          price: item.price
        }
      }
    });
  };

  const handleFindTailor = (item) => {
    navigate('/app/tailors', {
      state: {
        activeDesign: item.design,
        budget: item.price
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-fraunces text-2xl sm:text-3xl text-plum">
            Atelier Wishlist & Concept Archive
          </h1>
          <p className="text-xs sm:text-sm text-plum-soft mt-1">
            Designs saved from your AI Studio sessions. Re-customize parameters or book a tailor anytime.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          icon={Sparkles}
          onClick={() => navigate('/app/studio')}
          className="text-xs font-semibold"
        >
          New AI Design
        </Button>
      </div>

      {items.length === 0 ? (
        <EmptyState
          title="Your Wishlist is Empty"
          description="Explore our AI Studio or public Inspiration Feed to save dreamy ethnic silhouettes."
          actionLabel="Open AI Studio"
          onAction={() => navigate('/app/studio')}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <Card
              key={item.id}
              variant="glass"
              className="p-5 flex flex-col justify-between border-blush/60 shadow-soft"
            >
              <div>
                <div className="aspect-[3/4] bg-cream-100 rounded-2xl overflow-hidden relative mb-4 flex items-center justify-center border border-blush/40">
                  <Garment
                    type={item.design?.type || 'lehenga'}
                    colour={item.design?.colour || '#D9718A'}
                    fabric={item.design?.fabric || 'silk'}
                    embroidery={item.design?.embroidery || 'heavy-zari'}
                    neckline={item.design?.neckline || 'sweetheart'}
                    sleeve={item.design?.sleeve || 'elbow'}
                    width={180}
                    height={260}
                  />

                  <button
                    type="button"
                    onClick={() => removeFromWishlist(item.id)}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 text-rose-deep flex items-center justify-center hover:bg-rose-50 transition-colors shadow-xs"
                    title="Remove from wishlist"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-baseline justify-between mb-1">
                  <h3 className="font-fraunces text-lg text-plum font-semibold truncate">
                    {item.title}
                  </h3>
                  <span className="font-bold text-sm text-plum font-mono">
                    ₹{item.price?.toLocaleString('en-IN')}
                  </span>
                </div>

                <p className="text-xs text-plum-soft capitalize">
                  {item.design?.fabric} • {item.design?.neckline} neck • {item.design?.sleeve} sleeve
                </p>
              </div>

              <div className="pt-4 border-t border-plum/10 flex items-center gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => handleCustomizeAgain(item)}
                  className="flex-1 text-xs"
                >
                  Re-Customize
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleFindTailor(item)}
                  className="flex-1 text-xs font-semibold"
                >
                  Find Tailor
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
