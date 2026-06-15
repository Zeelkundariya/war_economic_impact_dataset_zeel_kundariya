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
    <div className="min-h-screen flex items-center justify-center bg-[#030712] text-white px-4 transition-colors duration-300 relative overflow-hidden">
      {/* dot-grid matrix background pattern */}
      <div className="absolute inset-0 bg-dot-grid pointer-events-none z-0" />

      {/* Premium Rotating Background Blur Neon Blobs */}
      <div className="absolute top-[10%] left-[-20%] w-[60vw] h-[60vw] rounded-full bg-violet-900/10 blur-[150px] pointer-events-none animate-slow-spin z-0" />
      <div className="absolute bottom-[10%] right-[-20%] w-[60vw] h-[60vw] rounded-full bg-indigo-900/10 blur-[150px] pointer-events-none animate-reverse-slow-spin z-0" />
      <div className="absolute top-[40%] left-[30%] w-[35vw] h-[35vw] rounded-full bg-fuchsia-900/5 blur-[120px] pointer-events-none animate-pulse-glow z-0" />

      <div className="w-full max-w-md my-8 relative z-10">
        {/* Brand Header with Glowing Shield */}
        <div className="flex flex-col items-center mb-6">
          <div className="relative mb-3.5 group cursor-pointer">
            {/* Glowing outer shadow ring */}
            <div className="absolute -inset-1.5 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 opacity-60 blur-lg animate-pulse group-hover:opacity-100 transition duration-1000" />
            <div className="relative w-12 h-12 bg-slate-950 border border-slate-800 rounded-2xl flex items-center justify-center shadow-2xl">
              <Shield className="text-violet-400 h-5.5 w-5.5" />
            </div>
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-violet-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent tracking-tight">
            Geopolitical Economics Suite
          </h2>
          <p className="text-slate-400 text-[11px] mt-1 font-medium text-center opacity-80">
            Initialize your analyst credentials to access global database panels
          </p>
        </div>

        {/* Form Container (Premium Dark Glassmorphic Card) */}
        <div className="glass-panel-dark p-8 rounded-3xl shadow-2xl relative border border-white/10 hover:border-violet-500/20 transition-all duration-300">
          {/* Error Alert Box */}
          {error && (
            <div className="mb-6 p-4 bg-rose-950/20 border-l-4 border-rose-500 rounded-r-xl flex items-start space-x-2 text-rose-300 animate-in slide-in-from-top-2 duration-200">
              <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
              <div className="text-sm font-medium">{error}</div>
            </div>
          )}

          <form onSubmit={formik.handleSubmit} className="space-y-4">
            {/* Full Name Field */}
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500">
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
                  className={`block w-full pl-10 pr-4 py-2.5 rounded-xl border dark-input placeholder-slate-500 text-sm ${
                    formik.touched.name && formik.errors.name
                      ? 'border-rose-500/50 focus:ring-rose-500/10 focus:border-rose-500'
                      : ''
                  }`}
                />
              </div>
              {formik.touched.name && formik.errors.name && (
                <p className="text-xs text-rose-400 mt-1.5 font-medium">{formik.errors.name}</p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500">
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
                  className={`block w-full pl-10 pr-4 py-2.5 rounded-xl border dark-input placeholder-slate-500 text-sm ${
                    formik.touched.email && formik.errors.email
                      ? 'border-rose-500/50 focus:ring-rose-500/10 focus:border-rose-500'
                      : ''
                  }`}
                />
              </div>
              {formik.touched.email && formik.errors.email && (
                <p className="text-xs text-rose-400 mt-1.5 font-medium">{formik.errors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                Password
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500">
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
                  className={`block w-full pl-10 pr-10 py-2.5 rounded-xl border dark-input placeholder-slate-500 text-sm ${
                    formik.touched.password && formik.errors.password
                      ? 'border-rose-500/50 focus:ring-rose-500/10 focus:border-rose-500'
                      : ''
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 hover:text-slate-300 focus:outline-none cursor-pointer"
                >
                  {showPassword ? <EyeOff className="h-4.5 w-4.5" /> : <Eye className="h-4.5 w-4.5" />}
                </button>
              </div>
              {formik.touched.password && formik.errors.password && (
                <p className="text-xs text-rose-400 mt-1.5 font-medium">{formik.errors.password}</p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                Confirm Password
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500">
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
                  className={`block w-full pl-10 pr-10 py-2.5 rounded-xl border dark-input placeholder-slate-500 text-sm ${
                    formik.touched.confirmPassword && formik.errors.confirmPassword
                      ? 'border-rose-500/50 focus:ring-rose-500/10 focus:border-rose-500'
                      : ''
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 hover:text-slate-300 focus:outline-none cursor-pointer"
                >
                  {showConfirmPassword ? <EyeOff className="h-4.5 w-4.5" /> : <Eye className="h-4.5 w-4.5" />}
                </button>
              </div>
              {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                <p className="text-xs text-rose-400 mt-1.5 font-medium">{formik.errors.confirmPassword}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 premium-gradient-btn text-white font-bold rounded-xl shadow-lg shadow-violet-950/20 disabled:opacity-50 disabled:pointer-events-none cursor-pointer flex items-center justify-center transition-all duration-200 mt-3 text-sm"
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
            <span className="text-xs font-semibold text-slate-400">
              Already have an account?{' '}
              <Link
                to="/login"
                className="text-violet-400 font-bold hover:underline hover:text-violet-300 transition ml-1"
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
