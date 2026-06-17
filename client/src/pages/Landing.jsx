import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import api from '../services/api';
import { 
  Shield, 
  ArrowRight, 
  TrendingUp, 
  Database, 
  Coins, 
  Globe2, 
  Activity,
  Layers, 
  Cpu, 
  Zap, 
  Server,
  ArrowUpRight,
  ChevronRight,
  ArrowRightLeft
} from 'lucide-react';

/* ── Count-up Hook ────────────────────────────────────────── */
function useCountUp(target, duration = 1500) {
  const [value, setValue] = useState(0);
  const raf = useRef(null);
  useEffect(() => {
    if (!target || isNaN(target)) return;
    const start = performance.now();
    const animate = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // cubic ease out
      setValue(Math.floor(eased * target));
      if (progress < 1) raf.current = requestAnimationFrame(animate);
      else setValue(target);
    };
    raf.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf.current);
  }, [target, duration]);
  return value;
}

export default function Landing() {
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);

  // Live Statistics States
  const [stats, setStats] = useState({
    totalConflicts: 0,
    ongoingConflicts: 0,
    peakWarCost: 0,
    peakReconCost: 0
  });

  const [latency, setLatency] = useState(0);

  // Fetch live stats from API
  useEffect(() => {
    const fetchStats = async () => {
      const startTime = performance.now();
      try {
        const [totalRes, ongoingRes, warCostRes, reconCostRes] = await Promise.all([
          api.get('/stats/total-conflicts').catch(() => ({ data: { totalConflicts: 0 } })),
          api.get('/stats/ongoing-conflicts').catch(() => ({ data: { ongoingConflicts: 0 } })),
          api.get('/stats/highest-war-cost').catch(() => ({ data: { Cost_of_War_USD: 0 } })),
          api.get('/stats/highest-reconstruction-cost').catch(() => ({ data: { Estimated_Reconstruction_Cost_USD: 0 } }))
        ]);

        setStats({
          totalConflicts: totalRes.data?.totalConflicts || totalRes.data?.count || 0,
          ongoingConflicts: ongoingRes.data?.ongoingConflicts || ongoingRes.data?.count || 0,
          peakWarCost: warCostRes.data?.Cost_of_War_USD || 0,
          peakReconCost: reconCostRes.data?.Estimated_Reconstruction_Cost_USD || 0
        });
        
        setLatency(Math.round(performance.now() - startTime));
      } catch (err) {
        console.error("Failed to load live landing stats", err);
      }
    };
    fetchStats();
  }, []);

  const animatedTotal = useCountUp(stats.totalConflicts);
  const animatedOngoing = useCountUp(stats.ongoingConflicts);

  const handleCTA = () => {
    if (token) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  };

  // Formatting Helper
  const formatCost = (val) => {
    if (!val) return '$0.00';
    if (val >= 1e12) return `$${(val / 1e12).toFixed(1)}T`;
    if (val >= 1e9) return `$${(val / 1e9).toFixed(1)}B`;
    if (val >= 1e6) return `$${(val / 1e6).toFixed(1)}M`;
    return `$${val.toLocaleString()}`;
  };

  return (
    // Wrap entire landing page in the dark class explicitly
    <div className="dark min-h-screen bg-[#050811] text-slate-100 relative overflow-hidden bg-dot-grid">
      
      {/* ── Ambient Glow Effects ─────────────────────────────── */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-violet-900/10 blur-[140px] animate-slow-spin pointer-events-none z-0" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[45vw] h-[45vw] rounded-full bg-indigo-900/10 blur-[120px] animate-reverse-slow-spin pointer-events-none z-0" />
      <div className="absolute top-[30%] left-[40%] w-[35vw] h-[35vw] rounded-full bg-fuchsia-950/10 blur-[130px] animate-pulse pointer-events-none z-0" />

      {/* ── Header ─────────────────────────────────────────── */}
      <header className="relative z-20 border-b border-white/5 bg-[#050811]/60 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute -inset-1.5 rounded-xl bg-gradient-to-tr from-violet-600 to-indigo-600 opacity-40 blur-lg animate-pulse-glow" />
              <div className="relative w-10 h-10 bg-gradient-to-tr from-violet-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <Shield className="h-5 w-5 text-white" />
              </div>
            </div>
            <div>
              <span className="font-extrabold text-base tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                Conflict Economics
              </span>
              <span className="block text-[9px] font-bold tracking-widest text-violet-400 uppercase">
                Geopolitical Intelligence Suite
              </span>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-6">
            <span className="hidden sm:inline-flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-wider text-slate-400 bg-white/[0.03] border border-white/5 px-2.5 py-1 rounded-full">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              API Gate: {latency ? `${latency}ms` : 'checking...'}
            </span>
            <Link 
              to="/login" 
              className="text-xs font-semibold text-slate-400 hover:text-white transition-colors"
            >
              Sign In
            </Link>
            <button 
              onClick={handleCTA}
              className="px-4.5 py-2.5 text-xs font-bold text-white rounded-lg premium-gradient-btn flex items-center gap-2 cursor-pointer shadow-lg"
            >
              {token ? 'Enter Dashboard' : 'Get Started'}
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* ── Hero Section ────────────────────────────────────── */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-16 text-center">
        
        {/* Banner Tag */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-violet-500/20 bg-violet-950/20 backdrop-blur-md text-[10px] font-extrabold uppercase tracking-widest text-violet-300 mb-8 animate-fade-in">
          <Globe2 className="h-3.5 w-3.5 text-violet-400 animate-spin" style={{ animationDuration: '10s' }} />
          <span>Macroeconomic Geopolitical Impact Tracker</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight mb-8 max-w-5xl mx-auto leading-[1.15] animate-fade-up">
          Real-Time Analysis of{' '}
          <span className="gradient-text-animate">
            War Economic Destructiveness
          </span>
        </h1>

        {/* Hero Subtitle */}
        <p className="text-sm sm:text-lg text-slate-400 max-w-3xl mx-auto mb-10 leading-relaxed font-normal animate-fade-up delay-200">
          A production-grade full-stack platform engineered to correlate conflict intensities with major macroeconomic contractions, hyperinflation spikes, and reconstruction timelines.
        </p>

        {/* Hero CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up delay-300">
          <button 
            onClick={handleCTA}
            className="w-full sm:w-auto px-8 py-4 text-xs uppercase tracking-widest font-extrabold text-white rounded-xl premium-gradient-btn flex items-center justify-center gap-2 cursor-pointer shadow-xl"
          >
            {token ? 'Go to Console Dashboard' : 'Open Analyst Console'}
            <ArrowRight className="h-4 w-4" />
          </button>
          <a 
            href="#architecture" 
            className="w-full sm:w-auto px-8 py-4 text-xs uppercase tracking-widest font-extrabold text-slate-300 hover:text-white rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/5 hover:border-white/10 transition-all text-center"
          >
            Explore Capabilities
          </a>
        </div>
      </section>

      {/* ── Live Database Counters Grid ──────────────────────── */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 mb-24 animate-scale-in">
        <div className="glass-panel-dark rounded-2xl p-6 border border-white/5 relative shadow-2xl">
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />
          
          <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-rose-500 animate-pulse" />
              <span className="text-xs text-slate-400 font-mono">live_database_stream</span>
            </div>
            <span className="text-[9px] px-2 py-0.5 rounded bg-violet-950/40 text-violet-400 border border-violet-900/30 font-extrabold uppercase">
              MongoDB Connected
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="space-y-1">
              <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest block">Conflicts Tracked</span>
              <span className="text-3xl font-black text-white block">{animatedTotal || stats.totalConflicts}</span>
              <span className="text-[10px] text-slate-400 font-medium">Recorded Events</span>
            </div>

            <div className="space-y-1">
              <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest block">Active Crises</span>
              <span className="text-3xl font-black text-amber-400 block">{animatedOngoing || stats.ongoingConflicts}</span>
              <span className="text-[10px] text-slate-400 font-medium">Ongoing Escalations</span>
            </div>

            <div className="space-y-1">
              <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest block">Peak War Cost</span>
              <span className="text-3xl font-black text-rose-500 block">{formatCost(stats.peakWarCost)}</span>
              <span className="text-[10px] text-slate-400 font-medium">Single Event Cap</span>
            </div>

            <div className="space-y-1">
              <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest block">Peak Reconstruction</span>
              <span className="text-3xl font-black text-emerald-400 block">{formatCost(stats.peakReconCost)}</span>
              <span className="text-[10px] text-slate-400 font-medium">Estimated Funding</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Floating Dashboard Preview Mockup ─────────────────── */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 mb-32">
        <div className="relative group">
          {/* Glowing border effects */}
          <div className="absolute -inset-2 rounded-2xl bg-gradient-to-r from-violet-600 via-fuchsia-600 to-indigo-600 opacity-20 blur-xl group-hover:opacity-35 transition-opacity duration-500 pointer-events-none" />
          
          <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#070b19] shadow-2xl">
            <img 
              src="/dashboard_preview.png" 
              alt="Dashboard Console Preview" 
              className="w-full h-auto opacity-90 object-cover"
              onError={(e) => {
                e.target.style.display = 'none'; // Fallback if image doesn't load
              }}
            />
            
            {/* Overlay Gradient lines for visual quality */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#050811] via-transparent to-transparent opacity-80 pointer-events-none" />
          </div>
        </div>
      </section>

      {/* ── Operational Modules Matrix (Upgraded with glass-panel-dark) ── */}
      <section id="architecture" className="relative z-10 max-w-7xl mx-auto px-6 py-24 border-t border-white/5 bg-white/[0.005]">
        <div className="text-center mb-16">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-violet-400 bg-violet-950/40 px-3 py-1.5 rounded-full border border-violet-900/30">
            System Capabilities
          </span>
          <h2 className="text-3xl md:text-5xl font-black mt-6 mb-4">Operational Intelligence Modules</h2>
          <p className="text-slate-400 max-w-2xl mx-auto font-normal text-sm leading-relaxed">
            A secure backend paired with a high-performance visual client designed for macroeconomic evaluation.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          
          {/* Card 1 */}
          <div className="glass-panel-dark p-8 rounded-2xl border border-white/5 hover:border-violet-500/20 hover:shadow-[0_0_30px_rgba(124,58,237,0.15)] transition-all duration-300 hover:-translate-y-1 group">
            <div className="h-12 w-12 rounded-xl bg-violet-950/30 border border-violet-900/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-200">
              <TrendingUp className="h-6 w-6 text-violet-400" />
            </div>
            <h3 className="text-lg font-bold mb-3 text-white">Macroeconomic Mapping</h3>
            <p className="text-xs text-slate-400 leading-relaxed font-light">
              Examine correlations between military conflict events and macroeconomic contractions: watch inflation spikes, GDP percentage shifts, and structural indices.
            </p>
          </div>

          {/* Card 2 */}
          <div className="glass-panel-dark p-8 rounded-2xl border border-white/5 hover:border-indigo-500/20 hover:shadow-[0_0_30px_rgba(79,70,229,0.15)] transition-all duration-300 hover:-translate-y-1 group">
            <div className="h-12 w-12 rounded-xl bg-indigo-950/30 border border-indigo-900/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-200">
              <Coins className="h-6 w-6 text-indigo-400" />
            </div>
            <h3 className="text-lg font-bold mb-3 text-white">Financial Quantifiers</h3>
            <p className="text-xs text-slate-400 leading-relaxed font-light">
              Track multi-billion dollar damage metrics, reconstruction budgets, affected sectors, and black market trades within unified dynamic databases.
            </p>
          </div>

          {/* Card 3 */}
          <div className="glass-panel-dark p-8 rounded-2xl border border-white/5 hover:border-fuchsia-500/20 hover:shadow-[0_0_30px_rgba(217,70,239,0.15)] transition-all duration-300 hover:-translate-y-1 group">
            <div className="h-12 w-12 rounded-xl bg-fuchsia-950/30 border border-fuchsia-900/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-200">
              <Database className="h-6 w-6 text-fuchsia-400" />
            </div>
            <h3 className="text-lg font-bold mb-3 text-white">Formik & Mongoose Validation</h3>
            <p className="text-xs text-slate-400 leading-relaxed font-light">
              Full CRUD controls with secure front-and-back validations, advanced paginations, multi-parameter query sort options, and safe soft-delete models.
            </p>
          </div>

        </div>
      </section>

      {/* ── Architecture Flow Steps ────────────────────────── */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-20 border-t border-white/5">
        <div className="text-center mb-16">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-indigo-400 bg-indigo-950/30 px-3 py-1.5 rounded-full border border-indigo-900/30">
            Analyst Pipeline
          </span>
          <h2 className="text-2xl md:text-4xl font-black mt-6 mb-4">How Aegis Analytics Operates</h2>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {[
            { step: '01', title: 'Session Handshake', desc: 'Secure token exchange and rate-limited API gateway authorization checks.', icon: Shield },
            { step: '02', title: 'Data Aggregator', desc: 'Queries localized MongoDB clusters to pull updated conflict metrics.', icon: Layers },
            { step: '03', title: 'Macro Correlation', desc: 'Processes index calculations to display live inflation/GDP scatters.', icon: ArrowRightLeft },
            { step: '04', title: 'Visual Rendering', desc: 'Renders high-fidelity responsive charts and paginated sorted listings.', icon: Cpu }
          ].map((item, index) => (
            <div key={item.step} className="p-6 rounded-xl bg-white/[0.01] border border-white/5 relative group hover:bg-white/[0.02] transition-colors duration-200">
              <span className="absolute top-4 right-4 text-4xl font-black text-white/[0.02] group-hover:text-white/[0.05] transition-colors font-mono">{item.step}</span>
              <div className="w-8 h-8 rounded-lg bg-violet-950/40 border border-violet-900/30 flex items-center justify-center mb-4">
                <item.icon className="w-4.5 h-4.5 text-violet-400" />
              </div>
              <h4 className="text-sm font-bold text-white mb-2">{item.title}</h4>
              <p className="text-[11px] text-slate-500 leading-relaxed font-light">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Tech Stack Integrations ─────────────────────────── */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-24 text-center border-t border-white/5">
        <span className="text-[10px] font-extrabold uppercase tracking-widest text-indigo-400 block mb-6">
          Architectural Blueprint
        </span>
        <h2 className="text-2xl md:text-3xl font-black mb-12">Engineered Tech Stack</h2>
        
        <div className="flex flex-wrap items-center justify-center gap-4 max-w-3xl mx-auto">
          {['React v19.0', 'Vite v8.0', 'Tailwind v4.0', 'Redux Toolkit', 'Express.js', 'MongoDB / Mongoose', 'Recharts Visuals'].map((tech) => (
            <span key={tech} className="px-4 py-2.5 text-xs font-mono font-bold rounded-lg bg-white/[0.02] border border-white/5 text-slate-400 hover:text-white transition-colors cursor-default">
              {tech}
            </span>
          ))}
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────── */}
      <footer className="relative z-10 border-t border-white/5 py-12 bg-slate-950/40">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-violet-600 to-indigo-600 flex items-center justify-center shadow-md">
              <Shield className="h-4.5 w-4.5 text-white" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-400 block">Conflict Economics</span>
              <span className="text-[9px] text-slate-500 font-semibold uppercase tracking-wider block">© {new Date().getFullYear()} Aegis Analytics</span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <Link to="/login" className="text-xs text-slate-500 hover:text-slate-300 font-semibold transition-colors flex items-center gap-1">
              Analyst login
              <ArrowUpRight className="w-3 h-3 text-violet-400" />
            </Link>
            <Link to="/register" className="text-xs text-slate-500 hover:text-slate-300 font-semibold transition-colors flex items-center gap-1">
              Register account
              <ArrowUpRight className="w-3 h-3 text-indigo-400" />
            </Link>
          </div>
        </div>
      </footer>

    </div>
  );
}
