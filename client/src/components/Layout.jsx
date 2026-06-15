import React, { useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const Layout = () => {
  const sidebarOpen = useSelector((state) => state.ui.sidebarOpen);
  const theme = useSelector((state) => state.ui.theme);
  const location = useLocation();
  const mainRef = useRef(null);

  // Sync theme class with HTML element
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') root.classList.add('dark');
    else root.classList.remove('dark');
  }, [theme]);

  // Page-change: scroll to top and replay fade animation
  useEffect(() => {
    if (mainRef.current) {
      mainRef.current.scrollTo({ top: 0 });
    }
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#050811] transition-colors duration-300">
      {/* Subtle background grid */}
      <div className="fixed inset-0 bg-grid-lines pointer-events-none opacity-40 dark:opacity-100 z-0" />

      {/* Top Navbar */}
      <Navbar />

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main
        ref={mainRef}
        className={`pt-16 min-h-screen transition-all duration-300 ease-out relative z-10 ${
          sidebarOpen ? 'pl-64' : 'pl-[72px]'
        }`}
      >
        <div
          key={location.pathname}
          className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8 animate-fade-up"
          style={{ animationDuration: '0.45s' }}
        >
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
