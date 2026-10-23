import React, { useState, useEffect } from 'react';
import { useAuth } from '../../store/useAuth';
import { useUI } from '../../store/useUI';
import { ordersService } from '../../services/orders';
import { Garment } from '../../components/garment/Garment';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { Modal } from '../../components/Modal';
import { ScissorsIcon, PinIcon } from '../../components/Doodles';
import { 
  Kanban, 
  ArrowRight, 
  Upload, 
  Camera, 
  CheckCircle2, 
  MessageSquare, 
  Ruler, 
  Send, 
  Clock, 
  AlertCircle,
  Eye,
  Sparkles
} from 'lucide-react';

const KANBAN_STAGES = [
  { id: 'Requested', label: 'Requested / Quote', color: 'border-amber-300 bg-amber-50/50 text-amber-950' },
  { id: 'Cutting', label: 'Cutting & Chalk', color: 'border-blue-300 bg-blue-50/50 text-blue-950' },
  { id: 'Stitching', label: 'Stitching & Zari', color: 'border-purple-300 bg-purple-50/50 text-purple-950' },
  { id: 'QC', label: 'Atelier QC & Finish', color: 'border-rose-300 bg-rose-50/50 text-rose-950' },
  { id: 'Ready', label: 'Ready for Pack', color: 'border-emerald-300 bg-emerald-50/50 text-emerald-950' },
  { id: 'Dispatched', label: 'Dispatched (Courier)', color: 'border-teal-300 bg-teal-50/50 text-teal-950' },
];

const SAMPLE_WORKSHOP_PHOTOS = [
  {
    url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500&auto=format&fit=crop&q=80',
    caption: 'Gold thread tension check on karchob frame.'
  },
  {
    url: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=500&auto=format&fit=crop&q=80',
    caption: '32-kali pattern cut with 2.5-inch hidden margin.'
  },
  {
    url: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=500&auto=format&fit=crop&q=80',
    caption: 'Final hem steam press & hook-and-eye alignment.'
  }
];

