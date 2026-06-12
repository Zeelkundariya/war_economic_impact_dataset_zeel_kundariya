import React from 'react';
import { ShieldAlert, Loader2 } from 'lucide-react';

const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, conflictName = '', loading = false }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl w-full max-w-md border border-slate-200 dark:border-slate-700/60 p-6 animate-in zoom-in-95 duration-200 space-y-4">
        {/* Warning Icon and Title */}
        <div className="flex items-center space-x-3 text-rose-600 dark:text-rose-400">
          <div className="w-10 h-10 bg-rose-50 dark:bg-rose-950/20 rounded-xl flex items-center justify-center">
            <ShieldAlert className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold">Delete Entry</h3>
            <p className="text-xs text-rose-500">Unrecoverable database action warning</p>
          </div>
        </div>

        {/* Message body */}
        <div className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
          Are you sure you want to delete <span className="font-bold text-slate-900 dark:text-white">"{conflictName}"</span>? This will trigger a soft-delete status on the record in MongoDB.
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-700/60">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 font-semibold rounded-xl transition cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={loading}
            onClick={onConfirm}
            className="flex items-center px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-semibold rounded-xl transition disabled:opacity-50 cursor-pointer"
          >
            {loading && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
            Confirm Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
