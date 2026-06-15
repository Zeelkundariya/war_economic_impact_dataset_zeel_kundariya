import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { updateUserProfile } from '../store/slices/authSlice';
import { showToast } from '../store/slices/uiSlice';
import {
  User, Mail, Lock, Shield, Calendar,
  Loader2, KeyRound, Activity, UserCheck,
  CheckCircle2, AlertCircle, Eye, EyeOff, Zap
} from 'lucide-react';

/* ── Shared field style ─────────────────────────────────── */
const inputCls = `w-full pl-10 pr-3 py-3 rounded-xl border border-slate-200 dark:border-slate-700/60
  bg-slate-50 dark:bg-slate-900/60 text-slate-900 dark:text-white
  placeholder-slate-400 dark:placeholder-slate-600
  focus:outline-none focus:ring-2 focus:ring-violet-500/40 focus:border-violet-500
  transition-all duration-200 text-sm`;

/* ── Toggle Switch ──────────────────────────────────────── */
const PremiumToggle = ({ checked, onChange }) => (
  <button
    type="button"
    onClick={onChange}
    className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-all duration-300 cursor-pointer focus:outline-none shadow-inner ${
      checked ? 'bg-violet-600 shadow-violet-500/30' : 'bg-slate-200 dark:bg-slate-700'
    }`}
  >
    <span
      className={`inline-block h-4 w-4 rounded-full bg-white shadow-md transition-all duration-300 ${
        checked ? 'translate-x-6' : 'translate-x-1'
      }`}
    />
  </button>
);

const Profile = () => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [showPwd, setShowPwd]     = useState(false);
  const [showConfPwd, setShowConfPwd] = useState(false);

  const formik = useFormik({
    initialValues: {
      name:            user?.name  || '',
      email:           user?.email || '',
      password:        '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      name:            Yup.string().required('Name is required'),
      email:           Yup.string().email('Invalid email').required('Email is required'),
      password:        Yup.string().min(6, 'At least 6 characters'),
      confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match'),
    }),
    onSubmit: async (values) => {
      const payload = { name: values.name, email: values.email };
      if (values.password) payload.password = values.password;
      try {
        await dispatch(updateUserProfile(payload)).unwrap();
        dispatch(showToast({ message: 'Profile updated successfully!', severity: 'success' }));
        formik.setFieldValue('password', '');
        formik.setFieldValue('confirmPassword', '');
        setShowPasswordChange(false);
      } catch (err) {
        dispatch(showToast({ message: err || 'Update failed', severity: 'error' }));
      }
    },
  });

  const userInitial = user?.name ? user.name.charAt(0).toUpperCase() : '?';
  const joinDate = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString(undefined, { dateStyle: 'long' })
    : null;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">

      {/* ── Header ──────────────────────────────────────── */}
      <div className="animate-fade-up">
        <div className="flex items-center gap-2 mb-1">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 text-[10px] font-bold uppercase tracking-widest">
            <Zap className="h-3 w-3" /> Account
          </span>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">Account Profile</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">
          Manage your personal details, email configuration, and password security
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* ── Profile Summary Card ─────────────────────── */}
        <div className="glass-panel rounded-2xl border border-slate-200/60 dark:border-slate-800/60 p-6 text-center space-y-5 animate-fade-up delay-100">
          {/* Avatar */}
          <div className="relative inline-block mx-auto">
            <div className="absolute -inset-2 rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 opacity-20 blur-xl animate-pulse-glow" />
            <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center mx-auto shadow-2xl shadow-violet-500/30">
              <span className="text-3xl font-extrabold text-white uppercase">{userInitial}</span>
            </div>
            <div className="absolute bottom-0.5 right-0.5 p-1.5 bg-emerald-500 rounded-full shadow-lg border-2 border-white dark:border-slate-900">
              <UserCheck className="w-3 w-3 text-white" />
            </div>
          </div>

          {/* Name & Email */}
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">{user?.name || 'Analyst'}</h3>
            <p className="text-xs text-slate-400 font-mono mt-0.5 truncate">{user?.email}</p>
          </div>

          {/* Meta info */}
          <div className="space-y-2.5 pt-4 border-t border-slate-100 dark:border-slate-800 text-left">
            <div className="flex items-center gap-2.5 text-xs font-semibold text-slate-600 dark:text-slate-300">
              <div className="w-6 h-6 rounded-lg bg-violet-50 dark:bg-violet-950/20 flex items-center justify-center shrink-0">
                <Shield className="h-3.5 w-3.5 text-violet-500" />
              </div>
              <span>{user?.isAdmin ? 'Administrator' : 'Standard Analyst'}</span>
            </div>

            <div className="flex items-center gap-2.5 text-xs font-semibold text-slate-600 dark:text-slate-300">
              <div className="w-6 h-6 rounded-lg bg-emerald-50 dark:bg-emerald-950/20 flex items-center justify-center shrink-0">
                <Activity className="h-3.5 w-3.5 text-emerald-500" />
              </div>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                Active Session
              </span>
            </div>

            {joinDate && (
              <div className="flex items-center gap-2.5 text-xs text-slate-500 dark:text-slate-400">
                <div className="w-6 h-6 rounded-lg bg-slate-50 dark:bg-slate-800 flex items-center justify-center shrink-0">
                  <Calendar className="h-3.5 w-3.5 text-slate-400" />
                </div>
                <span>Joined {joinDate}</span>
              </div>
            )}
          </div>

          {/* Role badge */}
          <div className={`px-3 py-2 rounded-xl text-xs font-bold uppercase tracking-widest ${
            user?.isAdmin
              ? 'bg-amber-50 dark:bg-amber-950/20 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-900/40'
              : 'bg-violet-50 dark:bg-violet-950/20 text-violet-700 dark:text-violet-400 border border-violet-200 dark:border-violet-900/40'
          }`}>
            {user?.isAdmin ? '⚡ Admin Access' : '🔐 Analyst Access'}
          </div>
        </div>

        {/* ── Edit Form ────────────────────────────────── */}
        <div className="md:col-span-2 space-y-5 animate-fade-up delay-200">
          <div className="glass-panel rounded-2xl border border-slate-200/60 dark:border-slate-800/60 p-6">
            <h4 className="text-base font-bold text-slate-900 dark:text-white mb-5 flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-violet-50 dark:bg-violet-950/20 flex items-center justify-center">
                <User className="h-4 w-4 text-violet-500" />
              </div>
              Edit Profile Information
            </h4>

            <form onSubmit={formik.handleSubmit} className="space-y-4">
              {/* Name + Email row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Full Name</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 pointer-events-none">
                      <User className="h-4 w-4" />
                    </span>
                    <input name="name" type="text" onChange={formik.handleChange} onBlur={formik.handleBlur}
                      value={formik.values.name} placeholder="Your full name" className={inputCls} />
                  </div>
                  {formik.touched.name && formik.errors.name && (
                    <p className="text-xs text-rose-500 mt-1.5 flex items-center gap-1"><AlertCircle className="h-3 w-3" />{formik.errors.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Email Address</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 pointer-events-none">
                      <Mail className="h-4 w-4" />
                    </span>
                    <input name="email" type="email" onChange={formik.handleChange} onBlur={formik.handleBlur}
                      value={formik.values.email} placeholder="name@domain.com" className={inputCls} />
                  </div>
                  {formik.touched.email && formik.errors.email && (
                    <p className="text-xs text-rose-500 mt-1.5 flex items-center gap-1"><AlertCircle className="h-3 w-3" />{formik.errors.email}</p>
                  )}
                </div>
              </div>

              {/* Toggle password section */}
              <div className="pt-1">
                <button
                  type="button"
                  onClick={() => setShowPasswordChange(!showPasswordChange)}
                  className="flex items-center gap-2 text-xs font-bold text-violet-600 dark:text-violet-400 hover:text-violet-700 transition-colors cursor-pointer"
                >
                  <KeyRound className="w-3.5 h-3.5" />
                  {showPasswordChange ? 'Cancel Password Change' : 'Change Password'}
                </button>
              </div>

              {showPasswordChange && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100 dark:border-slate-800 animate-fade-up">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">New Password</label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 pointer-events-none"><Lock className="h-4 w-4" /></span>
                      <input name="password" type={showPwd ? 'text' : 'password'}
                        onChange={formik.handleChange} onBlur={formik.handleBlur}
                        value={formik.values.password} placeholder="At least 6 characters"
                        className={`${inputCls} pr-10`} />
                      <button type="button" tabIndex={-1} onClick={() => setShowPwd(!showPwd)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 transition-colors cursor-pointer">
                        {showPwd ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    {formik.touched.password && formik.errors.password && (
                      <p className="text-xs text-rose-500 mt-1.5 flex items-center gap-1"><AlertCircle className="h-3 w-3" />{formik.errors.password}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Confirm New Password</label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 pointer-events-none"><Lock className="h-4 w-4" /></span>
                      <input name="confirmPassword" type={showConfPwd ? 'text' : 'password'}
                        onChange={formik.handleChange} onBlur={formik.handleBlur}
                        value={formik.values.confirmPassword} placeholder="Repeat password"
                        className={`${inputCls} pr-10`} />
                      <button type="button" tabIndex={-1} onClick={() => setShowConfPwd(!showConfPwd)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 transition-colors cursor-pointer">
                        {showConfPwd ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                      <p className="text-xs text-rose-500 mt-1.5 flex items-center gap-1"><AlertCircle className="h-3 w-3" />{formik.errors.confirmPassword}</p>
                    )}
                  </div>
                </div>
              )}

              {/* Save */}
              <div className="flex justify-end pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="submit"
                  disabled={loading}
                  id="save-profile"
                  className="flex items-center gap-2 px-6 py-2.5 premium-gradient-btn text-white font-bold rounded-xl cursor-pointer disabled:opacity-50 disabled:pointer-events-none text-sm"
                >
                  {loading
                    ? <><Loader2 className="h-4 w-4 animate-spin" />Saving…</>
                    : <><CheckCircle2 className="h-4 w-4" />Save Changes</>
                  }
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
