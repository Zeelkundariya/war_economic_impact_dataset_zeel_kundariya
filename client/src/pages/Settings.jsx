import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showToast, toggleTheme } from '../store/slices/uiSlice';
import api from '../services/api';
import {
  Settings as SettingsIcon, Sun, Moon, Bell, Database,
  Radio, Loader2, Wifi, HeartHandshake, Activity,
  CheckCircle2, Zap, Server, RefreshCw
} from 'lucide-react';

/* ── Premium Toggle ─────────────────────────────────────── */
const PremiumToggle = ({ checked, onChange, id }) => (
  <button
    id={id}
    type="button"
    onClick={onChange}
    className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-all duration-300 cursor-pointer focus:outline-none ${
      checked ? 'bg-violet-600 shadow-lg shadow-violet-500/30' : 'bg-slate-200 dark:bg-slate-700'
    }`}
  >
    <span className={`inline-block h-4 w-4 rounded-full bg-white shadow-md transition-transform duration-300 ${
      checked ? 'translate-x-6' : 'translate-x-1'
    }`} />
  </button>
);

/* ── Settings Section Card ──────────────────────────────── */
const SettingSection = ({ title, icon: Icon, iconColor, children, delay = 0 }) => (
  <div
    className="glass-panel rounded-2xl border border-slate-200/60 dark:border-slate-800/60 p-6 space-y-5 animate-fade-up"
    style={{ animationDelay: `${delay}ms`, animationFillMode: 'both' }}
  >
    <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
      <div className={`w-7 h-7 rounded-lg ${iconColor} flex items-center justify-center`}>
        <Icon className="h-4 w-4" />
      </div>
      {title}
    </h3>
    {children}
  </div>
);

/* ── Setting Row ────────────────────────────────────────── */
const SettingRow = ({ label, description, control, border = false }) => (
  <div className={`flex items-center justify-between gap-4 ${border ? 'pt-4 border-t border-slate-100 dark:border-slate-800' : ''}`}>
    <div className="min-w-0">
      <span className="block text-sm font-semibold text-slate-900 dark:text-white">{label}</span>
      <span className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 block">{description}</span>
    </div>
    <div className="shrink-0">{control}</div>
  </div>
);

const Settings = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.ui.theme);
  const isDarkMode = theme === 'dark';

  const [emailAlerts,  setEmailAlerts]  = useState(true);
  const [hazardAlerts, setHazardAlerts] = useState(true);
  const [defaultRows,  setDefaultRows]  = useState('10');
  const [pinging,      setPinging]      = useState(false);
  const [healthStatus, setHealthStatus] = useState(null);
  const [latency,      setLatency]      = useState(null);

  const runDiagnostics = async () => {
    setPinging(true);
    const start = performance.now();
    try {
      const res = await api.get('/health');
      setLatency(Math.round(performance.now() - start));
      setHealthStatus(res.data?.status || 'OK');
      dispatch(showToast({ message: 'Diagnostics completed successfully!', severity: 'success' }));
    } catch {
      setHealthStatus('Error');
      setLatency(null);
      dispatch(showToast({ message: 'API connection diagnostics failed.', severity: 'error' }));
    } finally {
      setPinging(false);
    }
  };

  useEffect(() => { runDiagnostics(); }, []);

  const handleSaveSettings = () => {
    dispatch(showToast({ message: 'Preferences saved successfully!', severity: 'success' }));
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">

      {/* ── Header ────────────────────────────────────────── */}
      <div className="animate-fade-up">
        <div className="flex items-center gap-2 mb-1">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-100 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400 text-[10px] font-bold uppercase tracking-widest">
            <Zap className="h-3 w-3" /> Configuration
          </span>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">Workspace Settings</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">
          Configure visual parameters, notifications, and system diagnostics
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* ── Sidebar Nav ───────────────────────────────── */}
        <div className="glass-panel rounded-2xl border border-slate-200/60 dark:border-slate-800/60 p-4 space-y-1 h-fit animate-fade-up delay-100">
          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest px-3 py-2">Settings Menu</p>
          {[
            { icon: SettingsIcon, label: 'General Preferences', active: true },
          ].map(({ icon: Icon, label, active }) => (
            <button key={label}
              className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2.5 transition-all duration-150 cursor-pointer ${
                active
                  ? 'bg-violet-50 dark:bg-violet-950/20 text-violet-600 dark:text-violet-400'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}>
              <Icon className="h-4 w-4" />{label}
            </button>
          ))}
        </div>

        {/* ── Settings Content ──────────────────────────── */}
        <div className="md:col-span-2 space-y-5">

          {/* 1. Appearance */}
          <SettingSection title="Interface Appearance" icon={isDarkMode ? Moon : Sun}
            iconColor="bg-amber-50 dark:bg-amber-950/20 text-amber-500" delay={150}>
            <SettingRow
              label="Dark Mode Theme"
              description="Toggle background theme for all interface elements"
              control={
                <PremiumToggle
                  id="dark-mode-toggle"
                  checked={isDarkMode}
                  onChange={() => dispatch(toggleTheme())}
                />
              }
            />
            <div className="flex gap-3 pt-2">
              {['Dark', 'Light'].map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => { if ((mode === 'Dark') !== isDarkMode) dispatch(toggleTheme()); }}
                  className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer border ${
                    (mode === 'Dark') === isDarkMode
                      ? 'border-violet-500 bg-violet-50 dark:bg-violet-950/30 text-violet-600 dark:text-violet-400'
                      : 'border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-600'
                  }`}
                >
                  {mode === 'Dark' ? '🌙' : '☀️'} {mode} Mode
                </button>
              ))}
            </div>
          </SettingSection>

          {/* 2. Notifications */}
          <SettingSection title="Notification Subscriptions" icon={Bell}
            iconColor="bg-violet-50 dark:bg-violet-950/20 text-violet-500" delay={230}>
            <SettingRow
              label="Monthly Economic Digests"
              description="Receive summary reports on global conflict costs"
              control={<PremiumToggle id="email-alerts-toggle" checked={emailAlerts} onChange={() => setEmailAlerts(!emailAlerts)} />}
            />
            <SettingRow
              label="Critical Macroeconomic Alerts"
              description="Notify when inflation or GDP collapse bounds trigger"
              border
              control={<PremiumToggle id="hazard-alerts-toggle" checked={hazardAlerts} onChange={() => setHazardAlerts(!hazardAlerts)} />}
            />
          </SettingSection>

          {/* 3. Workspace Parameters */}
          <SettingSection title="Workspace Parameters" icon={Database}
            iconColor="bg-cyan-50 dark:bg-cyan-950/20 text-cyan-500" delay={310}>
            <SettingRow
              label="Default Page Limits"
              description="Rows loaded by default on database listings"
              control={
                <select
                  id="default-rows-select"
                  value={defaultRows}
                  onChange={(e) => setDefaultRows(e.target.value)}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-violet-500/40 transition cursor-pointer"
                >
                  <option value="5">5 rows</option>
                  <option value="10">10 rows</option>
                  <option value="20">20 rows</option>
                  <option value="50">50 rows</option>
                </select>
              }
            />
          </SettingSection>

          {/* 4. Diagnostics */}
          <SettingSection title="Diagnostics & Server Status" icon={Radio}
            iconColor="bg-emerald-50 dark:bg-emerald-950/20 text-emerald-500" delay={390}>
            <div className="flex justify-between items-center">
              <p className="text-xs text-slate-500 dark:text-slate-400">Real-time API health check and latency monitor</p>
              <button
                id="run-diagnostics"
                type="button"
                onClick={runDiagnostics}
                disabled={pinging}
                className="flex items-center gap-1.5 text-xs font-bold text-violet-600 dark:text-violet-400 hover:text-violet-700 transition-colors disabled:opacity-50 cursor-pointer"
              >
                {pinging
                  ? <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  : <RefreshCw className="w-3.5 h-3.5" />
                }
                {pinging ? 'Testing…' : 'Test Connection'}
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800 space-y-1.5">
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">API Latency</span>
                <span className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <Wifi className="w-4 h-4 text-emerald-500" />
                  {pinging ? '…' : latency ? `${latency} ms` : 'Offline'}
                </span>
                {latency && (
                  <div className="w-full h-1 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full transition-all duration-500 ${latency < 100 ? 'bg-emerald-500' : latency < 300 ? 'bg-amber-500' : 'bg-rose-500'}`}
                      style={{ width: `${Math.min((latency / 500) * 100, 100)}%` }} />
                  </div>
                )}
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800 space-y-1.5">
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">Server Health</span>
                <span className={`text-sm font-bold flex items-center gap-1.5 ${
                  healthStatus === 'OK' ? 'text-emerald-600 dark:text-emerald-400'
                  : healthStatus === 'Error' ? 'text-rose-500'
                  : 'text-slate-900 dark:text-white'
                }`}>
                  {healthStatus === 'OK'
                    ? <><HeartHandshake className="w-4 h-4" /> Healthy</>
                    : healthStatus === 'Error'
                    ? <><Server className="w-4 h-4" /> Unhealthy</>
                    : <><Activity className="w-4 h-4 animate-pulse" /> Checking…</>
                  }
                </span>
                <span className={`text-[10px] font-semibold ${
                  healthStatus === 'OK' ? 'text-emerald-500' : healthStatus === 'Error' ? 'text-rose-400' : 'text-slate-400'
                }`}>
                  {healthStatus === 'OK' ? 'All systems operational' : healthStatus === 'Error' ? 'Connection failed' : 'Running diagnostics…'}
                </span>
              </div>
            </div>
          </SettingSection>

          {/* Save */}
          <div className="flex justify-end pt-2 animate-fade-up delay-500">
            <button
              id="save-settings"
              onClick={handleSaveSettings}
              className="flex items-center gap-2 px-6 py-2.5 premium-gradient-btn text-white font-bold rounded-xl cursor-pointer text-sm"
            >
              <CheckCircle2 className="h-4 w-4" />
              Save Preferences
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
