import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  LayoutDashboard, BarChart3, Database, Users,
  User, Settings, ShieldAlert, Zap
} from 'lucide-react';

const Sidebar = () => {
  const sidebarOpen = useSelector((state) => state.ui.sidebarOpen);
  const { role } = useSelector((state) => state.auth);

  const navItems = [
    { name: 'Dashboard',     path: '/dashboard',    icon: LayoutDashboard, color: 'violet' },
    { name: 'Conflicts Grid', path: '/conflicts',   icon: Database,        color: 'rose' },
    { name: 'Analytics',     path: '/analytics',    icon: BarChart3,       color: 'cyan' },
    { name: 'Profile',       path: '/profile',      icon: User,            color: 'emerald' },
    { name: 'Settings',      path: '/settings',     icon: Settings,        color: 'amber' },
  ];

  if (role === 'admin') {
    navItems.splice(3, 0, {
      name: 'Manage Users', path: '/admin/users', icon: Users, color: 'fuchsia'
    });
  }

  const colorMap = {
    violet:  { icon: 'text-violet-500',  bg: 'bg-violet-50 dark:bg-violet-950/20' },
    rose:    { icon: 'text-rose-500',    bg: 'bg-rose-50 dark:bg-rose-950/20' },
    cyan:    { icon: 'text-cyan-500',    bg: 'bg-cyan-50 dark:bg-cyan-950/20' },
    emerald: { icon: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-950/20' },
    amber:   { icon: 'text-amber-500',   bg: 'bg-amber-50 dark:bg-amber-950/20' },
    fuchsia: { icon: 'text-fuchsia-500', bg: 'bg-fuchsia-50 dark:bg-fuchsia-950/20' },
  };

  return (
    <aside
      className={`fixed top-16 bottom-0 left-0 z-20 flex flex-col sidebar-premium transition-all duration-300 ease-out ${
        sidebarOpen ? 'w-64' : 'w-[72px]'
      }`}
    >
      <div className="flex-1 py-5 flex flex-col justify-between overflow-y-auto overflow-x-hidden px-3">
        {/* Section Label */}
        {sidebarOpen && (
          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.18em] px-3 mb-3 animate-fade-in">
            Navigation
          </p>
        )}

        {/* Nav Items */}
        <nav className="space-y-1 flex-1">
          {navItems.map((item, index) => {
            const colors = colorMap[item.color] || colorMap.violet;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                id={`nav-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                className={({ isActive }) =>
                  `relative flex items-center rounded-xl transition-all duration-200 group overflow-hidden cursor-pointer ${
                    sidebarOpen ? 'px-3 py-2.5 gap-3' : 'px-0 py-2.5 justify-center'
                  } ${
                    isActive
                      ? 'nav-active'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-white'
                  }`
                }
                style={{ animationDelay: `${index * 60}ms` }}
              >
                {({ isActive }) => (
                  <>
                    {/* Icon wrapper */}
                    <div
                      className={`shrink-0 w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-200 ${
                        isActive
                          ? 'bg-white/20'
                          : `${colors.bg} group-hover:scale-110`
                      }`}
                    >
                      <item.icon
                        className={`h-4 w-4 transition-all duration-200 ${
                          isActive ? 'text-white' : colors.icon
                        }`}
                      />
                    </div>

                    {/* Label */}
                    {sidebarOpen && (
                      <span className={`text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
                        isActive ? 'text-white' : ''
                      }`}>
                        {item.name}
                      </span>
                    )}

                    {/* Active left border accent */}
                    {isActive && (
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r-full bg-white/50" />
                    )}

                    {/* Collapsed Tooltip */}
                    {!sidebarOpen && (
                      <div className="absolute left-full ml-3 px-3 py-1.5 bg-slate-900 dark:bg-slate-800 text-white text-xs font-semibold rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-all duration-150 z-50 whitespace-nowrap shadow-xl border border-white/5">
                        {item.name}
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-2 h-2 bg-slate-900 dark:bg-slate-800 rotate-45 border-l border-b border-white/5" />
                      </div>
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Bottom: Admin Badge */}
        {role === 'admin' && (
          <div
            className={`mt-4 rounded-xl border transition-all duration-300 overflow-hidden ${
              sidebarOpen
                ? 'p-3 bg-gradient-to-br from-amber-500/10 to-orange-500/10 border-amber-200 dark:border-amber-900/40'
                : 'p-2 flex justify-center border-amber-200/40 dark:border-amber-900/20 bg-amber-50/50 dark:bg-amber-950/10'
            }`}
          >
            {sidebarOpen ? (
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-950/40 flex items-center justify-center shrink-0">
                  <ShieldAlert className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <p className="text-xs font-bold text-amber-800 dark:text-amber-400 leading-none">Admin Mode</p>
                  <p className="text-[9px] text-amber-600 dark:text-amber-500 mt-0.5 font-medium">Full system access</p>
                </div>
                <Zap className="ml-auto h-3.5 w-3.5 text-amber-500 animate-pulse shrink-0" />
              </div>
            ) : (
              <ShieldAlert className="h-5 w-5 text-amber-500" />
            )}
          </div>
        )}

        {/* Sidebar version tag */}
        {sidebarOpen && (
          <div className="mt-3 px-3 animate-fade-in">
            <p className="text-[9px] text-slate-300 dark:text-slate-600 font-mono">
              v2.0 · Analytics Suite
            </p>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
