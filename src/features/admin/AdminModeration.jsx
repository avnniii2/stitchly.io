import React, { useState } from 'react';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { useUI } from '../../store/useUI';
import { ShieldCheck, Eye, EyeOff, Flag, CheckCircle2, MessageSquare, Image, Sparkles } from 'lucide-react';

const INITIAL_QUEUE = [
  {
    id: 'mod-1',
    type: 'Review',
    author: 'Sunita Mehra',
    target: 'Ustad Irfan Ansari',
    content: 'Master ji stitched my daughter’s sangeet lehenga in record 6 days! Exquisite zari work.',
    flagReason: 'External phone number in comment text (+91 98XXX)',
    status: 'Pending',
    date: 'Today, 11:20 AM'
  },
  {
    id: 'mod-2',
    type: 'Portfolio Photo',
    author: 'Master Rahmatullah Khan',
    target: 'Portfolio Item #39',
    content: 'Uploaded bride wedding picture with jewelry designer brand watermark.',
    flagReason: 'Third-party branding watermark detected',
    imageUrl: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400',
    status: 'Pending',
    date: 'Yesterday'
  },
  {
    id: 'mod-3',
    type: 'Inspiration Look',
    author: 'Kavita Joshi',
    target: 'Public Feed Item',
    content: 'Celebrity replica Manish Malhotra velvet blouse look recreate prompt.',
    flagReason: 'Copyright keyword flag',
    status: 'Pending',
    date: '2 days ago'
  }
];

export const AdminModeration = () => {
  const { addToast } = useUI();
  const [items, setItems] = useState(INITIAL_QUEUE);

  const handleAction = (id, newStatus) => {
    setItems(items.map((i) => (i.id === id ? { ...i, status: newStatus } : i)));
    addToast({
      title: `Item ${newStatus}`,
      message: `Moderation action completed for ${id}.`,
      type: 'success',
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-sky/50 border border-sky-300 text-[11px] font-semibold text-blue-900 uppercase tracking-wider mb-1">
            <Flag className="w-3.5 h-3.5 text-blue-700" />
            <span>Community Guidelines</span>
          </div>
          <h1 className="font-fraunces text-2xl sm:text-3xl text-plum">
            Content Moderation & Review Audits
          </h1>
          <p className="text-xs sm:text-sm text-plum-soft">
            Audit flagged customer reviews, artisan portfolio assets, and community inspiration looks.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs px-3 py-1.5 rounded-full bg-blue-100 text-blue-900 font-bold border border-blue-200">
            {items.filter((i) => i.status === 'Pending').length} Pending Audits
          </span>
        </div>
      </div>

      <div className="space-y-4">
        {items.map((item) => (
          <Card key={item.id} variant="sky" className="p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-sky/40 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-sky text-blue-950">
                  {item.type}
                </span>
                <span className="text-xs font-mono font-bold text-plum-soft">
                  #{item.id}
                </span>
                <span className="text-xs text-plum font-semibold">
                  By {item.author}
                </span>
              </div>

              <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                item.status === 'Approved'
                  ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                  : item.status === 'Hidden'
                  ? 'bg-rose-100 text-rose-900 border border-rose-300'
                  : 'bg-amber-100 text-amber-900 border border-amber-300'
              }`}>
                {item.status}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              <div className="md:col-span-8 space-y-2">
                <p className="text-sm text-plum font-medium">
                  {item.content}
                </p>
                <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-950 font-semibold flex items-center gap-1.5">
                  <Flag className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span>Flag Reason: {item.flagReason}</span>
                </div>
              </div>

              {item.imageUrl && (
                <div className="md:col-span-4">
                  <img src={item.imageUrl} alt="Moderation preview" className="w-full h-28 object-cover rounded-xl border border-sky" />
                </div>
              )}
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-sky/40">
              <Button
                variant="outline"
                size="sm"
                icon={EyeOff}
                onClick={() => handleAction(item.id, 'Hidden')}
                className="text-xs text-red-700 border-red-200 hover:bg-red-50"
              >
                Hide Content
              </Button>
              <Button
                variant="primary"
                size="sm"
                icon={CheckCircle2}
                onClick={() => handleAction(item.id, 'Approved')}
                className="text-xs bg-emerald-800 hover:bg-emerald-900 text-white"
              >
                Approve & Keep Live
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
