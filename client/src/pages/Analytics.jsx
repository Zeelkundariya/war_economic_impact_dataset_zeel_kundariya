import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchConflicts } from '../store/slices/dataSlice';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend,
  PieChart,
  Pie,
  Cell,
  ScatterChart,
  Scatter,
  ZAxis
} from 'recharts';
import { 
  TrendingUp, 
  DollarSign, 
  Building2, 
  Activity, 
  PieChart as PieIcon, 
  BarChart3, 
  Compass, 
  BarChart4,
  RefreshCw,
  Info
} from 'lucide-react';

const COLORS = ['#8b5cf6', '#06b6d4', '#ec4899', '#f59e0b', '#10b981', '#3b82f6', '#6366f1'];

const Analytics = () => {
  const dispatch = useDispatch();
  const { conflicts, loading } = useSelector((state) => state.data);

  // Fetch a larger pool of data (100 items) to make analytics representative
  const loadAnalyticsData = () => {
    dispatch(fetchConflicts({ page: 1, limit: 100 }));
  };

  useEffect(() => {
    loadAnalyticsData();
  }, [dispatch]);

  // --- Data Calculations ---

  // Filter out invalid entries for clean math
  const validConflicts = conflicts.filter(c => c !== null && c !== undefined);

  // 1. Averages
  const averages = React.useMemo(() => {
    if (!validConflicts.length) return { gdp: 0, inflation: 0, cost: 0, recon: 0 };
    
    let gdpSum = 0, gdpCount = 0;
    let infSum = 0, infCount = 0;
    let costSum = 0, costCount = 0;
    let reconSum = 0, reconCount = 0;

    validConflicts.forEach(c => {
      if (c.GDP_Change_Percentage !== null && c.GDP_Change_Percentage !== undefined) {
        gdpSum += c.GDP_Change_Percentage;
        gdpCount++;
      }
      if (c.Inflation_Rate_Percentage !== null && c.Inflation_Rate_Percentage !== undefined) {
        infSum += c.Inflation_Rate_Percentage;
        infCount++;
      }
      if (c.Cost_of_War_USD !== null && c.Cost_of_War_USD !== undefined) {
        costSum += c.Cost_of_War_USD;
        costCount++;
      }
      if (c.Estimated_Reconstruction_Cost_USD !== null && c.Estimated_Reconstruction_Cost_USD !== undefined) {
        reconSum += c.Estimated_Reconstruction_Cost_USD;
        reconCount++;
      }
    });

    return {
      gdp: gdpCount ? (gdpSum / gdpCount).toFixed(2) : '0.00',
      inflation: infCount ? (infSum / infCount).toFixed(2) : '0.00',
      cost: costCount ? (costSum / costCount) : 0,
      recon: reconCount ? (reconSum / reconCount) : 0
    };
  }, [validConflicts]);

  // 2. Region Counts (Bar Chart Data)
  const regionData = React.useMemo(() => {
    const counts = {};
    validConflicts.forEach(c => {
      const region = c.Region || 'Unknown';
      counts[region] = (counts[region] || 0) + 1;
    });
    return Object.entries(counts).map(([name, count]) => ({ name, count }));
  }, [validConflicts]);

  // 3. Conflict Types (Pie Chart Data)
  const typeData = React.useMemo(() => {
    const counts = {};
    validConflicts.forEach(c => {
      const type = c.Conflict_Type || 'Other';
      counts[type] = (counts[type] || 0) + 1;
    });
    // Return top 5 and group rest into 'Other'
    const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
    const top = sorted.slice(0, 5);
    const rest = sorted.slice(5);
    if (rest.length) {
      const restCount = rest.reduce((acc, curr) => acc + curr[1], 0);
      top.push(['Other Types', restCount]);
    }
    return top.map(([name, value]) => ({ name, value }));
  }, [validConflicts]);

  // 4. Scatter Plot (GDP Change vs Inflation)
  const scatterData = React.useMemo(() => {
    return validConflicts
      .filter(c => c.GDP_Change_Percentage !== null && c.Inflation_Rate_Percentage !== null)
      .slice(0, 50) // Plot top 50 for layout clarity
      .map(c => ({
        gdp: c.GDP_Change_Percentage,
        inflation: c.Inflation_Rate_Percentage,
        name: c.Conflict_Name,
        country: c.Primary_Country
      }));
  }, [validConflicts]);

  // 5. Cost Comparisons (Cost of War vs Reconstruction for top 8)
  const comparisonData = React.useMemo(() => {
    return validConflicts
      .filter(c => c.Cost_of_War_USD || c.Estimated_Reconstruction_Cost_USD)
      .slice(0, 8)
      .map(c => ({
        name: c.Conflict_Name.length > 15 ? c.Conflict_Name.substring(0, 12) + '...' : c.Conflict_Name,
        'Cost of War': c.Cost_of_War_USD ? parseFloat((c.Cost_of_War_USD / 1e9).toFixed(3)) : 0,
        'Reconstruction': c.Estimated_Reconstruction_Cost_USD ? parseFloat((c.Estimated_Reconstruction_Cost_USD / 1e9).toFixed(3)) : 0
      }));
  }, [validConflicts]);

  // Helpers
  const formatCurrency = (value) => {
    if (value === 0) return '$0';
    if (value >= 1e9) return `$${(value / 1e9).toFixed(2)}B`;
    if (value >= 1e6) return `$${(value / 1e6).toFixed(2)}M`;
    return `$${value.toLocaleString()}`;
  };

  return (
    <div className="space-y-6">
      {/* Header section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Analytics & Visualizations
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Deep-dive economic metrics aggregated across a sample size of {validConflicts.length} conflict entries
          </p>
        </div>
        <button
          onClick={loadAnalyticsData}
          disabled={loading}
          className="flex items-center px-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-semibold rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition cursor-pointer disabled:opacity-50"
        >
          <RefreshCw className={`h-4.5 w-4.5 mr-2 ${loading ? 'animate-spin' : ''}`} />
          Recalculate Models
        </button>
      </div>

      {/* Numerical Averages Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Average GDP change */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-850/40 flex items-center space-x-4">
          <div className="p-3 bg-rose-50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-400 rounded-xl">
            <TrendingUp className="h-5 w-5 rotate-180" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Average GDP Change</span>
            <span className="text-xl font-extrabold text-slate-900 dark:text-white">
              {loading ? '...' : `${averages.gdp}%`}
            </span>
          </div>
        </div>

        {/* Average Inflation rate */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-850/40 flex items-center space-x-4">
          <div className="p-3 bg-amber-50 dark:bg-amber-950/20 text-amber-600 dark:text-amber-400 rounded-xl">
            <Activity className="h-5 w-5" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Average Inflation Rate</span>
            <span className="text-xl font-extrabold text-slate-900 dark:text-white">
              {loading ? '...' : `${averages.inflation}%`}
            </span>
          </div>
        </div>

        {/* Average War Cost */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-850/40 flex items-center space-x-4">
          <div className="p-3 bg-violet-50 dark:bg-violet-950/20 text-violet-600 dark:text-violet-400 rounded-xl">
            <DollarSign className="h-5 w-5" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Average War Cost</span>
            <span className="text-xl font-extrabold text-slate-900 dark:text-white">
              {loading ? '...' : formatCurrency(averages.cost)}
            </span>
          </div>
        </div>

        {/* Average Reconstruction Cost */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-850/40 flex items-center space-x-4">
          <div className="p-3 bg-cyan-50 dark:bg-cyan-950/20 text-cyan-600 dark:text-cyan-400 rounded-xl">
            <Building2 className="h-5 w-5" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Avg. Reconstruction</span>
            <span className="text-xl font-extrabold text-slate-900 dark:text-white">
              {loading ? '...' : formatCurrency(averages.recon)}
            </span>
          </div>
        </div>
      </div>

      {/* Main Visuals Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* 1. Regional Distribution */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-850/40 space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white">Regional Conflict Load</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">Total number of database records grouped by geographical region</p>
            </div>
            <Compass className="h-5 w-5 text-slate-400" />
          </div>

          <div className="h-64 w-full">
            {loading ? (
              <div className="h-full flex items-center justify-center text-slate-400">Loading charts...</div>
            ) : regionData.length === 0 ? (
              <div className="h-full flex items-center justify-center text-slate-400">No regional data.</div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={regionData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-850" />
                  <XAxis dataKey="name" tick={{ fontSize: 9 }} className="fill-slate-500" />
                  <YAxis tick={{ fontSize: 10 }} className="fill-slate-500" />
                  <Tooltip
                    contentStyle={{ 
                      backgroundColor: 'rgba(30, 41, 59, 0.95)', 
                      borderColor: '#475569', 
                      borderRadius: '12px',
                      color: '#fff',
                      fontSize: '11px'
                    }}
                  />
                  <Bar dataKey="count" fill="#8b5cf6" radius={[6, 6, 0, 0]}>
                    {regionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* 2. Cost vs Reconstruction Bar Comparison */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-850/40 space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white">Geopolitical Cost vs. Reconstruction</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">Comparing direct War Cost vs. Reconstruction estimates (in USD Billions)</p>
            </div>
            <BarChart3 className="h-5 w-5 text-slate-400" />
          </div>

          <div className="h-64 w-full">
            {loading ? (
              <div className="h-full flex items-center justify-center text-slate-400">Loading charts...</div>
            ) : comparisonData.length === 0 ? (
              <div className="h-full flex items-center justify-center text-slate-400">No monetary records found.</div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={comparisonData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-850" />
                  <XAxis dataKey="name" tick={{ fontSize: 9 }} className="fill-slate-500" />
                  <YAxis tick={{ fontSize: 10 }} className="fill-slate-500" />
                  <Tooltip
                    contentStyle={{ 
                      backgroundColor: 'rgba(30, 41, 59, 0.95)', 
                      borderColor: '#475569', 
                      borderRadius: '12px',
                      color: '#fff',
                      fontSize: '11px'
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: '10px' }} />
                  <Bar dataKey="Cost of War" fill="#a78bfa" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="Reconstruction" fill="#06b6d4" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* 3. Economic Impacts Matrix (GDP Change vs Inflation) */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-850/40 space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white">Macroeconomic Vulnerability Matrix</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">Scatter correlation of GDP Change % (X-axis) vs. Inflation Rate % (Y-axis)</p>
            </div>
            <BarChart4 className="h-5 w-5 text-slate-400" />
          </div>

          <div className="h-64 w-full">
            {loading ? (
              <div className="h-full flex items-center justify-center text-slate-400">Loading charts...</div>
            ) : scatterData.length === 0 ? (
              <div className="h-full flex items-center justify-center text-slate-400">No GDP/Inflation correlation points.</div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ top: 10, right: 10, bottom: 0, left: -20 }}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-850" />
                  <XAxis type="number" dataKey="gdp" name="GDP Change" unit="%" tick={{ fontSize: 9 }} className="fill-slate-500" />
                  <YAxis type="number" dataKey="inflation" name="Inflation" unit="%" tick={{ fontSize: 10 }} className="fill-slate-500" />
                  <ZAxis type="category" dataKey="name" name="Conflict" />
                  <Tooltip 
                    cursor={{ strokeDasharray: '3 3' }}
                    contentStyle={{ 
                      backgroundColor: 'rgba(30, 41, 59, 0.95)', 
                      borderColor: '#475569', 
                      borderRadius: '12px',
                      color: '#fff',
                      fontSize: '11px'
                    }}
                  />
                  <Scatter name="Conflicts" data={scatterData} fill="#ec4899">
                    {scatterData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Scatter>
                </ScatterChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* 4. Conflict Types Composition Pie */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-850/40 space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white">Conflict Classification Composition</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">Percentage distribution of distinct conflict types</p>
            </div>
            <PieIcon className="h-5 w-5 text-slate-400" />
          </div>

          <div className="h-64 w-full flex flex-col sm:flex-row items-center justify-center gap-4">
            {loading ? (
              <div className="text-slate-400">Loading charts...</div>
            ) : typeData.length === 0 ? (
              <div className="text-slate-400">No type classifications found.</div>
            ) : (
              <>
                <div className="h-full w-full sm:w-1/2">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={typeData}
                        cx="50%"
                        cy="50%"
                        innerRadius={55}
                        outerRadius={75}
                        paddingAngle={4}
                        dataKey="value"
                      >
                        {typeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{ 
                          backgroundColor: 'rgba(30, 41, 59, 0.95)', 
                          borderColor: '#475569', 
                          borderRadius: '12px',
                          color: '#fff',
                          fontSize: '11px'
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                
                {/* Legend list */}
                <div className="w-full sm:w-1/2 space-y-2 max-h-56 overflow-y-auto pr-2">
                  {typeData.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs font-semibold">
                      <div className="flex items-center space-x-2 truncate">
                        <span 
                          className="w-2.5 h-2.5 rounded-full flex-shrink-0" 
                          style={{ backgroundColor: COLORS[idx % COLORS.length] }} 
                        />
                        <span className="text-slate-700 dark:text-slate-300 truncate" title={item.name}>
                          {item.name}
                        </span>
                      </div>
                      <span className="text-slate-500 dark:text-slate-400 ml-2 font-mono">
                        {item.value} ({((item.value / validConflicts.length) * 100).toFixed(0)}%)
                      </span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

      </div>

      {/* Info helper alert */}
      <div className="flex items-start space-x-2.5 p-4 rounded-xl bg-violet-50 dark:bg-violet-950/20 border border-violet-100 dark:border-violet-900/60 text-violet-750 dark:text-violet-300">
        <Info className="h-5 w-5 flex-shrink-0 mt-0.5 text-violet-600 dark:text-violet-400" />
        <p className="text-xs leading-relaxed">
          <strong>Methodological Note:</strong> Visual models represent raw indicators synchronized from MongoDB in real-time. Macroeconomic variables like GDP collapse and food insecurity rates are mapped to geopolitical events to aid econometric forecasting. Use "Recalculate Models" to refresh statistical aggregates.
        </p>
      </div>

    </div>
  );
};

export default Analytics;
