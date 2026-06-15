import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchConflicts } from '../store/slices/dataSlice';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend, PieChart, Pie, Cell,
  ScatterChart, Scatter, ZAxis
} from 'recharts';
import {
  TrendingUp, DollarSign, Building2, Activity,
  PieChart as PieIcon, BarChart3, Compass, BarChart4,
  RefreshCw, Info, Zap
} from 'lucide-react';

const COLORS = ['#8b5cf6','#06b6d4','#ec4899','#f59e0b','#10b981','#3b82f6','#6366f1'];

/* ── Shared chart tooltip style ──────────────────────────── */
const tooltipStyle = {
  backgroundColor: 'rgba(5, 8, 20, 0.95)',
  borderColor: 'rgba(255,255,255,0.08)',
  borderRadius: '14px',
  color: '#fff',
  fontSize: '11px',
  boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
};

/* ── Chart Card wrapper ──────────────────────────────────── */
const ChartCard = ({ title, subtitle, icon: Icon, children, delay = 0 }) => (
  <div
    className="glass-panel rounded-2xl border border-slate-200/60 dark:border-slate-800/60 p-6 space-y-4 animate-fade-up"
    style={{ animationDelay: `${delay}ms`, animationFillMode: 'both' }}
  >
    <div className="flex items-start justify-between gap-3">
      <div>
        <h4 className="text-base font-bold text-slate-900 dark:text-white">{title}</h4>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{subtitle}</p>
      </div>
      <div className="w-8 h-8 rounded-xl bg-violet-50 dark:bg-violet-950/20 flex items-center justify-center shrink-0">
        <Icon className="h-4 w-4 text-violet-500" />
      </div>
    </div>
    {children}
  </div>
);

/* ── Loading state for charts ────────────────────────────── */
const ChartLoader = () => (
  <div className="h-full w-full flex flex-col items-center justify-center gap-3 text-slate-400">
    <div className="relative w-8 h-8">
      <div className="w-8 h-8 border-2 border-violet-200 dark:border-violet-900 rounded-full" />
      <div className="w-8 h-8 border-2 border-t-violet-500 rounded-full animate-spin absolute inset-0" />
    </div>
    <span className="text-xs font-medium">Loading chart data…</span>
  </div>
);

/* ── Metric KPI card ─────────────────────────────────────── */
const MetricCard = ({ label, value, icon: Icon, iconBg, iconColor, valueColor, delay = 0 }) => (
  <div
    className="kpi-card glass-panel rounded-2xl border border-slate-200/60 dark:border-slate-800/60 p-5 flex items-center gap-4 animate-fade-up"
    style={{ animationDelay: `${delay}ms`, animationFillMode: 'both' }}
  >
    <div className={`w-11 h-11 ${iconBg} rounded-2xl flex items-center justify-center shrink-0`}>
      <Icon className={`h-5 w-5 ${iconColor}`} />
    </div>
    <div>
      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">{label}</span>
      <span className={`text-xl font-extrabold tracking-tight ${valueColor}`}>{value}</span>
    </div>
  </div>
);

