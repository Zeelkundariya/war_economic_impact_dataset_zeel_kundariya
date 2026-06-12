import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { LayoutDashboard, BarChart3, Database, Users, User, Settings, ShieldAlert } from 'lucide-react';

const Sidebar = () => {
  const sidebarOpen = useSelector((state) => state.ui.sidebarOpen);
  const { role } = useSelector((state) => state.auth);

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Conflicts Grid', path: '/conflicts', icon: Database },
    { name: 'Analytics', path: '/analytics', icon: BarChart3 },
    { name: 'Profile', path: '/profile', icon: User },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  // Show user management only for admins
  if (role === 'admin') {
    navItems.splice(3, 0, { name: 'Manage Users', path: '/admin/users', icon: Users });
  }

  return (
    <aside
      className={`fixed top-16 bottom-0 left-0 z-20 flex flex-col bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transition-all duration-300 ${
        sidebarOpen ? 'w-64' : 'w-20'
      }`}
    >
      <div className="flex-1 py-6 flex flex-col justify-between overflow-y-auto px-3">
        {/* Navigation Items */}
        <nav className="space-y-1.5">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 group relative ${
                  isActive
                    ? 'bg-violet-600 text-white shadow-md shadow-violet-500/10'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white'
                }`
              }
            >
              <item.icon
                className={`h-5 w-5 shrink-0 transition-transform group-hover:scale-105 ${
                  sidebarOpen ? 'mr-3' : 'mx-auto'
                }`}
              />
              
              {/* Expandable Label */}
              {sidebarOpen && (
                <span className="transition-opacity duration-200 opacity-100 whitespace-nowrap">
                  {item.name}
                </span>
              )}

              {/* Tooltip on collapse */}
              {!sidebarOpen && (
                <div className="absolute left-full ml-3 px-2 py-1 bg-slate-900 text-white text-xs font-semibold rounded opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap shadow-md">
                  {item.name}
                </div>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Admin Badge Warning bottom (collapsed/expanded) */}
        {role === 'admin' && (
          <div
            className={`p-3 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 flex items-center ${
              sidebarOpen ? 'space-x-3' : 'justify-center'
            }`}
          >
            <ShieldAlert className="h-5 w-5 text-amber-600 dark:text-amber-500 shrink-0" />
            {sidebarOpen && (
              <div>
                <p className="text-xs font-bold text-amber-800 dark:text-amber-400">Admin Mode</p>
                <p className="text-[10px] text-amber-600 dark:text-amber-500">Access unrestricted</p>
              </div>
            )}
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
