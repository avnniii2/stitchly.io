import React, { useState } from 'react';
import { useAuth } from '../../store/useAuth';
import { useUI } from '../../store/useUI';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { Modal } from '../../components/Modal';
import { ScissorsIcon, SparkleDoodle, PinIcon } from '../../components/Doodles';
import { 
  Sparkles, 
  Upload, 
  Tag, 
  Plus, 
  Award, 
  CheckCircle2, 
  Trash2, 
  Eye, 
  Layers 
} from 'lucide-react';

const INITIAL_PORTFOLIO = [
  {
    id: 'port-1',
    title: 'Heritage Marwar Bridal Lehenga',
    technique: 'Real Gold Zardozi & Dabka',
    fabric: 'Pure Mulberry Silk',
    category: 'Bridal',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&auto=format&fit=crop&q=80',
    tags: ['Zardozi', 'Bridal', 'Jaipur', '32-Kali'],
    likes: 142
  },
  {
    id: 'port-2',
    title: 'Ivory Raw Silk Sherwani Set',
    technique: 'Tone-on-tone French Knots',
    fabric: 'Raw Matka Silk',
    category: 'Groom',
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&auto=format&fit=crop&q=80',
    tags: ['Sherwani', 'Groom', 'Matka Silk', 'Mandarin'],
    likes: 98
  },
  {
    id: 'port-3',
    title: 'Emerald Green Kali Anarkali',
    technique: 'Antique Gota Patti Bordering',
    fabric: 'Georgette & Brocade',
    category: 'Festive',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600&auto=format&fit=crop&q=80',
    tags: ['Anarkali', 'Gota Patti', 'Sangeet'],
    likes: 115
  },
  {
    id: 'port-4',
    title: 'Rose Gold Sweetheart Choli Blouse',
    technique: 'Mirror Work & Hand Latkan',
    fabric: 'Banarasi Brocade',
    category: 'Blouse',
    image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=600&auto=format&fit=crop&q=80',
    tags: ['Blouse', 'Mirror Work', 'Bridal'],
    likes: 89
  }
];

