import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showToast } from '../store/slices/uiSlice';
import api from '../services/api';
import { 
  Settings as SettingsIcon, 
  Sun, 
  Moon, 
  Bell, 
  Database, 
  Radio, 
  Check, 
  Loader2, 
  Wifi, 
  HeartHandshake,
  Activity
} from 'lucide-react';

const Settings = () => {
  const dispatch = useDispatch();
  
  // Theme check from local class list
  const [isDarkMode, setIsDarkMode] = useState(
    document.documentElement.classList.contains('dark')
  );

  // Settings local state
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [hazardAlerts, setHazardAlerts] = useState(true);
  const [defaultRows, setDefaultRows] = useState('10');
  
  // Diagnostic state
  const [pinging, setPinging] = useState(false);
  const [healthStatus, setHealthStatus] = useState(null);
  const [latency, setLatency] = useState(null);

  // Run a real-time health diagnostics check
  const runDiagnostics = async () => {
    setPinging(true);
    const start = performance.now();
    try {
      const response = await api.get('/health');
      const end = performance.now();
      setLatency(Math.round(end - start));
      setHealthStatus(response.data?.status || 'OK');
      dispatch(showToast({ message: 'Diagnostics check completed successfully!', severity: 'success' }));
    } catch (error) {
      setHealthStatus('Error');
      setLatency(null);
      dispatch(showToast({ message: 'API connection diagnostics failed.', severity: 'error' }));
    } finally {
      setPinging(false);
    }
  };

  useEffect(() => {
    runDiagnostics();
  }, []);

  // Handle Theme Toggle
  const toggleTheme = () => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDarkMode(false);
      dispatch(showToast({ message: 'Appearance changed to Light Mode', severity: 'info' }));
    } else {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDarkMode(true);
      dispatch(showToast({ message: 'Appearance changed to Dark Mode', severity: 'info' }));
    }
  };

  // Save Settings simulation
  const handleSaveSettings = () => {
    dispatch(showToast({ message: 'Preferences updated successfully!', severity: 'success' }));
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Workspace Settings
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          Configure visual parameters, notifications, and run system health diagnostics
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Navigation Sidebar panel for settings sections */}
        <div className="glass-panel p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-850/40 space-y-1.5 h-fit">
          <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider px-3 py-2 block">
            Settings Menu
          </span>
          <button className="w-full text-left px-3 py-2 rounded-xl text-sm font-semibold bg-violet-50 dark:bg-violet-950/20 text-violet-600 dark:text-violet-400 flex items-center space-x-2">
            <SettingsIcon className="w-4 h-4" />
            <span>General Preferences</span>
          </button>
        </div>

        {/* Settings Form Content */}
        <div className="md:col-span-2 space-y-6">
          
          {/* 1. Theme Configuration */}
          <div className="glass-panel p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-850/40 space-y-4">
            <h3 className="text-base font-bold text-slate-950 dark:text-white flex items-center space-x-2">
              {isDarkMode ? <Moon className="w-5 h-5 text-indigo-400" /> : <Sun className="w-5 h-5 text-amber-500" />}
              <span>Interface Appearance</span>
            </h3>
            
            <div className="flex justify-between items-center py-2">
              <div>
                <span className="block text-sm font-semibold text-slate-900 dark:text-white">Dark Mode Theme</span>
                <span className="text-xs text-slate-500 dark:text-slate-400">Toggle default background theme for screen elements</span>
              </div>
              <button
                onClick={toggleTheme}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer focus:outline-none ${
                  isDarkMode ? 'bg-violet-600' : 'bg-slate-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    isDarkMode ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* 2. Notification Preferences */}
          <div className="glass-panel p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-850/40 space-y-4">
            <h3 className="text-base font-bold text-slate-950 dark:text-white flex items-center space-x-2">
              <Bell className="w-5 h-5 text-violet-500" />
              <span>Notification Subscriptions</span>
            </h3>

            {/* Email reports */}
            <div className="flex justify-between items-center py-1">
              <div>
                <span className="block text-sm font-semibold text-slate-900 dark:text-white">Monthly Economic Digests</span>
                <span className="text-xs text-slate-500 dark:text-slate-400">Receive summary reports on global conflict costs</span>
              </div>
              <button
                onClick={() => setEmailAlerts(!emailAlerts)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                  emailAlerts ? 'bg-violet-600' : 'bg-slate-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    emailAlerts ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* High Geopolitical hazard alerts */}
            <div className="flex justify-between items-center py-1 border-t border-slate-100 dark:border-slate-800/80 pt-4">
              <div>
                <span className="block text-sm font-semibold text-slate-900 dark:text-white">Critical Macroeconomic Alerts</span>
                <span className="text-xs text-slate-500 dark:text-slate-400">Notify immediately when inflation or GDP collapse bounds trigger</span>
              </div>
              <button
                onClick={() => setHazardAlerts(!hazardAlerts)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                  hazardAlerts ? 'bg-violet-600' : 'bg-slate-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    hazardAlerts ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* 3. Grid Table Configurations */}
          <div className="glass-panel p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-850/40 space-y-4">
            <h3 className="text-base font-bold text-slate-950 dark:text-white flex items-center space-x-2">
              <Database className="w-5 h-5 text-cyan-500" />
              <span>Workspace Parameters</span>
            </h3>

            <div className="flex justify-between items-center">
              <div>
                <span className="block text-sm font-semibold text-slate-900 dark:text-white">Default Page Limits</span>
                <span className="text-xs text-slate-500 dark:text-slate-400">Select rows loaded by default on database listings</span>
              </div>
              <select
                value={defaultRows}
                onChange={(e) => setDefaultRows(e.target.value)}
                className="px-2.5 py-1.5 rounded-lg border bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-violet-500 transition"
              >
                <option value="5">5 rows</option>
                <option value="10">10 rows</option>
                <option value="20">20 rows</option>
                <option value="50">50 rows</option>
              </select>
            </div>
          </div>

          {/* 4. Diagnostics Network Status */}
          <div className="glass-panel p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-850/40 space-y-4">
            <div className="flex justify-between items-start">
              <h3 className="text-base font-bold text-slate-950 dark:text-white flex items-center space-x-2">
                <Radio className="w-5 h-5 text-emerald-500" />
                <span>Diagnostics & Server Status</span>
              </h3>
              <button
                type="button"
                onClick={runDiagnostics}
                disabled={pinging}
                className="flex items-center text-xs font-bold text-violet-600 dark:text-violet-400 hover:text-violet-750 transition disabled:opacity-50 cursor-pointer"
              >
                {pinging && <Loader2 className="w-3.5 h-3.5 animate-spin mr-1" />}
                <span>Test Connection</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Latency */}
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200/50 dark:border-slate-800 space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">API Latency</span>
                <span className="text-sm font-bold text-slate-900 dark:text-white flex items-center">
                  <Wifi className="w-4 h-4 text-emerald-500 mr-1.5" />
                  {latency ? `${latency} ms` : 'Offline / Error'}
                </span>
              </div>

              {/* Health status */}
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200/50 dark:border-slate-800 space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Server Health</span>
                <span className="text-sm font-bold text-slate-900 dark:text-white flex items-center">
                  <HeartHandshake className="w-4 h-4 text-emerald-500 mr-1.5" />
                  {healthStatus === 'OK' ? 'Healthy (OK)' : healthStatus === 'Error' ? 'Unhealthy' : 'Checking...'}
                </span>
              </div>
            </div>
          </div>

          {/* Form Submissions */}
          <div className="flex justify-end pt-4 border-t border-slate-150 dark:border-slate-800">
            <button
              onClick={handleSaveSettings}
              className="flex items-center px-5 py-2.5 bg-violet-600 hover:bg-violet-700 text-white font-bold rounded-xl shadow-md transition cursor-pointer text-sm"
            >
              Save Preferences
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Settings;
