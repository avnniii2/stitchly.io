import React from 'react';
import { Outlet, NavLink, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../store/useAuth';
import { Button } from '../../components/Button';
import { ToastContainer } from '../../components/Toast';
import { NotificationBell } from '../../components/NotificationBell';
import { NeedleIcon, SparkleDoodle } from '../../components/Doodles';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Sparkles, 
  Scissors,
  Heart,
  Ruler, 
  Users,
  User, 
  LogOut, 
} from 'lucide-react';

export const CustomerLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const navItems = [
    { label: 'Overview', path: '/app', icon: LayoutDashboard, end: true },
    { label: 'AI Design Studio', path: '/app/studio', icon: Sparkles, badge: '✨' },
    { label: 'Master Tailors', path: '/app/tailors', icon: Scissors },
    { label: 'My Orders', path: '/app/orders', icon: ShoppingBag },
    { label: 'Wishlist', path: '/app/wishlist', icon: Heart },
    { label: 'Measurement Kit', path: '/app/measurements', icon: Ruler },
    { label: 'Wedding Group', path: '/app/group', icon: Users, badge: '18% Off' },
    { label: 'My Profile', path: '/app/profile', icon: User },
  ];

  return (
    <div className="min-h-screen bg-cream atelier-grain flex flex-col font-sans selection:bg-blush selection:text-plum">
      {/* Top Customer Atelier Bar */}
      <header className="bg-white/85 backdrop-blur-md border-b border-blush shadow-xs sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-blush flex items-center justify-center shadow-xs">
                <NeedleIcon className="w-5 h-5 -rotate-12" color="#D9718A" />
              </div>
              <span className="font-fraunces text-xl font-semibold text-plum">
                Stitchly
              </span>
            </Link>

            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-blush/40 border border-blush text-xs text-rose-deep font-medium">
              <SparkleDoodle className="w-3.5 h-3.5" color="#D9718A" />
              <span>Customer Atelier</span>
            </div>
          </div>

          {/* User info, Notifications & Logout */}
          <div className="flex items-center gap-3">
            <NotificationBell theme="customer" />

            <div className="flex items-center gap-2.5 bg-cream-100 px-3 py-1.5 rounded-full border border-plum/10">
              <img
                src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'}
                alt={user?.name}
                className="w-7 h-7 rounded-full object-cover border border-blush"
              />
              <span className="text-xs font-semibold text-plum hidden sm:inline">
                {user?.name || 'Customer'}
              </span>
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

        {/* Horizontal Navigation Pills */}
        <div className="border-t border-blush/30 bg-cream/50 overflow-x-auto no-scrollbar">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 py-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.end}
                  className={({ isActive }) =>
                    `px-3.5 py-1.5 text-xs font-medium rounded-full flex items-center gap-1.5 transition-all whitespace-nowrap ${
                      isActive
                        ? 'bg-rose-deep text-white shadow-soft-blush font-semibold'
                        : 'text-plum-soft hover:text-plum hover:bg-white/80'
                    }`
                  }
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-butter text-amber-900 font-bold uppercase tracking-wider">
                      {item.badge}
                    </span>
                  )}
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
