import React, { useEffect, useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { registerUser, clearAuthError } from '../store/slices/authSlice';
import { User, Mail, Lock, Shield, Loader2, AlertCircle, Eye, EyeOff, ArrowRight, CheckCircle2 } from 'lucide-react';

const FieldInput = ({ id, name, type, placeholder, icon: Icon, extraRight, formik }) => (
  <div className="relative">
    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500 pointer-events-none">
      <Icon className="h-4 w-4" />
    </span>
    <input
      id={id}
      name={name}
      type={type}
      autoComplete={id === 'name' ? 'name' : id === 'email' ? 'email' : 'new-password'}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      value={formik.values[name]}
      placeholder={placeholder}
      className={`block w-full pl-10 ${extraRight ? 'pr-11' : 'pr-4'} py-3 rounded-xl dark-input text-sm ${
        formik.touched[name] && formik.errors[name] ? 'border-rose-500/60' : ''
      }`}
    />
    {extraRight}
  </div>
);

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { isAuthenticated, loading, error } = useSelector((state) => state.auth);
  const [showPassword, setShowPassword]               = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [mounted, setMounted]                         = useState(false);

  const from = location.state?.from?.pathname || '/dashboard';

  useEffect(() => {
    setMounted(true);
    if (isAuthenticated) navigate(from, { replace: true });
    dispatch(clearAuthError());
    return () => dispatch(clearAuthError());
  }, [isAuthenticated, navigate, from, dispatch]);

  const formik = useFormik({
    initialValues: { name: '', email: '', password: '', confirmPassword: '' },
    validationSchema: Yup.object({
      name:            Yup.string().min(2, 'At least 2 characters').required('Full name is required'),
      email:           Yup.string().email('Valid email required').required('Email is required'),
      password:        Yup.string().min(6, 'At least 6 characters').required('Password is required'),
      confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords do not match').required('Please confirm your password'),
    }),
    onSubmit: (values) => {
      const { confirmPassword, ...payload } = values;
      dispatch(registerUser(payload));
    },
  });

  const features = [
    'Real-time conflict tracking',
    'Macroeconomic impact analytics',
    'War cost & reconstruction forecasts',
    'Regional GDP & inflation metrics',
  ];

  // Password strength
  const pwd = formik.values.password;
  const strength = pwd.length === 0 ? 0 : pwd.length < 6 ? 1 : pwd.length < 10 ? 2 : 3;
  const strengthColors = ['', 'bg-rose-500', 'bg-amber-400', 'bg-emerald-500'];
  const strengthLabels = ['', 'Weak', 'Moderate', 'Strong'];

  return (
    <div className="min-h-screen flex bg-[#030712] text-white relative overflow-hidden">

      {/* ── Animated background blobs ────────────────────── */}
      <div className="absolute inset-0 bg-dot-grid opacity-60 pointer-events-none z-0" />
      <div className="absolute top-[-15%] right-[-10%] w-[55vw] h-[55vw] rounded-full bg-violet-900/12 blur-[160px] pointer-events-none animate-slow-spin z-0" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-indigo-900/12 blur-[140px] pointer-events-none animate-reverse-slow-spin z-0" />
      <div className="absolute top-[30%] right-[30%] w-[30vw] h-[30vw] rounded-full bg-fuchsia-900/6 blur-[120px] pointer-events-none animate-pulse-glow z-0" />

      {/* ── Form Panel (left on desktop) ─────────────────── */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-4 py-10 relative z-10">
        <div className={`w-full max-w-md transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>

          {/* Mobile brand */}
          <div className="lg:hidden flex flex-col items-center mb-8">
            <div className="relative mb-4">
              <div className="absolute -inset-2 rounded-2xl bg-gradient-to-tr from-violet-600 to-indigo-600 opacity-50 blur-xl animate-pulse" />
              <div className="relative w-12 h-12 bg-gradient-to-tr from-violet-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-2xl">
                <Shield className="h-6 w-6 text-white" />
              </div>
            </div>
            <h2 className="text-xl font-extrabold gradient-text-animate">Conflict Economics Suite</h2>
            <p className="text-slate-400 text-xs mt-1 text-center">Create your analyst account</p>
          </div>

          {/* Card */}
          <div className="glass-panel-dark rounded-3xl p-8 gradient-border animate-scale-in">
            <div className="mb-6">
              <h3 className="text-2xl font-extrabold text-white tracking-tight">Create account</h3>
              <p className="text-slate-400 text-sm mt-1">Join the global intelligence network</p>
            </div>

            {/* Error */}
            {error && (
              <div className="mb-5 p-4 bg-rose-950/30 border border-rose-500/30 rounded-xl flex items-start gap-3 text-rose-300 animate-fade-up">
                <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                <p className="text-sm font-medium">{error}</p>
              </div>
            )}

            <form onSubmit={formik.handleSubmit} className="space-y-4">
              {/* Name */}
              <div className="animate-fade-up delay-75">
                <label htmlFor="name" className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Full Name</label>
                <FieldInput id="name" name="name" type="text" placeholder="Your full name" icon={User} formik={formik} />
                {formik.touched.name && formik.errors.name && (
                  <p className="text-xs text-rose-400 mt-1.5 font-medium flex items-center gap-1"><AlertCircle className="h-3 w-3" />{formik.errors.name}</p>
                )}
              </div>

              {/* Email */}
              <div className="animate-fade-up delay-100">
                <label htmlFor="email" className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Email Address</label>
                <FieldInput id="email" name="email" type="email" placeholder="name@domain.com" icon={Mail} formik={formik} />
                {formik.touched.email && formik.errors.email && (
                  <p className="text-xs text-rose-400 mt-1.5 font-medium flex items-center gap-1"><AlertCircle className="h-3 w-3" />{formik.errors.email}</p>
                )}
              </div>

              {/* Password */}
              <div className="animate-fade-up delay-150">
                <label htmlFor="password" className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Password</label>
                <FieldInput
                  id="password" name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Create a strong password"
                  icon={Lock}
                  formik={formik}
                  extraRight={
                    <button type="button" tabIndex={-1} onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 hover:text-slate-300 transition-colors focus:outline-none cursor-pointer">
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  }
                />
                {/* Strength bar */}
                {pwd.length > 0 && (
                  <div className="mt-2 flex items-center gap-2">
                    <div className="flex gap-1 flex-1">
                      {[1,2,3].map(i => (
                        <div key={i} className={`h-1 flex-1 rounded-full transition-all duration-300 ${strength >= i ? strengthColors[strength] : 'bg-slate-800'}`} />
                      ))}
                    </div>
                    <span className={`text-[10px] font-bold ${strength === 1 ? 'text-rose-400' : strength === 2 ? 'text-amber-400' : 'text-emerald-400'}`}>
                      {strengthLabels[strength]}
                    </span>
                  </div>
                )}
                {formik.touched.password && formik.errors.password && (
                  <p className="text-xs text-rose-400 mt-1.5 font-medium flex items-center gap-1"><AlertCircle className="h-3 w-3" />{formik.errors.password}</p>
                )}
              </div>

              {/* Confirm Password */}
              <div className="animate-fade-up delay-200">
                <label htmlFor="confirmPassword" className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Confirm Password</label>
                <FieldInput
                  id="confirmPassword" name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Re-enter your password"
                  icon={Lock}
                  formik={formik}
                  extraRight={
                    <button type="button" tabIndex={-1} onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 hover:text-slate-300 transition-colors focus:outline-none cursor-pointer">
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  }
                />
                {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                  <p className="text-xs text-rose-400 mt-1.5 font-medium flex items-center gap-1"><AlertCircle className="h-3 w-3" />{formik.errors.confirmPassword}</p>
                )}
              </div>

              {/* Submit */}
              <div className="pt-2 animate-fade-up delay-300">
                <button
                  id="register-submit"
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 premium-gradient-btn text-white font-bold rounded-xl cursor-pointer disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2.5 text-sm"
                >
                  {loading ? (
                    <><Loader2 className="h-4.5 w-4.5 animate-spin" />Creating account…</>
                  ) : (
                    <>Create Analyst Account<ArrowRight className="h-4 w-4" /></>
                  )}
                </button>
              </div>
            </form>

            <div className="flex items-center gap-3 my-5">
              <div className="flex-1 h-px bg-white/5" />
              <span className="text-xs text-slate-600 font-semibold">OR</span>
              <div className="flex-1 h-px bg-white/5" />
            </div>

            <p className="text-center text-sm text-slate-400">
              Already have an account?{' '}
              <Link to="/login" className="text-violet-400 font-bold hover:text-violet-300 transition-colors underline underline-offset-2">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* ── Right Decorative Panel (desktop) ─────────────── */}
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-12 relative z-10">
        <div className={`max-w-md space-y-8 transition-all duration-700 delay-200 ${mounted ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>

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

          <div className="space-y-3">
            <h2 className="text-4xl font-extrabold leading-tight">
              <span className="text-white">Start analyzing</span>
              <br />
              <span className="gradient-text-animate">global conflicts</span>
              <br />
              <span className="text-white">in minutes.</span>
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              Get full access to our comprehensive geopolitical dataset,
              economic dashboards, and real-time analytics tools.
            </p>
          </div>

          {/* Features */}
          <div className="space-y-3">
            {features.map((feat, i) => (
              <div key={feat} className="flex items-center gap-3 animate-fade-up" style={{ animationDelay: `${200 + i * 80}ms` }}>
                <div className="w-6 h-6 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                </div>
                <span className="text-sm text-slate-300 font-medium">{feat}</span>
              </div>
            ))}
          </div>

          {/* Testimonial card */}
          <div className="glass-panel-dark rounded-2xl p-5 border border-white/5">
            <p className="text-sm text-slate-300 italic leading-relaxed">
              "An indispensable tool for anyone researching the economic consequences of armed conflicts."
            </p>
            <div className="flex items-center gap-2 mt-3">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-xs font-bold text-white">A</div>
              <div>
                <p className="text-xs font-bold text-white">Analyst Review</p>
                <p className="text-[9px] text-slate-500">Research & Policy</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
