import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toggleSidebar, toggleTheme } from '../store/slices/uiSlice';
import { logout } from '../store/slices/authSlice';
import { Menu, Sun, Moon, LogOut, User, Shield, ChevronDown } from 'lucide-react';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useSelector((state) => state.ui.theme);
  const { user, role } = useSelector((state) => state.auth);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 z-30 flex items-center justify-between px-4 transition-colors duration-300">
      {/* Left section: Hamburger & Logo */}
      <div className="flex items-center space-x-3">
        <button
          onClick={() => dispatch(toggleSidebar())}
          className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none transition cursor-pointer"
        >
          <Menu className="h-5 w-5" />
        </button>
        
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-tr from-violet-600 to-indigo-600 rounded-lg flex items-center justify-center shadow shadow-violet-500/20">
            <Shield className="text-white h-4.5 w-4.5" />
          </div>
          <span className="font-bold text-lg hidden sm:block bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
            Conflict Economics
          </span>
        </div>
      </div>

      {/* Right section: Theme Toggle & User Profile */}
      <div className="flex items-center space-x-2">
        {/* Theme Toggle Button */}
        <button
          onClick={() => dispatch(toggleTheme())}
          className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none transition cursor-pointer"
          title="Toggle light/dark theme"
        >
          {theme === 'dark' ? <Sun className="h-5 w-5 text-amber-500" /> : <Moon className="h-5 w-5 text-slate-500" />}
        </button>

        {/* User Dropdown Menu */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center space-x-2 p-1.5 pr-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none transition cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg bg-violet-100 dark:bg-violet-950/40 border border-violet-200 dark:border-violet-900/50 flex items-center justify-center text-violet-700 dark:text-violet-400 font-bold uppercase text-sm">
              {user?.name ? user.name.charAt(0) : 'U'}
            </div>
            <div className="hidden md:block text-left text-xs">
              <p className="font-bold text-slate-700 dark:text-slate-200 leading-none mb-0.5">
                {user?.name || 'User'}
              </p>
              <p className="text-[10px] text-slate-400 font-medium capitalize">
                {role || 'Viewer'}
              </p>
            </div>
            <ChevronDown className="h-4 w-4 text-slate-400" />
          </button>

          {/* Dropdown Options */}
          {dropdownOpen && (
            <>
              {/* Overlay blocker */}
              <div onClick={() => setDropdownOpen(false)} className="fixed inset-0 z-40" />
              
              <div className="absolute right-0 mt-2 w-56 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-750 shadow-xl py-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                {/* User Info Header */}
                <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-700/60 mb-1">
                  <p className="text-sm font-bold text-slate-800 dark:text-white truncate">
                    {user?.name || 'Global User'}
                  </p>
                  <p className="text-xs text-slate-400 truncate">
                    {user?.email || localStorage.getItem('userEmail') || ''}
                  </p>
                </div>

                {/* Profile Link */}
                <button
                  onClick={() => {
                    setDropdownOpen(false);
                    navigate('/profile');
                  }}
                  className="flex items-center w-full px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700/60 text-left transition"
                >
                  <User className="h-4 w-4 mr-2.5 text-slate-400" />
                  My Profile
                </button>

                {/* Settings Link */}
                <button
                  onClick={() => {
                    setDropdownOpen(false);
                    navigate('/settings');
                  }}
                  className="flex items-center w-full px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700/60 text-left transition"
                >
                  <Settings className="h-4 w-4 mr-2.5 text-slate-400" />
                  Settings
                </button>

                {/* Logout Button */}
                <button
                  onClick={() => {
                    setDropdownOpen(false);
                    handleLogout();
                  }}
                  className="flex items-center w-full px-4 py-2 text-sm text-rose-600 dark:text-rose-400 hover:bg-slate-100 dark:hover:bg-slate-700/60 text-left transition border-t border-slate-100 dark:border-slate-700/60 mt-1"
                >
                  <LogOut className="h-4 w-4 mr-2.5" />
                  Sign Out
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
