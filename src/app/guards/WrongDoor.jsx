import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../store/useAuth';
import { Button } from '../../components/Button';
import { NeedleIcon, ScissorsIcon } from '../../components/Doodles';
import { ArrowRight, LogOut, Compass } from 'lucide-react';

export const WrongDoor = ({ requiredRole }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const getRoleDashboard = (role) => {
    switch (role) {
      case 'admin': return '/admin';
      case 'tailor': return '/tailor';
      case 'customer': return '/app';
      default: return '/';
    }
  };

  const currentDashboard = getRoleDashboard(user?.role);

  return (
    <div className="min-h-screen bg-cream atelier-grain flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white/90 backdrop-blur-md rounded-3xl p-8 shadow-soft-lg border border-blush/60 text-center relative overflow-hidden">
        {/* Soft floating background blob */}
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-peach/40 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-lavender/40 rounded-full blur-2xl pointer-events-none" />

        {/* Motif Header */}
        <div className="relative w-20 h-20 mx-auto rounded-full bg-blush/30 flex items-center justify-center mb-6">
          <Compass className="w-10 h-10 text-rose-deep animate-[pulseSoft_3s_infinite]" />
          <div className="absolute -bottom-1 -right-1 bg-white p-1 rounded-full shadow-sm">
            <ScissorsIcon className="w-4 h-4" color="#4A3F5C" />
          </div>
        </div>

        <span className="text-xs uppercase tracking-widest text-plum-soft font-semibold bg-cream-200 px-3 py-1 rounded-full border border-plum/10">
          Wrong Atelier Door
        </span>

        <h1 className="font-fraunces text-2xl md:text-3xl text-plum mt-4 mb-3">
          A different thread of work
        </h1>

        <p className="text-sm text-plum-soft leading-relaxed mb-6">
          You knocked on the <strong className="text-plum capitalize">{requiredRole}</strong> studio door, 
          but you are signed in as <strong className="text-plum">{user?.name}</strong> with a <span className="capitalize font-semibold text-rose-deep">{user?.role}</span> pass.
        </p>

        <div className="flex flex-col gap-3">
          <Button
            variant="primary"
            size="md"
            icon={ArrowRight}
            iconPosition="right"
            onClick={() => navigate(currentDashboard)}
            className="w-full"
          >
            Take me to my {user?.role} dashboard
          </Button>

          <Button
            variant="ghost"
            size="sm"
            icon={LogOut}
            onClick={async () => {
              await logout();
              navigate('/login');
            }}
            className="w-full text-plum-soft hover:text-plum"
          >
            Sign out & switch account
          </Button>
        </div>
      </div>
    </div>
  );
};
