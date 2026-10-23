import React from 'react';
import { Outlet, NavLink, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../store/useAuth';
import { Button } from '../../components/Button';
import { ToastContainer } from '../../components/Toast';
import { NotificationBell } from '../../components/NotificationBell';
import { ScissorsIcon, PinIcon } from '../../components/Doodles';
import { 
  ClipboardList, 
  Inbox,
  Kanban,
  Award,
  Sliders,
  Truck,
  Wallet, 
  TrendingUp,
  FileCheck2, 
  LogOut, 
  AlertTriangle
} from 'lucide-react';

export const TailorLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const navItems = [
    { label: 'Overview', path: '/tailor', icon: ClipboardList, end: true },
    { label: 'Booking Inbox', path: '/tailor/inbox', icon: Inbox },
    { label: 'Orders Kanban', path: '/tailor/orders', icon: Kanban },
    { label: 'Portfolio', path: '/tailor/portfolio', icon: Award },
    { label: 'Pricing & Capacity', path: '/tailor/pricing', icon: Sliders },
    { label: 'Dispatch (AWB)', path: '/tailor/dispatch', icon: Truck },
    { label: 'Earnings & Payouts', path: '/tailor/earnings', icon: Wallet },
    { label: 'Analytics', path: '/tailor/analytics', icon: TrendingUp },
    { label: 'KYC Status', path: '/tailor/kyc', icon: FileCheck2 },
  ];

  const isPendingKyc = user?.kycStatus === 'pending' || !user?.verified;

  return (
    <div className="min-h-screen bg-[#F6FBF8] atelier-grain flex flex-col font-sans selection:bg-mint selection:text-plum">
      {/* Top Notice Banner if KYC is pending */}
      {isPendingKyc && (
        <div className="bg-amber-100/90 border-b border-amber-200 px-4 py-2.5 text-xs text-amber-950 flex items-center justify-between">
          <div className="max-w-7xl mx-auto flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              <strong>KYC Under Review:</strong> Your workshop application is being reviewed by the Stitchly Atelier Admin team. You have full access to explore the workspace.
            </span>
          </div>
          <Link to="/tailor/kyc" className="underline font-semibold ml-4 shrink-0 hover:text-amber-800">
            View KYC Details
          </Link>
        </div>
      )}

      {/* Tailor Atelier Header */}
      <header className="bg-white/90 backdrop-blur-md border-b border-mint shadow-soft-mint sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-mint flex items-center justify-center shadow-xs">
                <ScissorsIcon className="w-5 h-5 -rotate-45" color="#2E8B57" />
              </div>
              <span className="font-fraunces text-xl font-semibold text-plum">
                Stitchly
              </span>
            </Link>

            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-mint/50 border border-mint-400 text-xs text-emerald-900 font-medium">
              <PinIcon className="w-3.5 h-3.5" color="#2E8B57" />
              <span>Tailor Atelier ({user?.city || 'Jaipur'})</span>
            </div>
          </div>

          {/* User info, Notifications & Logout */}
          <div className="flex items-center gap-3">
            <NotificationBell theme="tailor" />

            <div className="flex items-center gap-2.5 bg-mint-50 px-3 py-1.5 rounded-full border border-mint">
              <img
                src={user?.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100'}
                alt={user?.name}
                className="w-7 h-7 rounded-full object-cover border border-mint"
              />
              <div className="hidden sm:block text-left">
                <p className="text-xs font-semibold text-plum leading-tight">{user?.name}</p>
                <p className="text-[10px] text-emerald-700 font-medium">{user?.primarySpecialty || 'Artisan'}</p>
              </div>
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              icon={LogOut}
              className="text-plum-soft hover:text-plum text-xs"
            >
              Sign Out
            </Button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="border-t border-mint/40 bg-mint/20 overflow-x-auto no-scrollbar">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 py-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.end}
                  className={({ isActive }) =>
                    `px-3 py-1.5 text-xs font-medium rounded-full flex items-center gap-1.5 transition-all whitespace-nowrap ${
                      isActive
                        ? 'bg-emerald-700 text-white shadow-soft-mint font-semibold'
                        : 'text-plum-soft hover:text-plum hover:bg-white/80'
                    }`
                  }
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>

      <ToastContainer />
    </div>
  );
};
