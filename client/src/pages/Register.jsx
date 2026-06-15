import React, { useEffect, useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { registerUser, clearAuthError } from '../store/slices/authSlice';
import { User, Mail, Lock, Shield, Loader2, AlertCircle, Eye, EyeOff } from 'lucide-react';

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { isAuthenticated, loading, error } = useSelector((state) => state.auth);
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const from = location.state?.from?.pathname || '/dashboard';

  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
    dispatch(clearAuthError());
    return () => {
      dispatch(clearAuthError());
    };
  }, [isAuthenticated, navigate, from, dispatch]);

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(2, 'Full name must contain at least 2 characters')
        .required('Please enter your full name to proceed'),
      email: Yup.string()
        .email('Please enter a valid business or personal email address')
        .required('A valid email address is required for authentication'),
      password: Yup.string()
        .min(6, 'Your password must contain at least 6 characters')
        .required('A secure password is required to protect your account'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Confirmation password must match your password')
        .required('Please confirm your security password'),
    }),
    onSubmit: async (values) => {
      // Exclude confirmPassword from api payload
      const { confirmPassword, ...registerPayload } = values;
      dispatch(registerUser(registerPayload));
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-4 transition-colors duration-300 relative overflow-hidden">
      {/* Decorative Premium Background Glowing Orbs */}
      <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-violet-600/10 dark:bg-violet-600/15 blur-[120px] pointer-events-none animate-pulse duration-[8000ms]" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-indigo-600/10 dark:bg-indigo-600/15 blur-[120px] pointer-events-none animate-pulse duration-[10000ms]" />

      <div className="w-full max-w-md my-8 relative z-10">
        {/* Logo/Brand Header */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-12 h-12 bg-gradient-to-tr from-violet-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-violet-500/20 mb-3 hover:scale-105 transition-transform duration-300">
            <Shield className="text-white h-6 w-6" />
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent tracking-tight">
            Geopolitical Economics Suite
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-xs mt-1 font-medium text-center">
            Initialize your analyst credentials to access global database panels
          </p>
        </div>

        {/* Form Container (Premium Glassmorphic Panel) */}
        <div className="glass-panel p-8 rounded-3xl shadow-2xl border border-white/20 dark:border-white/5 bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl hover:shadow-violet-500/5 transition-all duration-300">
          {/* Error Alert Box */}
          {error && (
            <div className="mb-6 p-4 bg-rose-50 dark:bg-rose-950/20 border-l-4 border-rose-500 rounded-r-xl flex items-start space-x-2 text-rose-700 dark:text-rose-300 animate-in slide-in-from-top-2 duration-200">
              <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
              <div className="text-sm font-medium">{error}</div>
            </div>
          )}

          <form onSubmit={formik.handleSubmit} className="space-y-4">
            {/* Full Name Field */}
            <div>
              <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">
                  <User className="h-4.5 w-4.5" />
                </span>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                  placeholder="Enter your full name"
                  className={`block w-full pl-10 pr-4 py-2.5 rounded-xl border bg-white/70 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-violet-500/10 focus:border-violet-500 dark:focus:ring-violet-500/15 transition-all duration-200 ${
                    formik.touched.name && formik.errors.name
                      ? 'border-rose-500 focus:ring-rose-500/10 focus:border-rose-500'
                      : 'focus:border-violet-500'
                  }`}
                />
              </div>
              {formik.touched.name && formik.errors.name && (
                <p className="text-xs text-rose-500 mt-1.5 font-medium">{formik.errors.name}</p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">
                  <Mail className="h-4.5 w-4.5" />
                </span>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  placeholder="Enter email address (e.g. name@domain.com)"
                  className={`block w-full pl-10 pr-4 py-2.5 rounded-xl border bg-white/70 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-violet-500/10 focus:border-violet-500 dark:focus:ring-violet-500/15 transition-all duration-200 ${
                    formik.touched.email && formik.errors.email
                      ? 'border-rose-500 focus:ring-rose-500/10 focus:border-rose-500'
                      : 'focus:border-violet-500'
                  }`}
                />
              </div>
              {formik.touched.email && formik.errors.email && (
                <p className="text-xs text-rose-500 mt-1.5 font-medium">{formik.errors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Password
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">
                  <Lock className="h-4.5 w-4.5" />
                </span>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  placeholder="Create a secure password"
                  className={`block w-full pl-10 pr-10 py-2.5 rounded-xl border bg-white/70 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-violet-500/10 focus:border-violet-500 dark:focus:ring-violet-500/15 transition-all duration-200 ${
                    formik.touched.password && formik.errors.password
                      ? 'border-rose-500 focus:ring-rose-500/10 focus:border-rose-500'
                      : 'focus:border-violet-500'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 focus:outline-none cursor-pointer"
                >
                  {showPassword ? <EyeOff className="h-4.5 w-4.5" /> : <Eye className="h-4.5 w-4.5" />}
                </button>
              </div>
              {formik.touched.password && formik.errors.password && (
                <p className="text-xs text-rose-500 mt-1.5 font-medium">{formik.errors.password}</p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div>
              <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Confirm Password
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">
                  <Lock className="h-4.5 w-4.5" />
                </span>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.confirmPassword}
                  placeholder="Re-enter password to verify"
                  className={`block w-full pl-10 pr-10 py-2.5 rounded-xl border bg-white/70 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-violet-500/10 focus:border-violet-500 dark:focus:ring-violet-500/15 transition-all duration-200 ${
                    formik.touched.confirmPassword && formik.errors.confirmPassword
                      ? 'border-rose-500 focus:ring-rose-500/10 focus:border-rose-500'
                      : 'focus:border-violet-500'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 focus:outline-none cursor-pointer"
                >
                  {showConfirmPassword ? <EyeOff className="h-4.5 w-4.5" /> : <Eye className="h-4.5 w-4.5" />}
                </button>
              </div>
              {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                <p className="text-xs text-rose-500 mt-1.5 font-medium">{formik.errors.confirmPassword}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 hover:brightness-110 active:scale-[0.99] text-white font-bold rounded-xl shadow-lg shadow-violet-500/15 hover:shadow-violet-500/30 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 disabled:opacity-70 disabled:pointer-events-none cursor-pointer flex items-center justify-center transition-all duration-200 mt-3"
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin mr-2" />
                  Creating account...
                </>
              ) : (
                'Sign Up'
              )}
            </button>
          </form>

          {/* Redirection Links */}
          <div className="mt-6 text-center">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Already have an account?{' '}
              <Link
                to="/login"
                className="text-violet-600 dark:text-violet-400 font-bold hover:underline ml-1"
              >
                Sign In
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
