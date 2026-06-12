import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, updateUserRole, deleteUser } from '../store/slices/dataSlice';
import { showToast } from '../store/slices/uiSlice';
import { 
  Users, 
  Shield, 
  User, 
  Trash2, 
  Check, 
  X, 
  Loader2, 
  Search,
  ShieldCheck,
  ShieldAlert,
  Info
} from 'lucide-react';

const UserManagement = () => {
  const dispatch = useDispatch();
  const { users, loading } = useSelector((state) => state.data);
  const { user: currentUser } = useSelector((state) => state.auth);

  const [searchTerm, setSearchTerm] = useState('');
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  // Fetch users on mount
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  // Handle Search Filtering
  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Toggle Admin Role
  const handleToggleRole = async (targetUser) => {
    if (targetUser._id === currentUser?._id) {
      dispatch(showToast({ message: 'You cannot revoke your own admin rights.', severity: 'warning' }));
      return;
    }

    const updatedRole = !targetUser.isAdmin;
    try {
      await dispatch(updateUserRole({ id: targetUser._id, isAdmin: updatedRole })).unwrap();
      dispatch(
        showToast({
          message: `User "${targetUser.name}" successfully ${updatedRole ? 'promoted to Admin' : 'demoted to User'}.`,
          severity: 'success'
        })
      );
    } catch (err) {
      dispatch(showToast({ message: err || 'Failed to update user role.', severity: 'error' }));
    }
  };

  // Open Delete Confirm
  const promptDeleteUser = (targetUser) => {
    if (targetUser._id === currentUser?._id) {
      dispatch(showToast({ message: 'You cannot delete your own admin account.', severity: 'warning' }));
      return;
    }
    setUserToDelete(targetUser);
    setDeleteConfirmOpen(true);
  };

  // Confirm Delete User
  const handleDeleteConfirm = async () => {
    if (!userToDelete) return;
    setActionLoading(true);
    try {
      await dispatch(deleteUser(userToDelete._id)).unwrap();
      dispatch(showToast({ message: `User "${userToDelete.name}" account deleted successfully.`, severity: 'success' }));
      setDeleteConfirmOpen(false);
      setUserToDelete(null);
    } catch (err) {
      dispatch(showToast({ message: err || 'Failed to delete user.', severity: 'error' }));
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            User Accounts
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Manage authorized system users, update access permissions, and revoke accounts
          </p>
        </div>
        <div className="flex items-center space-x-2 bg-violet-50 dark:bg-violet-950/20 text-violet-600 dark:text-violet-400 px-4 py-2 rounded-xl border border-violet-100 dark:border-violet-900/40">
          <Users className="h-5 w-5" />
          <span className="font-bold text-sm">Total: {users.length} Users</span>
        </div>
      </div>

      {/* Control Panel */}
      <div className="glass-panel p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-850/40 flex items-center max-w-md">
        <span className="text-slate-400 mr-2.5">
          <Search className="h-5 w-5" />
        </span>
        <input
          type="text"
          placeholder="Search by name or email address..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-transparent border-0 focus:outline-none focus:ring-0 text-slate-900 dark:text-white text-sm"
        />
      </div>

      {/* Users Grid */}
      <div className="glass-panel rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-850/40 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-900/60 border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-semibold">
                <th className="px-6 py-4">User Details</th>
                <th className="px-6 py-4">Email Address</th>
                <th className="px-6 py-4">Role Status</th>
                <th className="px-6 py-4">Date Joined</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-150 dark:divide-slate-800/80 text-slate-700 dark:text-slate-300">
              {loading && users.length === 0 ? (
                Array.from({ length: 3 }).map((_, idx) => (
                  <tr key={idx} className="animate-pulse">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-9 h-9 bg-slate-200 dark:bg-slate-800 rounded-full"></div>
                        <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-24"></div>
                      </div>
                    </td>
                    <td className="px-6 py-4"><div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-40"></div></td>
                    <td className="px-6 py-4"><div className="h-6 bg-slate-200 dark:bg-slate-800 rounded-full w-16"></div></td>
                    <td className="px-6 py-4"><div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-20"></div></td>
                    <td className="px-6 py-4"><div className="h-8 bg-slate-200 dark:bg-slate-800 rounded w-16 mx-auto"></div></td>
                  </tr>
                ))
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-10 text-slate-500 dark:text-slate-400">
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <Info className="h-8 w-8 text-slate-400 animate-bounce" />
                      <p className="font-semibold">No registered users matched your criteria.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredUsers.map((u) => (
                  <tr key={u._id} className="hover:bg-slate-100/35 dark:hover:bg-slate-800/20 transition-colors">
                    {/* User Profile Info */}
                    <td className="px-6 py-4 font-semibold text-slate-900 dark:text-white">
                      <div className="flex items-center space-x-3">
                        <div className="w-9 h-9 rounded-full bg-violet-100 dark:bg-violet-950/40 text-violet-600 dark:text-violet-400 flex items-center justify-center">
                          <User className="h-4.5 w-4.5" />
                        </div>
                        <div>
                          <span className="block">{u.name}</span>
                          {u._id === currentUser?._id && (
                            <span className="inline-flex px-1.5 py-0.5 text-[9px] bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded font-bold uppercase mt-0.5">
                              You
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    
                    {/* Email */}
                    <td className="px-6 py-4 font-mono text-xs">{u.email}</td>

                    {/* Role Badges */}
                    <td className="px-6 py-4">
                      {u.isAdmin ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-violet-100 text-violet-850 dark:bg-violet-950/40 dark:text-violet-400 border border-violet-200/50 dark:border-violet-800/30">
                          <Shield className="h-3 w-3 mr-1" />
                          Administrator
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 dark:bg-slate-800/50 dark:text-slate-400">
                          User / Analyst
                        </span>
                      )}
                    </td>

                    {/* Creation Date */}
                    <td className="px-6 py-4 text-xs text-slate-500 dark:text-slate-400 font-mono">
                      {u.createdAt ? new Date(u.createdAt).toLocaleDateString(undefined, { dateStyle: 'medium' }) : 'N/A'}
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        {/* Toggle Admin Privilege Switch */}
                        <button
                          onClick={() => handleToggleRole(u)}
                          disabled={u._id === currentUser?._id}
                          className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg border text-xs font-semibold transition cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed ${
                            u.isAdmin
                              ? 'border-amber-200 dark:border-amber-800/40 text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/20'
                              : 'border-violet-200 dark:border-violet-800/40 text-violet-600 dark:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-950/20'
                          }`}
                          title={u.isAdmin ? "Revoke admin rights" : "Grant admin rights"}
                        >
                          <ShieldCheck className="h-3.5 w-3.5" />
                          <span>{u.isAdmin ? 'Demote' : 'Promote'}</span>
                        </button>

                        {/* Delete User Button */}
                        <button
                          onClick={() => promptDeleteUser(u)}
                          disabled={u._id === currentUser?._id}
                          className="p-1.5 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                          title="Delete user account"
                        >
                          <Trash2 className="h-4.5 w-4.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete User Warning Dialog Modal */}
      {deleteConfirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl w-full max-w-md border border-slate-200 dark:border-slate-700/60 p-6 animate-in zoom-in-95 duration-200 space-y-4">
            <div className="flex items-center space-x-3 text-rose-600 dark:text-rose-400">
              <div className="w-10 h-10 bg-rose-50 dark:bg-rose-950/20 rounded-xl flex items-center justify-center">
                <ShieldAlert className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold">Revoke User Account</h3>
                <p className="text-xs text-rose-500">Unrecoverable account deletion warning</p>
              </div>
            </div>

            <div className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
              Are you sure you want to permanently delete the account of <span className="font-bold text-slate-900 dark:text-white">"{userToDelete?.name}"</span> ({userToDelete?.email})? This user will immediately lose access to the system.
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-700/60">
              <button
                type="button"
                onClick={() => {
                  setDeleteConfirmOpen(false);
                  setUserToDelete(null);
                }}
                className="px-4 py-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 font-semibold rounded-xl transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={actionLoading}
                onClick={handleDeleteConfirm}
                className="flex items-center px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-semibold rounded-xl transition disabled:opacity-50 cursor-pointer"
              >
                {actionLoading && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
