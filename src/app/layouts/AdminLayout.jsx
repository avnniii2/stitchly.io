import React from 'react';
import { Outlet, NavLink, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../store/useAuth';
import { Button } from '../../components/Button';
import { ToastContainer } from '../../components/Toast';
import { NotificationBell } from '../../components/NotificationBell';
import { NeedleIcon } from '../../components/Doodles';
import { 
  Activity, 
  UserCheck, 
  AlertTriangle,
  Flag,
  Layers,
  Users,
  LogOut, 
  ShieldCheck, 
} from 'lucide-react';

export const AdminLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const navItems = [
    { label: 'Control Room', path: '/admin', icon: Activity, end: true },
    { label: 'KYC Approvals', path: '/admin/verification', icon: UserCheck },
    { label: 'Disputes & Escrow', path: '/admin/disputes', icon: AlertTriangle },
    { label: 'Content Moderation', path: '/admin/moderation', icon: Flag },
    { label: 'Garment & Fabric Catalog', path: '/admin/catalog', icon: Layers },
    { label: 'User Directory', path: '/admin/users', icon: Users },
  ];

  return (
    <div className="min-h-screen bg-[#F6F9FD] atelier-grain flex flex-col font-sans selection:bg-sky selection:text-plum">
      {/* Top Admin Header */}
      <header className="bg-white/90 backdrop-blur-md border-b border-sky shadow-sm sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-sky flex items-center justify-center shadow-xs">
                <NeedleIcon className="w-5 h-5 -rotate-12" color="#4B77BE" />
              </div>
              <span className="font-fraunces text-xl font-semibold text-plum">
                Stitchly
              </span>
            </Link>

            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky/50 border border-sky-300 text-xs text-blue-900 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-700" />
              <span>Atelier Operations Admin</span>
            </div>
          </div>

          {/* User info, Notifications & Logout */}
          <div className="flex items-center gap-3">
            <NotificationBell theme="admin" />

            <div className="flex items-center gap-2.5 bg-sky-50 px-3 py-1.5 rounded-full border border-sky">
              <img
                src={user?.avatar || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100'}
                alt={user?.name}
                className="w-7 h-7 rounded-full object-cover border border-sky"
              />
              <div className="hidden sm:block text-left">
                <p className="text-xs font-semibold text-plum leading-tight">{user?.name}</p>
                <p className="text-[10px] text-blue-700 font-medium">{user?.title || 'Administrator'}</p>
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
        <div className="border-t border-sky/40 bg-sky/20 overflow-x-auto no-scrollbar">
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
                        ? 'bg-blue-700 text-white shadow-soft font-semibold'
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
