import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { updateUserProfile } from '../store/slices/authSlice';
import { showToast } from '../store/slices/uiSlice';
import { 
  User, 
  Mail, 
  Lock, 
  Shield, 
  Calendar, 
  Loader2, 
  KeyRound, 
  Activity,
  UserCheck
} from 'lucide-react';

const Profile = () => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);
  const [showPasswordChange, setShowPasswordChange] = useState(false);

  // Formik validation schema for profile info + password changes
  const formik = useFormik({
    initialValues: {
      name: user?.name || '',
      email: user?.email || '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string().min(6, 'Password must be at least 6 characters long'),
      confirmPassword: Yup.string().oneOf(
        [Yup.ref('password'), null],
        'Passwords must match'
      ),
    }),
    onSubmit: async (values) => {
      const updateData = {
        name: values.name,
        email: values.email,
      };

      if (values.password) {
        updateData.password = values.password;
      }

      try {
        await dispatch(updateUserProfile(updateData)).unwrap();
        dispatch(showToast({ message: 'Profile details updated successfully!', severity: 'success' }));
        formik.setFieldValue('password', '');
        formik.setFieldValue('confirmPassword', '');
        setShowPasswordChange(false);
      } catch (err) {
        dispatch(showToast({ message: err || 'Profile update failed', severity: 'error' }));
      }
    },
  });

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Account Profile
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          Manage your personal details, email configurations, and password security
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Card Summary */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-850/40 text-center space-y-4">
          <div className="relative inline-block mx-auto">
            <div className="w-24 h-24 rounded-full bg-violet-100 dark:bg-violet-950/40 text-violet-600 dark:text-violet-400 flex items-center justify-center mx-auto border-2 border-violet-500/20 shadow-md">
              <span className="text-3xl font-bold uppercase">
                {user?.name ? user.name.charAt(0) : '?'}
              </span>
            </div>
            <div className="absolute bottom-0 right-1.5 p-1.5 bg-violet-600 rounded-full text-white shadow">
              <UserCheck className="w-3.5 h-3.5" />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold text-slate-950 dark:text-white">{user?.name}</h3>
            <span className="text-xs text-slate-400 dark:text-slate-500 font-mono block mt-0.5">{user?.email}</span>
          </div>

          <div className="flex flex-col gap-2 pt-4 border-t border-slate-150 dark:border-slate-800">
            {/* Role indicator */}
            <div className="flex items-center space-x-2 text-xs font-semibold text-slate-600 dark:text-slate-300">
              <Shield className="h-4 w-4 text-violet-500 flex-shrink-0" />
              <span>Permission: {user?.isAdmin ? 'Administrator' : 'Standard Analyst'}</span>
            </div>

            {/* Account active indicator */}
            <div className="flex items-center space-x-2 text-xs font-semibold text-slate-600 dark:text-slate-300">
              <Activity className="h-4 w-4 text-emerald-500 flex-shrink-0" />
              <span>Status: Active Session</span>
            </div>

            {/* Created At */}
            {user?.createdAt && (
              <div className="flex items-center space-x-2 text-xs text-slate-500 dark:text-slate-400">
                <Calendar className="h-4 w-4 text-slate-400 flex-shrink-0" />
                <span>Joined {new Date(user.createdAt).toLocaleDateString(undefined, { dateStyle: 'long' })}</span>
              </div>
            )}
          </div>
        </div>

        {/* Profile Editing Form */}
        <div className="md:col-span-2 glass-panel p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-850/40">
          <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Edit Profile Settings</h4>

          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Full Name</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                    <User className="h-4.5 w-4.5" />
                  </span>
                  <input
                    name="name"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                    className="w-full pl-10 pr-3 py-2.5 border rounded-xl bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all text-sm"
                  />
                </div>
                {formik.touched.name && formik.errors.name && (
                  <p className="text-xs text-rose-500 mt-1">{formik.errors.name}</p>
                )}
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Email Address</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                    <Mail className="h-4.5 w-4.5" />
                  </span>
                  <input
                    name="email"
                    type="email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    className="w-full pl-10 pr-3 py-2.5 border rounded-xl bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all text-sm"
                  />
                </div>
                {formik.touched.email && formik.errors.email && (
                  <p className="text-xs text-rose-500 mt-1">{formik.errors.email}</p>
                )}
              </div>
            </div>

            {/* Toggle Password Change Fields */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setShowPasswordChange(!showPasswordChange)}
                className="flex items-center space-x-1.5 text-xs font-bold text-violet-600 dark:text-violet-400 hover:text-violet-750 hover:underline transition cursor-pointer"
              >
                <KeyRound className="w-4 h-4" />
                <span>{showPasswordChange ? 'Cancel Password Change' : 'Change Account Password'}</span>
              </button>
            </div>

            {showPasswordChange && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100 dark:border-slate-800/80 animate-in fade-in duration-200">
                {/* New Password */}
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">New Password</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                      <Lock className="h-4.5 w-4.5" />
                    </span>
                    <input
                      name="password"
                      type="password"
                      placeholder="At least 6 characters"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.password}
                      className="w-full pl-10 pr-3 py-2.5 border rounded-xl bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all text-sm"
                    />
                  </div>
                  {formik.touched.password && formik.errors.password && (
                    <p className="text-xs text-rose-500 mt-1">{formik.errors.password}</p>
                  )}
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Confirm New Password</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                      <Lock className="h-4.5 w-4.5" />
                    </span>
                    <input
                      name="confirmPassword"
                      type="password"
                      placeholder="Repeat password"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.confirmPassword}
                      className="w-full pl-10 pr-3 py-2.5 border rounded-xl bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all text-sm"
                    />
                  </div>
                  {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                    <p className="text-xs text-rose-500 mt-1">{formik.errors.confirmPassword}</p>
                  )}
                </div>
              </div>
            )}

            {/* Form Actions */}
            <div className="flex justify-end pt-4 border-t border-slate-150 dark:border-slate-800">
              <button
                type="submit"
                disabled={loading}
                className="flex items-center px-5 py-2.5 bg-violet-600 hover:bg-violet-700 text-white font-bold rounded-xl shadow-md transition disabled:opacity-50 cursor-pointer text-sm"
              >
                {loading && <Loader2 className="h-4.5 w-4.5 animate-spin mr-2" />}
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
