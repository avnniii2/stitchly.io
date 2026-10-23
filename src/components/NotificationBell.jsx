import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, Check, ExternalLink, Sparkles, X } from 'lucide-react';
import { notificationService, getStoredNotifications } from '../services/notifications';
import { useAuth } from '../store/useAuth';

export const NotificationBell = ({ theme = 'customer' }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const loadNotifications = () => {
    if (!user) return;
    const all = getStoredNotifications();
    const relevant = all.filter(
      (n) => n.userId === user.id || n.role === user.role || n.userId === 'all'
    );
    setNotifications(relevant);
  };

  useEffect(() => {
    loadNotifications();

    const handleStorageChange = () => {
      loadNotifications();
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [user]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleMarkAllRead = async () => {
    if (user?.id) {
      await notificationService.markAllAsRead(user.id);
      loadNotifications();
    }
  };

  const handleItemClick = async (notif) => {
    await notificationService.markAsRead(notif.id);
    loadNotifications();
    setIsOpen(false);

    if (notif.orderId) {
      if (user?.role === 'customer') {
        navigate(`/app/orders/${notif.orderId}`);
      } else if (user?.role === 'tailor') {
        if (notif.type === 'booking') {
          navigate('/tailor/inbox');
        } else {
          navigate('/tailor/orders');
        }
      } else if (user?.role === 'admin') {
        navigate('/admin/orders');
      }
    } else if (notif.type === 'kyc') {
      navigate('/admin/verification');
    }
  };

  const themeClasses = {
    customer: {
      badge: 'bg-rose-deep text-white',
      cardHover: 'hover:bg-blush/30',
      unreadDot: 'bg-rose-deep',
      accent: 'text-rose-deep',
    },
    tailor: {
      badge: 'bg-emerald-700 text-white',
      cardHover: 'hover:bg-mint/30',
      unreadDot: 'bg-emerald-600',
      accent: 'text-emerald-800',
    },
    admin: {
      badge: 'bg-blue-700 text-white',
      cardHover: 'hover:bg-sky/30',
      unreadDot: 'bg-blue-600',
      accent: 'text-blue-800',
    },
  }[theme] || {
    badge: 'bg-rose-deep text-white',
    cardHover: 'hover:bg-blush/30',
    unreadDot: 'bg-rose-deep',
    accent: 'text-rose-deep',
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-full hover:bg-black/5 transition-colors text-plum-soft hover:text-plum focus:outline-none focus:ring-2 focus:ring-rose-deep/30"
        aria-label="Notifications"
        title="View Notifications"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span
            className={`absolute top-1 right-1 min-w-[18px] h-[18px] px-1 text-[10px] font-bold rounded-full flex items-center justify-center shadow-xs animate-pulse ${themeClasses.badge}`}
          >
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-white shadow-xl border border-plum/10 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="p-4 bg-cream/50 border-b border-plum/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-fraunces text-base font-semibold text-plum">
                  Notifications
                </span>
                {unreadCount > 0 && (
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${themeClasses.badge}`}>
                    {unreadCount} new
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                {unreadCount > 0 && (
                  <button
                    onClick={handleMarkAllRead}
                    className="text-[11px] font-semibold text-plum-soft hover:text-plum flex items-center gap-1 transition-colors"
                  >
                    <Check className="w-3.5 h-3.5" />
                    Mark all read
                  </button>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-lg hover:bg-black/5 text-plum-soft hover:text-plum"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="max-h-80 overflow-y-auto divide-y divide-plum/5">
              {notifications.length === 0 ? (
                <div className="p-8 text-center text-plum-soft text-xs">
                  <Sparkles className="w-6 h-6 mx-auto mb-2 text-plum/30" />
                  No notifications yet.
                </div>
              ) : (
                notifications.map((notif) => (
                  <div
                    key={notif.id}
                    onClick={() => handleItemClick(notif)}
                    className={`p-3.5 transition-colors cursor-pointer text-left ${
                      !notif.read ? 'bg-cream/40 font-medium' : ''
                    } ${themeClasses.cardHover}`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-start gap-2">
                        {!notif.read && (
                          <span
                            className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${themeClasses.unreadDot}`}
                          />
                        )}
                        <div>
                          <p className="text-xs font-bold text-plum leading-snug">
                            {notif.title}
                          </p>
                          <p className="text-[11px] text-plum-soft mt-0.5 leading-relaxed">
                            {notif.message}
                          </p>
                          <span className="text-[10px] text-plum-soft/70 block mt-1">
                            {notif.timestamp}
                          </span>
                        </div>
                      </div>
                      {notif.orderId && (
                        <ExternalLink className="w-3.5 h-3.5 text-plum-soft shrink-0 mt-0.5" />
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