export const TailorPortfolio = () => {
  const { user } = useAuth();
  const { addToast } = useUI();
  const [portfolio, setPortfolio] = useState(INITIAL_PORTFOLIO);
  const [isBridalSpecialist, setIsBridalSpecialist] = useState(true);
  const [selectedTag, setSelectedTag] = useState('All');
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  // New item form
  const [newTitle, setNewTitle] = useState('');
  const [newTechnique, setNewTechnique] = useState('Hand Zari Embroidery');
  const [newFabric, setNewFabric] = useState('Pure Chanderi Silk');
  const [newTags, setNewTags] = useState('Bridal, Zari, Festive');
  const [newImageUrl, setNewImageUrl] = useState('https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600');

  const handleToggleBadge = () => {
    setIsBridalSpecialist(!isBridalSpecialist);
    addToast({
      title: isBridalSpecialist ? 'Badge Hidden' : 'Bridal Specialist Verified',
      message: isBridalSpecialist
        ? 'Bridal badge removed from your public discovery profile.'
        : 'Your profile now highlights your verified Bridal Atelier expertise!',
      type: 'success',
    });
  };

  const handleAddPiece = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newItem = {
      id: `port-${Date.now()}`,
      title: newTitle.trim(),
      technique: newTechnique,
      fabric: newFabric,
      category: 'Custom Atelier',
      image: newImageUrl,
      tags: newTags.split(',').map((t) => t.trim()),
      likes: 1,
    };

    setPortfolio([newItem, ...portfolio]);
    setIsUploadOpen(false);
    setNewTitle('');
    addToast({
      title: 'Craft Piece Added',
      message: 'New garment uploaded to your master tailor portfolio showcase.',
      type: 'success',
    });
  };

  const handleDelete = (id) => {
    setPortfolio(portfolio.filter((item) => item.id !== id));
    addToast({
      title: 'Item Removed',
      message: 'Portfolio item deleted.',
      type: 'info',
    });
  };

  const tagsList = ['All', 'Bridal', 'Groom', 'Zardozi', 'Anarkali', 'Sherwani', 'Mirror Work'];

  const filteredPortfolio = selectedTag === 'All'
    ? portfolio
    : portfolio.filter((item) => item.tags.some((t) => t.toLowerCase() === selectedTag.toLowerCase()));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-mint/50 border border-mint text-[11px] font-semibold text-emerald-950 uppercase tracking-wider mb-1">
            <Award className="w-3.5 h-3.5 text-emerald-800" />
            <span>Master Craftsman Portfolio</span>
          </div>
          <h1 className="font-fraunces text-2xl sm:text-3xl text-plum">
            Showcase & Handcrafted Garment Archive
          </h1>
          <p className="text-xs sm:text-sm text-plum-soft">
            Highlight your needlework, kalidar silhouettes, and heritage zardozi finishes to potential clients.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            size="sm"
            onClick={handleToggleBadge}
            icon={Award}
            className={`text-xs ${
              isBridalSpecialist
                ? 'bg-amber-100 text-amber-900 border-amber-300'
                : 'text-plum-soft'
            }`}
          >
            {isBridalSpecialist ? '★ Bridal Specialist Active' : 'Enable Bridal Badge'}
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={() => setIsUploadOpen(true)}
            icon={Plus}
            className="bg-emerald-800 hover:bg-emerald-900 text-white text-xs shadow-soft-mint"
          >
            Upload Craft Piece
          </Button>
        </div>
      </div>

      {/* Tags Filter */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        {tagsList.map((tag) => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag)}
            className={`px-3 py-1 text-xs rounded-full font-semibold transition-all whitespace-nowrap ${
              selectedTag === tag
                ? 'bg-emerald-800 text-white shadow-xs'
                : 'bg-white border border-mint text-plum-soft hover:text-plum'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Portfolio Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredPortfolio.map((item) => (
          <Card key={item.id} variant="mint" className="p-4 space-y-3 group hover:shadow-md transition-all">
            <div className="relative rounded-2xl overflow-hidden aspect-3/4 bg-cream/40">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {isBridalSpecialist && item.category === 'Bridal' && (
                <div className="absolute top-2 left-2 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-xs text-[10px] font-bold text-amber-900 shadow-xs flex items-center gap-1">
                  <span>★ Bridal Specialist</span>
                </div>
              )}
              <button
                onClick={() => handleDelete(item.id)}
                className="absolute top-2 right-2 p-1.5 rounded-full bg-white/80 hover:bg-red-50 text-red-700 opacity-0 group-hover:opacity-100 transition-opacity"
                title="Delete item"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>

            <div>
              <h3 className="font-fraunces text-base text-plum font-semibold line-clamp-1">
                {item.title}
              </h3>
              <p className="text-xs text-emerald-900 font-medium mt-0.5">
                {item.technique}
              </p>
              <p className="text-[11px] text-plum-soft">
                Fabric: {item.fabric}
              </p>
            </div>

            <div className="pt-2 border-t border-mint/40 flex flex-wrap gap-1">
              {item.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="text-[10px] px-2 py-0.5 rounded-md bg-white border border-mint text-emerald-950 font-medium"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </Card>
        ))}
      </div>

      {/* Upload Modal */}
      {isUploadOpen && (
        <Modal
          isOpen={true}
          onClose={() => setIsUploadOpen(false)}
          title="Upload Garment to Atelier Portfolio"
          size="md"
        >
          <form onSubmit={handleAddPiece} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-plum block">Garment Title</label>
              <input
                type="text"
                required
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="e.g. Royal Jaipur Gotapatti Kurta Set"
                className="w-full p-2.5 text-xs text-plum rounded-xl border border-plum/20 bg-cream-50 focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-bold text-plum block">Embroidery / Technique</label>
                <input
                  type="text"
                  value={newTechnique}
                  onChange={(e) => setNewTechnique(e.target.value)}
                  className="w-full p-2.5 text-xs text-plum rounded-xl border border-plum/20 bg-cream-50 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-plum block">Base Fabric</label>
                <input
                  type="text"
                  value={newFabric}
                  onChange={(e) => setNewFabric(e.target.value)}
                  className="w-full p-2.5 text-xs text-plum rounded-xl border border-plum/20 bg-cream-50 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-plum block">Tags (comma separated)</label>
              <input
                type="text"
                value={newTags}
                onChange={(e) => setNewTags(e.target.value)}
                placeholder="Bridal, Velvet, Zardozi"
                className="w-full p-2.5 text-xs text-plum rounded-xl border border-plum/20 bg-cream-50 focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-plum block">Photo URL (Simulation)</label>
              <input
                type="url"
                value={newImageUrl}
                onChange={(e) => setNewImageUrl(e.target.value)}
                className="w-full p-2.5 text-xs text-plum rounded-xl border border-plum/20 bg-cream-50 focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setIsUploadOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                size="sm"
                icon={Upload}
                className="bg-emerald-800 hover:bg-emerald-900 text-white text-xs"
              >
                Publish to Portfolio
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
