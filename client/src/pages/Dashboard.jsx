import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDashboardStats, fetchConflicts } from '../store/slices/dataSlice';
import {
  Globe, Activity, Award, DollarSign,
  TrendingUp, TrendingDown, AlertTriangle,
  RefreshCw, Building2, Zap
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend, BarChart, Bar
} from 'recharts';

/* ── Animated Counter Hook ─────────────────────────────── */
function useCountUp(target, duration = 1200) {
  const [value, setValue] = useState(0);
  const raf = useRef(null);
  useEffect(() => {
    if (!target || isNaN(target)) return;
    const start = performance.now();
    const animate = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(eased * target));
      if (progress < 1) raf.current = requestAnimationFrame(animate);
      else setValue(target);
    };
    raf.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf.current);
  }, [target, duration]);
  return value;
}

/* ── KPI Card Component ─────────────────────────────────── */
const KpiCard = ({ label, value, subLabel, icon: Icon, accent, delay = 0 }) => {
  const accentMap = {
    violet:  { bg: 'bg-violet-50 dark:bg-violet-950/20',  icon: 'text-violet-600 dark:text-violet-400',  val: 'text-slate-900 dark:text-white',        border: 'border-violet-100 dark:border-violet-900/30' },
    amber:   { bg: 'bg-amber-50 dark:bg-amber-950/20',    icon: 'text-amber-600 dark:text-amber-400',    val: 'text-amber-600 dark:text-amber-400',    border: 'border-amber-100 dark:border-amber-900/30' },
    emerald: { bg: 'bg-emerald-50 dark:bg-emerald-950/20',icon: 'text-emerald-600 dark:text-emerald-400',val: 'text-emerald-600 dark:text-emerald-400', border: 'border-emerald-100 dark:border-emerald-900/30' },
    rose:    { bg: 'bg-rose-50 dark:bg-rose-950/20',      icon: 'text-rose-600 dark:text-rose-400',      val: 'text-rose-600 dark:text-rose-400',      border: 'border-rose-100 dark:border-rose-900/30' },
  };
  const c = accentMap[accent] || accentMap.violet;

  return (
    <div
      className={`kpi-card glass-panel rounded-2xl p-5 flex items-center justify-between border ${c.border} animate-fade-up`}
      style={{ animationDelay: `${delay}ms`, animationFillMode: 'both' }}
    >
      <div className="space-y-1.5">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">{label}</span>
        <div className={`text-2xl font-extrabold tracking-tight ${c.val}`}>{value}</div>
        {subLabel && <span className={`text-[10px] font-semibold ${c.icon} block`}>{subLabel}</span>}
      </div>
      <div className={`w-11 h-11 ${c.bg} rounded-2xl flex items-center justify-center shrink-0`}>
        <Icon className={`h-5 w-5 ${c.icon}`} />
      </div>
    </div>
  );
};

/* ── Custom Tooltip ─────────────────────────────────────── */
const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass-panel-dark rounded-xl px-4 py-3 shadow-2xl border border-white/10 min-w-[180px]">
      <p className="text-xs font-bold text-slate-300 mb-2 truncate">{label}</p>
      {payload.map((p, i) => (
        <div key={i} className="flex items-center gap-2 text-xs text-slate-200 mb-1">
          <span className="w-2 h-2 rounded-full shrink-0" style={{ background: p.color }} />
          <span className="text-slate-400">{p.name}:</span>
          <span className="font-bold">${p.value?.toFixed(2)}B</span>
        </div>
      ))}
    </div>
  );
};

/* ── Risk Item Sub-Component ────────────────────────────── */
const RiskItem = ({ badge, badgeColor, value, valueIcon: ValIcon, valueColor, title, subtitle, delay = 0 }) => (
  <div
    className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800/60 space-y-2 hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-200 animate-fade-up group"
    style={{ animationDelay: `${delay}ms`, animationFillMode: 'both' }}
  >
    <div className="flex items-center justify-between">
      <span className={`text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full ${badgeColor}`}>{badge}</span>
      <span className={`flex items-center gap-1 text-xs font-bold ${valueColor}`}>
        <ValIcon className="h-3 w-3" />
        {value}
      </span>
    </div>
    <h5 className="text-sm font-bold text-slate-900 dark:text-white truncate group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors duration-200">
      {title || 'N/A'}
    </h5>
    <p className="text-[10px] text-slate-500 dark:text-slate-400">{subtitle}</p>
  </div>
);

