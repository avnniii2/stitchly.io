import React, { useState } from 'react';
import { Outlet, Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../store/useAuth';
import { useUI } from '../../store/useUI';
import { Button } from '../../components/Button';
import { Modal } from '../../components/Modal';
import { Drawer } from '../../components/Drawer';
import { ToastContainer } from '../../components/Toast';
import { NeedleIcon, ScissorsIcon, SparkleDoodle, PinIcon } from '../../components/Doodles';
import { Menu, X, ArrowRight, User, LogOut, Check, Star, ShieldCheck } from 'lucide-react';

export const PublicLayout = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { 
    activeModal, 
    modalData, 
    closeModal, 
    activeDrawer, 
    drawerData, 
    closeDrawer,
    currentLanguage,
    setLanguage
  } = useUI();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const getDashboardPath = () => {
    if (!user) return '/app';
    if (user.role === 'admin') return '/admin';
    if (user.role === 'tailor') return '/tailor';
    return '/app';
  };

  const navLinks = [
    { label: 'How It Works', path: '/how-it-works' },
    { label: 'Master Tailors', path: '/tailors' },
    { label: 'Inspiration Feed', path: '/inspiration' },
  ];

  return (
    <div className="min-h-screen bg-cream flex flex-col font-sans selection:bg-blush selection:text-plum">
      {/* Sticky Glass Navbar */}
      <header className="sticky top-0 z-40 bg-cream/80 backdrop-blur-md border-b border-blush/40 transition-all duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group focus:outline-none">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-blush to-peach flex items-center justify-center shadow-soft border border-blush/80 group-hover:scale-105 transition-transform">
              <NeedleIcon className="w-6 h-6 -rotate-12" color="#D9718A" />
            </div>
            <div>
              <span className="font-fraunces text-2xl font-semibold tracking-tight text-plum flex items-center gap-1">
                Stitchly
                <span className="w-1.5 h-1.5 rounded-full bg-rose-deep inline-block" />
              </span>
              <span className="block text-[10px] tracking-wider uppercase text-plum-soft font-medium -mt-1">
                Atelier Marketplace
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
                    isActive
                      ? 'bg-blush/50 text-plum font-semibold shadow-xs'
                      : 'text-plum/80 hover:text-plum hover:bg-white/60'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated && user ? (
              <div className="flex items-center gap-2">
                <Button
                  variant="blush"
                  size="sm"
                  onClick={() => navigate(getDashboardPath())}
                  icon={User}
                  className="font-medium"
                >
                  My Atelier ({user.name.split(' ')[0]})
                </Button>
                <button
                  onClick={async () => {
                    await logout();
                    navigate('/');
                  }}
                  title="Sign out"
                  className="w-9 h-9 rounded-full bg-cream-200 hover:bg-blush/40 text-plum-soft hover:text-plum flex items-center justify-center transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-semibold text-plum hover:text-rose-deep transition-colors"
                >
                  Log In
                </Link>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => navigate('/signup')}
                  icon={ArrowRight}
                  iconPosition="right"
                >
                  Design Outfit
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden p-2 rounded-2xl bg-white/70 border border-plum/10 text-plum focus:outline-none"
            aria-label="Open mobile navigation"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Main Outlet */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Mobile Drawer Menu */}
      <Drawer
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        title="Stitchly Atelier"
        subtitle="Custom ethnic wear made simple"
      >
        <div className="flex flex-col gap-4 py-2">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg font-medium text-plum hover:text-rose-deep py-2 border-b border-blush/30 flex items-center justify-between"
            >
              <span>{link.label}</span>
              <ArrowRight className="w-4 h-4 text-plum-soft" />
            </Link>
          ))}

          <div className="pt-6 flex flex-col gap-3">
            {isAuthenticated && user ? (
              <>
                <Button
                  variant="blush"
                  size="md"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigate(getDashboardPath());
                  }}
                  className="w-full"
                >
                  Go to {user.role} Atelier ({user.name})
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={async () => {
                    await logout();
                    setMobileMenuOpen(false);
                    navigate('/');
                  }}
                  className="w-full text-plum-soft"
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigate('/signup');
                  }}
                  className="w-full"
                >
                  Get Started / Sign Up
                </Button>
                <Button
                  variant="secondary"
                  size="md"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigate('/login');
                  }}
                  className="w-full"
                >
                  Log In
                </Button>
              </>
            )}
          </div>
        </div>
      </Drawer>

      {/* Global How-It-Works Step Preview Modal */}
      <Modal
        isOpen={activeModal === 'how-it-works-step'}
        onClose={closeModal}
        title={modalData?.modalContent?.headline || modalData?.title}
        subtitle={modalData?.subtitle}
      >
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-blush/20 border border-blush/50 flex items-start gap-3">
            <SparkleDoodle className="w-5 h-5 shrink-0 text-rose-deep mt-0.5" />
            <p className="text-sm text-plum leading-relaxed">
              {modalData?.modalContent?.details || modalData?.description}
            </p>
          </div>

          <div className="bg-cream-100 p-4 rounded-2xl border border-plum/10 text-xs text-plum-soft space-y-2">
            <div className="flex items-center gap-2 text-plum font-semibold">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Standard Atelier Protocol</span>
            </div>
            <p>
              Every order includes complimentary doorstep fabric swatches, 2-3 inch hidden margin cloth, and live video check-ins before final packaging.
            </p>
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <Button variant="ghost" size="sm" onClick={closeModal}>
              Close Preview
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                closeModal();
                navigate('/signup');
              }}
            >
              Try This Flow
            </Button>
          </div>
        </div>
      </Modal>

      {/* Global Feature Detail Drawer */}
      <Drawer
        isOpen={activeDrawer === 'feature-detail'}
        onClose={closeDrawer}
        title={drawerData?.title}
        subtitle={drawerData?.tagline}
      >
        {drawerData && (
          <div className="space-y-6">
            <div className="p-5 rounded-2xl bg-white shadow-soft border border-blush/50">
              <h4 className="text-xs font-bold uppercase tracking-wider text-rose-deep mb-2">
                How It Works
              </h4>
              <p className="text-sm text-plum leading-relaxed">
                {drawerData.description}
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-plum-soft">
                Key Atelier Highlights
              </h4>
              {drawerData.details?.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-white/70 border border-plum/5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="text-xs text-plum leading-snug">{item}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 flex flex-col gap-2">
              <Button
                variant="primary"
                size="md"
                onClick={() => {
                  closeDrawer();
                  navigate('/signup');
                }}
                className="w-full"
              >
                Experience This Service
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={closeDrawer}
                className="w-full text-plum-soft"
              >
                Back to Overview
              </Button>
            </div>
          </div>
        )}
      </Drawer>

      {/* Global Inspiration Look Recreation Drawer */}
      <Drawer
        isOpen={activeDrawer === 'inspiration-detail'}
        onClose={closeDrawer}
        title={drawerData?.title}
        subtitle={drawerData?.silhouette ? `${drawerData.silhouette} • ${drawerData.fabric}` : 'Artisanal Look'}
      >
        {drawerData && (
          <div className="space-y-5">
            <div className="rounded-2xl overflow-hidden shadow-soft border border-blush/50 aspect-[4/5] relative">
              <img
                src={drawerData.image}
                alt={drawerData.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium text-plum shadow-sm">
                Origin: {drawerData.cityOrigin || 'Master Atelier'}
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-blush/40 shadow-sm space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-plum-soft">Matched Craftsman</span>
                <span className="font-semibold text-plum">{drawerData.craftsman || 'Master Rahmatullah Khan'}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-plum-soft">Palette</span>
                <span className="font-medium text-plum">{drawerData.color || 'Customizable'}</span>
              </div>
            </div>

            <p className="text-sm text-plum leading-relaxed">
              {drawerData.description}
            </p>

            <div className="pt-2 flex flex-col gap-2">
              <Button
                variant="primary"
                size="md"
                onClick={() => {
                  closeDrawer();
                  navigate('/signup');
                }}
                className="w-full"
              >
                Recreate Look With AI Studio
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={closeDrawer}
                className="w-full text-plum-soft"
              >
                Browse More Looks
              </Button>
            </div>
          </div>
        )}
      </Drawer>

      <ToastContainer />
    </div>
  );
};