export const TailorOrdersKanban = () => {
  const { user } = useAuth();
  const { addToast } = useUI();
  const [orders, setOrders] = useState([]);
  const [activeModalOrder, setActiveModalOrder] = useState(null);
  const [activeTab, setActiveTab] = useState('workspace'); // 'workspace', 'photos', 'chat'

  // Photo upload simulation state
  const [selectedPhotoSample, setSelectedPhotoSample] = useState(SAMPLE_WORKSHOP_PHOTOS[0].url);
  const [photoCaption, setPhotoCaption] = useState(SAMPLE_WORKSHOP_PHOTOS[0].caption);
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);

  // Chat state inside order modal
  const [chatInput, setChatInput] = useState('');
  const [isSendingChat, setIsSendingChat] = useState(false);

  const loadOrders = async () => {
    if (!user) return;
    const all = await ordersService.getOrdersByTailor(user.id);
    setOrders(all);
    if (activeModalOrder) {
      const refreshed = all.find((o) => o.id === activeModalOrder.id);
      if (refreshed) setActiveModalOrder(refreshed);
    }
  };

  useEffect(() => {
    loadOrders();

    const handleStorageChange = () => {
      loadOrders();
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [user]);

  const handleAdvanceStatus = async (orderId, targetStatus) => {
    try {
      await ordersService.updateOrderStatus({
        orderId,
        newStatus: targetStatus,
      });
      addToast({
        title: 'Status Updated',
        message: `Order #${orderId} moved to ${targetStatus}. Client notified in real-time.`,
        type: 'stitch',
      });
      await loadOrders();
    } catch (err) {
      addToast({
        title: 'Error',
        message: 'Could not update order status.',
        type: 'error',
      });
    }
  };

  const handleUploadPhoto = async () => {
    if (!activeModalOrder) return;
    setIsUploadingPhoto(true);
    try {
      await ordersService.updateOrderStatus({
        orderId: activeModalOrder.id,
        newStatus: activeModalOrder.status,
        photoUrl: selectedPhotoSample,
        photoCaption: photoCaption || 'Workshop progress update from artisan frame.',
      });

      addToast({
        title: 'Progress Photo Published',
        message: 'Client can now inspect the live embroidery snapshot on their timeline.',
        type: 'success',
      });
      await loadOrders();
    } catch (err) {
      addToast({
        title: 'Error',
        message: 'Failed to upload photo.',
        type: 'error',
      });
    } finally {
      setIsUploadingPhoto(false);
    }
  };

  const handleSendChat = async (e) => {
    e?.preventDefault();
    if (!chatInput.trim() || !activeModalOrder) return;
    setIsSendingChat(true);

    try {
      await ordersService.sendChatMessage({
        orderId: activeModalOrder.id,
        senderId: user?.id || 'tailor-1',
        senderName: user?.name || 'Master Rahmatullah',
        senderRole: 'tailor',
        text: chatInput.trim(),
      });

      setChatInput('');
      await loadOrders();
    } catch (err) {
      addToast({
        title: 'Error',
        message: 'Could not send chat message.',
        type: 'error',
      });
    } finally {
      setIsSendingChat(false);
    }
  };

  const getNextStage = (current) => {
    const sequence = ['Requested', 'Cutting', 'Stitching', 'QC', 'Ready', 'Dispatched', 'Delivered'];
    const idx = sequence.indexOf(current);
    if (idx !== -1 && idx < sequence.length - 1) {
      return sequence[idx + 1];
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-mint/50 border border-mint text-[11px] font-semibold text-emerald-950 uppercase tracking-wider mb-1">
            <Kanban className="w-3.5 h-3.5 text-emerald-800" />
            <span>Workshop Cutting & Stitching Board</span>
          </div>
          <h1 className="font-fraunces text-2xl sm:text-3xl text-plum">
            Atelier Order Workflow (Kanban)
          </h1>
          <p className="text-xs sm:text-sm text-plum-soft">
            Track garments from chalk markings to courier dispatch. Live status synchronizes directly to client dashboards.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs px-3 py-1.5 rounded-full bg-mint-100 text-emerald-900 font-bold border border-mint">
            {orders.length} Commissions in Pipeline
          </span>
        </div>
      </div>

      {/* Kanban Board Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 overflow-x-auto pb-4">
        {KANBAN_STAGES.map((col) => {
          const colOrders = orders.filter((o) => {
            if (col.id === 'Requested') return o.status === 'Requested' || o.paymentStatus?.includes('Quote');
            return o.status === col.id;
          });

          return (
            <div
              key={col.id}
              className={`rounded-2xl border p-3 min-w-[240px] flex flex-col gap-3 ${col.color}`}
            >
              <div className="flex items-center justify-between border-b border-black/10 pb-2">
                <span className="font-fraunces text-sm font-semibold truncate">
                  {col.label}
                </span>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-white/80 shadow-xs">
                  {colOrders.length}
                </span>
              </div>

              <div className="space-y-2.5 flex-1">
                {colOrders.map((order) => {
                  const nextStage = getNextStage(order.status);
                  return (
                    <div
                      key={order.id}
                      onClick={() => setActiveModalOrder(order)}
                      className="p-3 bg-white rounded-xl border border-plum/10 shadow-xs hover:shadow-md transition-all cursor-pointer text-left group"
                    >
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-mono font-bold text-plum">
                          #{order.id}
                        </span>
                        <span className="text-[10px] font-bold text-emerald-800">
                          {order.amount}
                        </span>
                      </div>

                      <h4 className="font-fraunces text-sm text-plum font-semibold mt-1 group-hover:text-emerald-900 transition-colors">
                        {order.title}
                      </h4>
                      <p className="text-[11px] text-plum-soft">
                        Client: {order.customerName}
                      </p>

                      <div className="mt-2 pt-2 border-t border-plum/5 flex items-center justify-between text-[10px]">
                        <span className="text-plum-soft font-medium">
                          {order.design?.fabric || 'Silk'}
                        </span>
                        {nextStage && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAdvanceStatus(order.id, nextStage);
                            }}
                            className="inline-flex items-center gap-1 font-bold text-emerald-700 hover:text-emerald-900 bg-mint/50 px-2 py-0.5 rounded-md transition-colors"
                            title={`Advance to ${nextStage}`}
                          >
                            <span>Move to {nextStage}</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}

                {colOrders.length === 0 && (
                  <div className="p-4 text-center text-[11px] text-plum-soft/60 italic rounded-xl border border-dashed border-black/10">
                    No garments in {col.label.toLowerCase()}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Order Detail Workspace Modal */}
      {activeModalOrder && (
        <Modal
          isOpen={true}
          onClose={() => setActiveModalOrder(null)}
          title={`Artisan Workspace — Order #${activeModalOrder.id}`}
          size="xl"
        >
          <div className="space-y-6">
            {/* Top Modal Tabs */}
            <div className="flex items-center gap-2 border-b border-plum/10 pb-3">
              <button
                onClick={() => setActiveTab('workspace')}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                  activeTab === 'workspace'
                    ? 'bg-emerald-800 text-white'
                    : 'bg-cream-100 text-plum-soft hover:text-plum'
                }`}
              >
                Workspace & Specs
              </button>
              <button
                onClick={() => setActiveTab('photos')}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeTab === 'photos'
                    ? 'bg-emerald-800 text-white'
                    : 'bg-cream-100 text-plum-soft hover:text-plum'
                }`}
              >
                <Camera className="w-3.5 h-3.5" />
                Workshop Photos ({activeModalOrder.photos?.length || 0})
              </button>
              <button
                onClick={() => setActiveTab('chat')}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeTab === 'chat'
                    ? 'bg-emerald-800 text-white'
                    : 'bg-cream-100 text-plum-soft hover:text-plum'
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5" />
                Client Chat ({activeModalOrder.messages?.length || 0})
              </button>
            </div>

            {/* TAB 1: Workspace & Specs */}
            {activeTab === 'workspace' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-cream-50 p-4 rounded-2xl border border-plum/10">
                  <div>
                    <h3 className="font-fraunces text-lg text-plum">
                      {activeModalOrder.title}
                    </h3>
                    <p className="text-xs text-plum-soft">
                      Client: {activeModalOrder.customerName} • {activeModalOrder.customerPhone || '+91 98765 43210'}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-plum-soft">Current Stage:</span>
                    <select
                      value={activeModalOrder.status}
                      onChange={(e) => handleAdvanceStatus(activeModalOrder.id, e.target.value)}
                      className="px-3 py-1.5 rounded-xl border border-emerald-400 bg-white text-xs font-bold text-emerald-950 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      <option value="Requested">Requested</option>
                      <option value="Cutting">Cutting</option>
                      <option value="Stitching">Stitching</option>
                      <option value="QC">QC</option>
                      <option value="Ready">Ready</option>
                      <option value="Dispatched">Dispatched</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                  {/* Visual Garment Render */}
                  <div className="md:col-span-5 flex items-center justify-center p-4 bg-cream/40 rounded-2xl border border-plum/10">
                    <div className="w-40 h-56">
                      <Garment
                        type={activeModalOrder.design?.type || 'lehenga'}
                        colour={activeModalOrder.design?.colour || '#D9718A'}
                        fabric={activeModalOrder.design?.fabric || 'silk'}
                        neckline={activeModalOrder.design?.neckline || 'sweetheart'}
                        sleeve={activeModalOrder.design?.sleeve || 'elbow'}
                        embroidery={activeModalOrder.design?.embroidery || 'heavy-zari'}
                        dupatta={activeModalOrder.design?.dupatta !== false}
                      />
                    </div>
                  </div>

                  {/* Measurements & Notes */}
                  <div className="md:col-span-7 space-y-4">
                    <div className="space-y-1.5">
                      <span className="text-xs font-bold uppercase tracking-wider text-emerald-900 flex items-center gap-1.5">
                        <Ruler className="w-3.5 h-3.5 text-emerald-800" />
                        Verified Client Tailoring Dimensions (Inches)
                      </span>
                      <div className="grid grid-cols-3 gap-2 text-xs">
                        {Object.entries(activeModalOrder.measurements || {
                          bust: 36,
                          waist: 29,
                          hip: 39,
                          shoulder: 14.5,
                          blouseLength: 15,
                          lehengaLength: 41
                        }).map(([k, v]) => (
                          <div key={k} className="p-2 rounded-xl bg-white border border-plum/10 text-center">
                            <span className="text-[10px] text-plum-soft uppercase block font-semibold truncate">
                              {k}
                            </span>
                            <span className="text-xs font-bold text-plum">{v}"</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-950 space-y-1">
                      <strong>Occasion Notes:</strong>
                      <p>{activeModalOrder.occasion || 'Bridal function'}. Include 2.5-inch internal hidden margin on side seams.</p>
                    </div>

                    <div className="flex items-center justify-between text-xs pt-2">
                      <span className="text-plum-soft">Payment Security:</span>
                      <strong className="text-emerald-800 font-bold">{activeModalOrder.paymentStatus}</strong>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: Workshop Photos */}
            {activeTab === 'photos' && (
              <div className="space-y-6">
                <div className="p-4 rounded-2xl bg-cream-50 border border-plum/10 space-y-4">
                  <h4 className="font-fraunces text-base text-plum font-semibold">
                    Upload Karigar Progress Photo
                  </h4>
                  <p className="text-xs text-plum-soft">
                    Share snapshots of the garment on the cutting table or karchob embroidery frame. Photos appear live on client tracking screen.
                  </p>

                  <div className="grid grid-cols-3 gap-3">
                    {SAMPLE_WORKSHOP_PHOTOS.map((item, idx) => (
                      <div
                        key={idx}
                        onClick={() => {
                          setSelectedPhotoSample(item.url);
                          setPhotoCaption(item.caption);
                        }}
                        className={`rounded-xl overflow-hidden border-2 cursor-pointer transition-all ${
                          selectedPhotoSample === item.url ? 'border-emerald-700 shadow-md ring-2 ring-emerald-500/20' : 'border-plum/10'
                        }`}
                      >
                        <img src={item.url} alt="Workshop sample" className="w-full h-24 object-cover" />
                        <div className="p-1.5 text-[10px] text-plum font-medium truncate bg-white">
                          Sample {idx + 1}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-plum block">Photo Caption / Note</label>
                    <input
                      type="text"
                      value={photoCaption}
                      onChange={(e) => setPhotoCaption(e.target.value)}
                      className="w-full p-2.5 text-xs text-plum rounded-xl border border-plum/20 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
                    />
                  </div>

                  <Button
                    variant="primary"
                    onClick={handleUploadPhoto}
                    disabled={isUploadingPhoto}
                    icon={Upload}
                    className="bg-emerald-800 hover:bg-emerald-900 text-white text-xs"
                  >
                    {isUploadingPhoto ? 'Uploading to Client Live Feed...' : 'Publish Progress Snapshot'}
                  </Button>
                </div>

                {/* Published Photos Feed */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-950">
                    Uploaded Gallery ({activeModalOrder.photos?.length || 0})
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {(activeModalOrder.photos || []).map((photo, i) => (
                      <div key={i} className="p-3 rounded-2xl bg-white border border-plum/10 shadow-xs space-y-2">
                        <img src={photo.url} alt={photo.stage} className="w-full h-36 object-cover rounded-xl" />
                        <div className="text-xs">
                          <strong className="text-plum block">{photo.stage}</strong>
                          <p className="text-plum-soft text-[11px] mt-0.5">{photo.caption}</p>
                          <span className="text-[10px] text-plum-soft/60 block mt-1">{photo.timestamp}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: Client Chat */}
            {activeTab === 'chat' && (
              <div className="space-y-4">
                <div className="h-64 overflow-y-auto p-4 rounded-2xl bg-cream-50 border border-plum/10 space-y-3">
                  {(activeModalOrder.messages || []).map((msg) => {
                    const isTailor = msg.senderRole === 'tailor';
                    return (
                      <div
                        key={msg.id}
                        className={`flex flex-col ${isTailor ? 'items-end' : 'items-start'}`}
                      >
                        <div
                          className={`max-w-[80%] p-3 rounded-2xl text-xs ${
                            isTailor
                              ? 'bg-emerald-800 text-white rounded-br-xs'
                              : 'bg-white text-plum border border-plum/10 rounded-bl-xs shadow-xs'
                          }`}
                        >
                          <p className="font-bold text-[10px] opacity-80 mb-0.5">{msg.senderName}</p>
                          <p className="leading-relaxed">{msg.text}</p>
                          <span className="text-[9px] opacity-70 block mt-1 text-right">{msg.timestamp}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <form onSubmit={handleSendChat} className="flex gap-2">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Type message to client regarding fitting, zari shades, or delivery..."
                    className="flex-1 px-4 py-2.5 text-xs text-plum rounded-xl border border-plum/20 bg-cream-50 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={isSendingChat || !chatInput.trim()}
                    icon={Send}
                    className="bg-emerald-800 hover:bg-emerald-900 text-white text-xs"
                  >
                    Send
                  </Button>
                </form>
              </div>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
};