/* ── Main Dashboard ─────────────────────────────────────── */
const Dashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { dashboardStats, statsLoading, conflicts, loading } = useSelector((state) => state.data);

  const loadData = () => {
    dispatch(fetchDashboardStats());
    dispatch(fetchConflicts({ page: 1, limit: 10, sort: '-Cost_of_War_USD' }));
  };

  useEffect(() => { loadData(); }, [dispatch]);

  const stats = dashboardStats || {
    totalConflicts: 0, ongoingConflicts: 0, resolvedConflicts: 0,
    highestInflation: null, lowestGdp: null, highestWarCost: null, highestReconstructionCost: null
  };

  const totalCount  = useCountUp(statsLoading ? 0 : (stats.totalConflicts || 0));
  const ongoingCount = useCountUp(statsLoading ? 0 : (stats.ongoingConflicts || 0));
  const resolvedCount = useCountUp(statsLoading ? 0 : (stats.resolvedConflicts || 0));

  const formatCurrency = (v) => {
    if (v == null) return 'N/A';
    if (v >= 1e9) return `$${(v / 1e9).toFixed(2)}B`;
    if (v >= 1e6) return `$${(v / 1e6).toFixed(2)}M`;
    return `$${v.toLocaleString()}`;
  };
  const formatPct = (v) => v == null ? 'N/A' : `${v > 0 ? '+' : ''}${v}%`;

  const chartData = conflicts
    .filter(c => c.Cost_of_War_USD || c.Estimated_Reconstruction_Cost_USD)
    .map(c => ({
      name: c.Conflict_Name.length > 18 ? c.Conflict_Name.substring(0, 15) + '…' : c.Conflict_Name,
      'Cost of War (B)': c.Cost_of_War_USD ? parseFloat((c.Cost_of_War_USD / 1e9).toFixed(3)) : 0,
      'Reconstruction (B)': c.Estimated_Reconstruction_Cost_USD ? parseFloat((c.Estimated_Reconstruction_Cost_USD / 1e9).toFixed(3)) : 0,
    }));

  return (
    <div className="space-y-6">

      {/* ── Page Header ───────────────────────────────────── */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 animate-fade-up">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-violet-100 dark:bg-violet-950/30 text-violet-700 dark:text-violet-400 text-[10px] font-bold uppercase tracking-widest">
              <Zap className="h-3 w-3" /> Live Dashboard
            </span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Workspace Overview
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">
            Global conflicts, macroeconomic indicators &amp; economic impact analytics
          </p>
        </div>

        <button
          id="refresh-stats"
          onClick={loadData}
          disabled={statsLoading}
          className="flex items-center gap-2 px-4 py-2.5 glass-panel border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 font-semibold rounded-xl hover:border-violet-300 dark:hover:border-violet-800 hover:text-violet-600 dark:hover:text-violet-400 transition-all duration-200 cursor-pointer disabled:opacity-50 text-sm group"
        >
          <RefreshCw className={`h-4 w-4 transition-transform duration-500 ${statsLoading ? 'animate-spin' : 'group-hover:rotate-180'}`} />
          Refresh Stats
        </button>
      </div>

      {/* ── Hero Welcome Banner ───────────────────────────── */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-violet-600 via-indigo-600 to-violet-700 p-6 sm:p-8 text-white shadow-2xl shadow-indigo-500/20 animate-fade-up delay-100">
        {/* Background decorations */}
        <div className="absolute right-0 top-0 -mr-8 -mt-8 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute bottom-0 right-1/3 -mb-10 h-48 w-48 rounded-full bg-indigo-400/20 blur-3xl" />
        <div className="absolute top-1/2 left-2/3 w-24 h-24 rounded-full bg-violet-300/10 blur-2xl" />

        {/* Dot grid overlay */}
        <div className="absolute inset-0 bg-dot-grid opacity-20 pointer-events-none" />

        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className="space-y-2 max-w-2xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold bg-white/15 backdrop-blur-md uppercase tracking-widest text-violet-200 border border-white/10">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Intelligence Suite Active
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Welcome back, {user?.name?.split(' ')[0] || 'Analyst'} 👋
            </h2>
            <p className="text-violet-100 text-sm font-medium leading-relaxed max-w-lg">
              Tracking <strong>{stats.totalConflicts || '…'}</strong> conflict entries across global regions.
              System synchronized with MongoDB — all indicators are live.
            </p>
          </div>

          {/* Quick stat pill */}
          <div className="shrink-0 flex flex-col items-center justify-center bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl px-6 py-4 min-w-[120px]">
            <span className="text-3xl font-extrabold text-white">{totalCount}</span>
            <span className="text-xs font-semibold text-violet-200 uppercase tracking-wider mt-0.5">Total Records</span>
          </div>
        </div>
      </div>

      {/* ── KPI Cards Grid ────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          label="Total Conflicts"
          value={statsLoading ? '—' : totalCount}
          subLabel="Database records"
          icon={Globe}
          accent="violet"
          delay={0}
        />
        <KpiCard
          label="Active Crises"
          value={statsLoading ? '—' : ongoingCount}
          subLabel="Ongoing status"
          icon={Activity}
          accent="amber"
          delay={80}
        />
        <KpiCard
          label="Resolved Crises"
          value={statsLoading ? '—' : resolvedCount}
          subLabel="Post-conflict era"
          icon={Award}
          accent="emerald"
          delay={160}
        />
        <KpiCard
          label="Peak War Damage"
          value={statsLoading ? '—' : formatCurrency(stats.highestWarCost?.Cost_of_War_USD)}
          subLabel={stats.highestWarCost?.Conflict_Name || 'Loading…'}
          icon={DollarSign}
          accent="rose"
          delay={240}
        />
      </div>

      {/* ── Charts + Risk Panel ───────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Main Chart */}
        <div
          className="lg:col-span-2 glass-panel rounded-2xl border border-slate-200/60 dark:border-slate-800/60 p-6 space-y-4 animate-fade-up delay-300"
        >
          <div>
            <h4 className="text-base font-bold text-slate-900 dark:text-white">
              Geopolitical Cost vs. Reconstruction
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Top 10 costliest conflicts — USD Billions
            </p>
          </div>

          <div className="h-72 w-full">
            {loading ? (
              <div className="h-full w-full flex flex-col items-center justify-center gap-3 text-slate-400">
                <div className="relative">
                  <div className="w-10 h-10 border-2 border-violet-200 dark:border-violet-900 rounded-full" />
                  <div className="w-10 h-10 border-2 border-t-violet-600 rounded-full animate-spin absolute inset-0" />
                </div>
                <span className="text-sm font-medium">Loading analytical data…</span>
              </div>
            ) : chartData.length === 0 ? (
              <div className="h-full w-full flex flex-col items-center justify-center gap-2 text-slate-400">
                <AlertTriangle className="h-8 w-8 text-amber-500" />
                <span className="text-sm">No charting metrics available. Create conflict entries first.</span>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorCost" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%"  stopColor="#8b5cf6" stopOpacity={0.5} />
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorRecon" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%"  stopColor="#06b6d4" stopOpacity={0.5} />
                      <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.12)" />
                  <XAxis dataKey="name" tick={{ fontSize: 9, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend
                    wrapperStyle={{ fontSize: '11px', paddingTop: '12px', color: '#94a3b8' }}
                  />
                  <Area
                    type="monotone"
                    dataKey="Cost of War (B)"
                    stroke="#8b5cf6"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#colorCost)"
                    dot={{ r: 3, fill: '#8b5cf6', strokeWidth: 0 }}
                    activeDot={{ r: 5, fill: '#8b5cf6', stroke: '#fff', strokeWidth: 2 }}
                  />
                  <Area
                    type="monotone"
                    dataKey="Reconstruction (B)"
                    stroke="#06b6d4"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#colorRecon)"
                    dot={{ r: 3, fill: '#06b6d4', strokeWidth: 0 }}
                    activeDot={{ r: 5, fill: '#06b6d4', stroke: '#fff', strokeWidth: 2 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Risk Highlights Panel */}
        <div className="space-y-4 animate-fade-up delay-400">
          <div className="glass-panel rounded-2xl border border-slate-200/60 dark:border-slate-800/60 p-5">
            <h4 className="text-base font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-rose-50 dark:bg-rose-950/20 flex items-center justify-center">
                <AlertTriangle className="h-3.5 w-3.5 text-rose-500" />
              </div>
              Critical Economic Hazards
            </h4>

            <div className="space-y-3">
              <RiskItem
                badge="Highest Inflation"
                badgeColor="text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/20"
                value={formatPct(stats.highestInflation?.Inflation_Rate_Percentage)}
                valueIcon={TrendingUp}
                valueColor="text-rose-500"
                title={statsLoading ? '…' : (stats.highestInflation?.Conflict_Name || 'N/A')}
                subtitle={`${stats.highestInflation?.Primary_Country || 'N/A'} · ${stats.highestInflation?.Region || 'N/A'}`}
                delay={400}
              />

              <RiskItem
                badge="Greatest GDP Decline"
                badgeColor="text-rose-700 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/20"
                value={formatPct(stats.lowestGdp?.GDP_Change_Percentage)}
                valueIcon={TrendingDown}
                valueColor="text-rose-500"
                title={statsLoading ? '…' : (stats.lowestGdp?.Conflict_Name || 'N/A')}
                subtitle={`${stats.lowestGdp?.Primary_Country || 'N/A'} · ${stats.lowestGdp?.Region || 'N/A'}`}
                delay={480}
              />

              <RiskItem
                badge="Reconstruction Cost"
                badgeColor="text-cyan-700 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-950/20"
                value={formatCurrency(stats.highestReconstructionCost?.Estimated_Reconstruction_Cost_USD)}
                valueIcon={Building2}
                valueColor="text-cyan-500"
                title={statsLoading ? '…' : (stats.highestReconstructionCost?.Conflict_Name || 'N/A')}
                subtitle={stats.highestReconstructionCost?.Primary_Country || 'N/A'}
                delay={560}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
