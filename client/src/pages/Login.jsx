import React, { useEffect, useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { loginUser, clearAuthError } from '../store/slices/authSlice';
import { Shield, Mail, Lock, Loader2, AlertCircle, Eye, EyeOff, ArrowRight, Globe2 } from 'lucide-react';

const Login = () => {
  const navigate   = useNavigate();
  const dispatch   = useDispatch();
  const location   = useLocation();
  const { isAuthenticated, loading, error } = useSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);
  const [mounted, setMounted] = useState(false);

  const from = location.state?.from?.pathname || '/dashboard';

  useEffect(() => {
    setMounted(true);
    if (isAuthenticated) navigate(from, { replace: true });
    dispatch(clearAuthError());
    return () => dispatch(clearAuthError());
  }, [isAuthenticated, navigate, from, dispatch]);

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: Yup.object({
      email:    Yup.string().email('Enter a valid email address').required('Email is required'),
      password: Yup.string().min(6, 'At least 6 characters').required('Password is required'),
    }),
    onSubmit: (values) => { dispatch(loginUser(values)); },
  });

  return (
    <div className="min-h-screen flex bg-[#030712] text-white relative overflow-hidden">

      {/* ── Animated Background ───────────────────────────── */}
      <div className="absolute inset-0 bg-dot-grid opacity-60 pointer-events-none z-0" />
      <div className="absolute top-[-15%] left-[-10%] w-[55vw] h-[55vw] rounded-full bg-violet-900/12 blur-[160px] pointer-events-none animate-slow-spin z-0" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-indigo-900/12 blur-[140px] pointer-events-none animate-reverse-slow-spin z-0" />
      <div className="absolute top-[40%] left-[35%] w-[30vw] h-[30vw] rounded-full bg-fuchsia-900/6 blur-[120px] pointer-events-none animate-pulse-glow z-0" />

      {/* ── Left Panel (decorative, desktop only) ────────── */}
      <div className="hidden lg:flex lg:w-1/2 relative items-center justify-center p-12 z-10">
        <div className={`transition-all duration-700 ${mounted ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
          <div className="space-y-8 max-w-md">
            {/* Brand */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute -inset-2 rounded-2xl bg-gradient-to-tr from-violet-600 to-indigo-600 opacity-40 blur-xl animate-pulse-glow" />
                <div className="relative w-12 h-12 bg-gradient-to-tr from-violet-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-2xl">
                  <Shield className="h-6 w-6 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-xl font-extrabold text-white tracking-tight">Conflict Economics</h1>
                <p className="text-xs text-violet-400 font-semibold">Geopolitical Intelligence Suite</p>
              </div>
            </div>

            {/* Hero text */}
            <div className="space-y-4">
              <h2 className="text-4xl font-extrabold leading-tight">
                <span className="text-white">Global conflict</span>
                <br />
                <span className="gradient-text-animate">economic analytics</span>
                <br />
                <span className="text-white">at your fingertips.</span>
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed">
                Analyze macroeconomic indicators, war costs, reconstruction forecasts
                and geopolitical impact across active and resolved conflict zones worldwide.
              </p>
            </div>

            {/* Feature tags */}
            <div className="flex flex-wrap gap-2">
              {['Live MongoDB Data', 'Multi-Region Coverage', 'Economic Forecasting', 'Admin Controls'].map((tag) => (
                <span key={tag} className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-slate-400">
                  {tag}
                </span>
              ))}
            </div>

            {/* Stat strip */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: 'Conflicts Tracked', value: '100+' },
                { label: 'Countries',          value: '60+' },
                { label: 'Data Points',        value: '500K+' },
              ].map((s) => (
                <div key={s.label} className="glass-panel-dark rounded-xl p-3 text-center border border-white/5">
                  <p className="text-xl font-extrabold text-violet-400">{s.value}</p>
                  <p className="text-[9px] text-slate-500 uppercase tracking-wider font-bold mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Right Panel: Form ─────────────────────────────── */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-4 py-12 relative z-10">
        <div className={`w-full max-w-md transition-all duration-700 delay-150 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>

          {/* Mobile brand */}
          <div className="lg:hidden flex flex-col items-center mb-8">
            <div className="relative mb-4">
              <div className="absolute -inset-2 rounded-2xl bg-gradient-to-tr from-violet-600 to-indigo-600 opacity-50 blur-xl animate-pulse" />
              <div className="relative w-12 h-12 bg-gradient-to-tr from-violet-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-2xl">
                <Shield className="h-6 w-6 text-white" />
              </div>
            </div>
            <h2 className="text-xl font-extrabold gradient-text-animate">Conflict Economics Suite</h2>
            <p className="text-slate-400 text-xs mt-1 text-center">Access global intelligence panels</p>
          </div>

          {/* Card */}
          <div className="glass-panel-dark rounded-3xl p-8 gradient-border animate-scale-in">
            <div className="mb-7">
              <h3 className="text-2xl font-extrabold text-white tracking-tight">Welcome back</h3>
              <p className="text-slate-400 text-sm mt-1">Sign in to your analyst account</p>
            </div>

            {/* Error */}
            {error && (
              <div className="mb-5 p-4 bg-rose-950/30 border border-rose-500/30 rounded-xl flex items-start gap-3 text-rose-300 animate-fade-up">
                <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                <p className="text-sm font-medium">{error}</p>
              </div>
            )}

            <form onSubmit={formik.handleSubmit} className="space-y-4">
              {/* Email */}
              <div className="animate-fade-up delay-100">
                <label htmlFor="email" className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500 pointer-events-none">
                    <Mail className="h-4 w-4" />
                  </span>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    placeholder="name@domain.com"
                    className={`block w-full pl-10 pr-4 py-3 rounded-xl dark-input text-sm ${
                      formik.touched.email && formik.errors.email ? 'border-rose-500/60' : ''
                    }`}
                  />
                </div>
                {formik.touched.email && formik.errors.email && (
                  <p className="text-xs text-rose-400 mt-1.5 font-medium flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />{formik.errors.email}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="animate-fade-up delay-150">
                <label htmlFor="password" className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
                  Password
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500 pointer-events-none">
                    <Lock className="h-4 w-4" />
                  </span>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    placeholder="Your secure password"
                    className={`block w-full pl-10 pr-11 py-3 rounded-xl dark-input text-sm ${
                      formik.touched.password && formik.errors.password ? 'border-rose-500/60' : ''
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 hover:text-slate-300 transition-colors focus:outline-none cursor-pointer"
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {formik.touched.password && formik.errors.password && (
                  <p className="text-xs text-rose-400 mt-1.5 font-medium flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />{formik.errors.password}
                  </p>
                )}
              </div>

              {/* Submit */}
              <div className="pt-2 animate-fade-up delay-200">
                <button
                  id="login-submit"
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 premium-gradient-btn text-white font-bold rounded-xl cursor-pointer disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2.5 text-sm"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4.5 w-4.5 animate-spin" />
                      Verifying credentials…
                    </>
                  ) : (
                    <>
                      Sign In to Dashboard
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-3 my-6">
              <div className="flex-1 h-px bg-white/5" />
              <span className="text-xs text-slate-600 font-semibold">OR</span>
              <div className="flex-1 h-px bg-white/5" />
            </div>

            <p className="text-center text-sm text-slate-400">
              Don't have an account?{' '}
              <Link to="/register" className="text-violet-400 font-bold hover:text-violet-300 transition-colors underline underline-offset-2">
                Create account
              </Link>
            </p>
          </div>

          {/* Footer note */}
          <div className="flex items-center justify-center gap-2 mt-6 text-slate-600">
            <Globe2 className="h-3.5 w-3.5" />
            <p className="text-[10px] font-medium">Secured · Encrypted · Global Access</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
