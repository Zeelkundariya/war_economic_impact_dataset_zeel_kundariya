import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const Layout = () => {
  const sidebarOpen = useSelector((state) => state.ui.sidebarOpen);
  const theme = useSelector((state) => state.ui.theme);

  // Sync theme class with HTML element on layout load/toggle
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      {/* Top Navbar */}
      <Navbar />

      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Content Area */}
      <main
        className={`pt-16 min-h-screen transition-all duration-300 ${
          sidebarOpen ? 'pl-64' : 'pl-20'
        }`}
      >
        <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8 animate-in fade-in duration-300">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
