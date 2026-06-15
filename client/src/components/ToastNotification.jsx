import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hideToast } from '../store/slices/uiSlice';
import { CheckCircle2, XCircle, AlertTriangle, Info, X } from 'lucide-react';

const TOAST_CONFIG = {
  success: {
    icon: CheckCircle2,
    bg: 'bg-emerald-950/80 border-emerald-500/40',
    icon_color: 'text-emerald-400',
    bar: 'bg-emerald-500',
    title: 'Success',
  },
  error: {
    icon: XCircle,
    bg: 'bg-rose-950/80 border-rose-500/40',
    icon_color: 'text-rose-400',
    bar: 'bg-rose-500',
    title: 'Error',
  },
  warning: {
    icon: AlertTriangle,
    bg: 'bg-amber-950/80 border-amber-500/40',
    icon_color: 'text-amber-400',
    bar: 'bg-amber-500',
    title: 'Warning',
  },
  info: {
    icon: Info,
    bg: 'bg-violet-950/80 border-violet-500/40',
    icon_color: 'text-violet-400',
    bar: 'bg-violet-500',
    title: 'Info',
  },
};

const ToastNotification = () => {
  const dispatch = useDispatch();
  const { open, message, severity } = useSelector((state) => state.ui.toast);

  if (!open) return null;

  const config = TOAST_CONFIG[severity] || TOAST_CONFIG.info;
  const IconComponent = config.icon;

  return (
    <div className="fixed bottom-6 right-6 z-[9999] animate-slide-right" style={{ animationDuration: '0.35s' }}>
      <div
        className={`relative flex items-start gap-3 min-w-[300px] max-w-[380px] px-4 py-3.5 rounded-2xl border backdrop-blur-xl shadow-2xl ${config.bg}`}
        style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05)' }}
      >
        {/* Icon */}
        <div className={`shrink-0 mt-0.5 ${config.icon_color}`}>
          <IconComponent className="h-4.5 w-4.5" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <p className={`text-xs font-bold uppercase tracking-wider mb-0.5 ${config.icon_color}`}>
            {config.title}
          </p>
          <p className="text-sm text-white font-medium leading-snug">{message}</p>
        </div>

        {/* Close button */}
        <button
          onClick={() => dispatch(hideToast())}
          className="shrink-0 p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-all duration-150 cursor-pointer"
        >
          <X className="h-3.5 w-3.5" />
        </button>

        {/* Auto-close progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 rounded-b-2xl overflow-hidden">
          <div
            className={`h-full ${config.bar} opacity-60`}
            style={{
              animation: 'toast-progress 4s linear forwards',
              width: '100%',
            }}
          />
        </div>

        <style>{`
          @keyframes toast-progress {
            from { width: 100%; }
            to   { width: 0%; }
          }
        `}</style>
      </div>
    </div>
  );
};

export default ToastNotification;
