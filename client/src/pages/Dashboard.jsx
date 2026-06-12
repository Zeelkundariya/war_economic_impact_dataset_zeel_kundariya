import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDashboardStats, fetchConflicts } from '../store/slices/dataSlice';
import { 
  Globe, 
  Activity, 
  Award, 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle,
  RefreshCw,
  Building2,
  Percent
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  BarChart,
  Bar
} from 'recharts';
import { showToast } from '../store/slices/uiSlice';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { dashboardStats, statsLoading, conflicts, loading } = useSelector((state) => state.data);

  // Fetch dashboard stats and top conflicts on load
  const loadData = () => {
    dispatch(fetchDashboardStats());
    // Get top conflicts by Cost of War to plot in the dashboard summary chart
    dispatch(fetchConflicts({ page: 1, limit: 10, sort: '-Cost_of_War_USD' }));
  };

  useEffect(() => {
    loadData();
  }, [dispatch]);

  // Format currency for readability
  const formatCurrency = (value) => {
    if (value === null || value === undefined) return 'N/A';
    if (value >= 1e9) return `$${(value / 1e9).toFixed(2)}B`;
    if (value >= 1e6) return `$${(value / 1e6).toFixed(2)}M`;
    return `$${value.toLocaleString()}`;
  };

  // Format percentage
  const formatPercentage = (value) => {
    if (value === null || value === undefined) return 'N/A';
    return `${value > 0 ? '+' : ''}${value}%`;
  };

  // Aggregate stats from Redux
  const stats = dashboardStats || {
    totalConflicts: 0,
    ongoingConflicts: 0,
    resolvedConflicts: 0,
    highestInflation: null,
    lowestGdp: null,
    highestPoverty: null,
    highestFoodInsecurity: null,
    highestCurrencyGap: null,
    highestWarCost: null,
    highestReconstructionCost: null
  };

  // Chart data: Map top conflicts for charting cost vs reconstruction
  const chartData = conflicts
    .filter(c => c.Cost_of_War_USD || c.Estimated_Reconstruction_Cost_USD)
    .map(c => ({
      name: c.Conflict_Name.length > 20 ? c.Conflict_Name.substring(0, 17) + '...' : c.Conflict_Name,
      'Cost of War (Billions)': c.Cost_of_War_USD ? parseFloat((c.Cost_of_War_USD / 1e9).toFixed(3)) : 0,
      'Reconstruction Cost (Billions)': c.Estimated_Reconstruction_Cost_USD ? parseFloat((c.Estimated_Reconstruction_Cost_USD / 1e9).toFixed(3)) : 0,
      country: c.Primary_Country
    }));

  return (
    <div className="space-y-6">
      {/* Header and Welcome */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Workspace Overview
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Analyzing global conflicts, macroeconomic indicators, and economic impacts
          </p>
        </div>
        <button
          onClick={loadData}
          disabled={statsLoading}
          className="flex items-center px-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-semibold rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition cursor-pointer disabled:opacity-50"
        >
          <RefreshCw className={`h-4.5 w-4.5 mr-2 ${statsLoading ? 'animate-spin' : ''}`} />
          Refresh Stats
        </button>
      </div>

      {/* User Welcome Card */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-700 p-6 sm:p-8 text-white shadow-xl shadow-indigo-500/10">
        <div className="absolute right-0 top-0 -mr-6 -mt-6 h-36 w-36 rounded-full bg-white/10 blur-2xl" />
        <div className="absolute bottom-0 right-1/4 -mb-12 h-44 w-44 rounded-full bg-indigo-500/20 blur-3xl" />
        
        <div className="relative z-10 space-y-2 max-w-2xl">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-white/15 backdrop-blur-md uppercase tracking-wider text-violet-200">
            Full-Stack Dashboard
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Welcome back, {user?.name || user?.email || 'Analyst'}
          </h2>
          <p className="text-violet-100 text-sm sm:text-base font-medium leading-relaxed">
            Geopolitical conditions are volatile. The system is synchronized with MongoDB, tracking {stats.totalConflicts} total conflict entries, economic damages, and reconstruction forecasts.
          </p>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Total Conflicts Card */}
        <div className="glass-panel p-5 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-850/40 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Conflicts</span>
            <h3 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              {statsLoading ? '...' : stats.totalConflicts}
            </h3>
            <span className="text-[10px] text-slate-500 dark:text-slate-400">Total database records</span>
          </div>
          <div className="p-3.5 bg-violet-50 dark:bg-violet-950/20 text-violet-600 dark:text-violet-400 rounded-2xl">
            <Globe className="h-6 w-6" />
          </div>
        </div>

        {/* Ongoing Conflicts Card */}
        <div className="glass-panel p-5 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-850/40 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Crises</span>
            <h3 className="text-3xl font-extrabold tracking-tight text-amber-600 dark:text-amber-400">
              {statsLoading ? '...' : stats.ongoingConflicts}
            </h3>
            <span className="text-[10px] text-amber-500 dark:text-amber-400 font-semibold">Ongoing status</span>
          </div>
          <div className="p-3.5 bg-amber-50 dark:bg-amber-950/20 text-amber-600 dark:text-amber-400 rounded-2xl">
            <Activity className="h-6 w-6" />
          </div>
        </div>

        {/* Resolved Conflicts Card */}
        <div className="glass-panel p-5 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-850/40 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Resolved Crises</span>
            <h3 className="text-3xl font-extrabold tracking-tight text-emerald-600 dark:text-emerald-400">
              {statsLoading ? '...' : stats.resolvedConflicts}
            </h3>
            <span className="text-[10px] text-emerald-500 dark:text-emerald-400 font-semibold">Post-conflict era</span>
          </div>
          <div className="p-3.5 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 rounded-2xl">
            <Award className="h-6 w-6" />
          </div>
        </div>

        {/* Highest War Cost Card */}
        <div className="glass-panel p-5 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-850/40 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Peak Conflict Damage</span>
            <h3 className="text-xl font-extrabold tracking-tight text-rose-600 dark:text-rose-400 truncate max-w-[170px]" title={formatCurrency(stats.highestWarCost?.Cost_of_War_USD)}>
              {statsLoading ? '...' : formatCurrency(stats.highestWarCost?.Cost_of_War_USD)}
            </h3>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 block truncate max-w-[160px]">
              {stats.highestWarCost ? stats.highestWarCost.Conflict_Name : 'Loading...'}
            </span>
          </div>
          <div className="p-3.5 bg-rose-50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-400 rounded-2xl">
            <DollarSign className="h-6 w-6" />
          </div>
        </div>
      </div>

      {/* Charts and Geopolitical Highlights Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart Area */}
        <div className="lg:col-span-2 glass-panel p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-850/40 space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <div>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white">Geopolitical Cost vs. Reconstruction Analysis</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">Top 10 most expensive conflict events sorted by Cost of War (in USD Billions)</p>
            </div>
          </div>

          <div className="h-80 w-full">
            {loading ? (
              <div className="h-full w-full flex items-center justify-center text-slate-400">
                <RefreshCw className="h-8 w-8 animate-spin mr-3 text-violet-500" />
                <span>Loading analytical data...</span>
              </div>
            ) : chartData.length === 0 ? (
              <div className="h-full w-full flex items-center justify-center text-slate-400">
                <AlertTriangle className="h-8 w-8 mr-3 text-amber-500" />
                <span>No charting metrics available. Try creating entries first.</span>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorCost" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorRecon" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-800" />
                  <XAxis dataKey="name" tick={{ fontSize: 9 }} className="fill-slate-500" />
                  <YAxis tick={{ fontSize: 10 }} className="fill-slate-500" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(30, 41, 59, 0.95)', 
                      borderColor: '#475569', 
                      borderRadius: '12px',
                      color: '#fff' 
                    }}
                    labelClassName="font-bold text-xs mb-1"
                  />
                  <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                  <Area type="monotone" dataKey="Cost of War (Billions)" stroke="#8b5cf6" strokeWidth={2} fillOpacity={1} fill="url(#colorCost)" />
                  <Area type="monotone" dataKey="Reconstruction Cost (Billions)" stroke="#06b6d4" strokeWidth={2} fillOpacity={1} fill="url(#colorRecon)" />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Geopolitical Economic Risk Highlights */}
        <div className="space-y-6">
          <div className="glass-panel p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-850/40">
            <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center">
              <AlertTriangle className="h-5 w-5 text-rose-500 mr-2" />
              Critical Economic Hazards
            </h4>

            <div className="space-y-4">
              {/* Inflation Risk Card */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200/55 dark:border-slate-800 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/20 px-2 py-0.5 rounded-full">
                    Highest Inflation
                  </span>
                  <span className="flex items-center text-xs text-rose-500 font-bold">
                    <TrendingUp className="h-3.5 w-3.5 mr-1" />
                    {formatPercentage(stats.highestInflation?.Inflation_Rate_Percentage)}
                  </span>
                </div>
                <h5 className="text-sm font-bold text-slate-950 dark:text-white truncate">
                  {statsLoading ? 'Loading...' : stats.highestInflation?.Conflict_Name || 'N/A'}
                </h5>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Country: {stats.highestInflation?.Primary_Country || 'N/A'} ({stats.highestInflation?.Region || 'N/A'})
                </p>
              </div>

              {/* GDP Collapse Card */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200/55 dark:border-slate-800 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/20 px-2 py-0.5 rounded-full">
                    Greatest GDP Decline
                  </span>
                  <span className="flex items-center text-xs text-rose-500 font-bold">
                    <TrendingDown className="h-3.5 w-3.5 mr-1" />
                    {formatPercentage(stats.lowestGdp?.GDP_Change_Percentage)}
                  </span>
                </div>
                <h5 className="text-sm font-bold text-slate-950 dark:text-white truncate">
                  {statsLoading ? 'Loading...' : stats.lowestGdp?.Conflict_Name || 'N/A'}
                </h5>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Country: {stats.lowestGdp?.Primary_Country || 'N/A'} ({stats.lowestGdp?.Region || 'N/A'})
                </p>
              </div>

              {/* Reconstruction Hazard Card */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200/55 dark:border-slate-800 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-950/20 px-2 py-0.5 rounded-full">
                    Highest Reconstruction Cost
                  </span>
                  <span className="flex items-center text-xs text-cyan-500 font-bold">
                    <Building2 className="h-3.5 w-3.5 mr-1" />
                    {formatCurrency(stats.highestReconstructionCost?.Estimated_Reconstruction_Cost_USD)}
                  </span>
                </div>
                <h5 className="text-sm font-bold text-slate-950 dark:text-white truncate">
                  {statsLoading ? 'Loading...' : stats.highestReconstructionCost?.Conflict_Name || 'N/A'}
                </h5>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Country: {stats.highestReconstructionCost?.Primary_Country || 'N/A'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