const Analytics = () => {
  const dispatch = useDispatch();
  const { conflicts, loading } = useSelector((state) => state.data);

  const loadAnalyticsData = () => {
    dispatch(fetchConflicts({ page: 1, limit: 100 }));
  };

  useEffect(() => { loadAnalyticsData(); }, [dispatch]);

  const validConflicts = conflicts.filter(c => c != null);

  const averages = React.useMemo(() => {
    if (!validConflicts.length) return { gdp: 0, inflation: 0, cost: 0, recon: 0 };
    let gdpSum = 0, gdpCount = 0, infSum = 0, infCount = 0, costSum = 0, costCount = 0, reconSum = 0, reconCount = 0;
    validConflicts.forEach(c => {
      if (c.GDP_Change_Percentage != null) { gdpSum += c.GDP_Change_Percentage; gdpCount++; }
      if (c.Inflation_Rate_Percentage != null) { infSum += c.Inflation_Rate_Percentage; infCount++; }
      if (c.Cost_of_War_USD != null) { costSum += c.Cost_of_War_USD; costCount++; }
      if (c.Estimated_Reconstruction_Cost_USD != null) { reconSum += c.Estimated_Reconstruction_Cost_USD; reconCount++; }
    });
    return {
      gdp:      gdpCount   ? (gdpSum / gdpCount).toFixed(2)   : '0.00',
      inflation: infCount   ? (infSum / infCount).toFixed(2)   : '0.00',
      cost:     costCount  ? costSum / costCount               : 0,
      recon:    reconCount ? reconSum / reconCount             : 0,
    };
  }, [validConflicts]);

  const regionData = React.useMemo(() => {
    const counts = {};
    validConflicts.forEach(c => { const r = c.Region || 'Unknown'; counts[r] = (counts[r] || 0) + 1; });
    return Object.entries(counts).map(([name, count]) => ({ name, count }));
  }, [validConflicts]);

  const typeData = React.useMemo(() => {
    const counts = {};
    validConflicts.forEach(c => { const t = c.Conflict_Type || 'Other'; counts[t] = (counts[t] || 0) + 1; });
    const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
    const top = sorted.slice(0, 5);
    const rest = sorted.slice(5);
    if (rest.length) top.push(['Other Types', rest.reduce((s, x) => s + x[1], 0)]);
    return top.map(([name, value]) => ({ name, value }));
  }, [validConflicts]);

  const scatterData = React.useMemo(() =>
    validConflicts
      .filter(c => c.GDP_Change_Percentage != null && c.Inflation_Rate_Percentage != null)
      .slice(0, 50)
      .map(c => ({ gdp: c.GDP_Change_Percentage, inflation: c.Inflation_Rate_Percentage, name: c.Conflict_Name })),
  [validConflicts]);

  const comparisonData = React.useMemo(() =>
    validConflicts
      .filter(c => c.Cost_of_War_USD || c.Estimated_Reconstruction_Cost_USD)
      .slice(0, 8)
      .map(c => ({
        name: c.Conflict_Name.length > 15 ? c.Conflict_Name.substring(0, 12) + '…' : c.Conflict_Name,
        'Cost of War':    c.Cost_of_War_USD ? parseFloat((c.Cost_of_War_USD / 1e9).toFixed(3)) : 0,
        'Reconstruction': c.Estimated_Reconstruction_Cost_USD ? parseFloat((c.Estimated_Reconstruction_Cost_USD / 1e9).toFixed(3)) : 0,
      })),
  [validConflicts]);

  const formatCurrency = (v) => {
    if (!v) return '$0';
    if (v >= 1e9) return `$${(v / 1e9).toFixed(2)}B`;
    if (v >= 1e6) return `$${(v / 1e6).toFixed(2)}M`;
    return `$${v.toLocaleString()}`;
  };

  return (
    <div className="space-y-6">

      {/* ── Header ────────────────────────────────────────── */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 animate-fade-up">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cyan-100 dark:bg-cyan-950/30 text-cyan-700 dark:text-cyan-400 text-[10px] font-bold uppercase tracking-widest">
              <Zap className="h-3 w-3" /> Analytics Engine
            </span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Analytics &amp; Visualizations
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">
            Deep-dive economic metrics across{' '}
            <span className="font-bold text-violet-600 dark:text-violet-400">{validConflicts.length}</span>{' '}
            conflict entries
          </p>
        </div>
        <button
          id="recalculate-btn"
          onClick={loadAnalyticsData}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2.5 glass-panel border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 font-semibold rounded-xl hover:border-violet-300 dark:hover:border-violet-800 hover:text-violet-600 dark:hover:text-violet-400 transition-all duration-200 cursor-pointer disabled:opacity-50 text-sm group"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : 'group-hover:rotate-180 transition-transform duration-500'}`} />
          Recalculate Models
        </button>
      </div>

      {/* ── KPI Metrics Grid ──────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard label="Avg. GDP Change"       value={loading ? '…' : `${averages.gdp}%`}         icon={TrendingUp}  iconBg="bg-rose-50 dark:bg-rose-950/20"    iconColor="text-rose-500"    valueColor="text-slate-900 dark:text-white" delay={0} />
        <MetricCard label="Avg. Inflation Rate"   value={loading ? '…' : `${averages.inflation}%`}   icon={Activity}    iconBg="bg-amber-50 dark:bg-amber-950/20"  iconColor="text-amber-500"   valueColor="text-slate-900 dark:text-white" delay={80} />
        <MetricCard label="Avg. War Cost"         value={loading ? '…' : formatCurrency(averages.cost)}  icon={DollarSign}  iconBg="bg-violet-50 dark:bg-violet-950/20" iconColor="text-violet-500"  valueColor="text-slate-900 dark:text-white" delay={160} />
        <MetricCard label="Avg. Reconstruction"   value={loading ? '…' : formatCurrency(averages.recon)} icon={Building2}   iconBg="bg-cyan-50 dark:bg-cyan-950/20"    iconColor="text-cyan-500"    valueColor="text-slate-900 dark:text-white" delay={240} />
      </div>

      {/* ── Chart Grid ────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* 1. Regional Distribution */}
        <ChartCard title="Regional Conflict Load" subtitle="Records grouped by geographical region" icon={Compass} delay={300}>
          <div className="h-64">
            {loading ? <ChartLoader /> : regionData.length === 0 ? (
              <div className="h-full flex items-center justify-center text-slate-400 text-sm">No regional data.</div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={regionData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.1)" />
                  <XAxis dataKey="name" tick={{ fontSize: 9, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={tooltipStyle} cursor={{ fill: 'rgba(124,58,237,0.06)' }} />
                  <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                    {regionData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </ChartCard>

        {/* 2. Cost vs Reconstruction */}
        <ChartCard title="War Cost vs. Reconstruction" subtitle="Top 8 conflict events — USD Billions" icon={BarChart3} delay={380}>
          <div className="h-64">
            {loading ? <ChartLoader /> : comparisonData.length === 0 ? (
              <div className="h-full flex items-center justify-center text-slate-400 text-sm">No monetary records found.</div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={comparisonData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.1)" />
                  <XAxis dataKey="name" tick={{ fontSize: 9, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={tooltipStyle} cursor={{ fill: 'rgba(124,58,237,0.06)' }} />
                  <Legend wrapperStyle={{ fontSize: '10px', color: '#94a3b8', paddingTop: '8px' }} />
                  <Bar dataKey="Cost of War"    fill="#a78bfa" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="Reconstruction" fill="#06b6d4" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </ChartCard>

        {/* 3. Scatter: GDP vs Inflation */}
        <ChartCard title="Macroeconomic Vulnerability Matrix" subtitle="GDP Change % vs Inflation Rate % — scatter correlation" icon={BarChart4} delay={460}>
          <div className="h-64">
            {loading ? <ChartLoader /> : scatterData.length === 0 ? (
              <div className="h-full flex items-center justify-center text-slate-400 text-sm">No GDP/Inflation correlation data.</div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ top: 10, right: 10, bottom: 0, left: -20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.1)" />
                  <XAxis type="number" dataKey="gdp" name="GDP Change" unit="%" tick={{ fontSize: 9, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                  <YAxis type="number" dataKey="inflation" name="Inflation" unit="%" tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                  <ZAxis type="category" dataKey="name" name="Conflict" />
                  <Tooltip cursor={{ strokeDasharray: '3 3', stroke: 'rgba(124,58,237,0.3)' }} contentStyle={tooltipStyle} />
                  <Scatter name="Conflicts" data={scatterData} fill="#ec4899">
                    {scatterData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Scatter>
                </ScatterChart>
              </ResponsiveContainer>
            )}
          </div>
        </ChartCard>

        {/* 4. Pie: Conflict Types */}
        <ChartCard title="Conflict Classification Composition" subtitle="Distribution of distinct conflict types" icon={PieIcon} delay={540}>
          <div className="h-64 flex flex-col sm:flex-row items-center gap-4">
            {loading ? <ChartLoader /> : typeData.length === 0 ? (
              <div className="w-full flex items-center justify-center text-slate-400 text-sm">No classifications found.</div>
            ) : (
              <>
                <div className="h-full w-full sm:w-1/2">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={typeData} cx="50%" cy="50%" innerRadius={52} outerRadius={76} paddingAngle={4} dataKey="value">
                        {typeData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                      </Pie>
                      <Tooltip contentStyle={tooltipStyle} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="w-full sm:w-1/2 space-y-2 max-h-56 overflow-y-auto pr-1">
                  {typeData.map((item, i) => (
                    <div key={i} className="flex items-center justify-between text-xs font-semibold gap-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: COLORS[i % COLORS.length] }} />
                        <span className="text-slate-700 dark:text-slate-300 truncate">{item.name}</span>
                      </div>
                      <span className="text-slate-400 font-mono shrink-0">
                        {item.value} ({((item.value / validConflicts.length) * 100).toFixed(0)}%)
                      </span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </ChartCard>
      </div>

      {/* ── Methodology Note ──────────────────────────────── */}
      <div
        className="flex items-start gap-3 p-4 rounded-xl bg-violet-50 dark:bg-violet-950/20 border border-violet-100 dark:border-violet-900/40 text-violet-800 dark:text-violet-300 animate-fade-up delay-600"
      >
        <Info className="h-4 w-4 shrink-0 mt-0.5 text-violet-500" />
        <p className="text-xs leading-relaxed">
          <strong>Methodological Note:</strong> Visual models represent raw indicators synchronized from MongoDB in real-time.
          Macroeconomic variables are mapped to geopolitical events to aid econometric forecasting.
          Use <em>Recalculate Models</em> to refresh aggregates.
        </p>
      </div>

    </div>
  );
};

export default Analytics;
