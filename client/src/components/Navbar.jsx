import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toggleSidebar, toggleTheme } from '../store/slices/uiSlice';
import { logout } from '../store/slices/authSlice';
import { Menu, Sun, Moon, LogOut, User, Shield, ChevronDown, Settings, Activity } from 'lucide-react';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useSelector((state) => state.ui.theme);
  const { user, role } = useSelector((state) => state.auth);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Add shadow on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLogout = () => {
    setDropdownOpen(false);
    dispatch(logout());
    navigate('/login');
  };

  const userInitial = user?.name ? user.name.charAt(0).toUpperCase() : 'U';

  return (
    <header
      className={`fixed top-0 left-0 right-0 h-16 z-30 flex items-center justify-between px-4 navbar-premium transition-all duration-300 ${
        scrolled ? 'shadow-lg shadow-black/5' : ''
      }`}
    >
      {/* ── Left: Hamburger + Logo ───────────────────────── */}
      <div className="flex items-center gap-3">
        <button
          id="sidebar-toggle"
          onClick={() => dispatch(toggleSidebar())}
          className="relative p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-violet-50 dark:hover:bg-violet-950/20 hover:text-violet-600 dark:hover:text-violet-400 focus:outline-none transition-all duration-200 group cursor-pointer"
          aria-label="Toggle sidebar"
        >
          <Menu className="h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
        </button>

        {/* Logo */}
        <div className="flex items-center gap-2.5 select-none">
          <div className="relative">
            <div className="absolute -inset-1 rounded-xl bg-gradient-to-tr from-violet-600 to-indigo-600 opacity-30 blur-md animate-pulse-glow" />
            <div className="relative w-8 h-8 bg-gradient-to-tr from-violet-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-violet-500/25">
              <Shield className="text-white h-4 w-4" />
            </div>
          </div>
          <div className="hidden sm:block">
            <span className="font-bold text-base bg-gradient-to-r from-violet-600 via-indigo-600 to-violet-700 bg-clip-text text-transparent tracking-tight leading-none">
              Conflict Economics
            </span>
            <div className="flex items-center gap-1 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[9px] font-semibold text-slate-400 uppercase tracking-widest">Live Data</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Right: Controls ──────────────────────────────── */}
      <div className="flex items-center gap-2">

        {/* Live indicator (desktop only) */}
        <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/40">
          <Activity className="h-3 w-3 text-emerald-500" />
          <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">System Online</span>
        </div>

        {/* Theme Toggle */}
        <button
          id="theme-toggle"
          onClick={() => dispatch(toggleTheme())}
          className="relative p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-amber-50 dark:hover:bg-amber-950/20 hover:text-amber-500 focus:outline-none transition-all duration-200 group cursor-pointer overflow-hidden"
          title="Toggle light/dark theme"
          aria-label="Toggle theme"
        >
          <div className="relative transition-all duration-300">
            {theme === 'dark'
              ? <Sun className="h-5 w-5 text-amber-400 transition-all duration-300 group-hover:rotate-45 group-hover:scale-110" />
              : <Moon className="h-5 w-5 transition-all duration-300 group-hover:-rotate-12 group-hover:scale-110" />
            }
          </div>
        </button>

        {/* Divider */}
        <div className="w-px h-6 bg-slate-200 dark:bg-slate-800 mx-1" />

        {/* User Dropdown */}
        <div className="relative">
          <button
            id="user-menu-toggle"
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/60 focus:outline-none transition-all duration-200 cursor-pointer group"
            aria-label="User menu"
          >
            {/* Avatar */}
            <div className="relative">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-md shadow-violet-500/25 transition-transform duration-200 group-hover:scale-105">
                {userInitial}
              </div>
              {/* Online dot */}
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full" />
            </div>

            {/* Name + Role */}
            <div className="hidden md:block text-left">
              <p className="text-xs font-bold text-slate-800 dark:text-slate-100 leading-none truncate max-w-[100px]">
                {user?.name || 'Analyst'}
              </p>
              <p className="text-[10px] text-violet-500 dark:text-violet-400 font-semibold capitalize mt-0.5">
                {role || 'Viewer'}
              </p>
            </div>

            <ChevronDown
              className={`h-3.5 w-3.5 text-slate-400 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`}
            />
          </button>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <>
              {/* Overlay */}
              <div onClick={() => setDropdownOpen(false)} className="fixed inset-0 z-40" />

              <div className="absolute right-0 mt-2 w-60 rounded-2xl glass-panel dark:glass-panel shadow-2xl border border-slate-200/60 dark:border-white/5 overflow-hidden z-50 animate-slide-down">
                {/* Header */}
                <div className="px-4 py-3.5 bg-gradient-to-br from-violet-600 to-indigo-700 relative overflow-hidden">
                  <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-white/10 blur-xl" />
                  <div className="relative">
                    <p className="text-sm font-bold text-white truncate">{user?.name || 'Global Analyst'}</p>
                    <p className="text-xs text-violet-200 truncate mt-0.5">{user?.email || ''}</p>
                    <span className="inline-flex items-center gap-1 mt-1.5 px-2 py-0.5 bg-white/15 backdrop-blur-sm rounded-full text-[9px] font-bold text-white uppercase tracking-wider">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      {role || 'viewer'} access
                    </span>
                  </div>
                </div>

                <div className="py-1.5">
                  <button
                    id="goto-profile"
                    onClick={() => { setDropdownOpen(false); navigate('/profile'); }}
                    className="flex items-center w-full px-4 py-2.5 text-sm text-slate-700 dark:text-slate-200 hover:bg-violet-50 dark:hover:bg-violet-950/20 hover:text-violet-600 dark:hover:text-violet-400 transition-all duration-150 gap-3 group cursor-pointer"
                  >
                    <div className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center group-hover:bg-violet-100 dark:group-hover:bg-violet-950/40 transition-colors">
                      <User className="h-3.5 w-3.5" />
                    </div>
                    <span className="font-medium">My Profile</span>
                  </button>

                  <button
                    id="goto-settings"
                    onClick={() => { setDropdownOpen(false); navigate('/settings'); }}
                    className="flex items-center w-full px-4 py-2.5 text-sm text-slate-700 dark:text-slate-200 hover:bg-violet-50 dark:hover:bg-violet-950/20 hover:text-violet-600 dark:hover:text-violet-400 transition-all duration-150 gap-3 group cursor-pointer"
                  >
                    <div className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center group-hover:bg-violet-100 dark:group-hover:bg-violet-950/40 transition-colors">
                      <Settings className="h-3.5 w-3.5" />
                    </div>
                    <span className="font-medium">Settings</span>
                  </button>

                  <div className="my-1.5 border-t border-slate-100 dark:border-slate-800" />

                  <button
                    id="logout-btn"
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-2.5 text-sm text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-all duration-150 gap-3 group cursor-pointer"
                  >
                    <div className="w-7 h-7 rounded-lg bg-rose-50 dark:bg-rose-950/20 flex items-center justify-center group-hover:bg-rose-100 dark:group-hover:bg-rose-950/40 transition-colors">
                      <LogOut className="h-3.5 w-3.5" />
                    </div>
                    <span className="font-semibold">Sign Out</span>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
