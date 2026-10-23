import React, { useState, useEffect } from 'react';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { useUI } from '../../store/useUI';
import { getStoredUsers, saveStoredUsers } from '../../services/storage';
import { Users, Search, ShieldCheck, UserCheck, ShieldAlert, CheckCircle2, XCircle } from 'lucide-react';

export const AdminUsers = () => {
  const { addToast } = useUI();
  const [users, setUsers] = useState([]);
  const [roleFilter, setRoleFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const loadUsers = () => {
    setUsers(getStoredUsers());
  };

  useEffect(() => {
    loadUsers();
    window.addEventListener('storage', loadUsers);
    return () => window.removeEventListener('storage', loadUsers);
  }, []);

  const handleToggleStatus = (userId) => {
    const all = getStoredUsers();
    const idx = all.findIndex((u) => u.id === userId);
    if (idx !== -1) {
      all[idx].status = all[idx].status === 'suspended' ? 'active' : 'suspended';
      saveStoredUsers(all);
      setUsers(all);
      addToast({
        title: 'User Status Updated',
        message: `User is now ${all[idx].status}.`,
        type: all[idx].status === 'active' ? 'success' : 'info',
      });
    }
  };

  const filteredUsers = users.filter((u) => {
    const matchesRole = roleFilter === 'all' || u.role === roleFilter;
    const matchesSearch =
      u.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.city?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesRole && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-sky/50 border border-sky-300 text-[11px] font-semibold text-blue-900 uppercase tracking-wider mb-1">
            <Users className="w-3.5 h-3.5 text-blue-700" />
            <span>Identity Governance</span>
          </div>
          <h1 className="font-fraunces text-2xl sm:text-3xl text-plum">
            User Accounts & Master Directory
          </h1>
          <p className="text-xs sm:text-sm text-plum-soft">
            Manage customer accounts, master artisan credentials, and staff administrator access.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs px-3 py-1.5 rounded-full bg-blue-100 text-blue-900 font-bold border border-blue-200">
            {users.length} Registered Accounts
          </span>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar w-full sm:w-auto">
          {['all', 'customer', 'tailor', 'admin'].map((role) => (
            <button
              key={role}
              onClick={() => setRoleFilter(role)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold capitalize transition-all ${
                roleFilter === role
                  ? 'bg-blue-800 text-white shadow-xs'
                  : 'bg-white border border-sky text-plum-soft hover:text-plum'
              }`}
            >
              {role === 'all' ? 'All Roles' : `${role}s`}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-plum-soft absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search by name, email, city..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl text-xs bg-white border border-sky focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
      </div>

      {/* Users Table */}
      <Card variant="sky" className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-sky/40 text-plum-soft uppercase text-[10px] tracking-wider">
                <th className="py-2.5">User</th>
                <th className="py-2.5">Role</th>
                <th className="py-2.5">Location</th>
                <th className="py-2.5">Account Status</th>
                <th className="py-2.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sky/20">
              {filteredUsers.map((u) => {
                const isSuspended = u.status === 'suspended';
                return (
                  <tr key={u.id} className="hover:bg-white/60">
                    <td className="py-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={u.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80'}
                          alt={u.name}
                          className="w-8 h-8 rounded-full object-cover border border-sky"
                        />
                        <div>
                          <strong className="text-plum block">{u.name}</strong>
                          <span className="text-[11px] text-plum-soft">{u.email}</span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3">
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                        u.role === 'tailor'
                          ? 'bg-mint text-emerald-950'
                          : u.role === 'admin'
                          ? 'bg-sky text-blue-950'
                          : 'bg-blush text-rose-950'
                      }`}>
                        {u.role}
                      </span>
                    </td>

                    <td className="py-3 text-plum-soft">
                      {u.city || 'India'}
                    </td>

                    <td className="py-3">
                      <span className={`text-[10px] font-bold ${
                        isSuspended ? 'text-red-700' : 'text-emerald-800'
                      }`}>
                        {isSuspended ? 'Suspended' : 'Active ✓'}
                      </span>
                    </td>

                    <td className="py-3 text-right">
                      <button
                        onClick={() => handleToggleStatus(u.id)}
                        className={`text-xs font-semibold hover:underline ${
                          isSuspended ? 'text-emerald-800' : 'text-red-700'
                        }`}
                      >
                        {isSuspended ? 'Reactivate' : 'Suspend'}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
